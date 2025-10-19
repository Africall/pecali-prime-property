import { supabase } from '@/integrations/supabase/client';

/**
 * Robust PDF URL resolver that accepts:
 *  - "property_pdfs/azure-sky-park/azure-sky-park.pdf" (bucket + key)
 *  - "azure-sky-park/azure-sky-park.pdf" (key only)
 *  - "pdfs/azure-sky-park.pdf" (public folder path)
 *  - "/pdfs/azure-sky-park.pdf" (public folder path with slash)
 *  - "https://.../azure-sky-park.pdf" (already public URL)
 * Returns a fully usable public URL for iframe/pdf.js.
 */
export async function resolvePdfUrl(pdf_path: string | null | undefined): Promise<string | null> {
  // Handle null or undefined paths
  if (!pdf_path) return null;
  
  // If it's already a full URL, just return it
  if (/^https?:\/\//i.test(pdf_path)) return pdf_path;

  // Check if it's a public folder path (starts with "pdfs/" or "/pdfs/")
  if (pdf_path.startsWith('pdfs/') || pdf_path.startsWith('/pdfs/')) {
    // Return as-is, prefixed with / if needed
    return pdf_path.startsWith('/') ? pdf_path : `/${pdf_path}`;
  }

  // Otherwise, treat as Supabase storage path
  const BUCKET = 'property_pdfs';
  let key = pdf_path;

  // If a developer stored "property_pdfs/..." keep only the part after the bucket name
  const prefix = `${BUCKET}/`;
  if (key.startsWith(prefix)) key = key.slice(prefix.length);

  // Ask Supabase for the public URL
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(key);

  return data.publicUrl;
}
