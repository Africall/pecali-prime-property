-- Create contact_submissions table for general contact form submissions
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'new'
);

-- Enable RLS
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- RLS policies for contact_submissions
CREATE POLICY "Only admins can view contact submissions"
  ON public.contact_submissions FOR SELECT
  USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update contact submissions"
  ON public.contact_submissions FOR UPDATE
  USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete contact submissions"
  ON public.contact_submissions FOR DELETE
  USING (has_role(auth.uid(), 'admin'));

-- Add updated_at trigger
CREATE TRIGGER update_contact_submissions_updated_at
  BEFORE UPDATE ON public.contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function for inserting contact submissions with validation
CREATE OR REPLACE FUNCTION public.insert_contact_submission(
  p_full_name TEXT,
  p_email TEXT,
  p_phone TEXT,
  p_subject TEXT,
  p_message TEXT
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_submission_id UUID;
BEGIN
  IF p_full_name IS NULL OR length(trim(p_full_name)) < 2 THEN
    RAISE EXCEPTION 'Full name must be at least 2 characters';
  END IF;
  
  IF p_email IS NULL OR p_email !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
    RAISE EXCEPTION 'Valid email is required';
  END IF;
  
  IF p_message IS NULL OR length(trim(p_message)) < 10 THEN
    RAISE EXCEPTION 'Message must be at least 10 characters';
  END IF;
  
  INSERT INTO public.contact_submissions (full_name, email, phone, subject, message)
  VALUES (trim(p_full_name), lower(trim(p_email)), trim(p_phone), trim(p_subject), trim(p_message))
  RETURNING id INTO new_submission_id;
  
  RETURN new_submission_id;
END;
$$;

-- Update get_started_leads RLS to allow admins to update and delete
CREATE POLICY "Admins can update get_started_leads"
  ON public.get_started_leads FOR UPDATE
  USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete get_started_leads"
  ON public.get_started_leads FOR DELETE
  USING (has_role(auth.uid(), 'admin'));

-- Update leads RLS to allow admins to update and delete  
CREATE POLICY "Admins can update leads"
  ON public.leads FOR UPDATE
  USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete leads"
  ON public.leads FOR DELETE
  USING (has_role(auth.uid(), 'admin'));

-- Update service_inquiries RLS to allow admins to delete
CREATE POLICY "Admins can delete service inquiries"
  ON public.service_inquiries FOR DELETE
  USING (has_role(auth.uid(), 'admin'));

-- Update training_enrollments RLS to allow admins to delete
CREATE POLICY "Admins can delete training enrollments"
  ON public.training_enrollments FOR DELETE
  USING (has_role(auth.uid(), 'admin'));