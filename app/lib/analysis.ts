import { z } from "zod";

export const AnalysisSchema = z.object({
  summary: z.string().min(1).max(800),
  themes: z.array(z.string().min(1).max(50)).min(1).max(8),
  stressors: z.array(z.string().min(1).max(80)).min(1).max(8),
  emotions: z.array(z.string().min(1).max(40)).min(1).max(8),
  copingStrategies: z.array(z.string().min(1).max(80)).min(1).max(8),
  suggestedNextSteps: z.array(z.string().min(1).max(120)).min(1).max(8),
});

export type Analysis = z.infer<typeof AnalysisSchema>;

const emotionKeywords: Array<[string, string]> = [
  ["anx", "anxiety"],
  ["stress", "stress"],
  ["overwhelm", "overwhelm"],
  ["frustrat", "frustration"],
  ["angry", "anger"],
  ["sad", "sadness"],
  ["panic", "panic"],
  ["tired", "fatigue"],
  ["guilt", "guilt"],
];

const stressorKeywords: Array<[string, string]> = [
  ["deadline", "deadlines / time pressure"],
  ["money", "financial pressure"],
  ["work", "workload"],
  ["boss", "work conflict"],
  ["relationship", "relationship tension"],
  ["family", "family expectations"],
  ["health", "health concerns"],
  ["sleep", "sleep disruption"],
  ["uncertain", "uncertainty"],
];

/**
 * Generates a structured Analysis from user messages using keyword matching.
 * Fallback when OPENAI_API_KEY is not set or LLM fails.
 * @param userMessages - Array of user chat messages
 * @returns Parsed Analysis object (summary, themes, stressors, emotions, copingStrategies, suggestedNextSteps)
 */
export function deterministicAnalysis(userMessages: string[]): Analysis {
  const text = userMessages.join("\n").toLowerCase();

  const emotions = emotionKeywords.filter(([k]) => text.includes(k)).map(([, v]) => v);
  const stressors = stressorKeywords.filter(([k]) => text.includes(k)).map(([, v]) => v);

  const themes = Array.from(
    new Set([
      "stress response",
      ...(text.includes("overwhelm") ? ["overload"] : []),
      ...(text.includes("should") ? ["self-judgment"] : []),
      ...(text.includes("can't") ? ["stuckness"] : []),
      ...(text.includes("worry") ? ["anticipatory worry"] : []),
    ])
  ).slice(0, 4);

  const summarySeed = userMessages[userMessages.length - 1]?.slice(0, 220) ?? "";

  return AnalysisSchema.parse({
    summary:
      summarySeed.length > 20
        ? `You reflected on a recent stressful moment: “${summarySeed}…”. Your notes suggest a pattern worth exploring with more clarity and self-compassion.`
        : "You reflected on a recent stressful moment and how it affected your thoughts, emotions, and behavior.",
    themes: themes.length ? themes : ["stress response"],
    stressors: stressors.length ? stressors : ["uncertainty", "time pressure"],
    emotions: emotions.length ? emotions : ["anxiety", "frustration"],
    copingStrategies: [
      "Name the trigger and what you needed in that moment",
      "Do a 90-second grounding reset (breath + body scan)",
      "Break the next task into a 10-minute first step",
    ].slice(0, 3),
    suggestedNextSteps: [
      "Write one sentence: “The story I told myself was…”",
      "Pick one supportive action you can take today (small and specific).",
      "If this is persistent, consider talking with a licensed professional.",
    ].slice(0, 3),
  });
}
