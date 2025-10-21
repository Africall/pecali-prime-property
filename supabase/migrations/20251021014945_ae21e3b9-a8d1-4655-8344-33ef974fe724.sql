-- Revert Azure Sky Park - restore original cover
UPDATE properties 
SET meta = jsonb_set(
  meta,
  '{gallery,0}',
  '"/properties/azure-sky-park-cover.jpg"'::jsonb
)
WHERE slug = 'azure-sky-park';

-- For Gemini Residency - update the SECOND image (index 1)
UPDATE properties 
SET meta = jsonb_set(
  COALESCE(meta, '{}'::jsonb),
  '{gallery}',
  CASE 
    WHEN meta->'gallery' IS NULL OR jsonb_array_length(meta->'gallery') = 0 
    THEN '[]'::jsonb
    ELSE meta->'gallery'
  END
)
WHERE slug = 'gemini-residency' AND (meta->'gallery' IS NULL OR jsonb_array_length(meta->'gallery') = 0);

-- Now set the second image for Gemini
UPDATE properties 
SET meta = jsonb_set(
  meta,
  '{gallery,1}',
  '"/properties/gemini-residency-cover.jpg"'::jsonb,
  true
)
WHERE slug = 'gemini-residency';