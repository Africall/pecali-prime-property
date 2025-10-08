import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LogoRain from "@/components/LogoRain";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Shield, Users, TrendingUp, FileText, Scale, CheckCircle, ArrowRight, Handshake, Calculator } from "lucide-react";

const Services = () => {
  const coreServices = [
    {
      icon: Building2,
      title: "Property Sales & Leasing",
      description: "Market positioning, advertising, and closing deals efficiently with fast leasing services to secure reliable tenants.",
      features: [
        "Direct access to developer listings",
        "Verified resale units",
        "Fast leasing services",
        "Market positioning strategies"
      ]
    },
    {
      icon: Shield,
      title: "Property Management",
      description: "Rent collection, maintenance, occupancy optimization. End-to-end management for landlords locally and abroad.",
      features: [
        "Rent collection & financial reporting",
        "Tenant screening & acquisition",
        "Repairs and preventive maintenance",
        "Occupancy rate optimization"
      ]
    },
    {
      icon: Users,
      title: "Real Estate Consulting",
      description: "One-on-one sessions for buyers, sellers, and developers with personalized advice and market insights.",
      features: [
        "First-time homebuyer guidance",
        "Investment strategy formulation",
        "Market positioning for developers",
        "Personalized advisory sessions"
      ]
    },
    {
      icon: TrendingUp,
      title: "Investment Advisory",
      description: "Access to exclusive off-plan opportunities with ROI forecasting and portfolio diversification strategies.",
      features: [
        "Exclusive off-plan access",
        "ROI forecasting",
        "Portfolio diversification",
        "Custom investment strategies"
      ]
    },
    {
      icon: Calculator,
      title: "Property Valuation",
      description: "Accurate, market-driven valuations for sales pricing, rental rate setting, and mortgage financing.",
      features: [
        "Sales pricing assessments",
        "Rental rate optimization",
        "Mortgage financing support",
        "Market-accurate valuations"
      ]
    },
    {
      icon: FileText,
      title: "Legal Documentation",
      description: "We work with trusted conveyancing lawyers to ensure clean property titles and valid contracts.",
      features: [
        "Title deed verification",
        "Tenancy agreements",
        "Contract compliance",
        "Legal framework guidance"
      ]
    }
  ];

  const whyChooseUs = [
    {
      icon: Handshake,
      title: "Full-Spectrum Solutions",
      description: "We are more than a property listing agency — PECALI Real Estate is your complete property partner."
    },
    {
      icon: Shield,
      title: "Trusted Expertise",
      description: "From purchase to management, from valuation to legal documentation — we handle it all."
    },
    {
      icon: TrendingUp,
      title: "Proven Results",
      description: "Our track record speaks for itself with successful deals and satisfied clients across Kenya."
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
              Full-Spectrum Real Estate Solutions
            </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-4xl mx-auto">
            For Buyers, Investors, and Developers
          </p>
          <p className="text-lg text-primary-foreground/80 max-w-3xl mx-auto leading-relaxed">
            We are more than a property listing agency — PECALI Real Estate is your complete property partner, 
            from purchase to management, from valuation to legal documentation.
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent">Why Choose PECALI</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Your Complete Property Partner
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => (
              <Card key={item.title} className="text-center group hover:shadow-luxury transition-all duration-300">
                <CardContent className="p-8">
                  <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="h-10 w-10 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-card-foreground mb-4">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-gold text-foreground">Our Core Services</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Excellence in Every Service
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive real estate solutions designed to exceed your expectations at every step.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreServices.map((service, index) => (
              <Card key={service.title} className="group hover:shadow-luxury transition-all duration-300 animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  
                  <h3 className="text-2xl font-semibold text-card-foreground mb-4">
                    {service.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-3 mb-6">
                    {service.features.map(feature => (
                      <li key={feature} className="flex items-start text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-accent mr-3 flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button variant="ghost" className="p-0 h-auto text-primary hover:text-accent">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Highlights */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-dark text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What Sets Us Apart
            </h2>
            <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto">
              Specialized expertise in premium lifestyle projects with a proven track record of success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "500+", label: "Properties Managed" },
              { number: "200+", label: "Successful Sales" },
              { number: "98%", label: "Client Satisfaction" },
              { number: "5+", label: "Years Experience" }
            ].map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">
                  {stat.number}
                </div>
                <div className="text-primary-foreground/80">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let our expert team provide you with personalized real estate solutions tailored to your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-gradient-primary hover:bg-gradient-luxury shadow-gold text-lg px-8 py-6">
              Consult with Experts
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg px-8 py-6">
              View Our Properties
            </Button>
          </div>
        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
};

export default Services;