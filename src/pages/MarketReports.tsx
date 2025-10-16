import LogoRain from "@/components/LogoRain";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Mail, TrendingUp, TrendingDown, Minus } from "lucide-react";

const MarketReports = () => {
  const reports = [
    {
      title: "Nairobi Property Market Overview Q4 2025",
      published: "October 2025",
      description: "Our quarterly analysis covers price trends, supply and demand dynamics, and emerging hotspots across Nairobi's residential and commercial segments.",
      highlights: [
        "Average apartment prices in Kilimani, Westlands, and Embakasi",
        "Rental yield comparison across Nairobi neighborhoods",
        "Infrastructure impact on property values (Expressway, BRT corridors)",
        "Absorption rates for new developments",
        "Investment grade area rankings"
      ]
    },
    {
      title: "Diaspora Investment Guide 2025",
      published: "September 2025",
      description: "A comprehensive guide specifically designed for Kenyans living abroad who want to invest in property back home.",
      highlights: [
        "Step-by-step property purchase process from abroad",
        "Currency transfer and payment facilitation",
        "Tax implications for diaspora investors",
        "High-ROI opportunities under KES 10M",
        "Legal protections and due diligence checklist",
        "Remote property management solutions"
      ]
    },
    {
      title: "Emerging Neighborhoods Report 2025",
      published: "August 2025",
      description: "Discover Nairobi's next property hotspots before prices surge. This report identifies undervalued areas positioned for significant appreciation.",
      highlights: [
        "Ruaka & Membley: Northern Corridor growth",
        "Mlolongo & Syokimau: Eastern Bypass expansion",
        "Kikuyu & Ngong: Satellite town development",
        "Utawala & Mihango: Affordable housing boom",
        "Price appreciation projections (3-5 year outlook)"
      ]
    },
    {
      title: "Commercial Real Estate Trends 2025",
      published: "July 2025",
      description: "In-depth analysis of office, retail, and mixed-use property performance across Nairobi's business districts.",
      highlights: [
        "Office space vacancy rates by district",
        "Retail rental performance (malls vs. street-level)",
        "Co-working space market dynamics",
        "Warehouse and industrial property demand",
        "Future supply pipeline and market saturation risks"
      ]
    }
  ];

  const marketIndicators = [
    { name: "Average 2BR Apartment Price (Nairobi)", value: "KES 6.5M", trend: "up", change: "↑ 4.2% YoY" },
    { name: "Average Monthly Rent (2BR)", value: "KES 35,000", trend: "up", change: "↑ 3.1% YoY" },
    { name: "Rental Yield (Nairobi Average)", value: "6.5%", trend: "stable", change: "→ Stable" },
    { name: "Property Sales Volume", value: "8,200 units", trend: "up", change: "↑ 12% YoY" },
    { name: "Average Days on Market", value: "65 days", trend: "down", change: "↓ 8 days" },
    { name: "Mortgage Interest Rate", value: "13.5%", trend: "down", change: "↓ 0.5%" }
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
                Kenya Real Estate Market Intelligence
              </h1>
              <p className="text-xl md:text-2xl mb-4 text-primary-foreground/90">
                Stay Ahead with Data-Driven Insights
              </p>
              <p className="text-lg text-primary-foreground/80 max-w-3xl mx-auto">
                Knowledge is power in real estate investment. PECALI's Market Reports provide you with comprehensive, up-to-date analysis of Kenya's property landscape, helping you make informed decisions backed by solid data and expert interpretation.
              </p>
            </div>
          </div>
        </section>

        {/* Latest Reports */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Latest Market Reports</h2>
            
            <div className="grid gap-8 max-w-5xl mx-auto">
              {reports.map((report, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-2xl">{report.title}</CardTitle>
                      <span className="text-sm text-muted-foreground">Published: {report.published}</span>
                    </div>
                    <p className="text-muted-foreground">{report.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Key Highlights:</h4>
                      <ul className="space-y-1 text-muted-foreground">
                        {report.highlights.map((highlight, i) => (
                          <li key={i} className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button className="w-full sm:w-auto">
                      <Download className="mr-2 h-4 w-4" />
                      Download Full Report - PDF
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Market Indicators */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Market Indicators Dashboard</h2>
            <p className="text-center text-muted-foreground mb-12">Current Market Snapshot (October 2025)</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {marketIndicators.map((indicator, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-sm">{indicator.name}</h3>
                      {indicator.trend === "up" && <TrendingUp className="h-5 w-5 text-green-600" />}
                      {indicator.trend === "down" && <TrendingDown className="h-5 w-5 text-red-600" />}
                      {indicator.trend === "stable" && <Minus className="h-5 w-5 text-blue-600" />}
                    </div>
                    <p className="text-2xl font-bold mb-1">{indicator.value}</p>
                    <p className="text-sm text-muted-foreground">{indicator.change}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Subscription */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <Card className="max-w-3xl mx-auto bg-gradient-to-br from-primary to-primary-light text-primary-foreground">
              <CardContent className="p-8 text-center">
                <Mail className="h-12 w-12 mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-4">Subscribe to Market Updates</h2>
                <p className="mb-6">Get quarterly market reports, monthly market briefs, and breaking real estate news delivered directly to your inbox.</p>
                
                <div className="space-y-3 mb-6 text-left max-w-md mx-auto">
                  <p className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>Quarterly comprehensive market analysis</span>
                  </p>
                  <p className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>Monthly price index updates</span>
                  </p>
                  <p className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>Weekly featured investment opportunities</span>
                  </p>
                  <p className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>Exclusive pre-launch project notifications</span>
                  </p>
                </div>
                
                <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  Subscribe for Free Market Reports
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Why Trust PECALI */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Trust PECALI Market Reports?</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <Card>
                <CardContent className="pt-6 text-center">
                  <h3 className="font-bold text-lg mb-2">Ground-Level Intelligence</h3>
                  <p className="text-sm text-muted-foreground">Our data comes from actual transactions, not just listings, giving you real market conditions.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6 text-center">
                  <h3 className="font-bold text-lg mb-2">Expert Analysis</h3>
                  <p className="text-sm text-muted-foreground">Our team interprets the numbers, providing context and actionable recommendations.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6 text-center">
                  <h3 className="font-bold text-lg mb-2">Regular Updates</h3>
                  <p className="text-sm text-muted-foreground">Quarterly comprehensive reports and monthly briefs keep you current.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6 text-center">
                  <h3 className="font-bold text-lg mb-2">Localized Focus</h3>
                  <p className="text-sm text-muted-foreground">Deep-dive coverage of Kenyan markets with neighborhood-level granularity.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Access Market Intelligence?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                Download Latest Report
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Subscribe to Updates
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Contact Research Team
              </Button>
            </div>
            
            <div className="mt-12 max-w-2xl mx-auto text-left">
              <h3 className="font-bold text-xl mb-4">Investment Hotline</h3>
              <p className="mb-2">Speak directly with our investment team:</p>
              <p className="mb-1">📞 +254 758 174718</p>
              <p className="mb-4">📧 info@pecalirealestate.co.ke</p>
              <p className="text-sm text-primary-foreground/80">
                <strong>Investment Desk Hours:</strong><br />
                Monday - Friday: 8:00 AM - 6:00 PM<br />
                Saturday: 9:00 AM - 4:00 PM
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default MarketReports;
