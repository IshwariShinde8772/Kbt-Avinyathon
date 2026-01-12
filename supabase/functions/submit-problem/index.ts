import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const rateLimits = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

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

    if (data.type === "sponsorship") {
      const { error } = await supabase.from("sponsorships").insert({
        company_name: data.company_name,
        contact_person: data.contact_person,
        email: data.email,
        phone: data.phone,
        company_website: data.company_website || null,
        sponsorship_type: data.sponsorship_type,
        sponsorship_amount: data.sponsorship_amount || null,
        additional_notes: data.additional_notes || null,
        payment_proof_url: data.payment_proof_url || null,
        status: "pending",
      });
      if (error) return new Response(JSON.stringify({ error: "Failed to submit" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      return new Response(JSON.stringify({ success: true }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const { error } = await supabase.from("problem_statements").insert({
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
      payment_proof_url: data.payment_proof_url || null,
      status: "pending",
    });
    if (error) return new Response(JSON.stringify({ error: "Failed to submit" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    return new Response(JSON.stringify({ success: true }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (error) {
    return new Response(JSON.stringify({ error: "An error occurred" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});