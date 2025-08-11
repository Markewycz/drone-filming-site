'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';

// Self-contained page: includes formatDKK and all icons
function formatDKK(n) {
  const s = n.toString();
  return 'from ' + s.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' DKK';
}

function SunIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="currentColor"
    >
      <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm0 4a1 1 0 0 1-1-1v-1a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1Zm0-18a1 1 0 0 1-1-1V2a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1ZM4 13H3a1 1 0 1 1 0-2h1a1 1 0 1 1 0 2Zm17 0h-1a1 1 0 1 1 0-2h1a1 1 0 1 1 0 2ZM5.64 19.36a1 1 0 0 1-1.41 0l-.71-.71a1 1 0 1 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41ZM20.48 6.17a1 1 0 0 1-1.41 0l-.71-.71a1 1 0 1 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41ZM5.64 4.64a1 1 0 0 1 0-1.41l.71-.71A1 1 0 1 1 7.76 4l-.71.71a1 1 0 0 1-1.41 0Zm12.02 14.02a1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1-1.41 0z" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="currentColor"
    >
      <path d="M21.64 13A9 9 0 1 1 11 2.36 7 7 0 1 0 21.64 13z" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  );
}

// Compute initial dark state before first paint (prevents flicker)
function getInitialDark() {
  if (typeof window === 'undefined') return false;
  try {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') return true;
    if (saved === 'light') return false;
    return (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    );
  } catch {
    return false;
  }
}

