import { GlobalWorkerOptions } from 'pdfjs-dist';

// Configure PDF.js worker for Vite with proper bundling
GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();
