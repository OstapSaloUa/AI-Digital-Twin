"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { track } from "../lib/track";
import type { QuizState } from "./utils";
import { STEPS, personalities, therapyStyles, primaryGoals, stressFrequencies } from "./utils";
import { postQuiz } from "../lib/api";
import { useToast } from "../lib/toast";
import { getErrorMessage } from "../lib/errors";

const INITIAL_STATE: QuizState = {
  name: "",
  personality: "",
  therapyStyle: "",
  primaryGoal: "",
  stressFrequency: "",
};

function parseStepFromUrl(searchParams: URLSearchParams | null): number {
  if (!searchParams) return 0;
  const stepParam = searchParams.get("step");
  if (stepParam === null) return 0;
  const parsed = parseInt(stepParam, 10);
  if (Number.isNaN(parsed) || parsed < 1) return 0;
  return Math.min(parsed - 1, STEPS.length - 1); // URL is 1-based, convert to 0-based index
}

/**
 * Manages quiz state, step (synced with URL ?step=1-5), and submission.
 * Supports keyboard: Enter (next), ArrowLeft/Right (prev/next option).
 * @returns step, setStep, state, setState, submitting, error, currentStepId, isLastStep, canAdvance, canSubmit, handleNext
 */
export function useQuiz() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showError } = useToast();

  const stepFromUrl = parseStepFromUrl(searchParams);
  const [step, setStepState] = useState(stepFromUrl);
  const [state, setState] = useState<QuizState>(INITIAL_STATE);

  // Sync step with URL: URL is source of truth on mount and when URL changes (e.g. back/forward)
  useEffect(() => {
    setStepState(stepFromUrl);
  }, [stepFromUrl]);

  // Ensure URL has step param on mount (e.g. /quiz -> /quiz?step=1)
  useEffect(() => {
    if (!searchParams?.has("step")) {
      router.replace("/quiz?step=1", { scroll: false });
    }
  }, [router, searchParams]);

  const setStep = useCallback(
    (value: number | ((prev: number) => number)) => {
      setStepState((prev) => {
        const next = typeof value === "function" ? value(prev) : value;
        const clamped = Math.max(0, Math.min(next, STEPS.length - 1));
        router.replace(`/quiz?step=${clamped + 1}`, { scroll: false }); // URL is 1-based
        return clamped;
      });
    },
    [router]
  );

  const {
    mutateAsync: submitQuiz,
    isPending,
    error,
    reset,
  } = useMutation({
    mutationFn: () => postQuiz(state),
    onSuccess: () => router.push("/email"),
  });

  useEffect(() => {
    track("quiz_start");
  }, []);

  const currentStepId = STEPS[step]?.id ?? "name";
  const isLastStep = step === STEPS.length - 1;

  const canAdvance = useMemo(() => {
    switch (currentStepId) {
      case "name":
        return state.name.trim().length >= 2;
      case "personality":
        return state.personality !== "";
      case "therapyStyle":
        return state.therapyStyle !== "";
      case "primaryGoal":
        return state.primaryGoal !== "";
      case "stressFrequency":
        return state.stressFrequency !== "";
      default:
        return false;
    }
  }, [currentStepId, state]);

  const canSubmit = useMemo(() => {
    return (
      state.name.trim().length >= 2 &&
      state.personality !== "" &&
      state.therapyStyle !== "" &&
      state.primaryGoal !== "" &&
      state.stressFrequency !== ""
    );
  }, [state]);

  const onSubmit = useCallback(async () => {
    reset();
    if (!canSubmit) return;
    try {
      await submitQuiz();
    } catch (e) {
      showError(getErrorMessage(e));
    }
  }, [canSubmit, submitQuiz, reset, showError]);

  const handleNext = useCallback(() => {
    reset();
    if (isLastStep && canSubmit) {
      onSubmit();
    } else if (canAdvance) {
      setStep((s) => Math.min(s + 1, STEPS.length - 1));
    }
  }, [isLastStep, canSubmit, canAdvance, onSubmit, reset]);

  const handleArrowSelect = useCallback(
    (dir: "prev" | "next") => {
      if (currentStepId === "name") return; // name step has no options

      const optionsMap = {
        personality: personalities,
        therapyStyle: therapyStyles,
        primaryGoal: primaryGoals,
        stressFrequency: stressFrequencies,
      } as const;

      const stateKeyMap = {
        personality: "personality" as const,
        therapyStyle: "therapyStyle" as const,
        primaryGoal: "primaryGoal" as const,
        stressFrequency: "stressFrequency" as const,
      } as const;

      const options = optionsMap[currentStepId as keyof typeof optionsMap];
      const stateKey = stateKeyMap[currentStepId as keyof typeof stateKeyMap];
      if (!options || !stateKey) return;

      const currentValue = state[stateKey];
      const idx = options.findIndex((o) => o.value === currentValue);
      const currentIdx = idx >= 0 ? idx : 0;

      let nextIdx: number;
      if (dir === "prev") {
        nextIdx = currentIdx <= 0 ? options.length - 1 : currentIdx - 1;
      } else {
        nextIdx = currentIdx >= options.length - 1 ? 0 : currentIdx + 1;
      }

      const nextValue = options[nextIdx]!.value;
      setState((s) => ({ ...s, [stateKey]: nextValue }));
    },
    [currentStepId, state]
  );

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      // Don't capture when typing in input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key === "Enter") {
        e.preventDefault();
        handleNext();
        return;
      }

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handleArrowSelect("prev");
        return;
      }

      if (e.key === "ArrowRight") {
        e.preventDefault();
        handleArrowSelect("next");
        return;
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleNext, handleArrowSelect]);

  const errorMessage =
    error instanceof Error ? error.message : error ? "Something went wrong" : null;

  return {
    step,
    setStep,
    state,
    setState,
    submitting: isPending,
    error: errorMessage,
    currentStepId,
    isLastStep,
    canAdvance,
    canSubmit,
    handleNext,
  };
}
