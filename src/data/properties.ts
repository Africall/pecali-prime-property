export interface PropertyUnit {
  type: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  price?: string;
  features?: string[];
}

export interface Property {
  id: string;
  slug: string;
  name: string;
  location: string;
  price: string;
  priceValue?: number; // For sorting
  propertyType: string;
  status: string;
  image: string;
  description: string;
  bedrooms: number[];
  bathrooms: number[];
  features: string[];
  units?: PropertyUnit[];
  phase?: string;
}

export const propertiesData: Property[] = [
  {
    id: "1",
    slug: "urban-park",
    name: "Urban Park",
    location: "Syokimau, Nairobi",
    price: "Contact for Pricing",
    propertyType: "Park Development",
    status: "Available",
    image: "/properties/urban-park-cover.jpg",
    description: "Premium residential development in Syokimau with modern amenities and green spaces",
    bedrooms: [1, 2, 3, 4],
    bathrooms: [1, 2, 3, 4],
    features: [
      "Modern high-rise development",
      "Palm tree landscaping",
      "Premium finishes",
      "Ample parking",
      "24/7 Security",
      "Children's play area"
    ],
  },
  {
    id: "2",
    slug: "gemini-residency",
    name: "Gemini Residency",
    location: "Nairobi, Kenya",
    price: "Contact for Pricing",
    propertyType: "Residency",
    status: "Available",
    image: "/properties/gemini-residency-cover.jpg",
    description: "Contemporary living spaces with modern amenities and landscaped courtyards",
    bedrooms: [0, 1, 2, 3, 4],
    bathrooms: [1, 2, 3, 4],
    features: [
      "Modern apartment complex",
      "Landscaped courtyards",
      "Swimming pool",
      "Gym facilities",
      "Secure parking",
      "Contemporary design"
    ],
    units: [
      { type: "Studio", bedrooms: 0, bathrooms: 1, area: 35 },
      { type: "1 Bedroom", bedrooms: 1, bathrooms: 1, area: 55 },
      { type: "2 Bedroom", bedrooms: 2, bathrooms: 2, area: 85 },
      { type: "Super 2 Bedroom", bedrooms: 2, bathrooms: 2, area: 95 },
      { type: "3 Bedroom", bedrooms: 3, bathrooms: 3, area: 120 },
      { type: "Super 3 Bedroom", bedrooms: 3, bathrooms: 3, area: 135 },
      { type: "4 Bedroom", bedrooms: 4, bathrooms: 4, area: 155 },
    ]
  },
  {
    id: "3",
    slug: "apple-tree-phase-3",
    name: "Apple Tree Apartments Phase 3",
    location: "Nairobi National Park",
    price: "From KES 12.5M",
    priceValue: 12500000,
    propertyType: "Apartment",
    status: "For Sale",
    phase: "Phase 2 & Phase 3",
    image: "/properties/apple-tree-phase-3-cover.jpg",
    description: "Appletree Apartments Phase 2 & Phase 3 for sale near Nairobi National Park with stunning views and modern amenities",
    bedrooms: [2, 3, 4, 5, 6],
    bathrooms: [2, 3, 4, 5, 8],
    features: [
      "Near Nairobi National Park",
      "Green-themed development",
      "Modern finishes",
      "Balconies with park views",
      "Secure gated community",
      "Penthouse options available"
    ],
    units: [
      { type: "2 Bedroom - Type B", bedrooms: 2, bathrooms: 2, area: 85, price: "KES 12.5M" },
      { type: "2 Bedroom - Type C", bedrooms: 2, bathrooms: 2, area: 90, price: "KES 13M" },
      { type: "3 Bedroom - Type A", bedrooms: 3, bathrooms: 3, area: 120, price: "KES 15M" },
      { type: "3 Bedroom - Type D", bedrooms: 3, bathrooms: 3, area: 125, price: "KES 15.5M" },
      { type: "3 Bedroom Penthouse", bedrooms: 3, bathrooms: 3, area: 175, price: "KES 22M", features: ["Terrace", "Balcony"] },
      { type: "4 Bedroom Penthouse", bedrooms: 4, bathrooms: 4, area: 185, price: "KES 25M", features: ["Terrace", "Balcony"] },
      { type: "5 Bedroom Penthouse", bedrooms: 5, bathrooms: 5, area: 226, price: "KES 30M", features: ["Terrace", "Balcony"] },
      { type: "6 Bedroom DSQ Penthouse", bedrooms: 6, bathrooms: 8, area: 271, price: "KES 35M", features: ["DSQ", "Terrace", "2 Balconies"] },
    ]
  },
  {
    id: "4",
    slug: "elitz-residency",
    name: "Elitz Residency",
    location: "South C, Nairobi",
    price: "From KES 8.5M",
    priceValue: 8500000,
    propertyType: "Residency",
    status: "Available",
    image: "/properties/elitz-residency-cover.jpg",
    description: "Elegant residential tower in the prestigious South C area with luxury finishes and modern amenities",
    bedrooms: [2, 3, 4],
    bathrooms: [2, 3, 4],
    features: [
      "Prestigious South C location",
      "High-rise tower",
      "Leafy neighborhood",
      "Modern amenities",
      "Rooftop terrace",
      "Children's playground"
    ],
    units: [
      { type: "2 Bedroom - Type A", bedrooms: 2, bathrooms: 2, area: 85, price: "KES 8.5M", features: ["Master ensuite", "Balcony"] },
      { type: "2 Bedroom - Type B", bedrooms: 2, bathrooms: 2, area: 91, price: "KES 9M", features: ["Master ensuite", "Balcony"] },
      { type: "3 Bedroom - Type C", bedrooms: 3, bathrooms: 3, area: 120, price: "KES 12M" },
      { type: "3 Bedroom - Type D", bedrooms: 3, bathrooms: 4, area: 134, price: "KES 13.5M", features: ["Master ensuite", "Balcony"] },
      { type: "3 Bedroom", bedrooms: 3, bathrooms: 3, area: 125, price: "KES 12.5M" },
      { type: "4 Bedroom - Type E", bedrooms: 4, bathrooms: 4, area: 155, price: "KES 16M" },
      { type: "4 Bedroom", bedrooms: 4, bathrooms: 4, area: 160, price: "KES 17M" },
    ]
  },
  {
    id: "5",
    slug: "mango-tree",
    name: "Mango Tree Residences",
    location: "Nairobi, Kenya",
    price: "From KES 5.5M",
    priceValue: 5500000,
    propertyType: "Apartment",
    status: "For Sale",
    image: "/properties/mango-tree-cover.jpg",
    description: "Affordable luxury apartments with multiple unit types, modern finishes, and family-friendly amenities",
    bedrooms: [1, 2, 3],
    bathrooms: [1, 2, 3, 4],
    features: [
      "Affordable luxury",
      "Multiple unit configurations",
      "Modern finishes",
      "Family-friendly",
      "Green spaces",
      "Close to amenities"
    ],
    units: [
      { type: "1 Bedroom - Type E", bedrooms: 1, bathrooms: 1, area: 55, price: "KES 5.5M" },
      { type: "2 Bedroom - Type C", bedrooms: 2, bathrooms: 2, area: 82, price: "KES 8.6M" },
      { type: "2 Bedroom - Type F", bedrooms: 2, bathrooms: 2, area: 76, price: "KES 7.8M" },
      { type: "3 Bedroom - Type A (DSQ)", bedrooms: 3, bathrooms: 4, area: 123, price: "KES 12.7M", features: ["DSQ included"] },
      { type: "3 Bedroom - Type B", bedrooms: 3, bathrooms: 3, area: 100, price: "KES 10.5M" },
      { type: "3 Bedroom - Type D", bedrooms: 3, bathrooms: 3, area: 98, price: "KES 9.9M" },
      { type: "3 Bedroom - Type E", bedrooms: 3, bathrooms: 2, area: 45, price: "KES 6.0M" },
      { type: "3 Bedroom - Type G", bedrooms: 3, bathrooms: 3, area: 100, price: "KES 11M" },
    ]
  },
  {
    id: "6",
    slug: "azure-sky-park",
    name: "Azure Sky Park",
    location: "Nairobi, Kenya",
    price: "Contact for Pricing",
    propertyType: "Park Development",
    status: "Available",
    image: "/properties/azure-sky-park-cover.jpg",
    description: "Modern park development with spacious units, multiple towers, contemporary design, and ample amenities",
    bedrooms: [0, 1, 2, 3, 4],
    bathrooms: [1, 2, 3, 4],
    features: [
      "Multi-tower development",
      "Green spaces",
      "Contemporary design",
      "Spacious units",
      "Modern amenities",
      "Excellent connectivity"
    ],
    units: [
      { type: "Studio (0 Bedroom)", bedrooms: 0, bathrooms: 1, area: 87 },
      { type: "Large Studio", bedrooms: 0, bathrooms: 1, area: 190 },
      { type: "1 Bedroom", bedrooms: 1, bathrooms: 1, area: 60 },
      { type: "2 Bedroom", bedrooms: 2, bathrooms: 2, area: 90 },
      { type: "3 Bedroom", bedrooms: 3, bathrooms: 3, area: 120 },
      { type: "4 Bedroom", bedrooms: 4, bathrooms: 4, area: 150 },
    ]
  },
];

