import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { X, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

type ContactModalProps = {
  open: boolean;
  setOpen: (v: boolean) => void;
  source: 'home_card' | 'property_page';
  propertySlug?: string;
  defaultMessage?: string;
  phoneFallback?: string;
};

export default function ContactModal({
  open,
  setOpen,
  source,
  propertySlug,
  defaultMessage = '',
  phoneFallback = '+254712345678'
}: ContactModalProps) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState(defaultMessage);
  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (open) {
      setFullName('');
      setPhone('');
      setMessage(defaultMessage || '');
      setStatus('idle');
      setError('');
    }
  }, [open, defaultMessage]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('saving');
    setError('');

    if (!fullName || !phone) {
      setError('Name and phone are required.');
      setStatus('idle');
      return;
    }

    try {
      const { data, error: invokeError } = await supabase.functions.invoke('submit-lead', {
        body: {
          source,
          property_slug: propertySlug ?? null,
          full_name: fullName,
          phone,
          message
        }
      });

      if (invokeError) {
        console.error('Function invocation error:', invokeError);
        setError('Failed to submit enquiry. Please try again.');
        setStatus('error');
        return;
      }

      if (data?.error) {
        setError(data.error);
        setStatus('error');
      } else {
        setStatus('success');
      }
    } catch (err: any) {
      console.error('Submission error:', err);
      setError('An unexpected error occurred. Please try again.');
      setStatus('error');
    }
  }

  const callNow = () => {
    if (phoneFallback) window.open(`tel:${phoneFallback}`, '_self');
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            className="bg-background rounded-2xl p-6 w-full max-w-md shadow-2xl relative border border-border"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-bold text-foreground mb-2">Enquire Now</h3>
            <p className="text-sm text-muted-foreground mb-6">
              We'll get back to you within 24 hours
            </p>

            {status === 'success' ? (
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
                  <p className="text-green-800 dark:text-green-200 font-medium">
                    Thank you! We've received your enquiry.
                  </p>
                  <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                    Our team will reach out shortly.
                  </p>
                </div>
                <Button
                  onClick={callNow}
                  variant="outline"
                  className="w-full"
                  size="lg"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </Button>
                <Button onClick={() => setOpen(false)} className="w-full" size="lg">
                  Close
                </Button>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={submit}>
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-2">
                    Full Name *
                  </label>
                  <Input
                    id="fullName"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                    Phone Number *
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+254 712 345 678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tell us more about your requirements..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                  />
                </div>
                {error && (
                  <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 p-3 rounded-lg">
                    {error}
                  </p>
                )}
                <div className="flex gap-3">
                  <Button
                    type="submit"
                    disabled={status === 'saving'}
                    className="flex-1"
                    size="lg"
                  >
                    {status === 'saving' ? 'Sending…' : 'Send Enquiry'}
                  </Button>
                  <Button
                    type="button"
                    onClick={callNow}
                    variant="outline"
                    size="lg"
                    className="flex-1"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </Button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
