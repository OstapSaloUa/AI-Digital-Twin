import { NextResponse } from "next/server";
import { Prisma } from ".prisma/client";
import { ZodError } from "zod";

function getPrismaUserMessage(e: Prisma.PrismaClientKnownRequestError): string {
  switch (e.code) {
    case "P2002": {
      const target = e.meta?.target;
      const field = Array.isArray(target) ? target[0] : target;
      if (field === "email") return "This email already exists.";
      if (typeof field === "string")
        return `This ${field} is already in use.`;
      return "This value already exists.";
    }
    case "P2025":
      return "Record not found.";
    default:
      return "Something went wrong. Please try again.";
  }
}

export function handleApiError(e: unknown): NextResponse {
  if (e instanceof ZodError) {
    const msg = e.issues.map((x) => x.message).join("; ") || "Invalid input";
    return NextResponse.json({ ok: false, error: msg }, { status: 400 });
  }
  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    const message = getPrismaUserMessage(e);
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
  if (e instanceof Error) {
    const isClientError =
      /invalid|missing|not found|required/i.test(e.message) ||
      e.name === "ZodError";
    const status = isClientError ? 400 : 500;
    const message = isClientError ? e.message : "Something went wrong. Please try again.";
    return NextResponse.json({ ok: false, error: message }, { status });
  }
  return NextResponse.json(
    { ok: false, error: "Something went wrong. Please try again." },
    { status: 500 },
  );
}
