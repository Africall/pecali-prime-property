-- Create training_enrollments table
CREATE TABLE IF NOT EXISTS public.training_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'enrolled', 'completed', 'dropped')),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create service_inquiries table
CREATE TABLE IF NOT EXISTS public.service_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_type TEXT NOT NULL,
  source TEXT NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'in_progress', 'completed', 'cancelled')),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.training_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_inquiries ENABLE ROW LEVEL SECURITY;

-- RLS Policies for training_enrollments
CREATE POLICY "Only admins can view training enrollments"
ON public.training_enrollments
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can update training enrollments"
ON public.training_enrollments
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for service_inquiries
CREATE POLICY "Only admins can view service inquiries"
ON public.service_inquiries
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can update service inquiries"
ON public.service_inquiries
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Trigger for updated_at
CREATE TRIGGER update_training_enrollments_updated_at
BEFORE UPDATE ON public.training_enrollments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_service_inquiries_updated_at
BEFORE UPDATE ON public.service_inquiries
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create functions for inserting data
CREATE OR REPLACE FUNCTION public.insert_training_enrollment(
  p_full_name TEXT,
  p_email TEXT,
  p_phone TEXT,
  p_message TEXT
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_enrollment_id UUID;
BEGIN
  IF p_full_name IS NULL OR length(trim(p_full_name)) < 2 THEN
    RAISE EXCEPTION 'Full name must be at least 2 characters';
  END IF;
  
  IF p_email IS NULL OR p_email !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
    RAISE EXCEPTION 'Valid email is required';
  END IF;
  
  INSERT INTO public.training_enrollments (full_name, email, phone, message)
  VALUES (trim(p_full_name), lower(trim(p_email)), trim(p_phone), trim(p_message))
  RETURNING id INTO new_enrollment_id;
  
  RETURN new_enrollment_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.insert_service_inquiry(
  p_service_type TEXT,
  p_source TEXT,
  p_full_name TEXT,
  p_email TEXT,
  p_phone TEXT,
  p_message TEXT
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_inquiry_id UUID;
BEGIN
  IF p_full_name IS NULL OR length(trim(p_full_name)) < 2 THEN
    RAISE EXCEPTION 'Full name must be at least 2 characters';
  END IF;
  
  INSERT INTO public.service_inquiries (service_type, source, full_name, email, phone, message)
  VALUES (p_service_type, p_source, trim(p_full_name), trim(p_email), trim(p_phone), trim(p_message))
  RETURNING id INTO new_inquiry_id;
  
  RETURN new_inquiry_id;
END;
$$;