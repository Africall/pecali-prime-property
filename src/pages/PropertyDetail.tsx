import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactModal from '@/components/ContactModal';
import { ArrowLeft, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import elitzCover from '@/assets/elitz-cover.jpg';
import elitzExterior1 from '@/assets/elitz-exterior-1.jpg';
import elitzExterior2 from '@/assets/elitz-exterior-2.jpg';
import elitzLiving from '@/assets/elitz-living.jpg';
import elitzDining from '@/assets/elitz-dining.jpg';
import elitzTexture from '@/assets/elitz-texture.jpg';
import elitzEntrance from '@/assets/elitz-entrance.jpg';
import elitzKitchen from '@/assets/elitz-kitchen.jpg';
import elitzBathroom from '@/assets/elitz-bathroom.jpg';
import elitzRooftop from '@/assets/elitz-rooftop.jpg';

interface Property {
  id: string;
  slug: string;
  title: string;
  location: string;
  price_label: string;
  meta: any;
}

export default function PropertyDetail() {
  const { slug } = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchProperty() {
      try {
        setLoading(true);
        console.log('Fetching property with slug:', slug);

        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .eq('slug', slug)
          .maybeSingle();

        if (error) throw error;
        if (cancelled) return;

        if (data) {
          console.log('Property data loaded:', data);
          setProperty(data);
        } else {
          console.log('No property found for slug:', slug);
        }
      } catch (err) {
        console.error('Error fetching property:', err);
      } finally {
        if (!cancelled) {
          setLoading(false);
          console.log('Loading complete. Property:', property);
        }
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
        {/* Compact Header */}
        <section className="scroll-offset pt-6 pb-4 bg-gradient-to-b from-[hsl(220,91%,37%)] to-[hsl(220,91%,37%)]/90 text-white dark:from-[hsl(220,91%,37%)] dark:to-[hsl(220,91%,37%)]/90 dark:text-white">
          <div className="container mx-auto px-3 sm:px-4">
            <Button asChild variant="ghost" className="text-white hover:text-white/90 mb-3 -ml-2">
              <Link to="/properties">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Link>
            </Button>

            {loading ? (
              <div className="space-y-2">
                <Skeleton className="h-8 w-80 bg-white/20" />
                <Skeleton className="h-5 w-60 bg-white/20" />
              </div>
            ) : property ? (
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold leading-tight mb-2">
                    {property.title}
                  </h1>
                  <div className="flex items-center gap-2 text-white/90 text-sm mb-1">
                    <MapPin className="w-4 h-4" />
                    <span>{property.location}</span>
                  </div>
                  <div className="text-lg font-semibold">{property.price_label}</div>
                </div>
                <Button 
                  onClick={() => setContactOpen(true)}
                  variant="secondary"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Enquire Now
                </Button>
              </div>
            ) : (
              <h1 className="text-2xl font-bold">Property not found</h1>
            )}
          </div>
        </section>

        {/* Compact Content */}
        <section className="container mx-auto px-3 sm:px-4 pt-4 pb-8">
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-80 w-full" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-48 w-full" />
                ))}
              </div>
            </div>
          ) : property ? (
            <>
              {property.slug === 'elitz-residency' ? (
                <div className="space-y-4">
                  {/* Featured Hero Image */}
                  <div className="relative overflow-hidden rounded-xl shadow-luxury group cursor-zoom-in max-w-5xl mx-auto">
                    <img 
                      src={elitzCover} 
                      alt="Elitz Residency - Rumi Rd Nairobi" 
                      className="w-full h-auto transform transition-all duration-500 group-hover:scale-150 origin-center"
                    />
                  </div>
                  
                  {/* Dynamic Grid Layout */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                    {/* Large feature - spans 2 columns */}
                    <div className="col-span-2 row-span-2 relative overflow-hidden rounded-lg shadow-card group cursor-zoom-in">
                      <img 
                        src={elitzExterior1} 
                        alt="Elitz Residency Building Exterior" 
                        className="w-full h-full object-cover transform transition-all duration-500 group-hover:scale-150 origin-center"
                      />
                    </div>
                    
                    {/* Standard grid items */}
                    <div className="relative overflow-hidden rounded-lg shadow-card group cursor-zoom-in">
                      <img 
                        src={elitzExterior2} 
                        alt="Elitz Residency Architecture" 
                        className="w-full h-full object-cover transform transition-all duration-500 group-hover:scale-150 origin-center"
                      />
                    </div>
                    
                    <div className="relative overflow-hidden rounded-lg shadow-card group cursor-zoom-in">
                      <img 
                        src={elitzLiving} 
                        alt="Elitz Residency Living Room" 
                        className="w-full h-full object-cover transform transition-all duration-500 group-hover:scale-150 origin-center"
                      />
                    </div>
                    
                    <div className="relative overflow-hidden rounded-lg shadow-card group cursor-zoom-in">
                      <img 
                        src={elitzDining} 
                        alt="Elitz Residency Dining Area" 
                        className="w-full h-full object-cover transform transition-all duration-500 group-hover:scale-150 origin-center"
                      />
                    </div>
                    
                    <div className="relative overflow-hidden rounded-lg shadow-card group cursor-zoom-in">
                      <img 
                        src={elitzTexture} 
                        alt="Elitz Residency Interior Design" 
                        className="w-full h-full object-cover transform transition-all duration-500 group-hover:scale-150 origin-center"
                      />
                    </div>
                    
                    {/* Tall feature - spans 2 rows */}
                    <div className="row-span-2 relative overflow-hidden rounded-lg shadow-card group cursor-zoom-in">
                      <img 
                        src={elitzEntrance} 
                        alt="Elitz Residency Entrance" 
                        className="w-full h-full object-cover transform transition-all duration-500 group-hover:scale-150 origin-center"
                      />
                    </div>
                    
                    <div className="relative overflow-hidden rounded-lg shadow-card group cursor-zoom-in">
                      <img 
                        src={elitzKitchen} 
                        alt="Elitz Residency Modern Kitchen" 
                        className="w-full h-full object-cover transform transition-all duration-500 group-hover:scale-150 origin-center"
                      />
                    </div>
                    
                    <div className="relative overflow-hidden rounded-lg shadow-card group cursor-zoom-in">
                      <img 
                        src={elitzBathroom} 
                        alt="Elitz Residency Bathroom" 
                        className="w-full h-full object-cover transform transition-all duration-500 group-hover:scale-150 origin-center"
                      />
                    </div>
                    
                    {/* Wide feature - spans 2 columns */}
                    <div className="col-span-2 relative overflow-hidden rounded-lg shadow-card group cursor-zoom-in">
                      <img 
                        src={elitzRooftop} 
                        alt="Elitz Residency Rooftop Lounge" 
                        className="w-full h-full object-cover transform transition-all duration-500 group-hover:scale-150 origin-center"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-lg text-muted-foreground">
                    Property details are being updated. Please check back soon.
                  </p>
                </div>
              )}
            </>
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

      <ContactModal
        open={contactOpen}
        setOpen={setContactOpen}
        source="property_page"
        propertySlug={property?.slug}
        defaultMessage={property ? `I'm interested in ${property.title}.` : ''}
        phoneFallback="+254712345678"
      />

      <Footer />
    </div>
  );
}
