import Link from "next/link";
import type { DebugEvent } from "../useDebugEvents";

type EventsTableBodyProps = {
  events: DebugEvent[];
  isLoading: boolean;
};

export function EventsTableBody({ events, isLoading }: EventsTableBodyProps) {
  return (
    <tbody className="divide-y divide-[var(--border-subtle)]">
      {events.map((e) => (
        <tr key={e.id} className="align-top">
          <td className="whitespace-nowrap px-4 py-3 text-xs text-[var(--text-muted)]">
            {new Date(e.createdAt).toLocaleString()}
          </td>
          <td className="px-4 py-3">
            <span className="rounded-full bg-[var(--bg-subtle)] border border-[var(--border-default)] px-2 py-1 text-xs font-semibold text-[var(--text-primary)]">
              {e.type}
            </span>
          </td>
          <td className="px-4 py-3 font-mono text-xs text-[var(--text-secondary)]">
            {e.sessionId.slice(0, 10)}…
          </td>
          <td className="px-4 py-3 font-mono text-xs text-[var(--text-secondary)]">
            {e.userId ? `${e.userId.slice(0, 10)}…` : "—"}
          </td>
          <td className="px-4 py-3">
            <pre className="max-w-[280px] sm:max-w-[460px] overflow-auto whitespace-pre-wrap break-words rounded-lg bg-[var(--bg-surface)] border border-[var(--border-default)] p-2 sm:p-3 text-xs text-[var(--text-primary)]">
              {e.metadata ? JSON.stringify(e.metadata, null, 2) : "—"}
            </pre>
          </td>
        </tr>
      ))}
      {!isLoading && events.length === 0 ? (
        <tr>
          <td
            className="px-4 py-6 text-sm text-[var(--text-secondary)]"
            colSpan={5}
          >
            No events recorded yet. Start the funnel at{" "}
            <Link className="font-semibold text-[var(--cyan)]" href="/">
              /
            </Link>
            .
          </td>
        </tr>
      ) : null}
    </tbody>
  );
}
