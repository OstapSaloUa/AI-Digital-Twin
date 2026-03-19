"use client";

import { postEvent } from "./api";

export async function track(type: string, metadata?: unknown) {
  try {
    await postEvent(type, metadata);
  } catch (e) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[track] Failed to send event:", type, e);
    }
  }
}
