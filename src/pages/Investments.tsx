import LogoRain from "@/components/LogoRain";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Building2, Home, Store, MapPin, Calendar, TrendingUp, Shield, FileText, DollarSign } from "lucide-react";
import { useState } from "react";
import { AppointmentBookingModal } from "@/components/AppointmentBookingModal";

const Investments = () => {
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [appointmentSource, setAppointmentSource] = useState("");
  const [appointmentServiceType, setAppointmentServiceType] = useState("");

  const openAppointment = (source: string, serviceType: string) => {
    setAppointmentSource(source);
    setAppointmentServiceType(serviceType);
    setAppointmentOpen(true);
  };
  
  const featuredOpportunities = [
    {
      title: "Premium Apartments - Embakasi (Off-Plan)",
      icon: Building2,
      location: "Fedha Plaza, Embakasi",
      investment: "KES 4.2M - 6.8M",
      propertyType: "2BR & 3BR Modern Apartments",
      completion: "Q2 2026",
      highlights: [
        "Pre-launch pricing (20% below market value)",
        "Flexible payment plan (30% deposit, balance in 18 months)",
        "Projected rental yield: 8.2% annually",
        "Capital appreciation potential: 25-35% upon completion",
        "Proximity to Expressway and Eastern Bypass",
        "Developer with proven track record"
      ],
      units: [
        { type: "2BR (85sqm)", price: "KES 4.2M", rent: "KES 28,000" },
        { type: "3BR (115sqm)", price: "KES 6.8M", rent: "KES 40,000" }
      ]
    },
    {
      title: "Gated Community Townhouses - Ruiru",
      icon: Home,
      location: "Membley Estate, Ruiru",
      investment: "KES 8.5M - 11M",
      propertyType: "3BR & 4BR Townhouses",
      completion: "Ready for Occupation",
      highlights: [
        "Move-in ready with immediate rental income",
        "Managed gated community with 24/7 security",
        "Strong tenant demand (proximity to Thika Road offices)",
        "Projected rental yield: 7.5% annually",
        "Expected appreciation: 15-20% over 3 years",
        "DSQ (domestic servant quarters) for additional income"
      ],
      units: [
        { type: "3BR Townhouse", price: "KES 8.5M", rent: "KES 55,000/month" },
        { type: "4BR Townhouse", price: "KES 11M", rent: "KES 70,000/month" }
      ]
    },
    {
      title: "Commercial Plaza - Syokimau",
      icon: Store,
      location: "Syokimau Town Center",
      investment: "KES 3.5M - 12M",
      propertyType: "Retail & Office Spaces",
      completion: "Q4 2026",
      highlights: [
        "Ground floor retail and upper-floor offices",
        "SGR station proximity (high foot traffic)",
        "Anchor tenant pre-committed",
        "Projected rental yield: 9-11% annually",
        "Staggered payment plan available",
        "Commercial property tax advantages"
      ],
      units: [
        { type: "Retail Shop (40sqm)", price: "KES 3.5M", rent: "KES 30,000/month" },
        { type: "Office Suite (60sqm)", price: "KES 5.2M", rent: "KES 40,000/month" },
        { type: "Full Floor (200sqm)", price: "KES 12M", rent: "KES 110,000/month" }
      ]
    },
    {
      title: "Serviced Plots - Ngong",
      icon: MapPin,
      location: "Matasia, Ngong Hills",
      investment: "KES 1.8M - 3.5M",
      propertyType: "1/8 to 1/4 Acre Plots",
      completion: "Ready Title Deeds",
      highlights: [
        "Clean freehold titles ready for transfer",
        "All amenities: Water, electricity, tarmac roads",
        "Controlled development (no commercial activities)",
        "Historical appreciation: 40% over 3 years",
        "Build or hold for appreciation",
        "Proximity to Ngong Hills, shopping centers"
      ],
      units: [
        { type: "1/8 Acre (50x100)", price: "KES 1.8M", rent: "" },
        { type: "1/4 Acre (100x100)", price: "KES 3.5M", rent: "" }
      ]
    }
  ];

  const investmentPathways = [
    {
      title: "For First-Time Investors",
      budget: "KES 2M - 5M",
      description: "Start your real estate journey with entry-level opportunities that offer security and growth potential.",
      options: [
        "Off-plan studio & 1BR apartments in emerging areas",
        "Fractional ownership in commercial properties",
        "Serviced plots in satellite towns",
        "Co-investment partnership opportunities"
      ]
    },
    {
      title: "For Growing Portfolios",
      budget: "KES 5M - 15M",
      description: "Expand your holdings with mid-tier properties offering balanced risk-return profiles.",
      options: [
        "Ready 2BR & 3BR rental apartments",
        "Mixed-use developments",
        "Townhouses in gated communities",
        "Small commercial units"
      ]
    },
    {
      title: "For Serious Investors",
      budget: "KES 15M+",
      description: "Premium opportunities for sophisticated investors seeking maximum returns and portfolio diversification.",
      options: [
        "Multi-unit apartment blocks",
        "Full commercial buildings",
        "Prime land for development",
        "High-end luxury properties"
      ]
    }
  ];

  const whyPECALI = [
    {
      icon: Shield,
      title: "Rigorous Vetting",
      description: "Every opportunity undergoes thorough due diligence: title verification, developer background checks, market analysis, and legal compliance."
    },
    {
      icon: FileText,
      title: "Transparent Analysis",
      description: "We provide detailed investment decks with projected ROI, cash flow models, risk assessments, and exit strategies."
    },
    {
      icon: TrendingUp,
      title: "Exclusive Access",
      description: "First access to off-market deals, pre-launch projects, and distressed asset opportunities."
    },
    {
      icon: DollarSign,
      title: "End-to-End Support",
      description: "From initial selection through purchase completion, property management, and eventual exit—we're with you."
    }
  ];

  return (
    <>
      <LogoRain />
      <Navbar />
      <main className="min-h-screen relative">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-primary via-primary-light to-primary/90 text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Curated Property Investment Deals
              </h1>
              <p className="text-xl md:text-2xl mb-4 text-primary-foreground/90">
                Exclusive Access to High-Return Real Estate Investments
              </p>
              <p className="text-lg text-primary-foreground/80 max-w-3xl mx-auto">
                PECALI Real Estate connects serious investors with verified, high-potential property opportunities across Kenya. Whether you're building your first investment portfolio or expanding an existing one, we provide exclusive access to deals that deliver superior returns.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Opportunities */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Featured Investment Opportunities</h2>
            
            <div className="grid gap-8 max-w-6xl mx-auto">
              {featuredOpportunities.map((opportunity, index) => {
                const Icon = opportunity.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start gap-4 mb-4">
                        <div className="p-3 rounded-lg bg-primary/10">
                          <Icon className="h-8 w-8 text-primary" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-2xl mb-2">{opportunity.title}</CardTitle>
                          <div className="grid sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                            <p><MapPin className="inline h-4 w-4 mr-1" />{opportunity.location}</p>
                            <p><DollarSign className="inline h-4 w-4 mr-1" />{opportunity.investment}</p>
                            <p><Home className="inline h-4 w-4 mr-1" />{opportunity.propertyType}</p>
                            <p><Calendar className="inline h-4 w-4 mr-1" />{opportunity.completion}</p>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-6">
                        <h4 className="font-semibold mb-3">Investment Highlights:</h4>
                        <ul className="grid sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                          {opportunity.highlights.map((highlight, i) => (
                            <li key={i} className="flex items-start">
                              <span className="mr-2 text-primary">✓</span>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {opportunity.units.length > 0 && (
                        <div className="mb-6 bg-muted/30 p-4 rounded-lg">
                          <h4 className="font-semibold mb-3">Available Units:</h4>
                          <div className="space-y-2">
                            {opportunity.units.map((unit, i) => (
                              <div key={i} className="flex justify-between items-center text-sm">
                                <span className="font-medium">{unit.type}</span>
                                <div className="flex gap-4">
                                  <span className="text-primary font-semibold">{unit.price}</span>
                                  {unit.rent && <span className="text-muted-foreground">Rent: {unit.rent}</span>}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2">
                        <Button>View Full Project Details</Button>
                        <Button variant="outline">Schedule Site Visit</Button>
                        <Button variant="outline">Request Investment Deck</Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Investment Pathways */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Investment Pathways</h2>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {investmentPathways.map((pathway, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{pathway.title}</CardTitle>
                    <CardDescription className="text-lg font-semibold text-primary">{pathway.budget}</CardDescription>
                    <p className="text-sm text-muted-foreground mt-2">{pathway.description}</p>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-semibold mb-3 text-sm">Recommended Options:</h4>
                    <ul className="space-y-2 mb-4">
                      {pathway.options.map((option, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start">
                          <span className="mr-2">•</span>
                          <span>{option}</span>
                        </li>
                      ))}
                    </ul>
                    <Button variant="outline" className="w-full">View Opportunities</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Invest Through PECALI */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Invest Through PECALI?</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {whyPECALI.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Card key={index} className="text-center">
                    <CardContent className="pt-6">
                      <div className="inline-flex p-3 rounded-lg bg-primary/10 mb-4">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Investing?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Book a Free Investment Consultation - Discuss your financial goals, risk tolerance, and timeline with our investment advisors.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg" 
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                onClick={() => openAppointment("investment_consultation", "Investment Consultation")}
              >
                Schedule Consultation
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                View All Opportunities
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Join Investor Network
              </Button>
            </div>

            <div className="max-w-2xl mx-auto text-left bg-primary-light/20 p-6 rounded-lg">
              <h3 className="font-bold text-xl mb-4">Investment Hotline</h3>
              <p className="mb-2">Speak directly with our investment team:</p>
              <p className="mb-1">📞 +254 758 174718</p>
              <p className="mb-4">📧 investments@pecalirealestate.co.ke</p>
              <p className="text-sm">
                <strong>Investment Desk Hours:</strong><br />
                Monday - Friday: 8:00 AM - 6:00 PM<br />
                Saturday: 9:00 AM - 4:00 PM
              </p>
            </div>

            <p className="text-xs text-primary-foreground/60 mt-8 max-w-3xl mx-auto">
              Disclaimer: All investment projections are estimates based on current market conditions and historical performance. Past performance does not guarantee future results. PECALI Real Estate recommends consulting with financial and legal advisors before making investment decisions.
            </p>
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
    </>
  );
};

export default Investments;
