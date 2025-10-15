import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageLightboxProps {
  images: string[];
  index: number;
  setIndex: (index: number) => void;
}

export default function ImageLightbox({ images, index, setIndex }: ImageLightboxProps) {
  const close = () => setIndex(-1);
  const next = () => setIndex((index + 1) % images.length);
  const prev = () => setIndex((index - 1 + images.length) % images.length);

  return (
    <AnimatePresence>
      {index >= 0 && (
        <motion.div
          key="overlay"
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
        >
          <button
            onClick={close}
            className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-10"
            aria-label="Close lightbox"
          >
            <X size={32} />
          </button>

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                className="absolute left-6 text-white hover:text-gray-300 transition-colors z-10"
                aria-label="Previous image"
              >
                <ChevronLeft size={48} />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                className="absolute right-6 text-white hover:text-gray-300 transition-colors z-10"
                aria-label="Next image"
              >
                <ChevronRight size={48} />
              </button>
            </>
          )}

          <motion.img
            key={index}
            src={images[index]}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            alt={`Property image ${index + 1}`}
            loading="eager"
            decoding="async"
          />

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-sm">
            {index + 1} / {images.length}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
