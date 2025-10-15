import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Phone, Mail, MapPin, Instagram, Facebook, Twitter, Linkedin, Clock, Send } from "lucide-react";
const Footer = () => {
  return <footer className="relative z-10 bg-gradient-primary text-primary-foreground">
      {/* Newsletter Section */}
      <div className="border-b border-white/20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Updated with PECALI</h3>
            <p className="text-primary-foreground/80 mb-6">
              Get the latest property listings, market insights, and exclusive offers delivered to your inbox.
            </p>
            <div className="flex gap-2 max-w-md mx-auto">
              <Input placeholder="Enter your email" className="bg-white/10 border-white/20 text-primary-foreground placeholder:text-primary-foreground/60" />
              <Button className="bg-gradient-gold hover:bg-gold text-foreground font-semibold">
                <Send className="h-4 w-4 mr-2" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/fa8c1598-094b-41c9-94da-4e5dff4aecfe.png" 
                alt="PECALI Real Estate" 
                className="h-12 w-auto brightness-0 invert"
                loading="lazy"
                decoding="async"
                width="48"
                height="48"
              />
              <div>
                <h2 className="text-xl font-bold">PECALI</h2>
                <p className="text-sm text-primary-foreground/80">REAL ESTATE</p>
              </div>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed">
              Your trusted partner in real estate excellence. We specialize in property management, 
              sales, and professional training across Kenya.
            </p>
            <div className="flex space-x-4">
              <Button 
                size="sm" 
                variant="ghost" 
                className="text-primary-foreground hover:text-accent hover:bg-white/10"
                asChild
              >
                <a href="https://www.instagram.com/pecal.i?utm_source=ig_web_button_share_sheet&igsh=MTE2c250M3lxd2VsaQ==" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-5 w-5" />
                </a>
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                className="text-primary-foreground hover:text-accent hover:bg-white/10"
                asChild
              >
                <a href="https://www.facebook.com/people/Pecali-real-estate/61579203827937/" target="_blank" rel="noopener noreferrer">
                  <Facebook className="h-5 w-5" />
                </a>
              </Button>
              <Button size="sm" variant="ghost" className="text-primary-foreground hover:text-accent hover:bg-white/10">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button size="sm" variant="ghost" className="text-primary-foreground hover:text-accent hover:bg-white/10">
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-3">
              {[{
              label: "Properties for Sale",
              href: "/properties?type=sale"
            }, {
              label: "Properties for Rent",
              href: "/properties?type=rent"
            }, {
              label: "Property Management",
              href: "/services#management"
            }, {
              label: "Real Estate Training",
              href: "/training"
            }, {
              label: "Investment Opportunities",
              href: "/investments"
            }, {
              label: "Market Reports",
              href: "/reports"
            }].map(link => <li key={link.label}>
                  <a href={link.href} className="text-primary-foreground/80 hover:text-accent transition-colors duration-200">
                    {link.label}
                  </a>
                </li>)}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Our Services</h3>
            <ul className="space-y-3">
              {["Property Sales & Leasing", "Property Management", "Real Estate Consulting", "Investment Advisory", "Property Valuation", "Legal Documentation"].map(service => <li key={service} className="text-primary-foreground/80">
                  {service}
                </li>)}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                <div className="text-primary-foreground/80">
                  <p>Fedha, EMBAKASI</p>
                  <p>Nairobi, Kenya</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-accent" />
                <a href="tel:+254758174718" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  +254 758 174718
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-accent" />
                <a href="mailto:info@pecalirealestate.co.ke" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  info@pecalirealestate.co.ke
                </a>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-accent mt-1" />
                <div className="text-primary-foreground/80">
                  <p>Mon - Fri: 8:00 AM - 6:00 PM</p>
                  <p>Sat: 9:00 AM - 4:00 PM</p>
                  <p>Sun: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-primary-light/20" />

      {/* Bottom Footer */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-primary-foreground/80 text-sm">
            © 2025 PECALI Real Estate. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="/privacy" className="text-primary-foreground/80 hover:text-accent transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="text-primary-foreground/80 hover:text-accent transition-colors">
              Terms of Service
            </a>
            <a href="/cookies" className="text-primary-foreground/80 hover:text-accent transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;