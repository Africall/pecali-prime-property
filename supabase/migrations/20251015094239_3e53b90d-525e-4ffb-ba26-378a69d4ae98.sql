-- Create table for get_started_leads
CREATE TABLE IF NOT EXISTS public.get_started_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  looking_for text NOT NULL,
  budget_range text,
  preferred_location text,
  message text,
  channel text DEFAULT 'Email',
  consent boolean NOT NULL DEFAULT false,
  utm jsonb DEFAULT '{}'::jsonb,
  referrer text,
  page_url text
);

-- Enable RLS
ALTER TABLE public.get_started_leads ENABLE ROW LEVEL SECURITY;

-- Only admins can view leads
CREATE POLICY "Only admins can view get_started_leads"
  ON public.get_started_leads
  FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Create function to insert get_started lead (bypasses RLS)
CREATE OR REPLACE FUNCTION public.insert_get_started_lead(
  p_full_name text,
  p_email text,
  p_phone text,
  p_looking_for text,
  p_budget_range text,
  p_preferred_location text,
  p_message text,
  p_channel text,
  p_consent boolean,
  p_utm jsonb,
  p_referrer text,
  p_page_url text
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  new_lead_id uuid;
BEGIN
  -- Validation
  IF p_full_name IS NULL OR length(trim(p_full_name)) < 2 THEN
    RAISE EXCEPTION 'Full name must be at least 2 characters';
  END IF;
  
  IF p_email IS NULL OR p_email !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
    RAISE EXCEPTION 'Valid email is required';
  END IF;
  
  IF p_looking_for IS NULL OR length(trim(p_looking_for)) < 1 THEN
    RAISE EXCEPTION 'Please specify what you are looking for';
  END IF;
  
  IF p_consent IS NOT TRUE THEN
    RAISE EXCEPTION 'Consent is required';
  END IF;
  
  -- Insert the lead
  INSERT INTO public.get_started_leads (
    full_name, email, phone, looking_for, budget_range, 
    preferred_location, message, channel, consent, utm, referrer, page_url
  )
  VALUES (
    trim(p_full_name), lower(trim(p_email)), trim(p_phone), p_looking_for, 
    p_budget_range, trim(p_preferred_location), trim(p_message), p_channel, 
    p_consent, p_utm, p_referrer, p_page_url
  )
  RETURNING id INTO new_lead_id;
  
  RETURN new_lead_id;
END;
$function$;