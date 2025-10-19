import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.75.0";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 3;

function getRateLimitKey(req: Request): string {
  return req.headers.get('x-forwarded-for') || 
         req.headers.get('x-real-ip') || 
         'unknown';
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

  if (!data.full_name || data.full_name.trim().split(/\s+/).length < 2) {
    errors.push('Full name must contain at least 2 words');
  }

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  if (!data.email || !emailRegex.test(data.email)) {
    errors.push('Valid email is required');
  }

  if (!data.looking_for) {
    errors.push('Please specify what you are looking for');
  }

  if (!data.consent) {
    errors.push('Consent is required');
  }

  return { valid: errors.length === 0, errors };
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting
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
            'Retry-After': rateLimit.retryAfter?.toString() || '60'
          } 
        }
      );
    }

    // Parse and validate request
    const data = await req.json();
    console.log('Received get-started submission:', { 
      email: data.email,
      lookingFor: data.looking_for 
    });

    const validation = validateInput(data);
    if (!validation.valid) {
      console.log('Validation failed:', validation.errors);
      return new Response(
        JSON.stringify({ error: validation.errors.join(', ') }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Call the database function
    const { data: result, error } = await supabase.rpc('insert_get_started_lead', {
      p_full_name: data.full_name,
      p_email: data.email,
      p_phone: data.phone || null,
      p_looking_for: data.looking_for,
      p_budget_range: data.budget_range || null,
      p_preferred_location: data.preferred_location || null,
      p_message: data.message || null,
      p_channel: data.channel || 'Email',
      p_consent: data.consent,
      p_utm: data.utm || {},
      p_referrer: data.referrer || null,
      p_page_url: data.page_url || null
    });

    if (error) {
      console.error('Database error:', error);
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Get-started lead created successfully:', result);
    
    // Send email notification
    try {
      const resend = new Resend(Deno.env.get('RESEND_API_KEY'));
      
      const emailHtml = `
        <h1>🎉 New Get Started Lead!</h1>
        <p>A new client has submitted the Get Started form:</p>
        
        <h2>Contact Information:</h2>
        <ul>
          <li><strong>Name:</strong> ${data.full_name}</li>
          <li><strong>Email:</strong> ${data.email}</li>
          <li><strong>Phone:</strong> ${data.phone || 'Not provided'}</li>
          <li><strong>Preferred Contact:</strong> ${data.channel}</li>
        </ul>
        
        <h2>Requirements:</h2>
        <ul>
          <li><strong>Looking For:</strong> ${data.looking_for}</li>
          <li><strong>Budget Range:</strong> ${data.budget_range || 'Not specified'}</li>
          <li><strong>Preferred Location:</strong> ${data.preferred_location || 'Not specified'}</li>
        </ul>
        
        ${data.message ? `<h2>Additional Message:</h2><p>${data.message}</p>` : ''}
        
        <h2>Source Information:</h2>
        <ul>
          <li><strong>Page URL:</strong> ${data.page_url || 'Not available'}</li>
          <li><strong>Referrer:</strong> ${data.referrer || 'Direct visit'}</li>
          <li><strong>Submitted:</strong> ${new Date().toLocaleString('en-KE', { timeZone: 'Africa/Nairobi' })}</li>
        </ul>
        
        <p style="margin-top: 30px; padding: 15px; background: #f0f9ff; border-left: 4px solid #0284c7;">
          <strong>⏰ Action Required:</strong> Contact this lead within 24 hours via ${data.channel}
        </p>
      `;
      
      await resend.emails.send({
        from: 'Pecali Property <onboarding@resend.dev>',
        to: ['melwishjamo2805@gmail.com'],
        subject: `🔔 New Lead: ${data.full_name} - ${data.looking_for}`,
        html: emailHtml,
      });
      
      console.log('Notification email sent successfully');
    } catch (emailError) {
      console.error('Failed to send notification email:', emailError);
      // Don't fail the request if email fails
    }
    
    return new Response(
      JSON.stringify({ 
        success: true,
        leadId: result,
        message: 'We\'ve received your request and will contact you within 24 hours!'
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred. Please try again.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});