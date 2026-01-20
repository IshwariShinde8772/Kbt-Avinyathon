import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { decode } from "https://deno.land/std@0.168.0/encoding/base64.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const rateLimits = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

// Allowed file types and max size
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Google Sheets API helper
async function appendToGoogleSheet(data: Record<string, unknown>, sheetType: 'problem' | 'sponsorship') {
  const serviceAccountEmail = Deno.env.get("GOOGLE_SERVICE_ACCOUNT_EMAIL");
  const privateKey = Deno.env.get("GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY");
  const sheetId = Deno.env.get("GOOGLE_SHEET_ID");

  if (!serviceAccountEmail || !privateKey || !sheetId) {
    console.log("Google Sheets credentials not configured, skipping sheet append");
    return;
  }

  try {
    // Create JWT for Google API authentication
    const jwt = await createGoogleJWT(serviceAccountEmail, privateKey);
    
    // Get access token
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion: jwt,
      }),
    });

    if (!tokenResponse.ok) {
      console.error("Failed to get Google access token:", await tokenResponse.text());
      return;
    }

    const { access_token } = await tokenResponse.json();

    // Prepare row data based on type
    const timestamp = new Date().toISOString();
    let rowData: string[];
    let range: string;

    if (sheetType === 'problem') {
      rowData = [
        timestamp,
        String(data.company_name || ''),
        String(data.contact_person || ''),
        String(data.email || ''),
        String(data.phone || ''),
        String(data.company_website || ''),
        String(data.problem_title || ''),
        String(data.problem_description || ''),
        String(data.domain || ''),
        String(data.targeted_audience || ''),
        String(data.expected_outcome || ''),
        String(data.resources_provided || ''),
        'pending'
      ];
      range = "Problem Statements!A:M";
    } else {
      rowData = [
        timestamp,
        String(data.company_name || ''),
        String(data.contact_person || ''),
        String(data.email || ''),
        String(data.phone || ''),
        String(data.company_website || ''),
        String(data.sponsorship_type || ''),
        String(data.sponsorship_amount || ''),
        String(data.additional_notes || ''),
        'pending'
      ];
      range = "Sponsorships!A:J";
    }

    // Append to Google Sheet
    const appendResponse = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(range)}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          values: [rowData],
        }),
      }
    );

    if (!appendResponse.ok) {
      console.error("Failed to append to Google Sheet:", await appendResponse.text());
    } else {
      console.log("Successfully appended to Google Sheet");
    }
  } catch (error) {
    console.error("Google Sheets error:", error);
  }
}

// Create a JWT for Google Service Account authentication
async function createGoogleJWT(email: string, privateKeyPem: string): Promise<string> {
  const header = {
    alg: "RS256",
    typ: "JWT",
  };

  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: email,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  };

  const encoder = new TextEncoder();
  const headerB64 = base64UrlEncode(encoder.encode(JSON.stringify(header)));
  const payloadB64 = base64UrlEncode(encoder.encode(JSON.stringify(payload)));
  const unsignedToken = `${headerB64}.${payloadB64}`;

  // Import the private key and sign
  const key = await importPrivateKey(privateKeyPem);
  const signature = await crypto.subtle.sign(
    { name: "RSASSA-PKCS1-v1_5" },
    key,
    encoder.encode(unsignedToken)
  );

  const signatureB64 = base64UrlEncode(new Uint8Array(signature));
  return `${unsignedToken}.${signatureB64}`;
}

