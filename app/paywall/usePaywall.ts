"use client";

import { useEffect } from "react";
import { track } from "../lib/track";

/**
 * Tracks paywall_view event on mount when the paywall page is viewed.
 */
export function usePaywall() {
  useEffect(() => {
    track("paywall_view");
  }, []);
}
