import { Loader2 } from "lucide-react";

type QuizActionsProps = {
  step: number;
  isLastStep: boolean;
  canAdvance: boolean;
  canSubmit: boolean;
  submitting: boolean;
  onBack: () => void;
  onNext: () => void;
};

export function QuizActions({
  step,
  isLastStep,
  canAdvance,
  canSubmit,
  submitting,
  onBack,
  onNext,
}: QuizActionsProps) {
  const disabled = submitting || (!canAdvance && !(isLastStep && canSubmit));
  const canProceed = (canAdvance || (isLastStep && canSubmit)) && !submitting;

  return (
    <div className="mt-6 sm:mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      {step > 0 && (
        <button
          type="button"
          onClick={onBack}
          className="rounded-xl px-4 py-3 text-sm font-semibold text-[var(--text-secondary)] transition hover:bg-[var(--bg-overlay)] touch-manipulation"
        >
          Back
        </button>
      )}
      <button
        type="button"
        disabled={disabled}
        onClick={onNext}
        className={[
          "inline-flex w-full sm:w-auto items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold shadow-sm transition touch-manipulation",
          step === 0 && "sm:ml-auto",
          canProceed
            ? "bg-[var(--violet)] text-white hover:bg-[var(--violet-hover)]"
            : "bg-[var(--bg-subtle)] text-[var(--text-disabled)] border border-[var(--border-default)]",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {submitting ? (
          <span className="inline-flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Submitting…
          </span>
        ) : isLastStep ? (
          "Continue"
        ) : (
          "Next"
        )}
      </button>
    </div>
  );
}
