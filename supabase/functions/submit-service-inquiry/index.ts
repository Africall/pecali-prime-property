import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { service_type, source, full_name, email, phone, message } = await req.json();

    console.log('Received service inquiry:', { service_type, source, full_name });

    const { data, error } = await supabase.rpc('insert_service_inquiry', {
      p_service_type: service_type,
      p_source: source,
      p_full_name: full_name,
      p_email: email || null,
      p_phone: phone || null,
      p_message: message || null,
    });

    if (error) {
      console.error('Database error:', error);
      throw error;
    }

    console.log('Service inquiry created:', data);

    return new Response(
      JSON.stringify({ success: true, id: data }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error: any) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});