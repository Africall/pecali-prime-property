import * as pdfjs from 'pdfjs-dist';
import './pdf';

export async function loadPdf(url: string) {
  // Let pdf.js fetch cross-origin (Supabase serves proper CORS by default)
  return pdfjs.getDocument({ url, withCredentials: false }).promise;
}

export async function renderPageToDataUrl(
  pdf: any,
  pageNumber: number,
  scale = 1.6
): Promise<string> {
  const page = await pdf.getPage(pageNumber);
  const viewport = page.getViewport({ scale });
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  canvas.width = viewport.width;
  canvas.height = viewport.height;
  const renderContext = { canvasContext: ctx, viewport };
  await page.render(renderContext).promise;
  return canvas.toDataURL('image/png');
}
