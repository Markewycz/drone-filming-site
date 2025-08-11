'use client';
/**
 * Work gallery showcasing sample videos and images.
 */

export default function Work({ videos, images, setLightbox }) {
  return (
    <section id="work" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <header className="mb-8 sm:mb-10 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Selected Work</h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm">
            A mix of commercials, lifestyle, and landscape captures.
          </p>
        </div>
        <a
          href="#quote"
          className="hidden sm:inline-flex items-center rounded-xl border border-neutral-300 dark:border-neutral-700 px-3 py-1.5 text-xs font-medium hover:bg-neutral-100 dark:hover:bg-neutral-900"
        >
          Book a shoot
        </a>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {videos.map((v, i) => (
          <div
            key={i}
            className="aspect-video overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm"
          >
            <video
              src={v.src}
              controls
              loop
              muted
              autoPlay
              playsInline
              className="h-full w-full object-cover"
              preload="metadata"
            />
          </div>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {images.map((img, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setLightbox(img)}
            className="group relative overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800"
          >
            <img
              src={img.src}
              alt={img.alt}
              className="h-40 w-full object-cover transition duration-300 group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-t from-black/50 to-transparent" />
          </button>
        ))}
      </div>
    </section>
  );
}
