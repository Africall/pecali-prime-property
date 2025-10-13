import * as pdfjs from 'pdfjs-dist';
import './pdf';

export async function loadPdf(url: string) {
  return pdfjs.getDocument(url).promise;
}

export async function renderPageToDataUrl(
  pdf: any,
  pageNumber: number,
  scale = 1.5
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
