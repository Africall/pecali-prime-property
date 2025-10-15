import { useEffect, useState } from 'react';
import { loadPdf, renderPageToDataUrl } from '@/lib/pdf-render';
import ImageLightbox from './ImageLightbox';
import { Skeleton } from './ui/skeleton';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';
import { useIsMobile } from '@/hooks/use-mobile';

interface Section {
  title: string;
  pages: number[];
}

interface PdfPageGalleryProps {
  pdfUrl: string;
  sections: Section[];
}

export default function PdfPageGallery({ pdfUrl, sections }: PdfPageGalleryProps) {
  const [images, setImages] = useState<Record<string, string[]>>({});
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [index, setIndex] = useState(-1);
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    let cancelled = false;

    async function run() {
      if (!pdfUrl) {
        console.error('No PDF URL provided');
        if (!cancelled) setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const pdf = await loadPdf(pdfUrl);
        const out: Record<string, string[]> = {};

        for (const section of sections) {
          out[section.title] = [];
          for (const page of section.pages) {
            try {
              const dataUrl = await renderPageToDataUrl(pdf, page, 2.0);
              if (!cancelled) out[section.title].push(dataUrl);
            } catch (e) {
              console.error(`Error rendering page ${page}:`, e);
            }
          }
        }

        if (!cancelled) {
          setImages(out);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error loading PDF:', error);
        if (!cancelled) setLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [pdfUrl, sections]);

  function openLightbox(imgArray: string[], idx: number) {
    setLightboxImages(imgArray);
    setIndex(idx);
  }

  return (
    <div className="space-y-6">
      {sections.map((section) => (
        <div key={section.title}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm md:text-base font-semibold text-foreground">
              {section.title}
            </h3>
            <span className="text-[11px] md:text-xs text-muted-foreground">
              {section.pages.length} {section.pages.length === 1 ? 'page' : 'pages'}
            </span>
          </div>

          {loading ? (
            isMobile ? (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {section.pages.map((_, idx) => (
                  <Skeleton key={idx} className="w-[85vw] h-[480px] rounded-xl flex-shrink-0" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {section.pages.map((_, idx) => (
                  <Skeleton key={idx} className="w-full h-[400px] rounded-xl" />
                ))}
              </div>
            )
          ) : isMobile ? (
            // Mobile: Swipeable Carousel
            <Carousel
              opts={{
                align: 'start',
                loop: false,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {(images[section.title] || []).map((src, idx) => (
                  <CarouselItem key={idx} className="pl-2 md:pl-4 basis-[85%]">
                    <div
                      onClick={() => openLightbox(images[section.title], idx)}
                      className="group relative rounded-xl overflow-hidden border border-border cursor-pointer transition-all duration-300 hover:shadow-lg bg-background"
                    >
                      <img
                        src={src}
                        alt={`${section.title} page ${idx + 1}`}
                        className="w-full h-auto object-contain block max-h-[480px]"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-black/0 group-active:bg-black/10 transition-all duration-200 flex items-center justify-center pointer-events-none">
                        <span className="text-white opacity-0 group-active:opacity-100 transition-opacity text-sm font-medium">
                          Tap to zoom
                        </span>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {(images[section.title] || []).length > 1 && (
                <>
                  <CarouselPrevious className="left-2" />
                  <CarouselNext className="right-2" />
                </>
              )}
            </Carousel>
          ) : (
            // Desktop: Grid with full image view
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {(images[section.title] || []).map((src, idx) => (
                <div
                  key={idx}
                  onClick={() => openLightbox(images[section.title], idx)}
                  className="group relative rounded-xl overflow-hidden border border-border cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] bg-background"
                >
                  <img
                    src={src}
                    alt={`${section.title} page ${idx + 1}`}
                    className="w-full h-auto object-contain block max-h-[500px]"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center pointer-events-none">
                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium">
                      Click to view
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      <ImageLightbox images={lightboxImages} index={index} setIndex={setIndex} />
    </div>
  );
}
