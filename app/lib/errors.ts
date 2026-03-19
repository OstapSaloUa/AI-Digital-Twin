import axios from "axios";

/**
 * Extracts a user-friendly error message from unknown error types.
 * Handles axios errors, Error instances, and fallback.
 * @param error - Caught error (unknown type)
 * @returns Human-readable error string
 */
export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const msg = error.response?.data?.error ?? error.response?.data?.message;
    if (typeof msg === "string") return msg;
    if (error.response?.status === 400) return "Invalid request.";
    if (error.response?.status === 500) return "Server error. Please try again.";
    if (error.message) return error.message;
  }
  if (error instanceof Error) return error.message;
  return "Something went wrong.";
}
