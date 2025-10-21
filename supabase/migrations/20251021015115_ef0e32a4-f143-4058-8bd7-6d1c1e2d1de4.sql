-- Restore Azure Sky Park with all original images
UPDATE properties 
SET meta = jsonb_set(
  meta,
  '{gallery}',
  '[
    "/properties/azure-sky-park-cover.jpg",
    "/src/assets/azure-sky-overview.jpg",
    "/src/assets/azure-sky-amenities.jpg",
    "/src/assets/azure-sky-1br.jpg",
    "/src/assets/azure-sky-2br.jpg",
    "/src/assets/azure-sky-3br.jpg",
    "/src/assets/azure-sky-4br.jpg",
    "/src/assets/azure-sky-floorplans-overview.jpg",
    "/src/assets/azure-sky-features.jpg",
    "/src/assets/azure-sky-location.jpg"
  ]'::jsonb
)
WHERE slug = 'azure-sky-park';