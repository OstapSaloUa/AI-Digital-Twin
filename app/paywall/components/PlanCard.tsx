import type { LucideIcon } from "lucide-react";

type PlanCardProps = {
  title: string;
  price: string;
  Icon: LucideIcon;
};

export function PlanCard({ title, price, Icon }: PlanCardProps) {
  return (
    <div className="rounded-xl sm:rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-4 sm:p-5">
      <div className="flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)]">
        <Icon className="h-4 w-4 text-[var(--violet)]" />
        {title}
      </div>
      <div className="mt-2 text-xl sm:text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
        {price}
      </div>
      <div className="mt-2 text-xs leading-5 text-[var(--text-secondary)]">
        Includes your full analysis, memory, and personalized coaching.
      </div>
      <button
        type="button"
        className="mt-4 w-full rounded-xl bg-[var(--violet)] px-4 py-3 text-sm font-semibold text-white opacity-60 touch-manipulation"
        disabled
      >
        Continue
      </button>
    </div>
  );
}
