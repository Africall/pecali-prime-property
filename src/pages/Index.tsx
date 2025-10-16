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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { TrendingUp, Shield, Users, Award, ArrowRight, Star, CheckCircle, Quote, Eye, Phone } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
import { resolvePdfUrl } from '@/lib/storage';
const Index = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState<any[]>([]);
  const [contactOpen, setContactOpen] = useState(false);
  const [contactSlug, setContactSlug] = useState<string | undefined>(undefined);
  const [serviceDialogOpen, setServiceDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);

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
  const serviceDetails: Record<string, { heading: string; content: string }> = {
    "Property Sales & Leasing": {
      heading: "Unlock Your Dream Property with Confidence",
      content: "At PECALI, we bridge the gap between your property aspirations and reality. Our extensive portfolio features exclusive developer partnerships, giving you first access to off-plan projects with attractive pre-launch pricing. We meticulously verify every resale unit, conducting thorough due diligence on titles, land rates, and legal documentation to protect your investment.\n\nWhether you're seeking a starter apartment in Embakasi, a luxury penthouse in Kilimani, or a commercial space in Westlands, our team provides personalized property matching based on your budget, lifestyle, and growth projections. We negotiate favorable terms on your behalf, handle all paperwork, and ensure smooth handover—making property acquisition effortless from search to keys in hand."
    },
    "Property Management": {
      heading: "Maximize Returns, Minimize Hassles",
      content: "Property ownership should build wealth, not stress. Our comprehensive management service transforms your real estate into a truly passive income stream. We handle everything: marketing vacancies across multiple platforms, conducting rigorous tenant background checks, drafting ironclad lease agreements, and ensuring timely rent collection with automated reminders and follow-ups.\n\nBeyond finances, we maintain your property's value through regular inspections, coordinated repairs with vetted contractors, and proactive maintenance scheduling. Our detailed monthly reports keep you informed of your property's performance, occupancy rates, and financial health. Whether you're in Nairobi or the diaspora, you'll have complete peace of mind knowing your investment is professionally managed and continuously appreciating."
    },
    "Investment Advisory": {
      heading: "Data-Driven Strategies for Wealth Creation",
      content: "Real estate investment requires more than capital—it demands insight. Our advisory service combines deep market intelligence with personalized financial planning to identify high-growth opportunities aligned with your goals. We analyze emerging neighborhoods, infrastructure developments, and demographic trends to pinpoint properties with superior appreciation potential.\n\nFor diaspora investors, we specialize in navigating Kenya's property landscape remotely, offering virtual tours, secure payment facilitation, and trustworthy ground representation. We calculate projected ROI, rental yields, and exit strategies for every recommendation, ensuring your capital works harder. From portfolio diversification to tax-efficient structuring, we provide the strategic framework that transforms property from expense into empire."
    }
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

  const handleLearnMore = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    setServiceDialogOpen(true);
  };
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
                <div className="relative overflow-hidden bg-muted" style={{ aspectRatio: '3 / 2' }}>
                  <iframe
                    src={`${p.pdfUrl}#page=${p.cover_page ?? 1}&toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                    className="absolute inset-0 w-full h-full pointer-events-none"
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

      <Dialog open={serviceDialogOpen} onOpenChange={setServiceDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-primary mb-2">
              {selectedService}
            </DialogTitle>
          </DialogHeader>
          {selectedService && serviceDetails[selectedService] && (
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-foreground">
                {serviceDetails[selectedService].heading}
              </h3>
              <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {serviceDetails[selectedService].content}
              </div>
              <div className="pt-4">
                <Button 
                  onClick={() => {
                    setServiceDialogOpen(false);
                    navigate('/contact');
                  }}
                  className="w-full"
                >
                  Get in Touch
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

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

                <Button 
                  variant="ghost" 
                  className="mt-6 p-0 h-auto text-primary hover:text-accent"
                  onClick={() => handleLearnMore(service.title)}
                >
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
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                    loading="lazy"
                    decoding="async"
                  />
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