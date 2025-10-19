import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import logo from "@/assets/pecali_logo.png";
import { AppointmentBookingModal } from "@/components/AppointmentBookingModal";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [appointmentOpen, setAppointmentOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Properties", href: "/properties" },
    { label: "Services", href: "/services" },
    { label: "Training", href: "/training" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav className="bg-background/95 backdrop-blur-md border-b border-border shadow-card">
      <div className="container mx-auto px-2">
        {/* Main navigation */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/">
            <img 
              src={logo} 
              alt="PECALI Real Estate" 
              className="
                h-10 w-auto hover:scale-105 transition-transform duration-200
                md:h-32
                p-0 m-0
              "
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="text-foreground hover:text-primary transition-colors duration-200 font-medium px-1"
              >
                {item.label}
              </Link>
            ))}
            <Link to="/auth">
              <Button 
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Login
              </Button>
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button 
              className="bg-gradient-primary hover:bg-gradient-luxury shadow-gold px-3 py-1"
              onClick={() => setAppointmentOpen(true)}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-1 text-foreground hover:text-primary transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-96 pb-2" : "max-h-0"
        )}>
          <div className="space-y-2 pt-2 border-t border-border">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="block text-foreground hover:text-primary transition-colors duration-200 font-medium px-1"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link to="/auth" onClick={() => setIsOpen(false)}>
              <Button
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground mb-2"
              >
                Login
              </Button>
            </Link>
            <Button
              onClick={() => {
                setIsOpen(false);
                setAppointmentOpen(true);
              }}
              className="w-full bg-gradient-primary hover:bg-gradient-luxury shadow-gold mt-2 px-3 py-1"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
      
      <AppointmentBookingModal
        open={appointmentOpen}
        setOpen={setAppointmentOpen}
        source="get_started"
        serviceType="General Inquiry"
      />
    </nav>
  );
};

export default Navbar;