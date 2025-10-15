import { useEffect, useState } from 'react';
import { loadPdf, renderPageToDataUrl } from '@/lib/pdf-render';
import ImageLightbox from './ImageLightbox';
import { Skeleton } from './ui/skeleton';

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
              const dataUrl = await renderPageToDataUrl(pdf, page, 1.6);
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
    <div className="space-y-4">
      {sections.map((section) => (
        <div key={section.title}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm md:text-base font-semibold text-foreground">
              {section.title}
            </h3>
            <span className="text-[11px] md:text-xs text-muted-foreground">
              {section.pages.length} {section.pages.length === 1 ? 'page' : 'pages'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {loading ? (
              section.pages.map((_, idx) => (
                <Skeleton key={idx} className="w-full aspect-[3/4] rounded-xl" />
              ))
            ) : (
              (images[section.title] || []).map((src, idx) => (
                <div
                  key={idx}
                  onClick={() => openLightbox(images[section.title], idx)}
                  className="group relative rounded-xl overflow-hidden border border-border cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                >
                  <img
                    src={src}
                    alt={`${section.title} page ${idx + 1}`}
                    className="w-full h-auto block"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium">
                      Click to view
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ))}

      <ImageLightbox images={lightboxImages} index={index} setIndex={setIndex} />
    </div>
  );
}
