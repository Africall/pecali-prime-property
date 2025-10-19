import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const GetStartedWizard = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState<Date>();
  const [lookingFor, setLookingFor] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!fullName.trim() || fullName.trim().length < 2) {
      toast.error("Please enter a valid name (at least 2 characters)");
      return;
    }
    
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    if (!phone.trim() || phone.trim().length < 8) {
      toast.error("Please enter a valid phone number");
      return;
    }
    
    if (!lookingFor.trim()) {
      toast.error("Please specify what you're looking for");
      return;
    }
    
    if (!date) {
      toast.error("Please select a preferred date for consultation");
      return;
    }

    setIsSubmitting(true);

    try {
      // Call the submit-service-inquiry edge function
      const { data, error } = await supabase.functions.invoke("submit-service-inquiry", {
        body: {
          service_type: "Get Started - Property Consultation",
          source: "get_started_form",
          full_name: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          message: `Looking for: ${lookingFor}\nPreferred Date: ${format(date, "PPP")}\n\nAdditional Details: ${message.trim() || "No additional details"}`,
        },
      });

      if (error) throw error;

      setIsSuccess(true);
      toast.success("Request submitted successfully!");
    } catch (error) {
      console.error("Error submitting request:", error);
      toast.error("Failed to submit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-16 px-6">
        <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Request Submitted Successfully! 🎉
        </h2>
        <p className="text-lg text-muted-foreground mb-8">
          Thank you for your interest. Our team will contact you within 24 hours to schedule your consultation.
        </p>
        <Button
          onClick={() => window.location.href = '/properties'}
          variant="outline"
          className="mx-auto"
        >
          Explore Properties
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
          Get Started with PECALI
        </h1>
        <p className="text-muted-foreground text-lg">
          Fill out the form below and let's begin your property journey together. Our team will contact you within 24 hours.
        </p>
      </div>

      {/* Source Badge */}
      <div className="mb-6 text-center">
        <Badge variant="secondary" className="text-sm py-2 px-4">
          Property Consultation Request
        </Badge>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-card rounded-2xl p-8 shadow-lg border">
        <div className="grid gap-6">
          {/* Full Name */}
          <div>
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="John Doe"
              required
              className="mt-2"
            />
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              required
              className="mt-2"
            />
          </div>

          {/* Phone */}
          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+254 712 345 678"
              required
              className="mt-2"
            />
          </div>

          {/* Looking For */}
          <div>
            <Label htmlFor="lookingFor">What are you looking for? *</Label>
            <select
              id="lookingFor"
              value={lookingFor}
              onChange={(e) => setLookingFor(e.target.value)}
              required
              className="mt-2 h-12 w-full rounded-md border border-input bg-background px-3 py-2"
            >
              <option value="">Select an option</option>
              <option value="Property to Buy">Property to Buy</option>
              <option value="Property to Rent">Property to Rent</option>
              <option value="Property Investment">Property Investment</option>
              <option value="Property Management">Property Management</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Preferred Date */}
          <div>
            <Label>Preferred Consultation Date *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal mt-2",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) => date < new Date()}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Message */}
          <div>
            <Label htmlFor="message">Additional Details (Optional)</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Any specific requirements or questions..."
              rows={4}
              className="mt-2"
            />
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            type="submit"
            className="flex-1 bg-gradient-primary hover:opacity-90"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </Button>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          We'll get in touch within 24 hours to schedule your consultation.
        </p>
      </form>
    </div>
  );
};

export default GetStartedWizard;