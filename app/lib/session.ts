import { cookies } from "next/headers";

const SESSION_COOKIE = "adt_session";
export const USER_ID_COOKIE = "adt_user_id";

export const USER_ID_COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 60 * 60 * 24 * 30, // 30 days
};

/**
 * Reads the user ID from the adt_user_id cookie (set after quiz/email submission).
 * @returns User ID string or null if not set
 */
export async function getUserIdFromCookie(): Promise<string | null> {
  const jar = await cookies();
  return jar.get(USER_ID_COOKIE)?.value ?? null;
}

function randomId() {
  return (
    Math.random().toString(16).slice(2) +
    Math.random().toString(16).slice(2) +
    Date.now().toString(16)
  );
}

/**
 * Gets existing session ID from cookie or creates a new one and sets the cookie.
 * @returns Session ID string
 */
export async function getOrCreateSessionId() {
  const jar = await cookies();
  const existing = jar.get(SESSION_COOKIE)?.value;
  if (existing) return existing;

  const sessionId = randomId();
  jar.set(SESSION_COOKIE, sessionId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return sessionId;
}
