-- Create storage bucket for property PDFs
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'property_pdfs',
  'property_pdfs',
  true,
  52428800, -- 50MB limit
  ARRAY['application/pdf']
);

-- Allow public read access to property PDFs
CREATE POLICY "Property PDFs are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'property_pdfs');

-- Allow authenticated users to upload property PDFs (for admin use)
CREATE POLICY "Authenticated users can upload property PDFs"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'property_pdfs' 
  AND auth.role() = 'authenticated'
);