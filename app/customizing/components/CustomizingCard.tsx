import { StepProgressList } from "./StepProgressList";

type CustomizingCardProps = {
  progress: number[];
  overallProgress: number;
};

export function CustomizingCard({
  progress,
  overallProgress,
}: CustomizingCardProps) {
  return (
    <div className="mx-auto w-full max-w-lg rounded-xl sm:rounded-2xl border border-[var(--border-default)] bg-[var(--bg-elevated)]/90 p-4 sm:p-8 shadow-2xl backdrop-blur-xl">
      <div className="mb-4 sm:mb-6">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--border-subtle)]">
          <div
            className="h-full rounded-full bg-[var(--violet)] transition-all duration-300 ease-out"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>

      <h1 className="text-lg sm:text-xl font-bold tracking-tight text-[var(--text-primary)]">
        Customizing Your Algorithm
      </h1>
      <p className="mt-2 text-sm text-[var(--text-secondary)]">
        We&apos;re tailoring your AI mind twin to match your preferences and
        needs.
      </p>

      <div className="my-6 sm:my-8 flex justify-center">
        <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-full bg-gradient-to-r from-[var(--violet)] to-[var(--cyan)] opacity-30 blur-3xl animate-pulse-glow" />
      </div>

      <StepProgressList progress={progress} />
    </div>
  );
}
