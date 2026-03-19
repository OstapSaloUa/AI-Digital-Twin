/**
 * Generates a unique ID string (hex-based, not cryptographically secure).
 * @returns Unique string ID
 */
export function uid(): string {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}
