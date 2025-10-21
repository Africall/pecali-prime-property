-- Update Azure Sky Park: Replace second image in gallery
UPDATE properties
SET meta = jsonb_set(
  meta,
  '{gallery}',
  jsonb_build_array(
    '/properties/azure-sky-park-cover.jpg',
    '/properties/azure-sky-overview-2.jpg',
    '/src/assets/azure-sky-amenities.jpg',
    '/src/assets/azure-sky-1br.jpg',
    '/src/assets/azure-sky-2br.jpg',
    '/src/assets/azure-sky-3br.jpg',
    '/src/assets/azure-sky-4br.jpg',
    '/src/assets/azure-sky-floorplans-overview.jpg',
    '/src/assets/azure-sky-features.jpg',
    '/src/assets/azure-sky-location.jpg'
  )
)
WHERE slug = 'azure-sky-park';

-- Update Gemini Residency: Replace first image in gallery
UPDATE properties
SET meta = jsonb_set(
  meta,
  '{gallery}',
  jsonb_build_array(
    '/properties/gemini-exterior-courtyard-2.jpg',
    '/properties/gemini-residency-cover.jpg'
  )
)
WHERE slug = 'gemini-residency';

-- Update Urban Park: Add new cover as first image and move existing to second
UPDATE properties
SET meta = jsonb_set(
  meta,
  '{gallery}',
  jsonb_build_array(
    '/properties/urban-park-new-cover.jpg',
    '/properties/urban-park-cover.jpg'
  )
)
WHERE slug = 'urban-park';

-- Fix blank properties by adding gallery arrays where missing
UPDATE properties
SET meta = jsonb_set(
  COALESCE(meta, '{}'::jsonb),
  '{gallery}',
  CASE slug
    WHEN 'apple-tree-phase-3' THEN jsonb_build_array('/properties/apple-tree-phase-3-cover.jpg')
    WHEN 'elitz-residency' THEN jsonb_build_array('/properties/elitz-residency-cover.jpg')
    WHEN 'mango-tree' THEN jsonb_build_array('/properties/mango-tree-cover.jpg')
  END
)
WHERE slug IN ('apple-tree-phase-3', 'elitz-residency', 'mango-tree')
  AND (meta->'gallery' IS NULL OR jsonb_array_length(meta->'gallery') = 0);