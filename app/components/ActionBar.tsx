type ActionBarProps = {
  left: React.ReactNode;
  right?: React.ReactNode;
  className?: string;
};

export function ActionBar({ left, right, className }: ActionBarProps) {
  return (
    <div
      className={`mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 ${className ?? ""}`}
    >
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">{left}</div>
      {right && <div className="text-xs text-[var(--text-muted)]">{right}</div>}
    </div>
  );
}

export const actionBarItemClass =
  "rounded-xl px-4 py-2 text-sm font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-overlay)]";
