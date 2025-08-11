'use client';
/**
 * Toast component for transient user notifications.
 */

export default function Toast({ message }) {
  if (!message) return null;
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-4 py-2 shadow">
      <div className="text-sm">{message}</div>
    </div>
  );
}
