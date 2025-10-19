import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LogoRain from "@/components/LogoRain";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Heart, TrendingUp, Users, Target, Award, Building2, Globe, ArrowRight, CheckCircle } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Shield,
      title: "Trust & Transparency",
      description: "We believe in honest communication and transparent dealings in every transaction, building lasting relationships with our clients."
    },
    {
      icon: Heart,
      title: "Client-Centric Service",
      description: "Every decision we make is guided by our clients' best interests, ensuring personalized solutions that exceed expectations."
    },
    {
      icon: TrendingUp,
      title: "Market Expertise",
      description: "Our deep understanding of the Kenyan real estate market enables us to provide informed guidance and strategic insights."
    },
    {
      icon: Users,
      title: "Growth & Learning",
      description: "We continuously evolve and adapt to market changes, investing in our team's development and industry knowledge."
    }
  ];

  const achievements = [
    {
      icon: Building2,
      number: "500+",
      title: "Properties Sold",
      description: "Successfully facilitated property transactions across Nairobi and beyond"
    },
    {
      icon: Users,
      number: "200+",
      title: "Happy Clients",
      description: "Satisfied customers who trust us with their real estate needs"
    },
    {
      icon: Award,
      number: "5+",
      title: "Years Experience",
      description: "Proven track record in the Kenyan real estate market"
    },
    {
      icon: Globe,
      number: "50+",
      title: "Areas Covered",
      description: "Extensive coverage across prime locations in Kenya"
    }
  ];

  const teamHighlights = [
    {
      title: "Local Expertise",
      description: "Born and raised in Kenya, we understand the local market dynamics and cultural nuances that matter in real estate."
    },
    {
      title: "Diaspora Focus",
      description: "Specialized services for Kenyan diaspora investors, making property investment accessible from anywhere in the world."
    },
    {
      title: "Premium Project Specialists",
      description: "Deep expertise in premium lifestyle developments with exclusive access to developer opportunities."
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
              Who We Are
            </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-4xl mx-auto">
            The PECALI Promise
          </p>
          <p className="text-lg text-primary-foreground/80 max-w-3xl mx-auto leading-relaxed">
            PECALI Real Estate is a Kenyan-born property solutions company committed to making affordable luxury housing 
            and high-return investments accessible to all. Founded with a passion for transforming how people buy, sell, 
            and invest in real estate, we focus on premium lifestyle developments that embody modern living.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <Card className="text-center group hover:shadow-luxury transition-all duration-300">
              <CardContent className="p-12">
                <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Target className="h-10 w-10 text-primary-foreground" />
                </div>
                <h3 className="text-3xl font-bold text-card-foreground mb-6">Our Mission</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  To deliver property solutions with integrity, transparency, and innovation, making real estate 
                  accessible and rewarding for every client.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center group hover:shadow-luxury transition-all duration-300">
              <CardContent className="p-12">
                <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Award className="h-10 w-10 text-primary-foreground" />
                </div>
                <h3 className="text-3xl font-bold text-card-foreground mb-6">Our Vision</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  To become Kenya's most trusted and dynamic real estate partner, serving clients locally 
                  and in the diaspora with unmatched excellence.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-gold text-foreground">Our Values</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              What Drives Us
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our core values guide every interaction and decision we make.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={value.title} className="text-center group hover:shadow-luxury transition-all duration-300 animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-card-foreground mb-4">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* Team Highlights */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-dark text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose PECALI?
            </h2>
            <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto">
              We bring unique expertise and deep market knowledge to every real estate transaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamHighlights.map((highlight, index) => (
              <Card key={highlight.title} className="bg-white/10 backdrop-blur-md border-primary-foreground/20 text-center group hover:bg-white/20 transition-all duration-300">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-4">
                    {highlight.title}
                  </h3>
                  <p className="text-primary-foreground/80 leading-relaxed">
                    {highlight.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-accent/10 text-accent">Our Story</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
              Built on Passion, Driven by Results
            </h2>
            <div className="text-lg text-muted-foreground leading-relaxed space-y-6">
              <p>
                Founded with a clear vision to transform Kenya's real estate landscape, PECALI Real Estate emerged 
                from a deep understanding of the challenges faced by property buyers, sellers, and investors in our market.
              </p>
              <p>
                Our founders recognized the need for a more transparent, client-focused approach to real estate, 
                particularly in the growing market for affordable luxury housing. This led to our specialization 
                in premium lifestyle developments and our commitment to serving both local and diaspora clients.
              </p>
              <p>
                Today, we stand as a trusted partner for hundreds of clients who have found their dream homes, 
                made successful investments, and built wealth through strategic property decisions. Our journey 
                continues as we expand our reach and deepen our expertise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Ready to Join Our Success Story?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Whether you're buying, selling, or investing, let us help you achieve your real estate goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-gradient-primary hover:bg-gradient-luxury shadow-gold text-lg px-8 py-6">
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg px-8 py-6">
              Contact Our Team
            </Button>
          </div>
        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;