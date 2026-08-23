"use client";

import { useSyncExternalStore } from "react";
import type { Draft } from "./types";
import { subscribeDrafts, getDraftsSnapshot, getServerDraftsSnapshot } from "./library";

export function useDrafts(): Draft[] {
  return useSyncExternalStore(subscribeDrafts, getDraftsSnapshot, getServerDraftsSnapshot);
}
