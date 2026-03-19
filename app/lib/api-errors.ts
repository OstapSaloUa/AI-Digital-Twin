import { NextResponse } from "next/server";
import { ZodError } from "zod";

function isPrismaKnownError(e: unknown): e is { code: string; meta?: { target?: unknown } } {
  return (
    typeof e === "object" &&
    e !== null &&
    "code" in e &&
    typeof (e as { code: unknown }).code === "string" &&
    (e as { code: string }).code.startsWith("P")
  );
}

function getPrismaUserMessage(e: { code: string; meta?: { target?: unknown } }): string {
  switch (e.code) {
    case "P2002": {
      const target = e.meta?.target;
      const field = Array.isArray(target) ? target[0] : target;
      if (field === "email") return "This email already exists.";
      if (typeof field === "string") return `This ${field} is already in use.`;
      return "This value already exists.";
    }
    case "P2025":
      return "Record not found.";
    default:
      return "Something went wrong. Please try again.";
  }
}

/**
 * Converts API errors (Zod, Prisma, generic) to NextResponse with appropriate status and message.
 * @param e - Caught error
 * @returns NextResponse with { ok: false, error: string } and status 400 or 500
 */
export function handleApiError(e: unknown): NextResponse {
  if (e instanceof ZodError) {
    const msg = e.issues.map((x) => x.message).join("; ") || "Invalid input";
    return NextResponse.json({ ok: false, error: msg }, { status: 400 });
  }
  if (isPrismaKnownError(e)) {
    const message = getPrismaUserMessage(e);
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
  if (e instanceof Error) {
    const isClientError =
      /invalid|missing|not found|required/i.test(e.message) || e.name === "ZodError";
    const status = isClientError ? 400 : 500;
    const message = isClientError ? e.message : "Something went wrong. Please try again.";
    return NextResponse.json({ ok: false, error: message }, { status });
  }
  return NextResponse.json(
    { ok: false, error: "Something went wrong. Please try again." },
    { status: 500 }
  );
}
