interface PdfDebugProps {
  label: string;
  value?: string;
  error?: any;
}

export default function PdfDebug({ label, value, error }: PdfDebugProps) {
  if (!value && !error) return null;
  
  return (
    <div className="text-xs p-3 rounded-md border bg-amber-50 dark:bg-amber-950 text-amber-900 dark:text-amber-100 space-y-1">
      <div className="font-semibold">📄 Media Debug</div>
      {value && (
        <div>
          <span className="font-medium">{label}:</span>{' '}
          <code className="break-all text-xs bg-amber-100 dark:bg-amber-900 px-1 py-0.5 rounded">
            {value}
          </code>
        </div>
      )}
      {error && (
        <div>
          <span className="font-medium text-red-600 dark:text-red-400">Error:</span>{' '}
          <code className="break-all text-xs bg-red-100 dark:bg-red-900 px-1 py-0.5 rounded">
            {String(error)}
          </code>
        </div>
      )}
      <div className="opacity-70 text-xs mt-2">
        ✓ Check: Is bucket public? Correct path? Network console?
      </div>
    </div>
  );
}
