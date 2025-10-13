import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { resolvePdfUrl } from '@/lib/storage';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyMediaPanel from '@/components/PropertyMediaPanel';
import PdfDebug from '@/components/PdfDebug';
import { ArrowLeft, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

interface Property {
  id: string;
  slug: string;
  title: string;
  location: string;
  price_label: string;
  pdf_path: string;
  cover_page: number;
  gallery_pages: number[];
  floorplan_pages: number[];
  meta: any;
}

export default function PropertyDetail() {
  const { slug } = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [pdfUrl, setPdfUrl] = useState<string>('');
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchProperty() {
      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .eq('slug', slug)
          .maybeSingle();

        if (error) throw error;
        if (cancelled) return;

        if (data) {
          setProperty(data);
          // Resolve the PDF URL to handle both storage and public paths
          const url = await resolvePdfUrl(data.pdf_path);
          setPdfUrl(url);
        }
      } catch (err) {
        console.error('Error fetching property:', err);
        if (!cancelled) setError(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchProperty();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-nav">
        {/* Hero Section */}
        <section className="scroll-offset pt-10 pb-8 bg-gradient-to-b from-[#0D47A1] to-[#0D47A1]/90 text-white">
          <div className="container mx-auto px-4">
            <Button asChild variant="ghost" className="text-white hover:text-white/90 mb-4">
              <Link to="/properties">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Properties
              </Link>
            </Button>

            {loading ? (
              <div className="space-y-3">
                <Skeleton className="h-12 w-96 bg-white/20" />
                <Skeleton className="h-6 w-64 bg-white/20" />
                <Skeleton className="h-8 w-48 bg-white/20" />
              </div>
            ) : property ? (
              <>
                <h1 className="text-4xl md:text-5xl font-bold mb-3">{property.title}</h1>
                <div className="flex items-center gap-2 text-white/90 mb-4">
                  <MapPin className="w-5 h-5" />
                  <span className="text-lg">{property.location}</span>
                </div>
                <div className="text-2xl font-semibold">{property.price_label}</div>
              </>
            ) : (
              <h1 className="text-4xl font-bold">Property not found</h1>
            )}
          </div>
        </section>

        {/* Content Section */}
        <section className="container mx-auto px-4 py-12">
          {loading ? (
            <div className="space-y-6">
              <Skeleton className="h-96 w-full" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-64 w-full" />
                ))}
              </div>
            </div>
          ) : property ? (
            <div className="space-y-6">
              {/* Debug banner - only shows when there's an issue */}
              <PdfDebug label="PDF URL" value={pdfUrl} error={error} />
              
              <PropertyMediaPanel
                title={property.title}
                pdfUrl={pdfUrl}
                coverPage={property.cover_page}
                galleryPages={property.gallery_pages}
                floorplanPages={property.floorplan_pages}
              />
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                The property you're looking for doesn't exist.
              </p>
              <Button asChild className="mt-4">
                <Link to="/properties">View All Properties</Link>
              </Button>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
