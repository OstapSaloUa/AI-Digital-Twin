import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { getOrCreateSessionId, USER_ID_COOKIE, USER_ID_COOKIE_OPTIONS } from "../../lib/session";
import { handleApiError } from "../../lib/api-errors";

const QuizSchema = z.object({
  name: z.string().trim().min(2).max(80),
  personality: z.string().min(1).max(40),
  therapyStyle: z.string().min(1).max(40),
  primaryGoal: z.string().min(1).max(40),
  stressFrequency: z.string().min(1).max(40),
});

export async function POST(req: Request) {
  const sessionId = await getOrCreateSessionId();
  try {
    const json = await req.json();
    const input = QuizSchema.parse(json);

    const user = await prisma.user.create({
      data: { name: input.name },
    });

    await prisma.quizResponse.create({
      data: {
        userId: user.id,
        personality: input.personality,
        therapyStyle: input.therapyStyle,
        primaryGoal: input.primaryGoal,
        stressFrequency: input.stressFrequency,
      },
    });

    await prisma.event.create({
      data: {
        sessionId,
        userId: user.id,
        type: "quiz_submit",
        metadata: {
          personality: input.personality,
          therapyStyle: input.therapyStyle,
          primaryGoal: input.primaryGoal,
          stressFrequency: input.stressFrequency,
        },
      },
    });

    const res = NextResponse.json({ ok: true, userId: user.id });
    res.cookies.set(USER_ID_COOKIE, user.id, USER_ID_COOKIE_OPTIONS);
    return res;
  } catch (e) {
    return handleApiError(e);
  }
}
