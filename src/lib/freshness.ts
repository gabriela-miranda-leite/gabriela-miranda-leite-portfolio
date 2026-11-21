import { useSyncExternalStore } from 'react';

export type Freshness = 'new' | 'updated';

export const FRESH_WINDOW_MS = 7 * 24 * 60 * 60 * 1000;

const HOUR_MS = 60 * 60 * 1000;

function isRecent(iso: string | undefined, now: number): boolean {
  if (!iso) return false;
  const age = now - new Date(iso).getTime();
  // `now` is floored to the hour, so allow up to an hour of negative age for brand-new items
  return age >= -HOUR_MS && age <= FRESH_WINDOW_MS;
}

export function getFreshness(created: string | undefined, updated: string | undefined, now: number): Freshness | null {
  if (isRecent(created, now)) return 'new';
  if (isRecent(updated, now)) return 'updated';
  return null;
}

const subscribe = () => () => {};
const clientNow = () => Math.floor(Date.now() / HOUR_MS) * HOUR_MS;
const serverNow = () => null;

// Computed in the browser only: pages are generated at build time, so a server-side answer
// would keep a label alive long after its week is over. Rendered as null until hydrated.
export function useFreshness(created?: string, updated?: string): Freshness | null {
  const now = useSyncExternalStore<number | null>(subscribe, clientNow, serverNow);
  return now === null ? null : getFreshness(created, updated, now);
}
