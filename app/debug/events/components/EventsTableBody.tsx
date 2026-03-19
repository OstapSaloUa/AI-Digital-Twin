"use client";

import { useState } from "react";
import Link from "next/link";
import { Copy, Check } from "lucide-react";
import type { DebugEvent } from "../useDebugEvents";

type CopyableIdProps = {
  value: string;
  truncated: string;
};

type MetadataCellProps = {
  metadata: unknown;
  type: string;
};

function MetadataCell({ metadata, type }: MetadataCellProps) {
  const obj = metadata as Record<string, unknown> | null | undefined;
  const content = obj && typeof obj.content === "string" ? obj.content : null;

  return (
    <div className="max-w-[280px] sm:max-w-[460px] space-y-2">
      {content && type === "message_sent" ? (
        <div className="rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] p-2 sm:p-3">
          <p className="text-xs font-medium text-[var(--text-muted)] mb-1">Message:</p>
          <p className="text-xs text-[var(--text-primary)] whitespace-pre-wrap break-words">
            {content}
          </p>
        </div>
      ) : null}
      <pre className="overflow-auto whitespace-pre-wrap break-words rounded-lg bg-[var(--bg-surface)] border border-[var(--border-default)] p-2 sm:p-3 text-xs text-[var(--text-primary)]">
        {metadata ? JSON.stringify(metadata, null, 2) : "—"}
      </pre>
    </div>
  );
}

function CopyableId({ value, truncated }: CopyableIdProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  }

  return (
    <span className="group relative inline-flex items-center gap-1.5">
      <span className="font-mono">{truncated}</span>
      <button
        type="button"
        onClick={handleCopy}
        className="rounded p-0.5 text-[var(--text-muted)] opacity-60 transition hover:bg-[var(--bg-subtle)] hover:opacity-100 hover:text-[var(--cyan)] focus:outline-none focus:ring-2 focus:ring-[var(--cyan)]"
        title="Copy full ID"
        aria-label="Copy full ID"
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-[var(--success-fg)]" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
      </button>
      <span className="pointer-events-auto absolute left-0 bottom-full mb-1 hidden max-w-[480px] break-all rounded-lg bg-[var(--bg-overlay)] px-3 py-2 text-xs text-[var(--text-primary)] shadow-xl ring-1 ring-[var(--border-default)] group-hover:block z-50">
        {value}
      </span>
    </span>
  );
}

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
          <td className="px-4 py-3 text-xs text-[var(--text-secondary)]">
            <CopyableId value={e.sessionId} truncated={`${e.sessionId.slice(0, 10)}…`} />
          </td>
          <td className="px-4 py-3 text-xs text-[var(--text-secondary)]">
            {e.userId ? (
              <CopyableId value={e.userId} truncated={`${e.userId.slice(0, 10)}…`} />
            ) : (
              "—"
            )}
          </td>
          <td className="px-4 py-3">
            <MetadataCell metadata={e.metadata} type={e.type} />
          </td>
        </tr>
      ))}
      {!isLoading && events.length === 0 ? (
        <tr>
          <td className="px-4 py-6 text-sm text-[var(--text-secondary)]" colSpan={5}>
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
