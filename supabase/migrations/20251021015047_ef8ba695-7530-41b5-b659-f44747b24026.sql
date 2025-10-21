-- Fix Gemini Residency - replace FIRST image
UPDATE properties 
SET meta = jsonb_set(
  meta,
  '{gallery,0}',
  '"/properties/gemini-residency-cover.jpg"'::jsonb
)
WHERE slug = 'gemini-residency';

-- Fix Urban Park - remove duplicate first image
UPDATE properties
SET meta = jsonb_set(
  meta,
  '{gallery}',
  (
    SELECT jsonb_agg(DISTINCT elem)
    FROM jsonb_array_elements(meta->'gallery') elem
  )
)
WHERE slug = 'urban-park';