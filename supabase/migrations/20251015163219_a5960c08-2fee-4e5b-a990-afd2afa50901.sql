-- Make pdf_path nullable and set defaults for PDF-related fields
ALTER TABLE properties 
  ALTER COLUMN pdf_path DROP NOT NULL;

-- Clear all PDF references from existing properties
UPDATE properties 
SET pdf_path = NULL, 
    cover_page = NULL, 
    gallery_pages = ARRAY[]::integer[], 
    floorplan_pages = ARRAY[]::integer[];