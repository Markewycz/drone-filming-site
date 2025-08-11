'use client';
/**
 * Services section listing offerings with descriptions and pricing.
 */

import { formatDKK } from '@/lib/format';

export default function Services({ services }) {
  return (
    <section id="services" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Services</h2>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <div
            key={i}
            className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 hover:shadow-sm transition"
          >
            <h3 className="font-medium">{s.name}</h3>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">{s.desc}</p>
            <div className="mt-4 text-sm text-neutral-500">{formatDKK(s.price)}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
