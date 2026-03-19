import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";
import { getOrCreateSessionId } from "../../../lib/session";
import { handleApiError } from "../../../lib/api-errors";

const MessageSchema = z.object({
  content: z.string().trim().min(1).max(2000),
});

export async function POST(req: Request) {
  const sessionId = await getOrCreateSessionId();
  try {
    const json = await req.json();
    const input = MessageSchema.parse(json);

    const latestEmailEvent = await prisma.event.findFirst({
      where: { sessionId, type: "email_submitted", userId: { not: null } },
      orderBy: { createdAt: "desc" },
      select: { userId: true },
    });
    const userId = latestEmailEvent?.userId ?? null;
    if (!userId) {
      return NextResponse.json(
        { ok: false, error: "No user found for this session" },
        { status: 400 },
      );
    }

    const message = await prisma.chatMessage.create({
      data: {
        userId,
        role: "user",
        content: input.content,
      },
    });

    await prisma.event.create({
      data: {
        sessionId,
        userId,
        type: "message_sent",
        metadata: { length: input.content.length },
      },
    });

    return NextResponse.json({ ok: true, messageId: message.id });
  } catch (e) {
    return handleApiError(e);
  }
}

