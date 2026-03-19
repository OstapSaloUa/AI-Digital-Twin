"use client";

import { useRef, useEffect, useState } from "react";
import { ClipboardList } from "lucide-react";
import { STEPS } from "./utils";
import { useQuiz } from "./useQuiz";
import { QuizStepper } from "./components/QuizStepper";
import { QuizStepContent } from "./components/QuizStepContent";
import { QuizActions } from "./components/QuizActions";

export default function QuizPage() {
  const prevStepRef = useRef(0);
  const [prevStep, setPrevStep] = useState(0);
  const {
    step,
    setStep,
    state,
    setState,
    submitting,
    error,
    currentStepId,
    isLastStep,
    canAdvance,
    canSubmit,
    handleNext,
  } = useQuiz();

  const direction = step > prevStep ? "forward" : step < prevStep ? "back" : "forward";
  useEffect(() => {
    setPrevStep(prevStepRef.current);
    prevStepRef.current = step;
  }, [step]);

  return (
    <div className="flex-1 bg-[var(--bg-base)]">
      <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="rounded-xl sm:rounded-2xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-4 sm:p-8 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
                Create your AI Digital Twin
              </h1>
              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                Answer a few questions to personalize your experience.
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-[var(--bg-subtle)] px-3 py-1 text-xs font-medium text-[var(--text-secondary)] border border-[var(--border-default)]">
              <ClipboardList className="h-4 w-4" />
              Quiz
            </div>
          </div>

          <QuizStepper steps={STEPS} currentStep={step} onStepClick={setStep} />

          <div className="-mx-4 mt-6 min-h-[180px] overflow-hidden px-4 sm:-mx-6 sm:mt-8 sm:min-h-[200px] sm:px-6">
            <QuizStepContent
              currentStepId={currentStepId}
              direction={direction}
              state={state}
              setState={setState}
            />
          </div>

          {error ? (
            <div className="mt-6 rounded-xl border border-[var(--danger-fg)]/30 bg-[var(--danger-bg)] px-4 py-3 text-sm text-[var(--danger-fg)]">
              {error}
            </div>
          ) : null}

          <QuizActions
            step={step}
            isLastStep={isLastStep}
            canAdvance={canAdvance}
            canSubmit={canSubmit}
            submitting={submitting}
            onBack={() => setStep((s) => Math.max(0, s - 1))}
            onNext={handleNext}
          />
        </div>

        <p className="mt-4 sm:mt-6 text-center text-xs text-[var(--text-muted)] px-2">
          This is a test funnel. Payments and product logic are out of scope.
        </p>
      </div>
    </div>
  );
}
