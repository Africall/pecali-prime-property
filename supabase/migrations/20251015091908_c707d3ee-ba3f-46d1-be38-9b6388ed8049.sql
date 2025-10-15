-- Remove the open INSERT policy
DROP POLICY IF EXISTS "Anyone can submit enquiries" ON public.leads;

-- Add input validation constraints
ALTER TABLE public.leads
  ADD CONSTRAINT full_name_length CHECK (length(full_name) >= 2 AND length(full_name) <= 100),
  ADD CONSTRAINT phone_length CHECK (length(phone) >= 8 AND length(phone) <= 20),
  ADD CONSTRAINT message_length CHECK (message IS NULL OR length(message) <= 1000);

-- Create a service role function to insert leads (called from Edge Function)
CREATE OR REPLACE FUNCTION public.insert_lead(
  p_source text,
  p_property_slug text,
  p_full_name text,
  p_phone text,
  p_message text
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_lead_id uuid;
BEGIN
  -- Additional server-side validation
  IF p_full_name IS NULL OR length(trim(p_full_name)) < 2 THEN
    RAISE EXCEPTION 'Name must be at least 2 characters';
  END IF;
  
  IF p_phone IS NULL OR length(trim(p_phone)) < 8 THEN
    RAISE EXCEPTION 'Phone number must be at least 8 characters';
  END IF;
  
  -- Insert the lead
  INSERT INTO public.leads (source, property_slug, full_name, phone, message)
  VALUES (p_source, p_property_slug, trim(p_full_name), trim(p_phone), trim(p_message))
  RETURNING id INTO new_lead_id;
  
  RETURN new_lead_id;
END;
$$;

-- Grant execute permission to service role only
REVOKE ALL ON FUNCTION public.insert_lead FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.insert_lead TO service_role;