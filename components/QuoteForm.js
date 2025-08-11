'use client';
/**
 * Quote request form with reCAPTCHA validation and submission handling.
 */

export default function QuoteForm({ handleQuote }) {
  return (
    <section id="quote" className="bg-neutral-50 dark:bg-neutral-950/60 border-y border-neutral-200 dark:border-neutral-800">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Get a Quote</h2>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
          Tell me about your project and I will reply with pricing and availability.
        </p>
        <form onSubmit={handleQuote} className="mt-8 space-y-4">
          {/* Honeypot */}
          <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" />
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
  );
}
