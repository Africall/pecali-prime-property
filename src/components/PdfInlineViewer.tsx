interface PdfInlineViewerProps {
  pdfUrl: string;
  height?: number;
}

export default function PdfInlineViewer({ pdfUrl, height = 560 }: PdfInlineViewerProps) {
  if (!pdfUrl) return null;
  
  return (
    <div className="w-full rounded-xl overflow-hidden border border-border shadow-md">
      <iframe
        src={`${pdfUrl}#toolbar=1&navpanes=0&scrollbar=1&view=FitH`}
        className="w-full block"
        style={{ height }}
        title="Property PDF Brochure"
      />
    </div>
  );
}
