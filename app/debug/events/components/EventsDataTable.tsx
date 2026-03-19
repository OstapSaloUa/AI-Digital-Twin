import type { DebugEvent } from "../useDebugEvents";
import { EventsTableBody } from "./EventsTableBody";

type EventsDataTableProps = {
  events: DebugEvent[];
  isLoading: boolean;
};

export function EventsDataTable({ events, isLoading }: EventsDataTableProps) {
  return (
    <div className="mt-6 overflow-x-auto overflow-y-hidden rounded-xl border border-[var(--border-default)]">
      <table className="w-full min-w-[600px] text-left text-sm">
        <thead className="bg-[var(--bg-surface)] text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
          <tr>
            <th className="px-4 py-3">Time</th>
            <th className="px-4 py-3">Type</th>
            <th className="px-4 py-3">Session</th>
            <th className="px-4 py-3">User</th>
            <th className="px-4 py-3">Metadata</th>
          </tr>
        </thead>
        <EventsTableBody events={events} isLoading={isLoading} />
      </table>
    </div>
  );
}
