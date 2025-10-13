import { GlobalWorkerOptions } from 'pdfjs-dist';

// Configure PDF.js worker for Vite
GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.mjs',
  import.meta.url
).toString();
