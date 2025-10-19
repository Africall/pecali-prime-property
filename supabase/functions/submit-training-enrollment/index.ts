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

    const { full_name, email, phone, message } = await req.json();

    console.log('Received training enrollment:', { full_name, email });

    const { data, error } = await supabase.rpc('insert_training_enrollment', {
      p_full_name: full_name,
      p_email: email,
      p_phone: phone || null,
      p_message: message || null,
    });

    if (error) {
      console.error('Database error:', error);
      throw error;
    }

    console.log('Training enrollment created:', data);

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