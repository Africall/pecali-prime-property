interface PdfInlineViewerProps {
  pdfUrl: string;
  height?: number;
}

export default function PdfInlineViewer({ pdfUrl, height = 700 }: PdfInlineViewerProps) {
  return (
    <div className="w-full rounded-xl overflow-hidden border border-border shadow-lg">
      <iframe
        src={`${pdfUrl}#toolbar=1&navpanes=0&scrollbar=1`}
        className="w-full"
        style={{ height }}
        title="Property PDF Brochure"
      />
    </div>
  );
}
