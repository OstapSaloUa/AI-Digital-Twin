import Link from "next/link";
import { ActionBar, actionBarItemClass } from "@/app/components/ActionBar";
import type { DebugEvent } from "../useDebugEvents";
import { EventsDataTable } from "./EventsDataTable";

type EventsTableProps = {
  events: DebugEvent[];
  isLoading: boolean;
  onRefresh: () => void;
};

export function EventsTable({
  events,
  isLoading,
  onRefresh,
}: EventsTableProps) {
  return (
    <div className="rounded-xl sm:rounded-2xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-4 sm:p-8 shadow-sm">
      <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
        Events (debug)
      </h1>
      <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
        {isLoading
          ? "Loading…"
          : `Showing the latest ${events.length} events.`}
      </p>

      <EventsDataTable events={events} isLoading={isLoading} />

      <ActionBar
        left={
          <>
            <Link href="/" className={`${actionBarItemClass} touch-manipulation`}>
              Back to home
            </Link>
            <button
              type="button"
              onClick={onRefresh}
              className={`${actionBarItemClass} touch-manipulation`}
            >
              Refresh
            </button>
          </>
        }
        right="Tip: refresh after sending messages."
      />
    </div>
  );
}
