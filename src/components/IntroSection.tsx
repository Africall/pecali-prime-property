import { Card, CardContent } from "@/components/ui/card";
import { Building2, TrendingUp, Home, GraduationCap } from "lucide-react";

const IntroSection = () => {
  const highlights = [
    {
      icon: Building2,
      title: "Premium Apartments",
      description: "Quality lifestyle units with modern design & prime locations - exciting projects coming soon."
    },
    {
      icon: TrendingUp,
      title: "High-Return Investments",
      description: "Tailored property advisory for both local & diaspora investors."
    },
    {
      icon: Home,
      title: "Expert Management",
      description: "Hands-off property ownership experience."
    },
    {
      icon: GraduationCap,
      title: "Real Estate Training",
      description: "Building the next generation of property sales champions."
    }
  ];

  return (
    <section className="py-20 bg-background -mt-32 relative z-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            About PECALI Real Estate
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            PECALI Real Estate specializes in affordable luxury apartments and investment-ready properties 
            within Nairobi's most sought-after developments. We have exciting premium apartment projects 
            that offer modern living at its finest. Whether you're buying, renting, or investing, 
            we make your property journey smooth, secure, and rewarding.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((highlight, index) => (
            <Card key={highlight.title} className="text-center group hover:shadow-luxury transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <highlight.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-card-foreground mb-3">
                  {highlight.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {highlight.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IntroSection;