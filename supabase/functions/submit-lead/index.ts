import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Simple in-memory rate limiting (resets on function cold start)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 3; // Max 3 submissions per minute per IP

function getRateLimitKey(req: Request): string {
  // Try to get real IP from various headers
  const forwarded = req.headers.get('x-forwarded-for');
  const realIp = req.headers.get('x-real-ip');
  return forwarded?.split(',')[0].trim() || realIp || 'unknown';
}

function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true };
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    const retryAfter = Math.ceil((record.resetTime - now) / 1000);
    return { allowed: false, retryAfter };
  }

  record.count++;
  return { allowed: true };
}

function validateInput(data: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.full_name || typeof data.full_name !== 'string') {
    errors.push('Full name is required');
  } else if (data.full_name.trim().length < 2 || data.full_name.trim().length > 100) {
    errors.push('Name must be between 2 and 100 characters');
  }

  if (!data.phone || typeof data.phone !== 'string') {
    errors.push('Phone number is required');
  } else if (data.phone.trim().length < 8 || data.phone.trim().length > 20) {
    errors.push('Phone number must be between 8 and 20 characters');
  }

  if (data.message && typeof data.message === 'string' && data.message.trim().length > 1000) {
    errors.push('Message must be less than 1000 characters');
  }

  if (!data.source || !['home_card', 'property_page'].includes(data.source)) {
    errors.push('Invalid source');
  }

  return { valid: errors.length === 0, errors };
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting check
    const ip = getRateLimitKey(req);
    const rateLimit = checkRateLimit(ip);
    
    if (!rateLimit.allowed) {
      console.log(`Rate limit exceeded for IP: ${ip}`);
      return new Response(
        JSON.stringify({ 
          error: 'Too many requests. Please try again later.',
          retryAfter: rateLimit.retryAfter 
        }),
        { 
          status: 429, 
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json',
            'Retry-After': String(rateLimit.retryAfter)
          } 
        }
      );
    }

    // Parse and validate input
    const body = await req.json();
    const validation = validateInput(body);
    
    if (!validation.valid) {
      console.log('Validation failed:', validation.errors);
      return new Response(
        JSON.stringify({ error: validation.errors.join(', ') }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create Supabase client with service role
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Call the database function to insert lead
    const { data, error } = await supabase.rpc('insert_lead', {
      p_source: body.source,
      p_property_slug: body.property_slug || null,
      p_full_name: body.full_name,
      p_phone: body.phone,
      p_message: body.message || null
    });

    if (error) {
      console.error('Database error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to submit enquiry. Please try again.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Lead submitted successfully. ID: ${data}, IP: ${ip}`);
    
    return new Response(
      JSON.stringify({ success: true, id: data }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
