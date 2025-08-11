'use client';
/**
 * About section with company background and key capabilities.
 */

export default function About() {
  return (
    <section id="about" className="bg-neutral-50 dark:bg-neutral-950/60 border-y border-neutral-200 dark:border-neutral-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">About</h2>
            <p className="mt-4 text-neutral-600 dark:text-neutral-300 max-w-2xl">
              I am Gracjan, a registered drone user delivering cinematic aerials for ads, property showcases, tourism boards, and events. I operate sub-250g (C0) with liability insurance and backup batteries for reliability.
            </p>
            <dl className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-5">
                <dt className="text-sm text-neutral-500">Coverage</dt>
                <dd className="text-base font-medium">Denmark and EU - travel ready</dd>
              </div>
              <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-5">
                <dt className="text-sm text-neutral-500">Drone Category</dt>
                <dd className="text-base font-medium">Sub-250g (C0), insured, registered</dd>
              </div>
              <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-5">
                <dt className="text-sm text-neutral-500">Deliverables</dt>
                <dd className="text-base font-medium">4K/60, D-Log, RAW photos</dd>
              </div>
              <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-5">
                <dt className="text-sm text-neutral-500">Turnaround</dt>
                <dd className="text-base font-medium">48-72h for standard edits</dd>
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
  );
}
