import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { getOrCreateSessionId } from "../../lib/session";
import { handleApiError } from "../../lib/api-errors";

const EmailSchema = z.object({
  email: z.string().trim().email().max(120),
});

export async function POST(req: Request) {
  const sessionId = await getOrCreateSessionId();
  try {
    const json = await req.json();
    const input = EmailSchema.parse(json);

    const latestQuizEvent = await prisma.event.findFirst({
      where: { sessionId, type: "quiz_submit", userId: { not: null } },
      orderBy: { createdAt: "desc" },
      select: { userId: true },
    });

    const userId = latestQuizEvent?.userId ?? null;
    if (!userId) {
      return NextResponse.json(
        { ok: false, error: "No user found for this session" },
        { status: 400 },
      );
    }

    await prisma.user.update({
      where: { id: userId },
      data: { email: input.email.toLowerCase() },
    });

    await prisma.event.create({
      data: {
        sessionId,
        userId,
        type: "email_submitted",
        metadata: { email: input.email.toLowerCase() },
      },
    });

    return NextResponse.json({ ok: true, userId });
  } catch (e) {
    return handleApiError(e);
  }
}

