import PdfInlineViewer from './PdfInlineViewer';
import PdfPageGallery from './PdfPageGallery';
import { Download, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';

interface PropertyMediaPanelProps {
  title: string;
  pdfUrl: string;
  coverPage: number;
  galleryPages: number[];
  floorplanPages: number[];
}

export default function PropertyMediaPanel({
  title,
  pdfUrl,
  coverPage,
  galleryPages,
  floorplanPages,
}: PropertyMediaPanelProps) {
  const sections = [
    {
      title: 'Property Gallery',
      pages: Array.from(new Set([coverPage, ...(galleryPages || [])]))
        .filter(Boolean)
        .sort((a, b) => a - b),
    },
    {
      title: 'Floor Plans',
      pages: (floorplanPages || []).filter(Boolean).sort((a, b) => a - b),
    },
  ].filter((s) => s.pages.length > 0);

  return (
    <section className="space-y-4 md:space-y-6">
      <PdfPageGallery pdfUrl={pdfUrl} sections={sections} />

      <div className="pt-4 space-y-3 border-t border-border">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <h3 className="text-base md:text-lg font-semibold text-foreground">
            Full Brochure
          </h3>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="sm">
              <a href={pdfUrl} download>
                <Download className="w-4 h-4 mr-1.5" />
                <span className="hidden sm:inline">Download</span>
              </a>
            </Button>
            <Button asChild variant="outline" size="sm">
              <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-1.5" />
                <span className="hidden sm:inline">Open</span>
              </a>
            </Button>
          </div>
        </div>
        <PdfInlineViewer pdfUrl={pdfUrl} height={560} />
      </div>
    </section>
  );
}
