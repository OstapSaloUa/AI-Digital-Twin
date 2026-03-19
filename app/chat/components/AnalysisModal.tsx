import type { Analysis } from "../utils";
import { ANALYSIS_SECTIONS } from "../utils";

type AnalysisModalProps = {
  analysis: Analysis;
  onContinue: () => void;
  onClose: () => void;
};

export function AnalysisModal({ analysis, onContinue, onClose }: AnalysisModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 py-4 px-3 sm:py-8 sm:px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[calc(100dvh-2rem)] sm:max-h-[calc(100vh-4rem)] overflow-y-auto rounded-xl sm:rounded-2xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-4 sm:p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
              AI Analysis
            </div>
            <h2 className="mt-1 text-lg sm:text-xl font-semibold tracking-tight text-[var(--text-primary)]">
              Your reflection summary
            </h2>
          </div>
          <button
            type="button"
            onClick={onContinue}
            className="shrink-0 self-start rounded-xl px-3 py-2.5 text-sm font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-overlay)] touch-manipulation"
          >
            Continue
          </button>
        </div>

        <div className="mt-4 sm:mt-5 space-y-3 sm:space-y-4 text-sm leading-6 text-[var(--text-secondary)]">
          <div className="rounded-xl bg-[var(--bg-surface)] p-3 sm:p-4 border border-[var(--border-default)]">
            <div className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
              Summary
            </div>
            <div className="mt-1 text-[var(--text-primary)]">{analysis.summary}</div>
          </div>

          {ANALYSIS_SECTIONS.map(({ label, key }) => (
            <div
              key={label}
              className="rounded-xl border border-[var(--border-default)] p-3 sm:p-4 bg-[var(--bg-surface)]"
            >
              <div className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                {label}
              </div>
              <ul className="mt-2 list-disc pl-5 text-[var(--text-primary)]">
                {analysis[key].map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-5 sm:mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs text-[var(--text-muted)]">
            After this, you&apos;ll see a paywall screen (no payments).
          </div>
          <button
            type="button"
            onClick={onContinue}
            className="w-full sm:w-auto rounded-xl bg-[var(--violet)] px-4 py-3 sm:py-2.5 text-sm font-semibold text-white hover:bg-[var(--violet-hover)] touch-manipulation"
          >
            Go to paywall
          </button>
        </div>
      </div>
    </div>
  );
}
