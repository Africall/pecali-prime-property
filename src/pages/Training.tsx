import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LogoRain from "@/components/LogoRain";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Users, Target, Brain, Globe, FileText, CheckCircle, Star, ArrowRight, Award, TrendingUp } from "lucide-react";

const Training = () => {
  const trainingModules = [
    {
      icon: Brain,
      title: "Sales Psychology & Closing Techniques",
      description: "Master the art of understanding client psychology and closing high-value deals with confidence.",
      features: [
        "Understanding buyer behavior",
        "Effective closing strategies",
        "Handling objections professionally",
        "Building trust and rapport"
      ]
    },
    {
      icon: Globe,
      title: "Digital Marketing for Real Estate",
      description: "Learn to leverage social media and online platforms to drive sales and build your brand.",
      features: [
        "Social media marketing strategies",
        "Online lead generation",
        "Content creation for properties",
        "Digital advertising campaigns"
      ]
    },
    {
      icon: Target,
      title: "Investment Advisory Skills",
      description: "Guide clients through property investments with expert knowledge and strategic planning.",
      features: [
        "Market analysis techniques",
        "ROI calculation methods",
        "Risk assessment strategies",
        "Portfolio diversification advice"
      ]
    },
    {
      icon: FileText,
      title: "Legal Basics in Property Transactions",
      description: "Understand contracts, leases, and compliance requirements in the Kenyan real estate market.",
      features: [
        "Contract law fundamentals",
        "Title deed verification",
        "Compliance requirements",
        "Documentation processes"
      ]
    }
  ];

  const mentorshipBenefits = [
    {
      icon: Users,
      title: "Direct Exposure to Live Projects",
      description: "Get hands-on experience with premium development projects and active listings in the market."
    },
    {
      icon: Award,
      title: "Industry Networking",
      description: "Connect with seasoned professionals, developers, and potential mentors in the real estate industry."
    },
    {
      icon: TrendingUp,
      title: "Ongoing Support",
      description: "Continuous guidance and support even after training completion to ensure your success."
    }
  ];

  const successStories = [
    {
      name: "Grace Wanjiku",
      role: "Real Estate Agent",
      story: "The training program at PECALI transformed my career. I'm now a successful real estate agent with consistent monthly sales.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "John Kamau",
      role: "Property Consultant",
      story: "The mentorship program gave me the confidence and skills to start my own property consulting business.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Mary Njeri",
      role: "Investment Advisor",
      story: "I learned how to guide clients through complex investment decisions and now have a thriving practice.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
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
              Master the Art of Real Estate Sales
            </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-4xl mx-auto">
            Training & Mentorship with PECALI
          </p>
          <p className="text-lg text-primary-foreground/80 max-w-3xl mx-auto leading-relaxed">
            Our Real Estate Sales Training & Mentorship program is built to equip you with real-world skills 
            for thriving in Kenya's competitive property market.
          </p>
        </div>
      </section>

      {/* Training Modules */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-gold text-foreground">What We Offer</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Comprehensive Training Modules
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Master every aspect of real estate sales with our expertly designed curriculum.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {trainingModules.map((module, index) => (
              <Card key={module.title} className="group hover:shadow-luxury transition-all duration-300 animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <module.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  
                  <h3 className="text-2xl font-semibold text-card-foreground mb-4">
                    {module.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {module.description}
                  </p>

                  <ul className="space-y-3">
                    {module.features.map(feature => (
                      <li key={feature} className="flex items-start text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-accent mr-3 flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mentorship Benefits */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary">Mentorship Benefits</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Beyond Training: Real-World Experience
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get hands-on experience and ongoing support to accelerate your real estate career.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mentorshipBenefits.map((benefit, index) => (
              <Card key={benefit.title} className="text-center group hover:shadow-luxury transition-all duration-300">
                <CardContent className="p-8">
                  <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <benefit.icon className="h-10 w-10 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-card-foreground mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent">Success Stories</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Our Graduates Excel
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real success stories from our training program graduates who are now thriving in the industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <Card key={story.name} className="bg-card rounded-xl shadow-card hover:shadow-luxury transition-all duration-300 animate-scale-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(story.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-accent fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-card-foreground mb-6 leading-relaxed">
                    "{story.story}"
                  </p>

                  <div className="flex items-center">
                    <img 
                      src={story.image} 
                      alt={story.name}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <div>
                      <h4 className="font-semibold text-card-foreground">{story.name}</h4>
                      <p className="text-sm text-muted-foreground">{story.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Program Highlights */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-dark text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose Our Training Program?
            </h2>
            <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto">
              Get the competitive edge you need in Kenya's dynamic real estate market.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: GraduationCap, title: "Expert Instructors", description: "Learn from industry veterans" },
              { icon: Users, title: "Small Class Sizes", description: "Personalized attention guaranteed" },
              { icon: Award, title: "Certification", description: "Industry-recognized credentials" },
              { icon: TrendingUp, title: "Job Placement", description: "Career support after graduation" }
            ].map((feature, index) => (
              <div key={feature.title} className="text-center group">
                <div className="w-20 h-20 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-10 w-10 text-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-primary-foreground/80">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Transform your career with our comprehensive real estate training program.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-gradient-primary hover:bg-gradient-luxury shadow-gold text-lg px-8 py-6">
              Enroll Now — Seats Fill Up Fast!
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg px-8 py-6">
              Download Curriculum
            </Button>
          </div>
        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
};

export default Training;