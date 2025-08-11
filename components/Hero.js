'use client';
/**
 * Hero section with background video and call-to-action buttons.
 */

export default function Hero({ hero, videoRef, heroPaused, setHeroPaused }) {
  return (
    <section id="home" className="relative h-[70vh] sm:h-[80vh]">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={hero.src}
        poster={hero.poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 h-full">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full flex items-end sm:items-center pb-10 sm:pb-0">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-tight text-white drop-shadow-lg">
              Aerial Filmmaking & Drone Services
            </h1>
            <p className="mt-4 text-base sm:text-lg text-neutral-200 drop-shadow">
              Premium drone cinematography for commercials, real estate, events
              and branded content across Denmark and the EU.
            </p>
            <div className="mt-8 flex gap-3">
              <a
                href="#work"
                className="inline-flex items-center rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 px-4 py-2 text-sm font-medium hover:opacity-90"
              >
                View Work
              </a>
              <a
                href="#quote"
                className="inline-flex items-center rounded-xl border text-white border-neutral-300 dark:border-neutral-700 px-4 py-2 text-sm font-medium hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-900"
              >
                Get a Quote
              </a>
              <button
                type="button"
                className="inline-flex items-center rounded-xl border text-white border-neutral-300 dark:border-neutral-700 px-4 py-2 text-sm font-medium hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-900"
                onClick={() => {
                  const v = videoRef.current;
                  if (!v) return;
                  if (v.paused) {
                    v.play();
                    setHeroPaused(false);
                  } else {
                    v.pause();
                    setHeroPaused(true);
                  }
                }}
              >
                {heroPaused ? 'Play' : 'Pause'} reel
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