function base64UrlEncode(data: Uint8Array): string {
  const base64 = btoa(String.fromCharCode(...data));
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function importPrivateKey(pem: string): Promise<CryptoKey> {
  // Handle escaped newlines from environment variable
  const pemContents = pem
    .replace(/\\n/g, "\n")
    .replace(/-----BEGIN PRIVATE KEY-----/, "")
    .replace(/-----END PRIVATE KEY-----/, "")
    .replace(/-----BEGIN RSA PRIVATE KEY-----/, "")
    .replace(/-----END RSA PRIVATE KEY-----/, "")
    .replace(/\s/g, "");

  const binaryDer = Uint8Array.from(atob(pemContents), (c) => c.charCodeAt(0));

  return await crypto.subtle.importKey(
    "pkcs8",
    binaryDer,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const now = Date.now();

    const limit = rateLimits.get(ip);
    if (limit && limit.resetAt > now && limit.count >= RATE_LIMIT_MAX) {
      return new Response(JSON.stringify({ error: "Too many submissions" }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    if (limit && limit.resetAt > now) { limit.count++; } 
    else { rateLimits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS }); }

    const data = await req.json();
    if (data.honeypot && data.honeypot.trim() !== "") {
      return new Response(JSON.stringify({ success: true }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

    // Handle file upload if provided
    let paymentProofUrl: string | null = null;
    if (data.payment_proof_base64 && data.payment_proof_filename && data.payment_proof_type) {
      // Validate file type
      if (!ALLOWED_MIME_TYPES.includes(data.payment_proof_type)) {
        return new Response(JSON.stringify({ error: "Invalid file type. Allowed: JPG, PNG, WebP, PDF" }), { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        });
      }

      // Decode base64 and validate size
      const fileData = decode(data.payment_proof_base64);
      if (fileData.length > MAX_FILE_SIZE) {
        return new Response(JSON.stringify({ error: "File too large. Maximum size is 5MB" }), { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        });
      }

      // Generate secure filename
      const fileExt = data.payment_proof_filename.split('.').pop()?.toLowerCase() || 'bin';
      const safeExt = ['jpg', 'jpeg', 'png', 'webp', 'pdf'].includes(fileExt) ? fileExt : 'bin';
      const fileName = `${Date.now()}-${crypto.randomUUID()}.${safeExt}`;

      // Upload to private bucket using service role
      const { error: uploadError } = await supabase.storage
        .from('payment-proofs')
        .upload(fileName, fileData, {
          contentType: data.payment_proof_type,
          upsert: false,
        });

      if (uploadError) {
        console.error("Storage upload error:", uploadError);
        return new Response(JSON.stringify({ error: "Failed to upload payment proof" }), { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        });
      }

      // Store the path (not a public URL - admins will use signed URLs to access)
      paymentProofUrl = fileName;
    }

    if (data.type === "sponsorship") {
      const insertData = {
        company_name: data.company_name,
        contact_person: data.contact_person,
        email: data.email,
        phone: data.phone,
        company_website: data.company_website || null,
        sponsorship_type: data.sponsorship_type,
        sponsorship_amount: data.sponsorship_amount || null,
        additional_notes: data.additional_notes || null,
        payment_proof_url: paymentProofUrl,
        status: "pending",
      };
      
      const { error } = await supabase.from("sponsorships").insert(insertData);
      if (error) return new Response(JSON.stringify({ error: "Failed to submit" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      
      // Append to Google Sheet (non-blocking)
      appendToGoogleSheet(insertData, 'sponsorship');
      
      return new Response(JSON.stringify({ success: true }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const insertData = {
      company_name: data.company_name,
      contact_person: data.contact_person,
      email: data.email,
      phone: data.phone,
      company_website: data.company_website || null,
      problem_title: data.problem_title,
      problem_description: data.problem_description,
      domain: data.domain,
      targeted_audience: data.targeted_audience,
      expected_outcome: data.expected_outcome,
      resources_provided: data.resources_provided || null,
      payment_proof_url: paymentProofUrl,
      status: "pending",
    };
    
    const { error } = await supabase.from("problem_statements").insert(insertData);
    if (error) return new Response(JSON.stringify({ error: "Failed to submit" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    
    // Append to Google Sheet (non-blocking)
    appendToGoogleSheet(insertData, 'problem');
    
    return new Response(JSON.stringify({ success: true }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (error) {
    console.error("Edge function error:", error);
    return new Response(JSON.stringify({ error: "An error occurred" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});