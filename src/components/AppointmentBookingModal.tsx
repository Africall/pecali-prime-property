import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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

interface AppointmentBookingModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  source: string;
  serviceType: string;
}

export const AppointmentBookingModal = ({
  open,
  setOpen,
  source,
  serviceType,
}: AppointmentBookingModalProps) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState<Date>();
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Reset form when modal opens
  useEffect(() => {
    if (open) {
      setFullName("");
      setEmail("");
      setPhone("");
      setDate(undefined);
      setMessage("");
      setIsSuccess(false);
    }
  }, [open]);

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
    
    if (!date) {
      toast.error("Please select a preferred date");
      return;
    }

    setIsSubmitting(true);

    try {
      // Call the submit-lead edge function
      const { data, error } = await supabase.functions.invoke("submit-lead", {
        body: {
          source: `appointment_${source}`,
          property_slug: null,
          full_name: fullName.trim(),
          phone: phone.trim(),
          message: `Service Type: ${serviceType}\nPreferred Date: ${format(date, "PPP")}\n\nMessage: ${message.trim() || "No additional message"}`,
        },
      });

      if (error) throw error;

      setIsSuccess(true);
      toast.success("Appointment request submitted successfully!");
      
      // Close modal after 3 seconds
      setTimeout(() => {
        setOpen(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting appointment:", error);
      toast.error("Failed to submit appointment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold">Book an Appointment</DialogTitle>
        </DialogHeader>

        {isSuccess ? (
          <div className="py-12 text-center">
            <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Request Submitted!</h3>
            <p className="text-muted-foreground mb-4">
              Thank you for your interest. Our team will contact you within 24 hours to confirm your appointment.
            </p>
          </div>
        ) : (
          <>
            {/* Source Badge */}
            <div className="mb-4">
              <Badge variant="secondary" className="text-sm py-2 px-4">
                Request Type: {serviceType}
              </Badge>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6">
                {/* Service Type - Read Only */}
                <div>
                  <Label htmlFor="serviceType">Service Type</Label>
                  <Input
                    id="serviceType"
                    value={serviceType}
                    readOnly
                    className="bg-muted"
                  />
                </div>

                {/* Full Name */}
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    required
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
                  />
                </div>

                {/* Preferred Date */}
                <div>
                  <Label>Preferred Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
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
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-primary hover:opacity-90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Request"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
