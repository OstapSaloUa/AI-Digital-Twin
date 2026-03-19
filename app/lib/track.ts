"use client";

import { postEvent } from "./api";

/**
 * Sends an event to the API for analytics/debug. Fails silently in production.
 * @param type - Event type (e.g. quiz_start, chat_opened, message_sent)
 * @param metadata - Optional metadata object to attach
 */
export async function track(type: string, metadata?: unknown) {
  try {
    await postEvent(type, metadata);
  } catch (e) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[track] Failed to send event:", type, e);
    }
  }
}
