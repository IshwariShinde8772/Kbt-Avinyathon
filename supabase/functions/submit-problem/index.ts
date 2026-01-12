import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// In-memory rate limiting (resets on function cold start, but sufficient for basic protection)
const rateLimits = new Map<string, { count: number; resetAt: number }>();

// Rate limit configuration: 5 submissions per hour per IP
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

interface ProblemSubmission {
  company_name: string;
  contact_person: string;
  email: string;
  phone: string;
  company_website?: string;
  problem_title: string;
  problem_description: string;
  domain: string;
  targeted_audience: string;
  expected_outcome: string;
  resources_provided?: string;
  honeypot?: string; // Anti-bot field
}

// Server-side validation
function validateSubmission(data: ProblemSubmission): { valid: boolean; error?: string } {
  // Check honeypot (bots fill hidden fields)
  if (data.honeypot && data.honeypot.trim() !== "") {
    return { valid: false, error: "Invalid submission" };
  }

  // Validate required fields
  if (!data.company_name || data.company_name.length < 2 || data.company_name.length > 100) {
    return { valid: false, error: "Company name must be 2-100 characters" };
  }
  if (!data.contact_person || data.contact_person.length < 2 || data.contact_person.length > 100) {
    return { valid: false, error: "Contact name must be 2-100 characters" };
  }
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || data.email.length > 255) {
    return { valid: false, error: "Invalid email address" };
  }
  if (!data.phone || data.phone.length < 10 || data.phone.length > 15) {
    return { valid: false, error: "Phone number must be 10-15 characters" };
  }
  if (data.company_website && data.company_website.length > 255) {
    return { valid: false, error: "Company website URL too long" };
  }
  if (!data.domain || data.domain.length === 0) {
    return { valid: false, error: "Domain is required" };
  }
  if (!data.problem_title || data.problem_title.length < 5 || data.problem_title.length > 200) {
    return { valid: false, error: "Problem title must be 5-200 characters" };
  }
  if (!data.problem_description || data.problem_description.length < 50 || data.problem_description.length > 2000) {
    return { valid: false, error: "Problem description must be 50-2000 characters" };
  }
  if (!data.targeted_audience || data.targeted_audience.length < 10 || data.targeted_audience.length > 500) {
    return { valid: false, error: "Targeted audience must be 10-500 characters" };
  }
  if (!data.expected_outcome || data.expected_outcome.length < 20 || data.expected_outcome.length > 1000) {
    return { valid: false, error: "Expected outcome must be 20-1000 characters" };
  }
  if (data.resources_provided && data.resources_provided.length > 1000) {
    return { valid: false, error: "Resources description too long" };
  }

  return { valid: true };
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get client IP for rate limiting
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
               req.headers.get("x-real-ip") || 
               "unknown";
    const now = Date.now();

    // Check rate limit
    const limit = rateLimits.get(ip);
    if (limit && limit.resetAt > now) {
      if (limit.count >= RATE_LIMIT_MAX) {
        return new Response(
          JSON.stringify({ 
            error: "Too many submissions. Please try again later.",
            retryAfter: Math.ceil((limit.resetAt - now) / 1000)
          }),
          { 
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          }
        );
      }
      limit.count++;
    } else {
      rateLimits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    }

    // Parse request body
    const data: ProblemSubmission = await req.json();

    // Server-side validation
    const validation = validateSubmission(data);
    if (!validation.valid) {
      return new Response(
        JSON.stringify({ error: validation.error }),
        { 
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }

    // Create Supabase client with service role (bypasses RLS)
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Insert the submission
    const { error: insertError } = await supabase
      .from("problem_statements")
      .insert({
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
        status: "pending",
      });

    if (insertError) {
      console.error("Database insert error:", insertError);
      return new Response(
        JSON.stringify({ error: "Failed to submit. Please try again." }),
        { 
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Problem statement submitted successfully" }),
      { 
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );

  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred" }),
      { 
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  }
});
