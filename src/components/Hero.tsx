import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Home, BedDouble, Bath } from "lucide-react";
import heroImage from "@/assets/hero-luxury-properties.jpg";
import { locationOptions, priceRangeOptions, propertyTypeOptions, bedroomOptions, bathroomOptions } from "@/data/properties";

const Hero = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    location: "",
    priceRange: "",
    propertyType: "",
    bedrooms: "",
    bathrooms: "",
  });

  const handleSearch = () => {
    const params = new URLSearchParams();
    Object.entries(searchData).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Luxury Properties"
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 via-primary/70 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-24">
        <div className="max-w-4xl mx-auto text-center text-white">
          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 animate-slide-up leading-tight">
            <span className="block">Discover Modern Living</span>
            <span className="bg-gradient-gold bg-clip-text text-transparent block"> at Its Best </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            Your Gateway to Premium Properties and Investment Opportunities
          </p>

          {/* Search Bar */}
          <div className="bg-white/95 backdrop-blur-md rounded-xl p-6 shadow-luxury animate-scale-in" style={{ animationDelay: "0.4s" }}>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
              {/* Location */}
              <Select value={searchData.location} onValueChange={(value) => setSearchData({ ...searchData, location: value })}>
                <SelectTrigger className="h-12 border-2 focus:border-primary text-foreground">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <SelectValue placeholder="Location" className="text-foreground" />
                </SelectTrigger>
                <SelectContent className="bg-background">
                  {locationOptions.map((loc) => (
                    <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Price Range */}
              <Select value={searchData.priceRange} onValueChange={(value) => setSearchData({ ...searchData, priceRange: value })}>
                <SelectTrigger className="h-12 border-2 focus:border-primary text-foreground">
                  <SelectValue placeholder="Price Range" className="text-foreground" />
                </SelectTrigger>
                <SelectContent className="bg-background">
                  {priceRangeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Property Type */}
              <Select value={searchData.propertyType} onValueChange={(value) => setSearchData({ ...searchData, propertyType: value })}>
                <SelectTrigger className="h-12 border-2 focus:border-primary text-foreground">
                  <Home className="h-4 w-4 mr-2 text-muted-foreground" />
                  <SelectValue placeholder="Property Type" className="text-foreground" />
                </SelectTrigger>
                <SelectContent className="bg-background">
                  {propertyTypeOptions.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Bedrooms */}
              <Select value={searchData.bedrooms} onValueChange={(value) => setSearchData({ ...searchData, bedrooms: value })}>
                <SelectTrigger className="h-12 border-2 focus:border-primary text-foreground">
                  <BedDouble className="h-4 w-4 mr-2 text-muted-foreground" />
                  <SelectValue placeholder="Bedrooms" className="text-foreground" />
                </SelectTrigger>
                <SelectContent className="bg-background">
                  {bedroomOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value.toString()}>{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Bathrooms */}
              <Select value={searchData.bathrooms} onValueChange={(value) => setSearchData({ ...searchData, bathrooms: value })}>
                <SelectTrigger className="h-12 border-2 focus:border-primary text-foreground">
                  <Bath className="h-4 w-4 mr-2 text-muted-foreground" />
                  <SelectValue placeholder="Bathrooms" className="text-foreground" />
                </SelectTrigger>
                <SelectContent className="bg-background">
                  {bathroomOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value.toString()}>{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Search Button */}
            <Button 
              onClick={handleSearch}
              className="w-full h-14 bg-gradient-primary hover:bg-gradient-luxury text-lg font-semibold shadow-gold text-foreground"
            >
              <Search className="h-5 w-5 mr-2 text-foreground" />
              Find Your Dream Home
            </Button>
          </div>

        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute bottom-10 left-10 w-20 h-20 bg-accent/20 rounded-full animate-float hidden lg:block"></div>
      <div className="absolute top-1/3 right-20 w-16 h-16 bg-primary/20 rounded-full animate-float hidden lg:block" style={{ animationDelay: "1s" }}></div>
    </section>
  );
};

export default Hero;