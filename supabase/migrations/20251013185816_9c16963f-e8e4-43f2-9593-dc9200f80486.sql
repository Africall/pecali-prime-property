-- Create properties table for dynamic PDF-based property listings
CREATE TABLE IF NOT EXISTS public.properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  price_label TEXT NOT NULL,
  pdf_path TEXT NOT NULL,
  cover_page INTEGER DEFAULT 1,
  gallery_pages INTEGER[] DEFAULT ARRAY[]::INTEGER[],
  floorplan_pages INTEGER[] DEFAULT ARRAY[]::INTEGER[],
  meta JSONB DEFAULT '{}'::JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- Public read access (anyone can view properties)
CREATE POLICY "Properties are viewable by everyone"
  ON public.properties
  FOR SELECT
  USING (true);

-- Insert Azure Sky Park demo property
INSERT INTO public.properties (slug, title, location, price_label, pdf_path, cover_page, gallery_pages, floorplan_pages, meta)
VALUES (
  'azure-sky-park',
  'Azure Sky Park',
  'Nairobi, Kenya',
  'Contact for Pricing',
  'pdfs/azure-sky-park.pdf',
  1,
  ARRAY[2,3,4,5,6,7,8],
  ARRAY[5,6,7,8],
  '{"beds": "1-4BR", "amenities": ["24hr CCTV", "Swimming Pool", "Rooftop Restaurant", "5 High Speed Elevators"]}'::JSONB
);