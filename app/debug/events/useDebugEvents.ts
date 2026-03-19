"use client";

import { useQuery } from "@tanstack/react-query";
import { getEvents } from "../../lib/api";
import axios from "axios";

export type DebugEvent = {
  id: string;
  sessionId: string;
  userId: string | null;
  type: string;
  metadata: unknown;
  createdAt: string;
};

export function useDebugEvents() {
  const query = useQuery({
    queryKey: ["debug-events"],
    queryFn: async () => {
      const res = await getEvents();
      return res.data.events as DebugEvent[];
    },
    retry: (failureCount, error) => {
      if (axios.isAxiosError(error) && error.response?.status === 403) {
        return false;
      }
      return failureCount < 2;
    },
  });

  const isForbidden =
    axios.isAxiosError(query.error) && query.error.response?.status === 403;

  return {
    events: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError && !isForbidden,
    isForbidden,
    refetch: query.refetch,
  };
}
