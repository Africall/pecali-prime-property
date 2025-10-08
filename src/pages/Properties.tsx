import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LogoRain from "@/components/LogoRain";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Building2, TrendingUp, Shield, Users, Star, MapPin, ArrowRight } from "lucide-react";
import elitzBathroom from "@/assets/elitz-bathroom.jpg";
import elitzLounge from "@/assets/elitz-lounge.jpg";
import elitzBedroom from "@/assets/elitz-bedroom.jpg";
import elitzDining from "@/assets/elitz-dining.jpg";
import elitzOpenPlan from "@/assets/elitz-openplan.jpg";
import elitzKitchen from "@/assets/elitz-kitchen.jpg";
import elitzPromo from "@/assets/elitz-promo.png";

const Properties = () => {
  const propertiesForSale = [
    {
      id: "1",
      title: "Elitz Residency - Master Bedroom Suite",
      location: "South C, Rumi Road, Nairobi",
      price: "30% on Booking, 70% on Installment, 0% Interest",
      type: "Apartment",
      bedrooms: 3,
      bathrooms: 2,
      area: "3BR+DSQ",
      image: elitzBedroom,
      featured: true,
      status: "For Sale" as const,
      description: "Luxurious master bedroom with contemporary design, 3-year payment plan available"
    },
    {
      id: "2",
      title: "Elitz Residency - Open-Plan Living",
      location: "South C, Rumi Road, Nairobi",
      price: "30% on Booking, 70% on Installment, 0% Interest",
      type: "Apartment",
      bedrooms: 4,
      bathrooms: 3,
      area: "4BR Unit",
      image: elitzOpenPlan,
      featured: true,
      status: "For Sale" as const,
      description: "Spacious open-plan lounge and dining area with modern finishes, 3-year payment plan"
    },
    {
      id: "3",
      title: "Elitz Residency - Designer Lounge",
      location: "South C, Rumi Road, Nairobi",
      price: "30% on Booking, 70% on Installment, 0% Interest",
      type: "Apartment",
      bedrooms: 3,
      bathrooms: 2,
      area: "3BR+DSQ Unit B",
      image: elitzLounge,
      status: "For Sale" as const,
      description: "Elegant living space with premium fixtures and city views, flexible payment terms"
    },
    {
      id: "4",
      title: "Elitz Residency - Modern Kitchen",
      location: "South C, Rumi Road, Nairobi",
      price: "30% on Booking, 70% on Installment, 0% Interest",
      type: "Apartment",
      bedrooms: 3,
      bathrooms: 2,
      area: "3BR+DSQ",
      image: elitzKitchen,
      status: "For Sale" as const,
      description: "Contemporary kitchen with marble countertops and high-end appliances"
    },
    {
      id: "5",
      title: "Elitz Residency - Dining Area",
      location: "South C, Rumi Road, Nairobi",
      price: "30% on Booking, 70% on Installment, 0% Interest",
      type: "Apartment",
      bedrooms: 4,
      bathrooms: 3,
      area: "4BR Unit",
      image: elitzDining,
      status: "For Sale" as const,
      description: "Sophisticated dining space perfect for entertaining, zero-interest payment plan"
    },
    {
      id: "6",
      title: "Elitz Residency - Luxury Bathroom",
      location: "South C, Rumi Road, Nairobi",
      price: "30% on Booking, 70% on Installment, 0% Interest",
      type: "Apartment",
      bedrooms: 3,
      bathrooms: 2,
      area: "3BR+DSQ",
      image: elitzBathroom,
      status: "For Sale" as const,
      description: "Premium bathroom with marble finishes and walk-in shower, 3-year payment plan"
    }
  ];

  const propertiesForRent = [
    {
      id: "4",
      title: "Modern Studio Apartment",
      location: "Westlands, Nairobi",
      price: "KSH 65K/month",
      type: "Studio",
      bedrooms: 1,
      bathrooms: 1,
      area: "450 sq ft",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
      status: "For Rent" as const,
      description: "Fully furnished with natural light and minimal décor"
    },
    {
      id: "5",
      title: "Family Apartment",
      location: "Parklands, Nairobi",
      price: "KSH 120K/month",
      type: "Apartment",
      bedrooms: 3,
      bathrooms: 2,
      area: "1,200 sq ft",
      image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
      status: "For Rent" as const,
      description: "Perfect for families with secure neighborhood"
    }
  ];

  const saleFeatures = [
    {
      icon: Building2,
      title: "Direct Developer Access",
      description: "We work directly with premium developers - exciting projects coming soon"
    },
    {
      icon: TrendingUp,
      title: "High ROI Potential",
      description: "Properties in high-demand urban centers with strong rental yields"
    },
    {
      icon: Shield,
      title: "Flexible Payment Plans",
      description: "Buyer-friendly installment options with 12–24 month schedules"
    }
  ];

  const rentalFeatures = [
    {
      icon: Shield,
      title: "Verified Properties Only",
      description: "No scams, no middlemen - all properties are verified"
    },
    {
      icon: Users,
      title: "Flexible Lease Terms",
      description: "Short-term & long-term options with furnished choices"
    },
    {
      icon: MapPin,
      title: "Prime Locations",
      description: "Close proximity to schools, malls, hospitals, and transport hubs"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <LogoRain />
      <Navbar />
      
      <main className="pt-nav relative z-10">
        {/* Hero Section */}
        <section className="scroll-offset pt-10 pb-8 bg-gradient-to-b from-primary to-primary/90 text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h1 className="scroll-offset text-5xl md:text-6xl font-bold mb-6">
              Find Your Perfect Space
            </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-4xl mx-auto">
            Premium Lifestyle Apartments and Premier Nairobi Properties Coming Soon
          </p>
          <p className="text-lg text-primary-foreground/80 max-w-3xl mx-auto leading-relaxed">
            At PECALI Real Estate, we showcase a handpicked collection of apartments, homes, and investment-ready properties 
            in Kenya's most promising locations. We specialize in connecting clients to premium lifestyle developments 
            known for quality finishes, strategic locations, and unmatched value. Exciting projects launching soon!
          </p>
        </div>
      </section>

      {/* Properties for Sale */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-gold text-foreground">Properties for Sale</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Investment-Ready Properties
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Premium development projects launching soon with flexible payment plans, 
              direct developer access, and ideal ROI potential.
            </p>
          </div>

          {/* Sale Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {saleFeatures.map((feature, index) => (
              <Card key={feature.title} className="text-center group hover:shadow-luxury transition-all duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-card-foreground mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sale Properties Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {propertiesForSale.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* Properties for Rent */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary">Properties for Rent</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Modern Rental Solutions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Modern, secure apartments in well-connected neighborhoods with flexible leases 
              for students, professionals, and families.
            </p>
          </div>

          {/* Rental Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {rentalFeatures.map((feature, index) => (
              <Card key={feature.title} className="text-center group hover:shadow-luxury transition-all duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-card-foreground mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Rental Properties Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {propertiesForRent.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent">Featured Listings</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Premium Properties
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Premium apartment units, skyline residences, and urban condos - exciting projects coming soon.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {propertiesForSale.filter(p => p.featured).map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          <div className="text-center">
            <Button className="bg-gradient-primary hover:bg-gradient-luxury shadow-gold text-lg px-8 py-6">
              Start your property search today. Your perfect space awaits.
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
};

export default Properties;