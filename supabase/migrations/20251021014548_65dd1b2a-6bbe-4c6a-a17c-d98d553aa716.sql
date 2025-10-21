-- Update Azure Sky Park cover image
UPDATE properties 
SET meta = jsonb_set(
  COALESCE(meta, '{}'::jsonb),
  '{gallery}',
  '[]'::jsonb
)
WHERE slug = 'azure-sky-park' AND (meta->'gallery' IS NULL OR jsonb_array_length(meta->'gallery') = 0);

UPDATE properties 
SET meta = jsonb_set(
  meta,
  '{gallery,0}',
  '"/properties/azure-sky-park-cover.jpg"'::jsonb
)
WHERE slug = 'azure-sky-park';

-- Update Gemini Residency cover image
UPDATE properties 
SET meta = jsonb_set(
  COALESCE(meta, '{}'::jsonb),
  '{gallery}',
  '[]'::jsonb
)
WHERE slug = 'gemini-residency' AND (meta->'gallery' IS NULL OR jsonb_array_length(meta->'gallery') = 0);

UPDATE properties 
SET meta = jsonb_set(
  meta,
  '{gallery,0}',
  '"/properties/gemini-residency-cover.jpg"'::jsonb
)
WHERE slug = 'gemini-residency';

-- Update Urban Park - prepend the new image
UPDATE properties
SET meta = jsonb_set(
  COALESCE(meta, '{}'::jsonb),
  '{gallery}',
  jsonb_build_array('/properties/urban-park-new-cover.jpg') || COALESCE(meta->'gallery', '[]'::jsonb)
)
WHERE slug = 'urban-park';