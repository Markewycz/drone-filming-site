'use client';
/**
 * Lightbox overlay for displaying images in full screen.
 */

export default function Lightbox({ lightbox, onClose }) {
  if (!lightbox) return null;
  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur flex items-center justify-center p-4"
      onClick={onClose}
    >
      <img
        src={lightbox.src}
        alt={lightbox.alt}
        className="max-h-[85vh] max-w-[90vw] rounded-xl"
      />
    </div>
  );
}
