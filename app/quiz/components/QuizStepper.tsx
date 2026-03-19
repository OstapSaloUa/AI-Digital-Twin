import type { ReactNode } from "react";

type QuizStepperProps = {
  steps: ReadonlyArray<{ id: string }>;
  currentStep: number;
  onStepClick: (index: number) => void;
};

export function QuizStepper({
  steps,
  currentStep,
  onStepClick,
}: QuizStepperProps) {
  return (
    <>
      <div className="mt-6 sm:mt-8 flex items-center gap-2">
        {steps.map((s, i) => (
          <div key={s.id} className="flex flex-1 items-center gap-2">
            <button
              type="button"
              onClick={() => onStepClick(i)}
              className={[
                "flex h-2 flex-1 rounded-full transition-all duration-300",
                i <= currentStep ? "bg-[var(--violet)]" : "bg-[var(--border-subtle)]",
              ].join(" ")}
              aria-label={`Go to step ${i + 1}`}
            />
            {i < steps.length - 1 ? (
              <div
                className={[
                  "h-px w-2 flex-shrink-0 transition-colors duration-300",
                  i < currentStep ? "bg-[var(--violet)]" : "bg-[var(--border-subtle)]",
                ].join(" ")}
              />
            ) : null}
          </div>
        ))}
      </div>
      <p className="mt-2 text-xs text-[var(--text-muted)]">
        Step {currentStep + 1} of {steps.length}
      </p>
    </>
  );
}
