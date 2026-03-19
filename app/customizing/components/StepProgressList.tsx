import { CUSTOMIZING_STEPS } from "../utils";

type StepProgressListProps = {
  progress: number[];
};

export function StepProgressList({ progress }: StepProgressListProps) {
  return (
    <div className="space-y-3 sm:space-y-4">
      {CUSTOMIZING_STEPS.map((s, i) => (
        <div key={s.id}>
          <div className="mb-1 flex justify-between text-xs">
            <span className="font-medium text-[var(--text-secondary)]">
              {s.label}
            </span>
            <span className="font-semibold text-[var(--text-primary)]">
              {progress[i]}%
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--border-subtle)]">
            <div
              className="h-full rounded-full bg-[var(--violet)] transition-all duration-300 ease-out"
              style={{ width: `${progress[i]}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