// Filter options
export const locationOptions = [
  "Syokimau, Nairobi",
  "Nairobi, Kenya",
  "Nairobi National Park",
  "South C, Nairobi",
  "Kilimani",
  "Kileleshwa",
  "Lavington",
  "Westlands",
  "Parklands",
];

export const priceRangeOptions = [
  { label: "Under KSh 5M", value: "0-5000000" },
  { label: "KSh 5M - 10M", value: "5000000-10000000" },
  { label: "KSh 10M - 15M", value: "10000000-15000000" },
  { label: "KSh 15M - 20M", value: "15000000-20000000" },
  { label: "KSh 20M+", value: "20000000-999999999" },
  { label: "Contact for Pricing", value: "contact" },
];

export const propertyTypeOptions = [
  "Apartment",
  "Penthouse",
  "Residency",
  "Park Development",
  "Studio",
  "1 Bedroom",
  "2 Bedroom",
  "3 Bedroom",
  "4 Bedroom",
  "5+ Bedroom",
];

export const bedroomOptions = [
  { label: "Studio", value: 0 },
  { label: "1 Bedroom", value: 1 },
  { label: "2 Bedrooms", value: 2 },
  { label: "3 Bedrooms", value: 3 },
  { label: "4 Bedrooms", value: 4 },
  { label: "5+ Bedrooms", value: 5 },
];

export const bathroomOptions = [
  { label: "1 Bathroom", value: 1 },
  { label: "2 Bathrooms", value: 2 },
  { label: "3 Bathrooms", value: 3 },
  { label: "4+ Bathrooms", value: 4 },
];
