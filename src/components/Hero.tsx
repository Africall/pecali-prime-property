import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Home, BedDouble, Bath } from "lucide-react";
import heroImage from "@/assets/hero-luxury-properties.jpg";

const Hero = () => {
  const [searchData, setSearchData] = useState({
    location: "",
    priceRange: "",
    propertyType: "",
    bedrooms: "",
    bathrooms: "",
  });

  const handleSearch = () => {
    console.log("Search data:", searchData);
    // Navigate to properties page with filters
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Luxury Properties"
          className="w-full h-full object-cover"
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
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Location (e.g., Nairobi, Mombasa)"
                  value={searchData.location}
                  onChange={(e) => setSearchData({ ...searchData, location: e.target.value })}
                  className="pl-10 h-12 border-2 focus:border-primary"
                />
              </div>

              {/* Price Range */}
              <Select value={searchData.priceRange} onValueChange={(value) => setSearchData({ ...searchData, priceRange: value })}>
                <SelectTrigger className="h-12 border-2 focus:border-primary">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-5m">Under 5M KES</SelectItem>
                  <SelectItem value="5m-10m">5M - 10M KES</SelectItem>
                  <SelectItem value="10m-20m">10M - 20M KES</SelectItem>
                  <SelectItem value="20m-50m">20M - 50M KES</SelectItem>
                  <SelectItem value="50m+">50M+ KES</SelectItem>
                </SelectContent>
              </Select>

              {/* Property Type */}
              <Select value={searchData.propertyType} onValueChange={(value) => setSearchData({ ...searchData, propertyType: value })}>
                <SelectTrigger className="h-12 border-2 focus:border-primary">
                  <Home className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="land">Land</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                </SelectContent>
              </Select>

              {/* Bedrooms */}
              <Select value={searchData.bedrooms} onValueChange={(value) => setSearchData({ ...searchData, bedrooms: value })}>
                <SelectTrigger className="h-12 border-2 focus:border-primary">
                  <BedDouble className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Bedrooms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Bedroom</SelectItem>
                  <SelectItem value="2">2 Bedrooms</SelectItem>
                  <SelectItem value="3">3 Bedrooms</SelectItem>
                  <SelectItem value="4">4 Bedrooms</SelectItem>
                  <SelectItem value="5+">5+ Bedrooms</SelectItem>
                </SelectContent>
              </Select>

              {/* Bathrooms */}
              <Select value={searchData.bathrooms} onValueChange={(value) => setSearchData({ ...searchData, bathrooms: value })}>
                <SelectTrigger className="h-12 border-2 focus:border-primary">
                  <Bath className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Bathrooms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Bathroom</SelectItem>
                  <SelectItem value="2">2 Bathrooms</SelectItem>
                  <SelectItem value="3">3 Bathrooms</SelectItem>
                  <SelectItem value="4">4 Bathrooms</SelectItem>
                  <SelectItem value="5+">5+ Bathrooms</SelectItem>
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

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 animate-slide-up" style={{ animationDelay: "0.6s" }}>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent">11</div>
              <div className="text-white/80">Properties Listed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent">100+</div>
              <div className="text-white/80">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent">2</div>
              <div className="text-white/80">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent">14</div>
              <div className="text-white/80">Areas Covered</div>
            </div>
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