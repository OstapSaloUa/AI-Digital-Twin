type Step = "email" | "chat";

const STEPS: { id: Step; label: string }[] = [
  { id: "email", label: "Email" },
  { id: "chat", label: "Chat" },
];

type FunnelStepIndicatorProps = {
  currentStep: Step;
};

export function FunnelStepIndicator({ currentStep }: FunnelStepIndicatorProps) {
  const currentIndex = STEPS.findIndex((s) => s.id === currentStep);

  return (
    <div className="mb-6 flex items-center gap-2 sm:gap-3">
      {STEPS.map((step, i) => {
        const isActive = step.id === currentStep;
        const isPast = i < currentIndex;
        return (
          <div key={step.id} className="flex items-center gap-2 sm:gap-3">
            <div
              className={[
                "flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium sm:px-3 sm:py-1.5",
                isActive
                  ? "border-[var(--violet)] bg-[var(--violet)] text-white"
                  : isPast
                    ? "border-[var(--violet)]/50 bg-[var(--violet)]/10 text-[var(--violet)]"
                    : "border-[var(--border-default)] bg-[var(--bg-subtle)] text-[var(--text-muted)]",
              ].join(" ")}
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold sm:h-6 sm:w-6">
                {isPast ? "✓" : i + 1}
              </span>
              <span className="hidden sm:inline">{step.label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={[
                  "h-0.5 w-4 sm:w-8 rounded-full",
                  isPast ? "bg-[var(--violet)]" : "bg-[var(--border-subtle)]",
                ].join(" ")}
                aria-hidden
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
