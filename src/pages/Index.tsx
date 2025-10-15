import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import LogoRain from "@/components/LogoRain";
import IntroSection from "@/components/IntroSection";
import ContactModal from "@/components/ContactModal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Shield, Users, Award, ArrowRight, Star, CheckCircle, Quote, Eye, Phone } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
import { resolvePdfUrl } from '@/lib/storage';
const Index = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState<any[]>([]);
  const [contactOpen, setContactOpen] = useState(false);
  const [contactSlug, setContactSlug] = useState<string | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const slugs = ['elitz-residency', 'azure-sky-park', 'mango-tree'];
      const { data } = await supabase
        .from('properties')
        .select('slug, title, location, price_label, pdf_path, cover_page')
        .in('slug', slugs);

      if (data && data.length > 0) {
        const out: any[] = [];
        for (const prop of data) {
          const pdfUrl = await resolvePdfUrl(prop.pdf_path);
          out.push({ ...prop, pdfUrl });
        }
        setProperties(out);
      }
    })();
  }, []);

  const handleView = (slug: string) => navigate(`/properties/${slug}`);
  
  const openEnquiry = (slug: string) => {
    setContactSlug(slug);
    setContactOpen(true);
  };
  const services = [{
    icon: TrendingUp,
    title: "Property Sales & Leasing",
    description: "Direct access to developer listings and verified resale units with proven ROI potential.",
    features: ["Premium Projects Coming Soon", "Developer Direct Access", "Verified Resale Units"]
  }, {
    icon: Shield,
    title: "Property Management",
    description: "Comprehensive tenant, maintenance, and revenue management for stress-free ownership.",
    features: ["Rent Collection", "Tenant Screening", "Maintenance & Repairs"]
  }, {
    icon: Users,
    title: "Investment Advisory",
    description: "Strategic guidance to maximize property returns for local and diaspora investors.",
    features: ["Market Analysis", "ROI Optimization", "Risk Assessment"]
  }];
  const testimonials = [{
    name: "Sarah Mwangi",
    role: "Property Investor",
    content: "PECALI helped me find the perfect investment property in Nairobi. Their expertise and professionalism are unmatched.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
  }, {
    name: "David Ochieng",
    role: "First-time Home Buyer",
    content: "As a first-time buyer, PECALI made the process seamless. They guided me every step of the way.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
  }, {
    name: "Grace Wanjiku",
    role: "Real Estate Student",
    content: "The training program at PECALI transformed my career. I'm now a successful real estate agent.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
  }];
  return <div className="min-h-screen bg-background">
      <LogoRain />
      <Navbar />
      
      <main className="pt-nav relative z-10">
        <Hero />
        <IntroSection />

      {/* Featured Properties Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <Badge className="mb-4 bg-gradient-gold text-foreground">Featured Properties</Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Premium Properties
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Explore our handpicked collection of premium developments
              </p>
            </div>
            <Button 
              onClick={() => navigate('/properties')}
              variant="outline"
              className="hidden md:flex items-center gap-2"
            >
              View all properties
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {properties.map((p) => (
              <div 
                key={p.slug} 
                className="group rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300 bg-card"
              >
                <div className="relative h-72 overflow-hidden bg-muted">
                  <iframe
                    src={`${p.pdfUrl}#page=${p.cover_page ?? 1}&toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                    className="absolute inset-0 w-full h-full scale-110 pointer-events-none"
                    title={p.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
                </div>
                <div className="p-5 space-y-3">
                  <h3 className="font-bold text-lg text-card-foreground line-clamp-1">
                    {p.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {p.location}
                  </p>
                  <p className="text-base font-semibold text-primary">
                    {p.price_label}
                  </p>
                  <div className="flex gap-2 pt-2">
                    <Button
                      onClick={() => handleView(p.slug)}
                      className="flex-1"
                      size="sm"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Property
                    </Button>
                    <Button
                      onClick={() => openEnquiry(p.slug)}
                      variant="outline"
                      className="flex-1"
                      size="sm"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Enquire
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center md:hidden">
            <Button 
              onClick={() => navigate('/properties')}
              variant="outline"
              className="w-full"
            >
              View all properties
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <ContactModal
        open={contactOpen}
        setOpen={setContactOpen}
        source="home_card"
        propertySlug={contactSlug}
        defaultMessage={contactSlug ? `I'm interested in ${contactSlug}.` : ''}
        phoneFallback="+254712345678"
      />

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary">Our Services</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Excellence in Real Estate
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive real estate solutions tailored to your unique needs and aspirations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => <div key={service.title} className="group p-8 rounded-xl bg-card hover:bg-card-hover border border-border hover:shadow-card transition-all duration-300 animate-slide-up" style={{
            animationDelay: `${index * 0.2}s`
          }}>
                <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mb-6 group-hover:shadow-luxury transition-all duration-300">
                  <service.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                
                <h3 className="text-2xl font-semibold text-card-foreground mb-4">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>

                <ul className="space-y-2">
                  {service.features.map(feature => <li key={feature} className="flex items-center text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-accent mr-2 flex-shrink-0" />
                      {feature}
                    </li>)}
                </ul>

                <Button variant="ghost" className="mt-6 p-0 h-auto text-primary hover:text-accent">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>)}
          </div>
        </div>
      </section>

      {/* Why Choose PECALI */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-dark text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose PECALI?
            </h2>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              We're not just a real estate company - we're your partners in building wealth and achieving dreams
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[{
            icon: Award,
            title: "Expert Team",
            description: "Certified professionals with years of experience"
          }, {
            icon: Shield,
            title: "Trusted Service",
            description: "Transparent and reliable real estate solutions"
          }, {
            icon: TrendingUp,
            title: "Market Leaders",
            description: "Deep understanding of Kenyan real estate market"
          }, {
            icon: Users,
            title: "Client-Focused",
            description: "Personalized service tailored to your needs"
          }].map((benefit, index) => <div key={benefit.title} className="text-center group">
                <div className="w-20 h-20 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="h-10 w-10 text-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-primary-foreground/80">{benefit.description}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent">Client Stories</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              What Our Clients Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real stories from real people who found their dream properties with PECALI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => <div key={testimonial.name} className="bg-card rounded-xl p-8 shadow-card hover:shadow-luxury transition-all duration-300 animate-scale-in" style={{
            animationDelay: `${index * 0.2}s`
          }}>
                <Quote className="h-8 w-8 text-accent mb-4" />
                
                <p className="text-card-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="h-4 w-4 text-accent fill-current" />)}
                </div>

                <div className="flex items-center">
                  
                  <div>
                    <h4 className="font-semibold text-card-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>)}
          </div>
        </div>
      </section>

      </main>

      <Footer />
    </div>;
};
export default Index;