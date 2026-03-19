"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { track } from "../lib/track";
import { uid } from "../lib/utils/id";
import { postChatMessage, postAnalysis } from "../lib/api";
import { useToast } from "../lib/toast";
import { getErrorMessage } from "../lib/errors";
import type { Analysis, ChatMessage } from "./utils";

const INTRO_MESSAGE: ChatMessage = {
  id: "intro",
  role: "assistant",
  content:
    "Before we begin—think about the last time you experienced stress. What was happening, and what did you notice in your body or thoughts?",
};

const FALLBACK_ANALYSIS: Analysis = {
  summary:
    "You described recent stress and how it impacted your thoughts, emotions, and day-to-day functioning.",
  themes: ["stress", "overload", "self-judgment"].slice(0, 2),
  stressors: ["uncertainty", "time pressure"],
  emotions: ["anxiety", "frustration"],
  copingStrategies: ["deep breathing", "break tasks into smaller steps"],
  suggestedNextSteps: [
    "Name the trigger and what you needed in that moment.",
    "Try a 2-minute reset before your next stressful task.",
  ],
};

export function useChat() {
  const router = useRouter();
  const { showError } = useToast();
  const [messages, setMessages] = useState<ChatMessage[]>([INTRO_MESSAGE]);
  const [input, setInput] = useState("");
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [analysisOpen, setAnalysisOpen] = useState(false);
  const hasShownAnalysisRef = useRef(false);
  const listRef = useRef<HTMLDivElement | null>(null);

  const userMessageCount = useMemo(
    () => messages.filter((m) => m.role === "user").length,
    [messages],
  );

  const { mutateAsync: sendMessage, isPending: sending } = useMutation({
    mutationFn: (content: string) => postChatMessage(content),
    onError: (e) => {
      showError(getErrorMessage(e));
      setMessages((m) => [
        ...m,
        {
          id: uid(),
          role: "assistant",
          content:
            "I couldn't save that message, but you can keep going for the demo.",
        },
      ]);
    },
  });

  const { mutateAsync: fetchAnalysis } = useMutation({
    mutationFn: (msgs: string[]) => postAnalysis(msgs),
  });

  useEffect(() => {
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages.length, analysisOpen]);

  useEffect(() => {
    track("chat_opened");
  }, []);

  const send = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || sending) return;
    setInput("");

    const msg: ChatMessage = { id: uid(), role: "user", content: trimmed };
    setMessages((m) => [...m, msg]);

    try {
      await sendMessage(trimmed);
    } catch {
      // onError handles toast + fallback message
    }
  }, [input, sending, sendMessage]);

  const generateAnalysis = useCallback(async (): Promise<Analysis> => {
    try {
      const res = await fetchAnalysis(
        messages.filter((m) => m.role === "user").map((m) => m.content),
      );
      const data = res.data;
      if (data?.analysis && typeof data.analysis === "object") {
        return data.analysis as Analysis;
      }
    } catch {
      showError("Analysis unavailable. Showing fallback.");
    }
    return FALLBACK_ANALYSIS;
  }, [messages, fetchAnalysis, showError]);

  useEffect(() => {
    if (userMessageCount === 5 && !analysisOpen && !hasShownAnalysisRef.current) {
      hasShownAnalysisRef.current = true;
      (async () => {
        const a = await generateAnalysis();
        setAnalysis(a);
        setAnalysisOpen(true);
        await track("analysis_shown");
      })();
    }
  }, [userMessageCount, analysisOpen, generateAnalysis]);

  const goToPaywall = useCallback(() => {
    setAnalysisOpen(false);
    router.push("/paywall");
  }, [router]);

  const closeAnalysis = useCallback(() => {
    setAnalysisOpen(false);
  }, []);

  return {
    messages,
    input,
    setInput,
    sending,
    analysis,
    analysisOpen,
    userMessageCount,
    listRef,
    send,
    goToPaywall,
    closeAnalysis,
  };
}
