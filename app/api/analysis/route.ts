import { NextResponse } from "next/server";
import { z } from "zod";
import axios from "axios";
import { prisma } from "../../lib/prisma";
import { getOrCreateSessionId } from "../../lib/session";
import { handleApiError } from "../../lib/api-errors";
import { AnalysisSchema, deterministicAnalysis } from "../../lib/analysis";

const InputSchema = z.object({
  messages: z.array(z.string().min(1).max(2000)).min(1).max(20),
});

async function tryLLM(messages: string[]) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return null;
  }

  const prompt = [
    "You are generating a structured, JSON-only psychological reflection summary.",
    "Return ONLY valid JSON matching this schema:",
    JSON.stringify(AnalysisSchema.shape, null, 2),
    "",
    "User messages:",
    ...messages.map((m, i) => `Message ${i + 1}: ${m}`),
  ].join("\n");

  try {
    const baseUrl = process.env.OPENAI_API_URL ?? "https://api.openai.com/v1";
    const res = await axios.post<{
      choices?: Array<{ message?: { content?: string } }>;
    }>(
      `${baseUrl}/chat/completions`,
      {
        model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
        temperature: 0.3,
        messages: [
          {
            role: "system",
            content: "You MUST return JSON only. No markdown. No extra keys. Keep arrays concise.",
          },
          { role: "user", content: prompt },
        ],
        response_format: { type: "json_object" },
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    const content = res.data?.choices?.[0]?.message?.content;
    if (typeof content !== "string") return null;

    const parsed = JSON.parse(content);
    return AnalysisSchema.parse(parsed);
  } catch {
    return null;
  }
}

export async function POST(req: Request) {
  const sessionId = await getOrCreateSessionId();
  try {
    const json = await req.json();
    const input = InputSchema.parse(json);

    const latestEmailEvent = await prisma.event.findFirst({
      where: { sessionId, type: "email_submitted", userId: { not: null } },
      orderBy: { createdAt: "desc" },
      select: { userId: true },
    });
    const userId = latestEmailEvent?.userId ?? null;

    const analysis = (await tryLLM(input.messages)) ?? deterministicAnalysis(input.messages);

    if (userId) {
      await prisma.event.create({
        data: {
          sessionId,
          userId,
          type: "analysis_generated",
          metadata: analysis,
        },
      });
    }

    return NextResponse.json({ ok: true, analysis });
  } catch (e) {
    return handleApiError(e);
  }
}
