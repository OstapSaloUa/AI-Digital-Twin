import { api } from "./client";

export const postEmail = (email: string) =>
  api.post("/api/email", { email: email.trim().toLowerCase() });

export const postQuiz = (state: {
  name: string;
  personality: string;
  therapyStyle: string;
  primaryGoal: string;
  stressFrequency: string;
}) => api.post("/api/quiz", state);

export const postChatMessage = (content: string) =>
  api.post("/api/chat/message", { content });

export const postAnalysis = (messages: string[]) =>
  api.post<{ analysis: unknown }>("/api/analysis", { messages });

export const postEvent = (type: string, metadata?: unknown) =>
  api.post("/api/events", { type, metadata });

export const getEvents = () =>
  api.get<{ events: Array<{
    id: string;
    sessionId: string;
    userId: string | null;
    type: string;
    metadata: unknown;
    createdAt: string;
  }> }>("/api/events");
