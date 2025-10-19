import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LogoRain from "@/components/LogoRain";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, ArrowRight, SlidersHorizontal } from "lucide-react";
import { propertiesData, locationOptions, priceRangeOptions, propertyTypeOptions, bedroomOptions, bathroomOptions, type Property } from "@/data/properties";

const Properties = () => {
  const [searchParams] = useSearchParams();
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(propertiesData);
  const [sortBy, setSortBy] = useState<string>("newest");
  const [filters, setFilters] = useState({
    location: searchParams.get("location") || "",
    priceRange: searchParams.get("priceRange") || "",
    propertyType: searchParams.get("propertyType") || "",
    bedrooms: searchParams.get("bedrooms") || "",
    bathrooms: searchParams.get("bathrooms") || "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    let result = [...propertiesData];

    // Apply filters
    if (filters.location) {
      result = result.filter(p => p.location === filters.location);
    }

    if (filters.priceRange) {
      if (filters.priceRange === "contact") {
        result = result.filter(p => !p.priceValue);
      } else {
        const [min, max] = filters.priceRange.split("-").map(Number);
        result = result.filter(p => p.priceValue && p.priceValue >= min && p.priceValue <= max);
      }
    }

    if (filters.propertyType) {
      result = result.filter(p => {
        if (["Studio", "1 Bedroom", "2 Bedroom", "3 Bedroom", "4 Bedroom", "5+ Bedroom"].includes(filters.propertyType)) {
          const bedValue = filters.propertyType === "Studio" ? 0 : parseInt(filters.propertyType);
          return p.bedrooms.includes(bedValue);
        }
        return p.propertyType === filters.propertyType;
      });
    }

    if (filters.bedrooms) {
      const bedValue = parseInt(filters.bedrooms);
      result = result.filter(p => p.bedrooms.includes(bedValue));
    }

    if (filters.bathrooms) {
      const bathValue = parseInt(filters.bathrooms);
      result = result.filter(p => p.bathrooms.some(b => b >= bathValue));
    }

    // Apply sorting
    if (sortBy === "price-asc") {
      result.sort((a, b) => (a.priceValue || 0) - (b.priceValue || 0));
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => (b.priceValue || 0) - (a.priceValue || 0));
    } else if (sortBy === "location") {
      result.sort((a, b) => a.location.localeCompare(b.location));
    }

    setFilteredProperties(result);
  }, [filters, sortBy]);

  const clearFilters = () => {
    setFilters({
      location: "",
      priceRange: "",
      propertyType: "",
      bedrooms: "",
      bathrooms: "",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <LogoRain />
      <Navbar />
      
      <main className="pt-nav relative z-10">
        {/* Hero Section */}
        <section className="scroll-offset pt-16 pb-12 bg-gradient-to-b from-primary to-primary/90 text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              All Properties
            </h1>
            <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
              Browse our complete collection of premium developments
            </p>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-8 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-muted-foreground" />
                <span className="font-semibold">Filter Properties</span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-6 gap-3 w-full md:w-auto">
                <Select value={filters.location} onValueChange={(value) => setFilters({...filters, location: value})}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent className="bg-background">
                    {locationOptions.map((loc) => (
                      <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={filters.priceRange} onValueChange={(value) => setFilters({...filters, priceRange: value})}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Price" />
                  </SelectTrigger>
                  <SelectContent className="bg-background">
                    {priceRangeOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={filters.propertyType} onValueChange={(value) => setFilters({...filters, propertyType: value})}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent className="bg-background">
                    {propertyTypeOptions.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={filters.bedrooms} onValueChange={(value) => setFilters({...filters, bedrooms: value})}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Beds" />
                  </SelectTrigger>
                  <SelectContent className="bg-background">
                    {bedroomOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value.toString()}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={filters.bathrooms} onValueChange={(value) => setFilters({...filters, bathrooms: value})}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Baths" />
                  </SelectTrigger>
                  <SelectContent className="bg-background">
                    {bathroomOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value.toString()}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button variant="outline" onClick={clearFilters} className="h-10">
                  Clear
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{filteredProperties.length}</span> properties
              </p>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] h-10">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-background">
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="location">Location</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Properties Grid */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            {filteredProperties.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-lg text-muted-foreground">No properties match your filters.</p>
                <Button variant="outline" onClick={clearFilters} className="mt-4">
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProperties.map((p) => (
                  <div 
                    key={p.id} 
                    className="group rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300 bg-card cursor-pointer"
                    onClick={() => navigate(`/properties/${p.slug}`)}
                  >
                    <div className="relative overflow-hidden" style={{ aspectRatio: '3 / 2' }}>
                      <img 
                        src={p.image} 
                        alt={p.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      {p.status === "For Sale" && (
                        <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                          FOR SALE
                        </div>
                      )}
                    </div>
                    <div className="p-5 space-y-3">
                      <h3 className="font-bold text-xl text-card-foreground line-clamp-1">
                        {p.name}
                      </h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <MapPin className="w-4 h-4 flex-shrink-0" />
                        <span className="line-clamp-1">{p.location}</span>
                      </p>
                      <p className="text-base font-semibold text-primary">
                        {p.price}
                      </p>
                      <Button className="w-full mt-3" size="sm">
                        View Details
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Properties;
