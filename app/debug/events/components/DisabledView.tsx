export function DisabledView() {
  return (
    <div className="min-h-dvh bg-[var(--bg-base)]">
      <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="rounded-xl sm:rounded-2xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-4 sm:p-8 shadow-sm">
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
            Not enabled
          </h1>
          <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
            Set{" "}
            <code className="rounded bg-[var(--bg-surface)] px-1 py-0.5 border border-[var(--border-default)]">
              DEBUG_EVENTS=1
            </code>{" "}
            to enable this page in production.
          </p>
        </div>
      </div>
    </div>
  );
}
