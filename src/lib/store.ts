import { useSyncExternalStore } from "react";
import { defaultShelf } from "./data";

export interface State {
  user: { name: string; email: string; goal?: string } | null;
  shelf: string[];
  done: Record<string, boolean>;
  budget: number;
  scanned: boolean;
  checkins: number[];
  notifications: boolean;
}

const KEY = "lumera-demo-v1";
const initial: State = { user: null, shelf: defaultShelf, done: { am1: true, am2: true, am3: true }, budget: 2500, scanned: true, checkins: [1, 7, 14], notifications: true };

let state: State = initial;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) state = { ...initial, ...JSON.parse(raw) };
  } catch {
    /* ignore */
  }
}

export function setState(fn: (s: State) => Partial<State>) {
  load();
  state = { ...state, ...fn(state) };
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* ignore */ }
  listeners.forEach((l) => l());
}

export function resetState() {
  state = { ...initial, user: null };
  try { localStorage.removeItem(KEY); } catch { /* ignore */ }
  listeners.forEach((l) => l());
}

export function useStore<T>(sel: (s: State) => T): T {
  return useSyncExternalStore(
    (l) => { listeners.add(l); return () => listeners.delete(l); },
    () => { load(); return sel(state); },
    () => sel(initial),
  );
}
