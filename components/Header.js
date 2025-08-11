'use client';
/**
 * Header renders the site navigation bar with theme toggle and responsive mobile menu.
 */

import { SunIcon, MoonIcon, MenuIcon } from './Icons';

export default function Header({ dark, setDark, mobileOpen, setMobileOpen }) {
  return (
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
  );
}
