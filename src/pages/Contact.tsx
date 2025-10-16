import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LogoRain from "@/components/LogoRain";
import GetStartedWizard from "@/components/GetStartedWizard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { MapPin, Phone, Mail, MessageCircle, Calendar, Clock, Users, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you soon.",
    });
    setFormData({ name: "", email: "", phone: "", service: "", message: "" });
  };

  const contactMethods = [
    {
      icon: MapPin,
      title: "Office Address",
      info: "Nairobi Central Business District",
      description: "Visit us at our modern offices in the heart of Nairobi",
      action: "Get Directions"
    },
    {
      icon: Phone,
      title: "Phone",
      info: "+254 758 174718",
      description: "Call us during business hours for immediate assistance",
      action: "Call Now"
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      info: "Instant click-to-chat",
      description: "Quick responses via WhatsApp for urgent inquiries",
      action: "Chat Now"
    },
    {
      icon: Mail,
      title: "Email",
      info: "info@pecalirealestate.co.ke",
      description: "Send us detailed inquiries and we'll respond promptly",
      action: "Send Email"
    }
  ];

  const officeHours = [
    { day: "Monday - Friday", hours: "8:00 AM - 6:00 PM" },
    { day: "Saturday", hours: "9:00 AM - 4:00 PM" },
    { day: "Sunday", hours: "Closed" }
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
              Let's Talk
            </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-4xl mx-auto">
            Your Next Property Move Starts Here
          </p>
          <p className="text-lg text-primary-foreground/80 max-w-3xl mx-auto leading-relaxed">
            Whether you're buying, renting, investing, or just exploring options, we're ready to guide you every step of the way.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-gold text-foreground">Contact Options</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Choose Your Preferred Way to Connect
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Multiple ways to reach us ensure you get the support you need, when you need it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <Card key={method.title} className="text-center group hover:shadow-luxury transition-all duration-300 animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <method.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-card-foreground mb-3">
                    {method.title}
                  </h3>
                  <p className="text-accent font-semibold mb-3">
                    {method.info}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {method.description}
                  </p>
                  <Button variant="ghost" className="p-0 h-auto text-primary hover:text-accent">
                    {method.action} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Office Hours */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="shadow-luxury">
              <CardContent className="p-8">
                <div className="mb-8">
                  <h3 className="text-3xl font-bold text-card-foreground mb-4">
                    Send Us a Message
                  </h3>
                  <p className="text-muted-foreground">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-card-foreground mb-2">
                        Name *
                      </label>
                      <Input
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your full name"
                        className="h-12"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-card-foreground mb-2">
                        Email *
                      </label>
                      <Input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-card-foreground mb-2">
                        Phone Number
                      </label>
                      <Input
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+254 XXX XXX XXX"
                        className="h-12"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-card-foreground mb-2">
                        Service Required
                      </label>
                      <Select value={formData.service} onValueChange={(value) => setFormData({ ...formData, service: value })}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sale">Property Sale</SelectItem>
                          <SelectItem value="rent">Property Rental</SelectItem>
                          <SelectItem value="training">Real Estate Training</SelectItem>
                          <SelectItem value="management">Property Management</SelectItem>
                          <SelectItem value="investment">Investment Advisory</SelectItem>
                          <SelectItem value="valuation">Property Valuation</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-card-foreground mb-2">
                      Message *
                    </label>
                    <Textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your property needs..."
                      className="min-h-[120px]"
                    />
                  </div>

                  <Button 
                    type="submit"
                    className="w-full bg-gradient-primary hover:bg-gradient-luxury shadow-gold h-12 text-lg"
                  >
                    Send Message
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Office Hours & Additional Info */}
            <div className="space-y-8">
              {/* Office Hours */}
              <Card className="shadow-luxury">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <Clock className="h-6 w-6 text-primary mr-3" />
                    <h3 className="text-2xl font-bold text-card-foreground">
                      Office Hours
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {officeHours.map((schedule, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-border last:border-b-0">
                        <span className="text-card-foreground font-medium">{schedule.day}</span>
                        <span className="text-muted-foreground">{schedule.hours}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="shadow-luxury">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <Calendar className="h-6 w-6 text-primary mr-3" />
                    <h3 className="text-2xl font-bold text-card-foreground">
                      Quick Actions
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <Button 
                      className="w-full bg-gradient-primary hover:bg-gradient-luxury shadow-gold" 
                      size="lg"
                      onClick={() => setIsGetStartedOpen(true)}
                    >
                      <Calendar className="h-5 w-5 mr-2" />
                      Book an Appointment Online
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      size="lg"
                      asChild
                    >
                      <a href="https://wa.me/254758174718" target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="h-5 w-5 mr-2" />
                        Start WhatsApp Chat
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Emergency Contact */}
              <Card className="bg-gradient-primary text-primary-foreground shadow-luxury">
                <CardContent className="p-8 text-center">
                  <Phone className="h-8 w-8 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">
                    Need Immediate Assistance?
                  </h3>
                  <p className="mb-4 text-primary-foreground/80">
                    For urgent property matters, call us directly
                  </p>
                  <p className="text-2xl font-bold">+254 758 174718</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Your Dream Home, Your Next Investment, Your New Beginning
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Talk to us today and take the first step towards your property goals.
          </p>
          <Button className="bg-gradient-primary hover:bg-gradient-luxury shadow-gold text-lg px-8 py-6">
            Start Your Property Journey
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
      </main>

      <Footer />
      
      <Dialog open={isGetStartedOpen} onOpenChange={setIsGetStartedOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <GetStartedWizard />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Contact;