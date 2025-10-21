UPDATE public.properties 
SET meta = jsonb_set(
  meta,
  '{gallery}',
  '[
    "/properties/beacon-synina-cover.jpg",
    "/properties/beacon-synina-location.jpg",
    "/properties/beacon-synina-pricing.jpg",
    "/properties/beacon-synina-exterior.jpg",
    "/properties/beacon-synina-amenities.jpg",
    "/properties/beacon-synina-construction.jpg",
    "/properties/beacon-synina-showhouse.jpg"
  ]'::jsonb
)
WHERE slug = 'beacon-by-synina';

UPDATE public.properties 
SET meta = jsonb_set(
  meta,
  '{gallery}',
  '[
    "/properties/prestigious-residence-cover.jpg",
    "/properties/prestigious-residence-studio.jpg",
    "/properties/prestigious-residence-1br-standard.jpg",
    "/properties/prestigious-residence-1br-luxury.jpg",
    "/properties/prestigious-residence-2br-standard.jpg",
    "/properties/prestigious-residence-3br-luxury-1.jpg",
    "/properties/prestigious-residence-3br-luxury-2.jpg",
    "/properties/prestigious-residence-location.jpg"
  ]'::jsonb
)
WHERE slug = 'prestigious-residence';