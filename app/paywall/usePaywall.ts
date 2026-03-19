"use client";

import { useEffect } from "react";
import { track } from "../lib/track";

export function usePaywall() {
  useEffect(() => {
    track("paywall_view");
  }, []);
}
