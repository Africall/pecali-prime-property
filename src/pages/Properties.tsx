import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LogoRain from "@/components/LogoRain";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { resolvePdfUrl } from "@/lib/storage";

const Properties = () => {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data } = await supabase
        .from('properties')
        .select('slug, title, location, price_label, pdf_path, cover_page')
        .order('created_at', { ascending: false });

      if (data) {
        const out: any[] = [];
        for (const p of data) {
          const pdfUrl = await resolvePdfUrl(p.pdf_path);
          out.push({ ...p, pdfUrl });
        }
        setProperties(out);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <LogoRain />
      <Navbar />
      
      <main className="pt-nav relative z-10">
        {/* Hero Section */}
        <section className="scroll-offset pt-16 pb-12 bg-gradient-to-b from-primary to-primary/90 text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              All Properties
            </h1>
            <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
              Browse our complete collection of premium developments
            </p>
          </div>
        </section>

        {/* Properties Grid */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="text-center py-20">
                <p className="text-lg text-muted-foreground">Loading properties...</p>
              </div>
            ) : properties.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-lg text-muted-foreground">No properties found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((p) => (
                  <div 
                    key={p.slug} 
                    className="group rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300 bg-card cursor-pointer"
                    onClick={() => navigate(`/properties/${p.slug}`)}
                  >
                    <div className="relative overflow-hidden bg-muted" style={{ aspectRatio: '3 / 2' }}>
                      <iframe
                        src={`${p.pdfUrl}#page=${p.cover_page ?? 1}&toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                        className="absolute inset-0 w-full h-full pointer-events-none"
                        title={p.title}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
                    </div>
                    <div className="p-5 space-y-3">
                      <h3 className="font-bold text-xl text-card-foreground line-clamp-1">
                        {p.title}
                      </h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <MapPin className="w-4 h-4 flex-shrink-0" />
                        <span className="line-clamp-1">{p.location}</span>
                      </p>
                      <p className="text-base font-semibold text-primary">
                        {p.price_label}
                      </p>
                      <Button className="w-full mt-3" size="sm">
                        View Details
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Properties;
