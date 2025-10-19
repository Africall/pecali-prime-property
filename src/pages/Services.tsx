import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LogoRain from "@/components/LogoRain";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Shield, Users, TrendingUp, FileText, Scale, CheckCircle, ArrowRight, Handshake, Calculator } from "lucide-react";
import { AppointmentBookingModal } from "@/components/AppointmentBookingModal";

const Services = () => {
  const [activeService, setActiveService] = useState("sales");
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [appointmentSource, setAppointmentSource] = useState("");
  const [appointmentServiceType, setAppointmentServiceType] = useState("");

  const openAppointment = (source: string, serviceType: string) => {
    setAppointmentSource(source);
    setAppointmentServiceType(serviceType);
    setAppointmentOpen(true);
  };

  const serviceNavItems = [
    { id: "sales", label: "Property Sales & Leasing" },
    { id: "management", label: "Property Management" },
    { id: "consulting", label: "Real Estate Consulting" },
    { id: "advisory", label: "Investment Advisory" },
    { id: "valuation", label: "Property Valuation" },
    { id: "legal", label: "Legal Documentation" }
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
        {/* Service Navigation */}
        <section className="sticky top-[var(--nav-h)] z-40 bg-primary/95 backdrop-blur-sm border-b border-primary-foreground/10">
          <div className="container mx-auto px-4">
            <div className="flex overflow-x-auto gap-2 py-3 scrollbar-hide">
              {serviceNavItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeService === item.id ? "secondary" : "ghost"}
                  onClick={() => {
                    setActiveService(item.id);
                    const element = document.getElementById(item.id);
                    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className={`whitespace-nowrap transition-all ${
                    activeService === item.id 
                      ? "bg-secondary text-secondary-foreground" 
                      : "text-primary-foreground hover:bg-primary-foreground/10"
                  }`}
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Property Sales & Leasing */}
        <section id="sales" className="scroll-offset py-16 bg-gradient-to-b from-primary to-primary/90 text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Property Sales & Leasing</h1>
              <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
                Your gateway to finding the perfect property in Kenya. Whether buying, selling, or leasing, we make real estate transactions seamless and rewarding.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-foreground mb-8 border-l-4 border-accent pl-4">
              Comprehensive Sales & Leasing Solutions
            </h2>

            <div className="mb-12">
              <h3 className="text-2xl font-semibold text-accent mb-4">Our Sales Services</h3>
              <p className="text-muted-foreground mb-6 text-lg">
                At PECALI Real Estate, we understand that buying or selling property is one of the most significant decisions you'll make. Our experienced team provides end-to-end support to ensure smooth, transparent, and profitable transactions.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {[
                  { title: "Residential Properties", desc: "Find your dream home from our curated selection of apartments, villas, townhouses, and standalone houses across Nairobi and beyond." },
                  { title: "Commercial Properties", desc: "Discover prime office spaces, retail units, warehouses, and mixed-use developments in strategic business locations." },
                  { title: "Land & Plots", desc: "Invest in raw land, serviced plots, and development opportunities in growing neighborhoods with high appreciation potential." },
                  { title: "Luxury Real Estate", desc: "Access exclusive high-end properties with premium amenities, exceptional designs, and prestigious addresses." }
                ].map((item) => (
                  <Card key={item.title} className="hover:shadow-luxury transition-all">
                    <CardContent className="p-6">
                      <h4 className="text-xl font-semibold text-card-foreground mb-2">{item.title}</h4>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-2xl font-semibold text-accent mb-4">Professional Leasing Services</h3>
              <p className="text-muted-foreground mb-6 text-lg">
                Whether you're a landlord seeking reliable tenants or a tenant searching for the perfect rental, our leasing services bridge the gap efficiently.
              </p>

              <ul className="space-y-3">
                {[
                  "Tenant screening and verification processes",
                  "Competitive market rate analysis",
                  "Lease agreement preparation and negotiation",
                  "Property marketing and advertising",
                  "Virtual and physical property tours",
                  "Move-in coordination and support"
                ].map((benefit) => (
                  <li key={benefit} className="flex items-start bg-secondary/20 p-4 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-8 rounded-lg text-center">
              <h3 className="text-2xl font-bold mb-3">Ready to Buy, Sell, or Lease?</h3>
              <p className="mb-6">Let's find your perfect property match today</p>
              <Button 
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                onClick={() => openAppointment("sales_team", "Property Sales & Leasing Inquiry")}
              >
                Contact Our Sales Team
              </Button>
            </div>
          </div>
        </section>

        {/* Property Management */}
        <section id="management" className="scroll-offset py-16 bg-gradient-to-b from-primary to-primary/90 text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Property Management</h1>
              <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
                Professional property management services that maximize your investment returns while ensuring tenant satisfaction and property maintenance.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-foreground mb-8 border-l-4 border-accent pl-4">
              Comprehensive Property Management Solutions
            </h2>

            <div className="mb-12">
              <h3 className="text-2xl font-semibold text-accent mb-4">Full-Service Property Management</h3>
              <p className="text-muted-foreground mb-6 text-lg">
                Managing property can be time-consuming and complex. PECALI takes the burden off your shoulders, handling every aspect of property management with professionalism and care.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {[
                  { title: "Tenant Management", desc: "Complete tenant lifecycle management including screening, onboarding, communication, and conflict resolution." },
                  { title: "Rent Collection", desc: "Timely rent collection with automated reminders, multiple payment options, and detailed financial reporting." },
                  { title: "Maintenance & Repairs", desc: "24/7 emergency response, scheduled maintenance, quality contractor network, and regular property inspections." },
                  { title: "Financial Management", desc: "Monthly statements, expense tracking, budget planning, and tax documentation support." }
                ].map((item) => (
                  <Card key={item.title} className="hover:shadow-luxury transition-all">
                    <CardContent className="p-6">
                      <h4 className="text-xl font-semibold text-card-foreground mb-2">{item.title}</h4>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-8 rounded-lg text-center">
              <h3 className="text-2xl font-bold mb-3">Let Us Manage Your Property</h3>
              <p className="mb-6">Experience stress-free property ownership with professional management</p>
              <Button 
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                onClick={() => openAppointment("management_quote", "Property Management Quote Request")}
              >
                Get a Free Management Quote
              </Button>
            </div>
          </div>
        </section>

        {/* Real Estate Consulting */}
        <section id="consulting" className="scroll-offset py-16 bg-gradient-to-b from-primary to-primary/90 text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Real Estate Consulting</h1>
              <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
                Expert guidance and strategic insights to help you make informed real estate decisions and achieve your property goals.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {[
                { title: "Market Analysis", desc: "In-depth market research, trend analysis, and neighborhood comparisons to identify the best opportunities." },
                { title: "Investment Strategy", desc: "Customized investment plans aligned with your financial goals, risk tolerance, and timeline." },
                { title: "Development Consulting", desc: "Feasibility studies, site selection, project planning, and development strategy for new projects." },
                { title: "Portfolio Optimization", desc: "Analysis and recommendations for improving your existing property portfolio's performance." },
                { title: "Due Diligence Support", desc: "Comprehensive property assessments before purchase to identify risks and opportunities." },
                { title: "Exit Strategy Planning", desc: "Strategic guidance on when and how to sell properties for maximum returns." }
              ].map((item) => (
                <Card key={item.title} className="hover:shadow-luxury transition-all">
                  <CardContent className="p-6">
                    <h4 className="text-xl font-semibold text-card-foreground mb-2">{item.title}</h4>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-8 rounded-lg text-center">
              <h3 className="text-2xl font-bold mb-3">Schedule Your Consultation</h3>
              <p className="mb-6">Get expert advice tailored to your real estate needs</p>
              <Button 
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                onClick={() => openAppointment("consulting", "Real Estate Consulting Appointment")}
              >
                Book a Consultation
              </Button>
            </div>
          </div>
        </section>

        {/* Investment Advisory */}
        <section id="advisory" className="scroll-offset py-16 bg-gradient-to-b from-primary to-primary/90 text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Investment Advisory</h1>
              <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
                Build wealth through smart real estate investments with personalized advisory services designed to maximize returns and minimize risks.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {[
                { title: "Portfolio Strategy", desc: "Develop a balanced real estate investment portfolio matching your risk profile and goals." },
                { title: "Opportunity Identification", desc: "Access off-market deals and emerging opportunities before they hit the public market." },
                { title: "ROI Analysis", desc: "Detailed financial modeling showing projected returns, cash flow, and appreciation potential." },
                { title: "Risk Assessment", desc: "Comprehensive risk evaluation and mitigation strategies for each investment." },
                { title: "Market Timing", desc: "Guidance on optimal entry and exit points based on market cycles and trends." },
                { title: "Performance Monitoring", desc: "Ongoing tracking and reporting of your investment portfolio's performance." }
              ].map((item) => (
                <Card key={item.title} className="hover:shadow-luxury transition-all">
                  <CardContent className="p-6">
                    <h4 className="text-xl font-semibold text-card-foreground mb-2">{item.title}</h4>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                { number: "8-15%", label: "Capital Appreciation" },
                { number: "6-10%", label: "Rental Yields" },
                { number: "500+", label: "Properties Managed" },
                { number: "98%", label: "Client Satisfaction" }
              ].map((stat) => (
                <Card key={stat.label} className="text-center">
                  <CardContent className="p-6">
                    <div className="text-4xl font-bold text-accent mb-2">{stat.number}</div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-8 rounded-lg text-center">
              <h3 className="text-2xl font-bold mb-3">Start Building Your Real Estate Portfolio</h3>
              <p className="mb-6">Connect with our investment advisors today</p>
              <Button 
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                onClick={() => openAppointment("investment_consultation", "Investment Advisory Consultation")}
              >
                Schedule Investment Consultation
              </Button>
            </div>
          </div>
        </section>

        {/* Property Valuation */}
        <section id="valuation" className="scroll-offset py-16 bg-gradient-to-b from-primary to-primary/90 text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Property Valuation</h1>
              <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
                Accurate, market-driven valuations for sales pricing, rental rate setting, and mortgage financing.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {[
                { title: "Sales Pricing Assessments", desc: "Determine the optimal listing price based on current market conditions and comparable properties." },
                { title: "Rental Rate Optimization", desc: "Set competitive rental rates that maximize income while ensuring quick occupancy." },
                { title: "Mortgage Financing Support", desc: "Professional valuations accepted by financial institutions for loan approvals." },
                { title: "Investment Analysis", desc: "Comprehensive property value assessment for investment decision-making." }
              ].map((item) => (
                <Card key={item.title} className="hover:shadow-luxury transition-all">
                  <CardContent className="p-6">
                    <h4 className="text-xl font-semibold text-card-foreground mb-2">{item.title}</h4>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-8 rounded-lg text-center">
              <h3 className="text-2xl font-bold mb-3">Need a Property Valuation?</h3>
              <p className="mb-6">Get accurate market-driven valuations for informed decisions</p>
              <Button 
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                onClick={() => openAppointment("valuation_request", "Property Valuation Request")}
              >
                Request Valuation
              </Button>
            </div>
          </div>
        </section>

        {/* Legal Documentation */}
        <section id="legal" className="scroll-offset py-16 bg-gradient-to-b from-primary to-primary/90 text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Legal Documentation</h1>
              <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
                We work with trusted conveyancing lawyers to ensure clean property titles and valid contracts.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {[
                { title: "Title Deed Verification", desc: "Comprehensive title searches to ensure clean ownership and no encumbrances." },
                { title: "Tenancy Agreements", desc: "Legally compliant lease agreements protecting both landlords and tenants." },
                { title: "Contract Compliance", desc: "Review and preparation of sale agreements and purchase contracts." },
                { title: "Legal Framework Guidance", desc: "Expert advice on property law, regulations, and compliance requirements." }
              ].map((item) => (
                <Card key={item.title} className="hover:shadow-luxury transition-all">
                  <CardContent className="p-6">
                    <h4 className="text-xl font-semibold text-card-foreground mb-2">{item.title}</h4>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-8 rounded-lg text-center">
              <h3 className="text-2xl font-bold mb-3">Need Legal Support?</h3>
              <p className="mb-6">Expert legal documentation and advisory for smooth property transactions</p>
              <Button 
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                onClick={() => openAppointment("legal_team", "Legal Documentation Consultation")}
              >
                Contact Legal Team
              </Button>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-secondary/20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let our expert team provide you with personalized real estate solutions tailored to your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-gradient-primary hover:bg-gradient-luxury shadow-gold text-lg px-8 py-6"
                onClick={() => {
                  window.location.href = '/#get-started-form';
                }}
              >
                Consult with Experts
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg px-8 py-6"
                onClick={() => {
                  window.location.href = '/properties';
                }}
              >
                View Our Properties
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      
      <AppointmentBookingModal
        open={appointmentOpen}
        setOpen={setAppointmentOpen}
        source={appointmentSource}
        serviceType={appointmentServiceType}
      />
    </div>
  );
};

export default Services;