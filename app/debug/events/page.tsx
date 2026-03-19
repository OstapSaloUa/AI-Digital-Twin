"use client";

import { useDebugEvents } from "./useDebugEvents";
import { DisabledView } from "./components/DisabledView";
import { EventsTable } from "./components/EventsTable";

export default function DebugEventsPage() {
  const { events, isLoading, isForbidden, refetch } = useDebugEvents();

  if (isForbidden) {
    return <DisabledView />;
  }

  return (
    <div className="min-h-dvh bg-[var(--bg-base)]">
      <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <EventsTable events={events} isLoading={isLoading} onRefresh={refetch} />
      </div>
    </div>
  );
}
