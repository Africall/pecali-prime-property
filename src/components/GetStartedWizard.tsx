import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle2, User, Phone, Home, Check, Shield, Clock, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const STEPS = [
  { id: 1, title: "Basic Info", icon: User },
  { id: 2, title: "Contact & Intent", icon: Phone },
  { id: 3, title: "Preferences", icon: Home },
  { id: 4, title: "Confirmation", icon: Check },
];

const LOOKING_FOR_OPTIONS = [
  "Property to Buy",
  "Property to Rent",
  "Property Investment",
  "Other",
];

const BUDGET_OPTIONS = [
  "Below Ksh 2M",
  "Ksh 2M–5M",
  "Ksh 5M–10M",
  "Above Ksh 10M",
];

const CHANNEL_OPTIONS = [
  { value: "Email", label: "📧 Email" },
  { value: "Phone", label: "📞 Phone Call" },
  { value: "WhatsApp", label: "💬 WhatsApp" },
];

const GetStartedWizard = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    lookingFor: "",
    budgetRange: "",
    preferredLocation: "",
    message: "",
    channel: "Email",
    consent: false,
  });

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (!formData.fullName.trim() || formData.fullName.trim().split(/\s+/).length < 2) {
          toast({
            title: "Full name required",
            description: "Please enter your first and last name",
            variant: "destructive",
          });
          return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email || !emailRegex.test(formData.email)) {
          toast({
            title: "Valid email required",
            description: "Please enter a valid email address",
            variant: "destructive",
          });
          return false;
        }
        return true;
      case 2:
        if (!formData.lookingFor) {
          toast({
            title: "Selection required",
            description: "Please tell us what you're looking for",
            variant: "destructive",
          });
          return false;
        }
        return true;
      case 3:
        return true; // All optional
      case 4:
        if (!formData.consent) {
          toast({
            title: "Consent required",
            description: "Please accept our privacy policy to continue",
            variant: "destructive",
          });
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('submit-get-started', {
        body: {
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone || null,
          looking_for: formData.lookingFor,
          budget_range: formData.budgetRange || null,
          preferred_location: formData.preferredLocation || null,
          message: formData.message || null,
          channel: formData.channel,
          consent: formData.consent,
          utm: {},
          referrer: document.referrer || null,
          page_url: window.location.href,
        },
      });

      if (error) throw error;

      setIsSuccess(true);
      
      toast({
        title: "Success! 🎉",
        description: "We've received your request and will contact you within 24 hours.",
      });
    } catch (error: any) {
      console.error('Submission error:', error);
      toast({
        title: "Submission Failed",
        description: error.message || "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16 px-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
        >
          <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
        </motion.div>
        <h2 className="text-3xl font-bold text-foreground mb-4">
          We've received your request! 🎉
        </h2>
        <p className="text-lg text-muted-foreground mb-8">
          A property consultant will contact you within 24 hours via {formData.channel}.
        </p>
        <Button
          onClick={() => window.location.href = '/properties'}
          variant="outline"
          className="mx-auto"
        >
          Explore Properties
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-foreground mb-3"
        >
          Get Started with Pecali Prime Property
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground text-lg mb-6"
        >
          Tell us a little about yourself and what you're looking for — we'll match you with the best options.
        </motion.p>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-6 mb-8"
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="w-4 h-4 text-primary" />
            Data Protected (Kenya DPA)
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4 text-primary" />
            Fast Response (24h)
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="w-4 h-4 text-primary" />
            Personalized Experience
          </div>
        </motion.div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            
            return (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <motion.div
                    animate={{
                      scale: isActive ? 1.1 : 1,
                      backgroundColor: isCompleted ? "hsl(var(--primary))" : isActive ? "hsl(var(--primary))" : "hsl(var(--muted))"
                    }}
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      isCompleted || isActive ? 'text-primary-foreground' : 'text-muted-foreground'
                    }`}
                  >
                    {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                  </motion.div>
                  <span className={`text-xs mt-2 hidden sm:block ${isActive ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                    {step.title}
                  </span>
                </div>
                {index < STEPS.length - 1 && (
                  <div className="flex-1 h-1 mx-2 bg-muted relative overflow-hidden rounded-full">
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: currentStep > step.id ? "100%" : "0%" }}
                      transition={{ duration: 0.3 }}
                      className="h-full bg-primary"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Steps */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-card rounded-2xl p-8 shadow-lg border"
        >
          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="fullName" className="text-base">Full Name *</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => updateField('fullName', e.target.value)}
                  className="mt-2 h-12"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-base">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className="mt-2 h-12"
                />
              </div>
            </div>
          )}

          {/* Step 2: Contact & Intent */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="phone" className="text-base">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="e.g., +2547XXXXXXXX"
                  value={formData.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  className="mt-2 h-12"
                />
              </div>
              <div>
                <Label htmlFor="lookingFor" className="text-base">What are you looking for? *</Label>
                <select
                  id="lookingFor"
                  value={formData.lookingFor}
                  onChange={(e) => updateField('lookingFor', e.target.value)}
                  className="mt-2 h-12 w-full rounded-md border border-input bg-background px-3 py-2"
                >
                  <option value="">Select an option</option>
                  {LOOKING_FOR_OPTIONS.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Step 3: Preferences */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="budgetRange" className="text-base">Budget Range</Label>
                <select
                  id="budgetRange"
                  value={formData.budgetRange}
                  onChange={(e) => updateField('budgetRange', e.target.value)}
                  className="mt-2 h-12 w-full rounded-md border border-input bg-background px-3 py-2"
                >
                  <option value="">Select a range (optional)</option>
                  {BUDGET_OPTIONS.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="preferredLocation" className="text-base">Preferred Location</Label>
                <Input
                  id="preferredLocation"
                  type="text"
                  placeholder="e.g., Kilimani, Westlands, Lavington"
                  value={formData.preferredLocation}
                  onChange={(e) => updateField('preferredLocation', e.target.value)}
                  className="mt-2 h-12"
                />
              </div>
              <div>
                <Label htmlFor="message" className="text-base">Additional Information</Label>
                <Textarea
                  id="message"
                  placeholder="Anything else you'd like us to know?"
                  value={formData.message}
                  onChange={(e) => updateField('message', e.target.value)}
                  className="mt-2 min-h-[100px]"
                />
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <Label className="text-base mb-3 block">Preferred Contact Method *</Label>
                <div className="space-y-3">
                  {CHANNEL_OPTIONS.map(option => (
                    <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="channel"
                        value={option.value}
                        checked={formData.channel === option.value}
                        onChange={(e) => updateField('channel', e.target.value)}
                        className="w-4 h-4"
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="border-t pt-6">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.consent}
                    onChange={(e) => updateField('consent', e.target.checked)}
                    className="w-5 h-5 mt-0.5"
                  />
                  <span className="text-sm text-muted-foreground">
                    I agree to the processing of my information under the Kenya Data Protection Act (2019) and Pecali's Privacy Policy. *
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            {currentStep > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={isSubmitting}
              >
                ← Back
              </Button>
            )}
            {currentStep < STEPS.length ? (
              <Button
                type="button"
                onClick={nextStep}
                className="ml-auto"
              >
                Continue →
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="ml-auto bg-gradient-primary hover:opacity-90"
              >
                {isSubmitting ? "Submitting..." : "Get Started →"}
              </Button>
            )}
          </div>

          {currentStep === 4 && (
            <p className="text-center text-sm text-muted-foreground mt-4">
              We'll get in touch within 24 hours.
            </p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default GetStartedWizard;