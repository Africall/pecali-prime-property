import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactModal from '@/components/ContactModal';
import ImageLightbox from '@/components/ImageLightbox';
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
import elitzBedroom2 from '@/assets/elitz-bedroom-2.jpg';
import elitzLiving2 from '@/assets/elitz-living-2.jpg';
import elitzDiningKitchen from '@/assets/elitz-dining-kitchen.jpg';
import elitzFloorplan2brA from '@/assets/elitz-floorplan-2br-a.jpg';
import elitzFloorplan2brB from '@/assets/elitz-floorplan-2br-b.jpg';
import elitzFloorplan3brC from '@/assets/elitz-floorplan-3br-c.jpg';
import elitzFloorplan3brD from '@/assets/elitz-floorplan-3br-d.jpg';
import elitzFloorplan4brE from '@/assets/elitz-floorplan-4br-e.jpg';
import elitzPlayground from '@/assets/elitz-playground.jpg';
import elitzAmenitiesLobby from '@/assets/elitz-amenities-lobby.jpg';
import elitzLounge from '@/assets/elitz-lounge.jpg';
import elitzMainBuilding from '@/assets/elitz-main-building.jpg';
import elitzLocation from '@/assets/elitz-location.jpg';
import elitzBrochureCover from '@/assets/elitz-brochure-cover.jpg';
import mangoTreeCover from '@/assets/mango-tree-cover-new.jpg';
import mangoTreeCoverOriginal from '@/assets/mango-tree-cover.jpg';
import mangoTreeFloorplan3brA from '@/assets/mango-tree-floorplan-3br-a.jpg';
import mangoTreeFloorplan3brB from '@/assets/mango-tree-floorplan-3br-b.jpg';
import mangoTreeFloorplan3brD from '@/assets/mango-tree-floorplan-3br-d.jpg';
import mangoTreeFloorplan2brC from '@/assets/mango-tree-floorplan-2br-c.jpg';
import mangoTreeFloorplan3brG from '@/assets/mango-tree-floorplan-3br-g.jpg';
import mangoTreeFloorplan2brF from '@/assets/mango-tree-floorplan-2br-f.jpg';
import mangoTreeFloorplan1brE from '@/assets/mango-tree-floorplan-1br-e.jpg';
import mangoTreeAmenities from '@/assets/mango-tree-amenities.jpg';
import mangoTreeLocation from '@/assets/mango-tree-location-new.jpg';
import mangoTreeAmenitiesNew from '@/assets/mango-tree-amenities-new.jpg';
import mangoTreeNationalParkView from '@/assets/mango-tree-national-park-view.jpg';
import appleTreeCover from '@/assets/apple-tree-cover-new.jpg';
import appleTreeFloorplan3brA from '@/assets/apple-tree-floorplan-3br-a.jpg';
import appleTreeFloorplan3brD from '@/assets/apple-tree-floorplan-3br-d.jpg';
import appleTreeFloorplan2brB from '@/assets/apple-tree-floorplan-2br-b.jpg';
import appleTreeFloorplan2brC from '@/assets/apple-tree-floorplan-2br-c.jpg';
import appleTreeFloorplan3brPenthouse from '@/assets/apple-tree-floorplan-3br-penthouse.jpg';
import appleTreeFloorplan4brPenthouse from '@/assets/apple-tree-floorplan-4br-penthouse.jpg';
import appleTreeFloorplan5brPenthouse from '@/assets/apple-tree-floorplan-5br-penthouse.jpg';
import appleTreeFloorplan6brPenthouse from '@/assets/apple-tree-floorplan-6br-penthouse.jpg';
import appleTreeInteriors from '@/assets/apple-tree-interiors.jpg';
import appleTreeExternalViews from '@/assets/apple-tree-external-views.jpg';
import appleTreeAmenities from '@/assets/apple-tree-amenities-new.jpg';
import geminiExteriorCourtyard from '@/assets/gemini-exterior-courtyard.jpg';
import geminiPool1 from '@/assets/gemini-pool-1.jpg';
import geminiPool2 from '@/assets/gemini-pool-2.jpg';
import geminiFloorplanStudio from '@/assets/gemini-floorplan-studio.jpg';
import geminiFloorplan1br from '@/assets/gemini-floorplan-1br.jpg';
import geminiFloorplan2br from '@/assets/gemini-floorplan-2br.jpg';
import geminiFloorplanSuper2br from '@/assets/gemini-floorplan-super-2br.jpg';
import geminiFloorplan3br from '@/assets/gemini-floorplan-3br.jpg';
import geminiFloorplanSuper3br from '@/assets/gemini-floorplan-super-3br.jpg';
import geminiFloorplan4br from '@/assets/gemini-floorplan-4br.jpg';
import geminiCourtyardGarden from '@/assets/gemini-courtyard-garden.jpg';
import geminiCourtyardParking from '@/assets/gemini-courtyard-parking.jpg';
import geminiExteriorBuildings from '@/assets/gemini-exterior-buildings.jpg';
import azureSkyCover from '@/assets/azure-sky-cover.jpg';
import azureSkyOverview from '@/assets/azure-sky-overview.jpg';
import azureSkyAmenities from '@/assets/azure-sky-amenities.jpg';
import azureSkyFloorplansOverview from '@/assets/azure-sky-floorplans-overview.jpg';
import azureSky1br from '@/assets/azure-sky-1br.jpg';
import azureSky2br from '@/assets/azure-sky-2br.jpg';
import azureSky3br from '@/assets/azure-sky-3br.jpg';
import azureSky4br from '@/assets/azure-sky-4br.jpg';
import azureSkyFeatures from '@/assets/azure-sky-features.jpg';
import azureSkyLocation from '@/assets/azure-sky-location.jpg';
import urbanParkExteriorEntrance from '@/assets/urban-park-exterior-entrance.jpg';
import urbanParkAerial1 from '@/assets/urban-park-aerial-1.jpg';
import urbanParkAerial2 from '@/assets/urban-park-aerial-2.jpg';
import urbanParkKitchen from '@/assets/urban-park-kitchen.jpg';
import urbanParkLivingDining from '@/assets/urban-park-living-dining.jpg';
import urbanParkBedroom1 from '@/assets/urban-park-bedroom-1.jpg';
import urbanParkBedroom2 from '@/assets/urban-park-bedroom-2.jpg';
import urbanParkExteriorFront from '@/assets/urban-park-exterior-front.jpg';
import urbanParkLivingOpen from '@/assets/urban-park-living-open.jpg';
import urbanParkExteriorFinal from '@/assets/urban-park-exterior-final.jpg';
import urbanParkBathroom from '@/assets/urban-park-bathroom.jpg';
import urbanParkExteriorStreet from '@/assets/urban-park-exterior-street.jpg';
import urbanParkLivingModern from '@/assets/urban-park-living-modern.jpg';
import urbanParkBedroom3 from '@/assets/urban-park-bedroom-3.jpg';

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
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const elitzImages = [
    elitzCover,
    elitzExterior1,
    elitzExterior2,
    elitzLiving,
    elitzDining,
    elitzTexture,
    elitzEntrance,
    elitzKitchen,
    elitzBathroom,
    elitzRooftop,
    elitzBedroom2,
    elitzLiving2,
    elitzDiningKitchen,
    elitzFloorplan2brA,
    elitzFloorplan2brB,
    elitzFloorplan3brC,
    elitzFloorplan3brD,
    elitzFloorplan4brE,
    elitzPlayground,
    elitzAmenitiesLobby,
    elitzLounge,
    elitzMainBuilding,
    elitzLocation,
    elitzBrochureCover,
  ];

  const mangoTreeImages = [
    mangoTreeCover,
    mangoTreeCoverOriginal,
    mangoTreeFloorplan3brA,
    mangoTreeFloorplan3brB,
    mangoTreeFloorplan3brD,
    mangoTreeFloorplan2brC,
    mangoTreeFloorplan3brG,
    mangoTreeFloorplan2brF,
    mangoTreeFloorplan1brE,
    mangoTreeAmenities,
    mangoTreeNationalParkView,
    mangoTreeLocation,
    mangoTreeAmenitiesNew,
  ];

  const appleTreeImages = [
    appleTreeCover,
    appleTreeFloorplan3brA,
    appleTreeFloorplan3brD,
    appleTreeFloorplan2brB,
    appleTreeFloorplan2brC,
    appleTreeFloorplan3brPenthouse,
    appleTreeFloorplan4brPenthouse,
    appleTreeFloorplan5brPenthouse,
    appleTreeFloorplan6brPenthouse,
    appleTreeInteriors,
    appleTreeExternalViews,
    appleTreeAmenities,
  ];

  const geminiImages = [
    geminiExteriorCourtyard,
    geminiPool1,
    geminiPool2,
    geminiFloorplanStudio,
    geminiFloorplan1br,
    geminiFloorplan2br,
    geminiFloorplanSuper2br,
    geminiFloorplan3br,
    geminiFloorplanSuper3br,
    geminiFloorplan4br,
    geminiCourtyardGarden,
    geminiCourtyardParking,
    geminiExteriorBuildings,
  ];

  const azureSkyParkImages = [
    azureSkyCover,
    azureSkyOverview,
    azureSkyAmenities,
    azureSky1br,
    azureSky2br,
    azureSky3br,
    azureSky4br,
    azureSkyFloorplansOverview,
    azureSkyFeatures,
    azureSkyLocation,
  ];

  const urbanParkImages = [
    urbanParkExteriorEntrance,
    urbanParkAerial1,
    urbanParkAerial2,
    urbanParkKitchen,
    urbanParkLivingDining,
    urbanParkBedroom1,
    urbanParkBedroom2,
    urbanParkBathroom,
    urbanParkExteriorFront,
    urbanParkExteriorStreet,
    urbanParkLivingModern,
    urbanParkBedroom3,
    urbanParkLivingOpen,
    urbanParkExteriorFinal,
  ];

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
                  <div 
                    className="relative overflow-hidden rounded-xl shadow-luxury cursor-pointer max-w-5xl mx-auto h-[400px] md:h-[600px] lg:h-[700px]"
                    onClick={() => setLightboxIndex(0)}
                  >
                    <img 
                      src={elitzCover} 
                      alt="Elitz Residency - Rumi Rd Nairobi" 
                      className="w-full h-full object-contain bg-muted"
                    />
                  </div>
                  
                  {/* Dynamic Grid Layout */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                    {/* Large feature - spans 2 columns */}
                    <div 
                      className="col-span-2 row-span-2 relative overflow-hidden rounded-lg shadow-card cursor-pointer h-64 md:h-96"
                      onClick={() => setLightboxIndex(1)}
                    >
                      <img 
                        src={elitzExterior1} 
                        alt="Elitz Residency Building Exterior" 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    {/* Standard grid items */}
                    <div 
                      className="relative overflow-hidden rounded-lg shadow-card cursor-pointer h-32 md:h-44"
                      onClick={() => setLightboxIndex(2)}
                    >
                      <img 
                        src={elitzExterior2} 
                        alt="Elitz Residency Architecture" 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    <div 
                      className="relative overflow-hidden rounded-lg shadow-card cursor-pointer h-32 md:h-44"
                      onClick={() => setLightboxIndex(3)}
                    >
                      <img 
                        src={elitzLiving} 
                        alt="Elitz Residency Living Room" 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    <div 
                      className="relative overflow-hidden rounded-lg shadow-card cursor-pointer h-32 md:h-44"
                      onClick={() => setLightboxIndex(4)}
                    >
                      <img 
                        src={elitzDining} 
                        alt="Elitz Residency Dining Area" 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    <div 
                      className="relative overflow-hidden rounded-lg shadow-card cursor-pointer h-32 md:h-44"
                      onClick={() => setLightboxIndex(5)}
                    >
                      <img 
                        src={elitzTexture} 
                        alt="Elitz Residency Interior Design" 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    {/* Tall feature - spans 2 rows */}
                    <div 
                      className="row-span-2 relative overflow-hidden rounded-lg shadow-card cursor-pointer h-64 md:h-96"
                      onClick={() => setLightboxIndex(6)}
                    >
                      <img 
                        src={elitzEntrance} 
                        alt="Elitz Residency Entrance" 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    <div 
                      className="relative overflow-hidden rounded-lg shadow-card cursor-pointer h-32 md:h-44"
                      onClick={() => setLightboxIndex(7)}
                    >
                      <img 
                        src={elitzKitchen} 
                        alt="Elitz Residency Modern Kitchen" 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    <div 
                      className="relative overflow-hidden rounded-lg shadow-card cursor-pointer h-32 md:h-44"
                      onClick={() => setLightboxIndex(8)}
                    >
                      <img 
                        src={elitzBathroom} 
                        alt="Elitz Residency Bathroom" 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    {/* Wide feature - spans 2 columns */}
                    <div 
                      className="col-span-2 relative overflow-hidden rounded-lg shadow-card cursor-pointer h-40 md:h-56"
                      onClick={() => setLightboxIndex(9)}
                    >
                      <img 
                        src={elitzRooftop} 
                        alt="Elitz Residency Rooftop Lounge" 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    {/* Additional images - continuation */}
                    <div 
                      className="relative overflow-hidden rounded-lg shadow-card cursor-pointer h-32 md:h-44"
                      onClick={() => setLightboxIndex(10)}
                    >
                      <img 
                        src={elitzBedroom2} 
                        alt="Elitz Residency Modern Bedroom" 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    <div 
                      className="relative overflow-hidden rounded-lg shadow-card cursor-pointer h-32 md:h-44"
                      onClick={() => setLightboxIndex(11)}
                    >
                      <img 
                        src={elitzLiving2} 
                        alt="Elitz Residency Living Area" 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    <div 
                      className="col-span-2 relative overflow-hidden rounded-lg shadow-card cursor-pointer h-40 md:h-56"
                      onClick={() => setLightboxIndex(12)}
                    >
                      <img 
                        src={elitzDiningKitchen} 
                        alt="Elitz Residency Dining & Kitchen" 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    <div 
                      className="relative overflow-hidden rounded-lg shadow-card cursor-pointer h-32 md:h-44"
                      onClick={() => setLightboxIndex(13)}
                    >
                      <img 
                        src={elitzFloorplan2brA} 
                        alt="Elitz Residency 2 Bedroom Floor Plan Unit A" 
                        className="w-full h-full object-contain bg-white transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    <div 
                      className="relative overflow-hidden rounded-lg shadow-card cursor-pointer h-32 md:h-44"
                      onClick={() => setLightboxIndex(14)}
                    >
                      <img 
                        src={elitzFloorplan2brB} 
                        alt="Elitz Residency 2 Bedroom Floor Plan Unit B" 
                        className="w-full h-full object-contain bg-white transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    <div 
                      className="row-span-2 relative overflow-hidden rounded-lg shadow-card cursor-pointer h-64 md:h-96"
                      onClick={() => setLightboxIndex(15)}
                    >
                      <img 
                        src={elitzFloorplan3brC} 
                        alt="Elitz Residency 3 Bedroom Floor Plan Unit C" 
                        className="w-full h-full object-contain bg-white transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    <div 
                      className="relative overflow-hidden rounded-lg shadow-card cursor-pointer h-32 md:h-44"
                      onClick={() => setLightboxIndex(16)}
                    >
                      <img 
                        src={elitzFloorplan3brD} 
                        alt="Elitz Residency 3 Bedroom Floor Plan Unit D" 
                        className="w-full h-full object-contain bg-white transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    <div 
                      className="relative overflow-hidden rounded-lg shadow-card cursor-pointer h-32 md:h-44"
                      onClick={() => setLightboxIndex(17)}
                    >
                      <img 
                        src={elitzFloorplan4brE} 
                        alt="Elitz Residency 4 Bedroom Floor Plan Unit E" 
                        className="w-full h-full object-contain bg-white transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    <div 
                      className="col-span-2 relative overflow-hidden rounded-lg shadow-card cursor-pointer h-40 md:h-56"
                      onClick={() => setLightboxIndex(18)}
                    >
                      <img 
                        src={elitzPlayground} 
                        alt="Elitz Residency Kids Play Area" 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    <div 
                      className="col-span-2 relative overflow-hidden rounded-lg shadow-card cursor-pointer h-40 md:h-56"
                      onClick={() => setLightboxIndex(19)}
                    >
                      <img 
                        src={elitzAmenitiesLobby} 
                        alt="Elitz Residency Entrance Lobby & Amenities" 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    <div 
                      className="col-span-2 relative overflow-hidden rounded-lg shadow-card cursor-pointer h-40 md:h-56"
                      onClick={() => setLightboxIndex(20)}
                    >
                      <img 
                        src={elitzLounge} 
                        alt="Elitz Residency Elevator Lounge" 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    <div 
                      className="col-span-2 relative overflow-hidden rounded-lg shadow-card cursor-pointer h-40 md:h-56"
                      onClick={() => setLightboxIndex(21)}
                    >
                      <img 
                        src={elitzMainBuilding} 
                        alt="Elitz Residency Building - 3KM from Wilson Airport" 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    <div 
                      className="col-span-2 relative overflow-hidden rounded-lg shadow-card cursor-pointer h-40 md:h-56"
                      onClick={() => setLightboxIndex(22)}
                    >
                      <img 
                        src={elitzLocation} 
                        alt="Elitz Residency Location Map - Rumi Rd" 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    <div 
                      className="col-span-2 relative overflow-hidden rounded-lg shadow-card cursor-pointer h-40 md:h-56"
                      onClick={() => setLightboxIndex(23)}
                    >
                      <img 
                        src={elitzBrochureCover} 
                        alt="Elitz Residency - Rumi Rd Nairobi" 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  </div>
                </div>
              ) : property.slug === 'mango-tree' ? (
                <div className="space-y-4">
                  {/* Featured Hero Image */}
                  <div 
                    className="relative overflow-hidden rounded-xl shadow-luxury cursor-pointer max-w-5xl mx-auto h-[400px] md:h-[600px] lg:h-[700px]"
                    onClick={() => setLightboxIndex(0)}
                  >
                    <img 
                      src={mangoTreeCover} 
                      alt="Mango Tree Residence - Nairobi National Park" 
                      className="w-full h-full object-contain bg-muted"
                    />
                  </div>
                  
                  {/* Dynamic Grid Layout */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                    {/* Large feature - spans 2 columns - Original Cover */}
                    <div 
                      className="col-span-2 row-span-2 relative overflow-hidden rounded-lg shadow-card cursor-pointer h-64 md:h-96"
                      onClick={() => setLightboxIndex(1)}
                    >
                      <img 
                        src={mangoTreeCoverOriginal} 
                        alt="Mango Tree Residence Cover" 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    {/* Standard grid items */}
                    <div 
                      className="relative overflow-hidden rounded-lg shadow-card cursor-pointer h-32 md:h-44"
                      onClick={() => setLightboxIndex(2)}
                    >
                      <img 
                        src={mangoTreeFloorplan3brA} 
                        alt="Mango Tree 3 Bedroom Floor Plan Type A" 
                        className="w-full h-full object-contain bg-white transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    <div 
                      className="relative overflow-hidden rounded-lg shadow-card cursor-pointer h-32 md:h-44"
                      onClick={() => setLightboxIndex(3)}
                    >
                      <img 
                        src={mangoTreeFloorplan3brB} 
                        alt="Mango Tree 3 Bedroom Floor Plan Type B" 
                        className="w-full h-full object-contain bg-white transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    <div 
                      className="relative overflow-hidden rounded-lg shadow-card cursor-pointer h-32 md:h-44"
                      onClick={() => setLightboxIndex(4)}
                    >
                      <img 
                        src={mangoTreeFloorplan3brD} 
                        alt="Mango Tree 3 Bedroom Floor Plan Type D" 
                        className="w-full h-full object-contain bg-white transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    <div 
                      className="relative overflow-hidden rounded-lg shadow-card cursor-pointer h-32 md:h-44"
                      onClick={() => setLightboxIndex(5)}
                    >
                      <img 
                        src={mangoTreeFloorplan2brC} 
                        alt="Mango Tree 2 Bedroom Floor Plan Type C" 
                        className="w-full h-full object-contain bg-white transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    <div 
                      className="relative overflow-hidden rounded-lg shadow-card cursor-pointer h-32 md:h-44"
                      onClick={() => setLightboxIndex(6)}
                    >
                      <img 
                        src={mangoTreeFloorplan3brG} 
                        alt="Mango Tree 3 Bedroom Floor Plan Type G" 
                        className="w-full h-full object-contain bg-white transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    {/* Tall feature - spans 2 rows */}
                    <div 
                      className="row-span-2 relative overflow-hidden rounded-lg shadow-card cursor-pointer h-64 md:h-96"
                      onClick={() => setLightboxIndex(7)}
                    >
                      <img 
                        src={mangoTreeFloorplan2brF} 
                        alt="Mango Tree 2 Bedroom Floor Plan Type F" 
                        className="w-full h-full object-contain bg-white transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    <div 
                      className="relative overflow-hidden rounded-lg shadow-card cursor-pointer h-32 md:h-44"
                      onClick={() => setLightboxIndex(8)}
                    >
                      <img 
                        src={mangoTreeFloorplan1brE} 
                        alt="Mango Tree 1 Bedroom Floor Plan Type E" 
                        className="w-full h-full object-contain bg-white transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    <div 
                      className="relative overflow-hidden rounded-lg shadow-card cursor-pointer h-32 md:h-44"
                      onClick={() => setLightboxIndex(9)}
                    >
                      <img 
                        src={mangoTreeAmenities} 
                        alt="Mango Tree Residence Amenities" 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    {/* National Park View - Third last */}
                    <div 
                      className="col-span-2 relative overflow-hidden rounded-lg shadow-card cursor-pointer h-40 md:h-56"
                      onClick={() => setLightboxIndex(10)}
                    >
                      <img 
                        src={mangoTreeNationalParkView} 
                        alt="Be A Neighbour to Nairobi National Park" 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    {/* Wide feature - spans 2 columns - Second last */}
                    <div 
                      className="col-span-2 relative overflow-hidden rounded-lg shadow-card cursor-pointer h-40 md:h-56"
                      onClick={() => setLightboxIndex(11)}
                    >
                      <img 
                        src={mangoTreeLocation} 
                        alt="Mango Tree Residence Location & Surroundings" 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    {/* Last item */}
                    <div 
                      className="col-span-2 relative overflow-hidden rounded-lg shadow-card cursor-pointer h-40 md:h-56"
                      onClick={() => setLightboxIndex(12)}
                    >
                      <img 
                        src={mangoTreeAmenitiesNew} 
                        alt="Mango Tree Residence Amenities & Features" 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  </div>
                </div>
              ) : property.slug === 'apple-tree-phase-3' ? (
                <div className="space-y-4">
                  {/* Featured Hero Image */}
                  <div 
                    className="relative overflow-hidden rounded-xl shadow-luxury cursor-pointer max-w-5xl mx-auto h-[400px] md:h-[600px] lg:h-[700px]"
                    onClick={() => setLightboxIndex(0)}
                  >
                    <img 
                      src={appleTreeCover} 
                      alt="Apple Tree Apartments Phase 3 - Nairobi" 
                      className="w-full h-full object-contain bg-muted"
                    />
                  </div>
                  
                  {/* Dynamic Grid Layout */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                    {/* Large feature - spans 2 columns */}
                    <div 
                      className="col-span-2 row-span-2 relative overflow-hidden rounded-lg shadow-card cursor-pointer h-64 md:h-96"
                      onClick={() => setLightboxIndex(1)}
                    >
                      <img 
                        src={appleTreeFloorplan3brA} 
                        alt="Apple Tree 3 Bedroom Floor Plan Type A" 
                        className="w-full h-full object-contain bg-white transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    {/* Standard grid items */}
                    <div 
                      className="relative overflow-hidden rounded-lg shadow-card cursor-pointer h-32 md:h-44"
                      onClick={() => setLightboxIndex(2)}
                    >
                      <img 
                        src={appleTreeFloorplan3brD} 
                        alt="Apple Tree 3 Bedroom Floor Plan Type D" 
                        className="w-full h-full object-contain bg-white transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    <div 
                      className="relative overflow-hidden rounded-lg shadow-card cursor-pointer h-32 md:h-44"
                      onClick={() => setLightboxIndex(3)}
                    >
                      <img 
                        src={appleTreeFloorplan2brB} 
                        alt="Apple Tree 2 Bedroom Floor Plan Type B" 
                        className="w-full h-full object-contain bg-white transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    <div 
                      className="relative overflow-hidden rounded-lg shadow-card cursor-pointer h-32 md:h-44"
                      onClick={() => setLightboxIndex(4)}
                    >
                      <img 
                        src={appleTreeFloorplan2brC} 
                        alt="Apple Tree 2 Bedroom Floor Plan Type C" 
                        className="w-full h-full object-contain bg-white transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    <div 
                      className="relative overflow-hidden rounded-lg shadow-card cursor-pointer h-32 md:h-44"
                      onClick={() => setLightboxIndex(5)}
                    >
                      <img 
                        src={appleTreeFloorplan3brPenthouse} 
                        alt="Apple Tree 3 Bedroom Penthouse Floor Plan" 
                        className="w-full h-full object-contain bg-white transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    {/* Tall feature - spans 2 rows */}
                    <div 
                      className="row-span-2 relative overflow-hidden rounded-lg shadow-card cursor-pointer h-64 md:h-96"
                      onClick={() => setLightboxIndex(6)}
                    >
                      <img 
                        src={appleTreeFloorplan4brPenthouse} 
                        alt="Apple Tree 4 Bedroom Penthouse Floor Plan" 
                        className="w-full h-full object-contain bg-white transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    <div 
                      className="relative overflow-hidden rounded-lg shadow-card cursor-pointer h-32 md:h-44"
                      onClick={() => setLightboxIndex(7)}
                    >
                      <img 
                        src={appleTreeFloorplan5brPenthouse} 
                        alt="Apple Tree 5 Bedroom Penthouse Floor Plan" 
                        className="w-full h-full object-contain bg-white transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    <div 
                      className="relative overflow-hidden rounded-lg shadow-card cursor-pointer h-32 md:h-44"
                      onClick={() => setLightboxIndex(8)}
                    >
                      <img 
                        src={appleTreeFloorplan6brPenthouse} 
                        alt="Apple Tree 6 Bedroom Penthouse Floor Plan" 
                        className="w-full h-full object-contain bg-white transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    {/* Wide feature - spans 2 columns */}
                    <div 
                      className="col-span-2 relative overflow-hidden rounded-lg shadow-card cursor-pointer h-40 md:h-56"
                      onClick={() => setLightboxIndex(9)}
                    >
                      <img 
                        src={appleTreeInteriors} 
                        alt="Apple Tree Apartments Exquisite Interiors" 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    {/* Additional images */}
                    <div 
                      className="col-span-2 relative overflow-hidden rounded-lg shadow-card cursor-pointer h-40 md:h-56"
                      onClick={() => setLightboxIndex(10)}
                    >
                      <img 
                        src={appleTreeExternalViews} 
                        alt="Apple Tree Apartments External Views & Scenic Beauty" 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    <div 
                      className="col-span-2 relative overflow-hidden rounded-lg shadow-card cursor-pointer h-40 md:h-56"
                      onClick={() => setLightboxIndex(11)}
                    >
                      <img 
                        src={appleTreeAmenities} 
                        alt="Apple Tree Apartments Amenities & Location" 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  </div>
                </div>
              ) : property.slug === 'gemini-residency' ? (
                <div className="space-y-4">
                  {/* Featured Hero Image */}
                  <div 
                    className="relative overflow-hidden rounded-xl shadow-luxury cursor-pointer max-w-5xl mx-auto h-[400px] md:h-[600px] lg:h-[700px]"
                    onClick={() => setLightboxIndex(0)}
                  >
                    <img 
                      src={geminiExteriorCourtyard} 
                      alt="Gemini Residency - Exterior Courtyard View" 
                      className="w-full h-full object-contain bg-muted"
                    />
                  </div>
                  
                  {/* Dynamic Grid Layout */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                    {/* Pool images - spans 2 columns each */}
                    <div 
                      className="col-span-2 relative overflow-hidden rounded-lg shadow-card cursor-pointer h-40 md:h-56"
                      onClick={() => setLightboxIndex(1)}
                    >
                      <img 
                        src={geminiPool1} 
                        alt="Gemini Residency Pool & Amenities View 1" 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    <div 
                      className="col-span-2 relative overflow-hidden rounded-lg shadow-card cursor-pointer h-40 md:h-56"
                      onClick={() => setLightboxIndex(2)}
                    >
                      <img 
                        src={geminiPool2} 
                        alt="Gemini Residency Pool & Amenities View 2" 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    {/* Floor plans - Studio */}
                    <div 
                      className="relative overflow-hidden rounded-lg shadow-card cursor-pointer h-32 md:h-44"
                      onClick={() => setLightboxIndex(3)}
                    >
                      <img 
                        src={geminiFloorplanStudio} 
                        alt="Gemini Residency Studio 34m² Floor Plan" 
                        className="w-full h-full object-contain bg-white transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    {/* 1 Bedroom */}
                    <div 
                      className="relative overflow-hidden rounded-lg shadow-card cursor-pointer h-32 md:h-44"
                      onClick={() => setLightboxIndex(4)}
                    >
                      <img 
                        src={geminiFloorplan1br} 
                        alt="Gemini Residency 1 Bedroom 53m² Floor Plan" 
                        className="w-full h-full object-contain bg-white transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    {/* 2 Bedroom */}
                    <div 
                      className="relative overflow-hidden rounded-lg shadow-card cursor-pointer h-32 md:h-44"
                      onClick={() => setLightboxIndex(5)}
                    >
                      <img 
                        src={geminiFloorplan2br} 
                        alt="Gemini Residency 2 Bedroom 85m² Floor Plan" 
                        className="w-full h-full object-contain bg-white transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    {/* Super 2 Bedroom */}
                    <div 
                      className="relative overflow-hidden rounded-lg shadow-card cursor-pointer h-32 md:h-44"
                      onClick={() => setLightboxIndex(6)}
                    >
                      <img 
                        src={geminiFloorplanSuper2br} 
                        alt="Gemini Residency Super 2 Bedroom 98m² Floor Plan" 
                        className="w-full h-full object-contain bg-white transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    {/* 3 Bedroom - Large feature spanning 2 columns and 2 rows */}
                    <div 
                      className="col-span-2 row-span-2 relative overflow-hidden rounded-lg shadow-card cursor-pointer h-64 md:h-96"
                      onClick={() => setLightboxIndex(7)}
                    >
                      <img 
                        src={geminiFloorplan3br} 
                        alt="Gemini Residency 3 Bedroom 152m² Floor Plan" 
                        className="w-full h-full object-contain bg-white transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    {/* Super 3 Bedroom */}
                    <div 
                      className="relative overflow-hidden rounded-lg shadow-card cursor-pointer h-32 md:h-44"
                      onClick={() => setLightboxIndex(8)}
                    >
                      <img 
                        src={geminiFloorplanSuper3br} 
                        alt="Gemini Residency Super 3 Bedroom 171m² Floor Plan" 
                        className="w-full h-full object-contain bg-white transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    {/* 4 Bedroom */}
                    <div 
                      className="relative overflow-hidden rounded-lg shadow-card cursor-pointer h-32 md:h-44"
                      onClick={() => setLightboxIndex(9)}
                    >
                      <img 
                        src={geminiFloorplan4br} 
                        alt="Gemini Residency 4 Bedroom 216m² Floor Plan" 
                        className="w-full h-full object-contain bg-white transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    {/* Additional exterior views - spanning full width */}
                    <div 
                      className="col-span-2 relative overflow-hidden rounded-lg shadow-card cursor-pointer h-40 md:h-56"
                      onClick={() => setLightboxIndex(10)}
                    >
                      <img 
                        src={geminiCourtyardGarden} 
                        alt="Gemini Residency Courtyard Garden View" 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    <div 
                      className="col-span-2 relative overflow-hidden rounded-lg shadow-card cursor-pointer h-40 md:h-56"
                      onClick={() => setLightboxIndex(11)}
                    >
                      <img 
                        src={geminiCourtyardParking} 
                        alt="Gemini Residency Courtyard & Parking Area" 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    <div 
                      className="col-span-2 lg:col-span-4 relative overflow-hidden rounded-lg shadow-card cursor-pointer h-40 md:h-56"
                      onClick={() => setLightboxIndex(12)}
                    >
                      <img 
                        src={geminiExteriorBuildings} 
                        alt="Gemini Residency Exterior Buildings View" 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  </div>
                </div>
              ) : property.slug === 'azure-sky-park' ? (
                <div className="space-y-4">
                  {/* Featured Hero Image */}
                  <div 
                    className="relative overflow-hidden rounded-xl shadow-luxury cursor-pointer max-w-5xl mx-auto h-[400px] md:h-[600px] lg:h-[700px]"
                    onClick={() => setLightboxIndex(0)}
                  >
                    <img 
                      src={azureSkyCover} 
                      alt="Azure Sky Park - Premium Apartments" 
                      className="w-full h-full object-contain bg-muted"
                    />
                  </div>
                  
                  {/* Dynamic Grid Layout */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                    {/* Overview - spans 2 columns */}
                    <div 
                      className="col-span-2 relative overflow-hidden rounded-lg shadow-card cursor-pointer h-40 md:h-56"
                      onClick={() => setLightboxIndex(1)}
                    >
                      <img 
                        src={azureSkyOverview} 
                        alt="Azure Sky Park Overview & Property Views" 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    {/* Amenities - spans 2 columns */}
                    <div 
                      className="col-span-2 relative overflow-hidden rounded-lg shadow-card cursor-pointer h-40 md:h-56"
                      onClick={() => setLightboxIndex(2)}
                    >
                      <img 
                        src={azureSkyAmenities} 
                        alt="Azure Sky Park Amenities & Features" 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    {/* 1 Bedroom Floor Plan - Large feature */}
                    <div 
                      className="col-span-2 row-span-2 relative overflow-hidden rounded-lg shadow-card cursor-pointer h-64 md:h-96"
                      onClick={() => setLightboxIndex(3)}
                    >
                      <img 
                        src={azureSky1br} 
                        alt="Azure Sky Park 1 Bedroom 58.05m² Floor Plan" 
                        className="w-full h-full object-contain bg-white transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    {/* 2 Bedroom Floor Plan */}
                    <div 
                      className="relative overflow-hidden rounded-lg shadow-card cursor-pointer h-32 md:h-44"
                      onClick={() => setLightboxIndex(4)}
                    >
                      <img 
                        src={azureSky2br} 
                        alt="Azure Sky Park 2 Bedroom 76.08m² Floor Plan" 
                        className="w-full h-full object-contain bg-white transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    {/* 3 Bedroom Floor Plan */}
                    <div 
                      className="relative overflow-hidden rounded-lg shadow-card cursor-pointer h-32 md:h-44"
                      onClick={() => setLightboxIndex(5)}
                    >
                      <img 
                        src={azureSky3br} 
                        alt="Azure Sky Park 3 Bedroom 123.9m² Floor Plan" 
                        className="w-full h-full object-contain bg-white transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    {/* 4 Bedroom Floor Plan - Tall feature */}
                    <div 
                      className="row-span-2 relative overflow-hidden rounded-lg shadow-card cursor-pointer h-64 md:h-96"
                      onClick={() => setLightboxIndex(6)}
                    >
                      <img 
                        src={azureSky4br} 
                        alt="Azure Sky Park 4 Bedroom 189.64m² Floor Plan" 
                        className="w-full h-full object-contain bg-white transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    {/* Floor Plans Overview */}
                    <div 
                      className="relative overflow-hidden rounded-lg shadow-card cursor-pointer h-32 md:h-44"
                      onClick={() => setLightboxIndex(7)}
                    >
                      <img 
                        src={azureSkyFloorplansOverview} 
                        alt="Azure Sky Park All Floor Plans Overview" 
                        className="w-full h-full object-contain bg-white transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    {/* Features - Wide feature */}
                    <div 
                      className="col-span-2 relative overflow-hidden rounded-lg shadow-card cursor-pointer h-40 md:h-56"
                      onClick={() => setLightboxIndex(8)}
                    >
                      <img 
                        src={azureSkyFeatures} 
                        alt="Azure Sky Park Premium Features & Services" 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    {/* Location Map - Wide feature */}
                    <div 
                      className="col-span-2 lg:col-span-4 relative overflow-hidden rounded-lg shadow-card cursor-pointer h-40 md:h-56"
                      onClick={() => setLightboxIndex(9)}
                    >
                      <img 
                        src={azureSkyLocation} 
                        alt="Azure Sky Park Location Map - Near Nairobi National Park" 
                        className="w-full h-full object-contain bg-white transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  </div>
                </div>
              ) : property.slug === 'urban-park' ? (
                <div className="space-y-4">
                  {/* Featured Hero Image */}
                  <div 
                    className="relative overflow-hidden rounded-xl shadow-luxury cursor-pointer max-w-5xl mx-auto h-[400px] md:h-[600px] lg:h-[700px]"
                    onClick={() => setLightboxIndex(0)}
                  >
                    <img 
                      src={urbanParkExteriorEntrance} 
                      alt="Urban Park - Modern Living For A Modern City" 
                      className="w-full h-full object-contain bg-muted"
                    />
                  </div>
                  
                  {/* Dynamic Grid Layout */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                    {/* Aerial View 1 - Large feature */}
                    <div 
                      className="col-span-2 row-span-2 relative overflow-hidden rounded-lg shadow-card cursor-pointer h-64 md:h-96"
                      onClick={() => setLightboxIndex(1)}
                    >
                      <img 
                        src={urbanParkAerial1} 
                        alt="Urban Park Aerial View - Complete Development" 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    {/* Aerial View 2 */}
                    <div 
                      className="col-span-2 relative overflow-hidden rounded-lg shadow-card cursor-pointer h-32 md:h-44"
                      onClick={() => setLightboxIndex(2)}
                    >
                      <img 
                        src={urbanParkAerial2} 
                        alt="Urban Park Aerial View - Pool & Amenities" 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    {/* Kitchen */}
                    <div 
                      className="col-span-2 relative overflow-hidden rounded-lg shadow-card cursor-pointer h-32 md:h-44"
                      onClick={() => setLightboxIndex(3)}
                    >
                      <img 
                        src={urbanParkKitchen} 
                        alt="Urban Park Modern Kitchen Interior" 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    {/* Living & Dining - Wide feature */}
                    <div 
                      className="col-span-2 lg:col-span-4 relative overflow-hidden rounded-lg shadow-card cursor-pointer h-40 md:h-56"
                      onClick={() => setLightboxIndex(4)}
                    >
                      <img 
                        src={urbanParkLivingDining} 
                        alt="Urban Park Living & Dining Room" 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    {/* Bedroom 1 - Tall feature */}
                    <div 
                      className="row-span-2 relative overflow-hidden rounded-lg shadow-card cursor-pointer h-64 md:h-96"
                      onClick={() => setLightboxIndex(5)}
                    >
                      <img 
                        src={urbanParkBedroom1} 
                        alt="Urban Park Master Bedroom Interior" 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    {/* Bedroom 2 */}
                    <div 
                      className="col-span-2 relative overflow-hidden rounded-lg shadow-card cursor-pointer h-40 md:h-56"
                      onClick={() => setLightboxIndex(6)}
                    >
                      <img 
                        src={urbanParkBedroom2} 
                        alt="Urban Park Bedroom Interior Design" 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    {/* Bathroom */}
                    <div 
                      className="relative overflow-hidden rounded-lg shadow-card cursor-pointer h-32 md:h-44"
                      onClick={() => setLightboxIndex(7)}
                    >
                      <img 
                        src={urbanParkBathroom} 
                        alt="Urban Park Modern Bathroom Interior" 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    {/* Exterior Front View */}
                    <div 
                      className="col-span-2 relative overflow-hidden rounded-lg shadow-card cursor-pointer h-40 md:h-56"
                      onClick={() => setLightboxIndex(8)}
                    >
                      <img 
                        src={urbanParkExteriorFront} 
                        alt="Urban Park Front Facade Architecture" 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    {/* Exterior Street View - Wide feature */}
                    <div 
                      className="col-span-2 lg:col-span-4 relative overflow-hidden rounded-lg shadow-card cursor-pointer h-40 md:h-56"
                      onClick={() => setLightboxIndex(9)}
                    >
                      <img 
                        src={urbanParkExteriorStreet} 
                        alt="Urban Park Street View & Entrance" 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    {/* Modern Living Room - Large feature */}
                    <div 
                      className="col-span-2 row-span-2 relative overflow-hidden rounded-lg shadow-card cursor-pointer h-64 md:h-96"
                      onClick={() => setLightboxIndex(10)}
                    >
                      <img 
                        src={urbanParkLivingModern} 
                        alt="Urban Park Contemporary Living & Dining Space" 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    {/* Bedroom 3 */}
                    <div 
                      className="relative overflow-hidden rounded-lg shadow-card cursor-pointer h-32 md:h-44"
                      onClick={() => setLightboxIndex(11)}
                    >
                      <img 
                        src={urbanParkBedroom3} 
                        alt="Urban Park Master Suite with City Views" 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    {/* Living Room Open Plan */}
                    <div 
                      className="relative overflow-hidden rounded-lg shadow-card cursor-pointer h-32 md:h-44"
                      onClick={() => setLightboxIndex(12)}
                    >
                      <img 
                        src={urbanParkLivingOpen} 
                        alt="Urban Park Open Plan Living Space" 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    {/* Final Exterior View - Wide feature */}
                    <div 
                      className="col-span-2 lg:col-span-4 relative overflow-hidden rounded-lg shadow-card cursor-pointer h-40 md:h-56"
                      onClick={() => setLightboxIndex(13)}
                    >
                      <img 
                        src={urbanParkExteriorFinal} 
                        alt="Urban Park Complete Development View" 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
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

      {property?.slug === 'elitz-residency' && (
        <ImageLightbox 
          images={elitzImages} 
          index={lightboxIndex} 
          setIndex={setLightboxIndex} 
        />
      )}

      {property?.slug === 'mango-tree' && (
        <ImageLightbox 
          images={mangoTreeImages} 
          index={lightboxIndex} 
          setIndex={setLightboxIndex} 
        />
      )}

      {property?.slug === 'apple-tree-phase-3' && (
        <ImageLightbox 
          images={appleTreeImages} 
          index={lightboxIndex} 
          setIndex={setLightboxIndex} 
        />
      )}

      {property?.slug === 'gemini-residency' && (
        <ImageLightbox 
          images={geminiImages} 
          index={lightboxIndex} 
          setIndex={setLightboxIndex} 
        />
      )}

      {property?.slug === 'azure-sky-park' && (
        <ImageLightbox 
          images={azureSkyParkImages} 
          index={lightboxIndex} 
          setIndex={setLightboxIndex} 
        />
      )}

      {property?.slug === 'urban-park' && (
        <ImageLightbox 
          images={urbanParkImages} 
          index={lightboxIndex} 
          setIndex={setLightboxIndex} 
        />
      )}

      <Footer />
    </div>
  );
}
