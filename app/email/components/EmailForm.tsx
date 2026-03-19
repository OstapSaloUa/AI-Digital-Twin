import { Mail, Loader2 } from "lucide-react";

type EmailFormProps = {
  email: string;
  setEmail: (value: string) => void;
  valid: boolean;
  submitting: boolean;
  error: string | null;
  onSubmit: () => void;
  onBack: () => void;
};

export function EmailForm({
  email,
  setEmail,
  valid,
  submitting,
  error,
  onSubmit,
  onBack,
}: EmailFormProps) {
  return (
    <div className="rounded-xl sm:rounded-2xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-4 sm:p-8 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
            Where should we send your results?
          </h1>
          <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
            We&apos;ll use your email to save your AI twin setup and continue the
            experience.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-[var(--bg-subtle)] px-3 py-1 text-xs font-medium text-[var(--text-secondary)] border border-[var(--border-default)]">
          <Mail className="h-4 w-4" />
          Email
        </div>
      </div>

      <div className="mt-8">
        <label className="text-sm font-medium text-[var(--text-primary)]">
          Email
        </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onSubmit();
            }
          }}
          inputMode="email"
          autoComplete="email"
          placeholder="you@example.com"
          className="mt-2 w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)] px-4 py-3 text-[var(--text-primary)] shadow-sm outline-none placeholder:text-[var(--text-disabled)] focus:border-[var(--violet)] focus:ring-4 focus:ring-[var(--violet-glow)]"
        />
        {!valid && email.length > 0 ? (
          <div className="mt-2 text-xs text-[var(--text-muted)]">
            Please enter a valid email address.
          </div>
        ) : null}

        {error ? (
          <div className="mt-6 rounded-xl border border-[var(--danger-fg)]/30 bg-[var(--danger-bg)] px-4 py-3 text-sm text-[var(--danger-fg)]">
            {error}
          </div>
        ) : null}

        <div className="mt-6 sm:mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <button
            type="button"
            onClick={onBack}
            className="rounded-xl px-4 py-3 text-sm font-semibold text-[var(--text-secondary)] hover:bg-[var(--bg-overlay)] touch-manipulation"
          >
            Back
          </button>
          <button
            type="button"
            disabled={!valid || submitting}
            onClick={onSubmit}
            className={[
              "inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold shadow-sm transition touch-manipulation",
              valid && !submitting
                ? "bg-[var(--violet)] text-white hover:bg-[var(--violet-hover)]"
                : "bg-[var(--bg-subtle)] text-[var(--text-disabled)] border border-[var(--border-default)]",
            ].join(" ")}
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Submitting…
              </>
            ) : (
              "Continue to chat"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
