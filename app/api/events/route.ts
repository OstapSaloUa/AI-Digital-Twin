import { NextResponse } from "next/server";
import { Prisma } from ".prisma/client";
import { prisma } from "../../lib/prisma";
import { getOrCreateSessionId } from "../../lib/session";

const DEBUG_ALLOWED =
  process.env.DEBUG_EVENTS === "1" || process.env.NODE_ENV !== "production";

export async function GET() {
  if (!DEBUG_ALLOWED) {
    return NextResponse.json({ error: "Not enabled" }, { status: 403 });
  }
  const events = await prisma.event.findMany({
    orderBy: { createdAt: "desc" },
    take: 500,
  });
  return NextResponse.json({ events });
}

export async function POST(req: Request) {
  try {
    const sessionId = await getOrCreateSessionId();
    const body = (await req.json()) as {
      type?: string;
      metadata?: unknown;
      userId?: string | null;
    };

    const type = typeof body.type === "string" ? body.type : "";
    if (!type) {
      return NextResponse.json({ error: "Missing type" }, { status: 400 });
    }

    const event = await prisma.event.create({
      data: {
        sessionId,
        userId: body.userId ?? null,
        type,
        metadata:
          body.metadata === undefined
            ? Prisma.JsonNull
            : (body.metadata as Prisma.InputJsonValue),
      },
    });

    return NextResponse.json({ ok: true, eventId: event.id });
  } catch (e) {
    return NextResponse.json({
      ok: false,
      error: e instanceof Error ? e.message : "Tracking failed",
    });
  }
}

