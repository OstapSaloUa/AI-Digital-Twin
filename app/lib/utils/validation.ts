/**
 * Validates email format using a simple regex.
 * @param s - String to validate
 * @returns true if valid email format
 */
export function isEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}
