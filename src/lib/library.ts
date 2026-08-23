import type { Draft } from "./types";

/** A tiny localStorage-backed store for saved drafts, exposed as a
 *  useSyncExternalStore source (see useDrafts.ts) so the Library page can
 *  read it without a setState-in-effect. */

const STORAGE_KEY = "contentiq.library.v1";
const listeners = new Set<() => void>();
let cache: Draft[] | null = null;

function readFromStorage(): Draft[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? (parsed as Draft[]) : [];
  } catch {
    return [];
  }
}

function sortByNewest(drafts: Draft[]): Draft[] {
  return [...drafts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

function write(drafts: Draft[]): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts));
  cache = null;
  listeners.forEach((l) => l());
}

export function saveDraft(draft: Draft): void {
  if (typeof window === "undefined") return;
  write([draft, ...readFromStorage()]);
}

export function deleteDraft(id: string): void {
  if (typeof window === "undefined") return;
  write(readFromStorage().filter((d) => d.id !== id));
}

export function subscribeDrafts(callback: () => void): () => void {
  listeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

const EMPTY: Draft[] = [];

export function getDraftsSnapshot(): Draft[] {
  if (typeof window === "undefined") return EMPTY;
  if (!cache) cache = sortByNewest(readFromStorage());
  return cache;
}

export function getServerDraftsSnapshot(): Draft[] {
  return EMPTY;
}
