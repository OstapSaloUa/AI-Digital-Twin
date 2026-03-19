import type { LucideIcon } from "lucide-react";

type QuizOptionCardProps = {
  value: string;
  label: string;
  desc: string;
  Icon: LucideIcon;
  selected: boolean;
  onSelect: () => void;
};

export function QuizOptionCard({ label, desc, Icon, selected, onSelect }: QuizOptionCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={[
        "flex flex-col items-start rounded-xl sm:rounded-2xl border px-3 py-3 sm:px-4 sm:py-4 text-left transition touch-manipulation",
        selected
          ? "border-[var(--violet)] bg-[var(--violet)] text-white shadow-[0_0_0_3px_var(--violet-glow)]"
          : "border-[var(--border-default)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[var(--border-strong)]",
      ].join(" ")}
    >
      <Icon
        className={["h-6 w-6", selected ? "text-white/90" : "text-[var(--violet)]"].join(" ")}
      />
      <div className="mt-2 text-sm font-semibold">{label}</div>
      <div
        className={[
          "mt-1 text-xs leading-5",
          selected ? "text-white/80" : "text-[var(--text-secondary)]",
        ].join(" ")}
      >
        {desc}
      </div>
    </button>
  );
}