export default function Page() {
  const [dark, setDark] = useState(getInitialDark);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const [toast, setToast] = useState(null);
  const videoRef = useRef(null);
  const [heroPaused, setHeroPaused] = useState(false);

  // Sync <html> class and persist preference
  useEffect(() => {
    try {
      const root = document.documentElement;
      if (dark) root.classList.add('dark');
      else root.classList.remove('dark');
      localStorage.setItem('theme', dark ? 'dark' : 'light');
    } catch {}
  }, [dark]);

  const videos = useMemo(
    () => [
      {
        title: 'Showreel 2025',
        embed: 'https://player.vimeo.com/video/76979871?h=8272103f6e',
      },
      {
        title: 'Commercial: Coastal Resort',
        embed: 'https://www.youtube.com/embed/Scxs7L0vhZ4',
      },
    ],
    []
  );

  const images = useMemo(
    () => [
      {
        src: 'https://images.unsplash.com/photo-1473186505569-9c61870c11f9?q=80&w=1600&auto=format&fit=crop',
        alt: 'Aerial city dusk',
      },
      {
        src: 'https://images.unsplash.com/photo-1470058869958-2a77ade41c02?q=80&w=1600&auto=format&fit=crop',
        alt: 'Coastal cliffs',
      },
      {
        src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop',
        alt: 'Mountains',
      },
      {
        src: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1600&auto=format&fit=crop',
        alt: 'Forest road',
      },
      {
        src: 'https://images.unsplash.com/photo-1451188502541-13943edb6acb?q=80&w=1600&auto=format&fit=crop',
        alt: 'Waterfalls',
      },
      {
        src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1600&auto=format&fit=crop',
        alt: 'Desert lines',
      },
    ],
    []
  );

  const hero = useMemo(
    () => ({
      src: 'https://cdn.coverr.co/videos/coverr-drone-view-of-a-winding-road-1670/1080p.mp4',
      poster: '/hero-poster.jpg',
    }),
    []
  );

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const handleQuote = e => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form.entries());
    console.log('Quote request:', data);
    e.currentTarget.reset();
    setToast('Thanks! I will get back to you within 24 hours.');
  };

  const services = useMemo(
    () => [
      {
        name: 'Commercials',
        desc: 'Hero aerials for ads, branded content and social spots.',
        price: 3350,
      },
      {
        name: 'Real Estate',
        desc: 'Property exteriors, reveal shots, and photo sets for listings.',
        price: 1850,
      },
      {
        name: 'Events & Tourism',
        desc: 'Cinematic coverage for venues, festivals, and destinations.',
        price: 2600,
      },
    ],
    []
  );

  return (
    <div>
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur border-b border-neutral-200 dark:border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <a href="#home" className="font-semibold tracking-tight text-lg">
              NordSky Aerials
            </a>
            <nav className="hidden md:flex items-center gap-8 text-sm">
              <a href="#work" className="hover:opacity-80">
                Work
              </a>
              <a href="#about" className="hover:opacity-80">
                About
              </a>
              <a href="#services" className="hover:opacity-80">
                Services
              </a>
              <a href="#quote" className="hover:opacity-80">
                Get a Quote
              </a>
            </nav>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Toggle theme"
                onClick={() => setDark(d => !d)}
                className="p-2 border rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-900"
              >
                {dark ? <SunIcon /> : <MoonIcon />}
              </button>
              <button
                type="button"
                onClick={() => setMobileOpen(v => !v)}
                className="md:hidden p-2 border rounded-xl"
                aria-label="Open menu"
              >
                <MenuIcon />
              </button>
            </div>
          </div>
          {mobileOpen && (
            <div className="md:hidden border-t border-neutral-200 dark:border-neutral-800 py-2">
              {[
                { href: '#work', label: 'Work' },
                { href: '#about', label: 'About' },
                { href: '#services', label: 'Services' },
                { href: '#quote', label: 'Get a Quote' },
              ].map(item => (
                <a
                  key={item.href}
                  onClick={() => setMobileOpen(false)}
                  href={item.href}
                  className="block px-2 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-lg"
                >
                  {item.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Hero with background video */}
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
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-black/20" />
        <div className="relative z-10 h-full">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full flex items-end sm:items-center pb-10 sm:pb-0">
            <div className="max-w-2xl">
              <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-tight">
                Aerial Filmmaking & Drone Services
              </h1>
              <p className="mt-4 text-base sm:text-lg">
                Premium drone cinematography for commercials, real estate,
                events and branded content across Denmark and the EU.
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
                  className="inline-flex items-center rounded-xl border border-neutral-300 dark:border-neutral-700 px-4 py-2 text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-900"
                >
                  Get a Quote
                </a>
                <button
                  type="button"
                  className="inline-flex items-center rounded-xl border border-neutral-300 dark:border-neutral-700 px-4 py-2 text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-900"
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

      {/* Work */}
      <section
        id="work"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24"
      >
        <header className="mb-8 sm:mb-10 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Selected Work
            </h2>
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
              <iframe
                title={v.title}
                src={v.embed}
                className="h-full w-full"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
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

      {/* About */}
      <section
        id="about"
        className="bg-neutral-50 dark:bg-neutral-950/60 border-y border-neutral-200 dark:border-neutral-800"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                About
              </h2>
              <p className="mt-4 text-neutral-600 dark:text-neutral-300 max-w-2xl">
                I am Gracjan, a registered drone user delivering cinematic
                aerials for ads, property showcases, tourism boards, and events.
                I operate sub-250g (C0) with liability insurance and backup
                batteries for reliability.
              </p>
              <dl className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-5">
                  <dt className="text-sm text-neutral-500">Coverage</dt>
                  <dd className="text-base font-medium">
                    Denmark and EU - travel ready
                  </dd>
                </div>
                <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-5">
                  <dt className="text-sm text-neutral-500">Drone Category</dt>
                  <dd className="text-base font-medium">
                    Sub-250g (C0), insured, registered
                  </dd>
                </div>
                <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-5">
                  <dt className="text-sm text-neutral-500">Deliverables</dt>
                  <dd className="text-base font-medium">
                    4K/60, D-Log, RAW photos
                  </dd>
                </div>
                <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-5">
                  <dt className="text-sm text-neutral-500">Turnaround</dt>
                  <dd className="text-base font-medium">
                    48-72h for standard edits
                  </dd>
                </div>
              </dl>
            </div>
            <div className="lg:col-span-1">
              <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6">
                <h3 className="font-semibold">Equipment</h3>
                <ul className="mt-3 space-y-2 text-sm text-neutral-600 dark:text-neutral-300">
                  <li>DJI Mini 4 Pro (C0)</li>
                  <li>Backup batteries and dual chargers</li>
                  <li>ND and PL filter kit</li>
                  <li>Flight planning and legal maps</li>
                  <li>Liability insurance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section
        id="services"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24"
      >
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
          Services
        </h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div
              key={i}
              className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 hover:shadow-sm transition"
            >
              <h3 className="font-medium">{s.name}</h3>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
                {s.desc}
              </p>
              <div className="mt-4 text-sm text-neutral-500">
                {formatDKK(s.price)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quote */}
      <section
        id="quote"
        className="bg-neutral-50 dark:bg-neutral-950/60 border-y border-neutral-200 dark:border-neutral-800"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            Get a Quote
          </h2>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
            Tell me about your project and I will reply with pricing and
            availability.
          </p>

          <form onSubmit={handleQuote} className="mt-8 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm">Name</label>
                <input
                  name="name"
                  required
                  placeholder="Your name"
                  className="mt-1 w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 px-3 py-2 outline-none focus:ring-2 focus:ring-neutral-400/50"
                />
              </div>
              <div>
                <label className="text-sm">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@email.com"
                  className="mt-1 w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 px-3 py-2 outline-none focus:ring-2 focus:ring-neutral-400/50"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm">Service</label>
                <select
                  name="service"
                  className="mt-1 w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 px-3 py-2 outline-none focus:ring-2 focus:ring-neutral-400/50"
                >
                  <option>Commercial</option>
                  <option>Real Estate</option>
                  <option>Event / Tourism</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="text-sm">Budget</label>
                <select
                  name="budget"
                  className="mt-1 w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 px-3 py-2 outline-none focus:ring-2 focus:ring-neutral-400/50"
                >
                  <option>1,500-3,000 DKK</option>
                  <option>3,000-6,000 DKK</option>
                  <option>6,000-11,000 DKK</option>
                  <option>11,000+ DKK</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm">Project details</label>
              <textarea
                name="details"
                rows={5}
                placeholder="Location, dates, deliverables, references..."
                className="mt-1 w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 px-3 py-2 outline-none focus:ring-2 focus:ring-neutral-400/50"
              />
            </div>
            <div className="flex items-center justify-between gap-3">
              <div className="text-xs text-neutral-500">
                By submitting, you agree to be contacted about your project.
              </div>
              <button className="inline-flex items-center rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 px-4 py-2 text-sm font-medium hover:opacity-90">
                Send request
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-neutral-600 dark:text-neutral-400">
            (c) {new Date().getFullYear()} NordSky Aerials. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-sm">
            <a
              href="mailto:hello@nordskyaerials.com"
              className="hover:opacity-80"
            >
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

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <img
            src={lightbox.src}
            alt={lightbox.alt}
            className="max-h-[85vh] max-w-[90vw] rounded-xl"
          />
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-4 py-2 shadow">
          <div className="text-sm">{toast}</div>
        </div>
      )}
    </div>
  );
}
