'use client';
/**
 * Footer with contact links and social media.
 */

export default function Footer() {
  return (
    <footer className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-neutral-600 dark:text-neutral-400">
          (c) {new Date().getFullYear()} NordSky Aerials. All rights reserved.
        </div>
        <div className="flex items-center gap-4 text-sm">
          <a href="mailto:hello@nordskyaerials.com" className="hover:opacity-80">
            hello@nordskyaerials.com
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="hover:opacity-80"
          >
            Instagram
          </a>
          <a
            href="https://vimeo.com"
            target="_blank"
            rel="noreferrer"
            className="hover:opacity-80"
          >
            Vimeo
          </a>
        </div>
      </div>
    </footer>
  );
}
