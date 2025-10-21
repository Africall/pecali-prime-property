import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LogoRain from "@/components/LogoRain";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, ArrowRight, SlidersHorizontal } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Property {
  id: string;
  slug: string;
  title: string;
  location: string;
  price_label: string;
  meta: {
    description?: string;
    property_type?: string;
    bedrooms?: string;
    bathrooms?: string;
    gallery?: string[];
  };
}

const Properties = () => {
  const [searchParams] = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [sortBy, setSortBy] = useState<string>("newest");
  const [filters, setFilters] = useState({
    location: searchParams.get("location") || "",
    propertyType: searchParams.get("propertyType") || "",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch properties from database
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setProperties((data || []) as Property[]);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProperties();
  }, []);

  // Filter and sort properties
  useEffect(() => {
    let result = [...properties];

    // Apply filters
    if (filters.location) {
      result = result.filter(p => p.location.toLowerCase().includes(filters.location.toLowerCase()));
    }

    if (filters.propertyType) {
      result = result.filter(p => p.meta?.property_type === filters.propertyType);
    }

    // Apply sorting
    if (sortBy === "location") {
      result.sort((a, b) => a.location.localeCompare(b.location));
    }

    setFilteredProperties(result);
  }, [properties, filters, sortBy]);

  const clearFilters = () => {
    setFilters({
      location: "",
      propertyType: "",
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
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full md:w-auto">
                <Select value={filters.location} onValueChange={(value) => setFilters({...filters, location: value})}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent className="bg-background">
                    <SelectItem value="Nairobi">Nairobi</SelectItem>
                    <SelectItem value="Kileleshwa">Kileleshwa</SelectItem>
                    <SelectItem value="South C">South C</SelectItem>
                    <SelectItem value="Syokimau">Syokimau</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filters.propertyType} onValueChange={(value) => setFilters({...filters, propertyType: value})}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent className="bg-background">
                    <SelectItem value="Apartment">Apartment</SelectItem>
                    <SelectItem value="Villa">Villa</SelectItem>
                    <SelectItem value="Penthouse">Penthouse</SelectItem>
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
            {loading ? (
              <div className="text-center py-20">
                <p className="text-lg text-muted-foreground">Loading properties...</p>
              </div>
            ) : filteredProperties.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-lg text-muted-foreground">No properties match your filters.</p>
                <Button variant="outline" onClick={clearFilters} className="mt-4">
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProperties.map((p) => {
                  const coverImage = p.meta?.gallery?.[0] || '/properties/placeholder.jpg';
                  return (
                    <div 
                      key={p.id} 
                      className="group rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300 bg-card cursor-pointer"
                      onClick={() => navigate(`/properties/${p.slug}`)}
                    >
                      <div className="relative overflow-hidden" style={{ aspectRatio: '3 / 2' }}>
                        <img 
                          src={coverImage} 
                          alt={p.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                          FOR SALE
                        </div>
                      </div>
                      <div className="p-5 space-y-3">
                        <h3 className="font-bold text-xl text-card-foreground line-clamp-1">
                          {p.title}
                        </h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          <MapPin className="w-4 h-4 flex-shrink-0" />
                          <span className="line-clamp-1">{p.location}</span>
                        </p>
                        <p className="text-base font-semibold text-primary">
                          {p.price_label}
                        </p>
                        <Button className="w-full mt-3" size="sm">
                          View Details
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
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
