"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { track } from "../lib/track";
import type { QuizState } from "./utils";
import { STEPS } from "./utils";
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

export function useQuiz() {
  const router = useRouter();
  const { showError } = useToast();
  const [step, setStep] = useState(0);
  const [state, setState] = useState<QuizState>(INITIAL_STATE);

  const { mutateAsync: submitQuiz, isPending, error, reset } = useMutation({
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

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Enter") {
        e.preventDefault();
        handleNext();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleNext]);

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
