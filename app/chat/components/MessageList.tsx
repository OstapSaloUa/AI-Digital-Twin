import type { RefObject } from "react";
import type { ChatMessage } from "../utils";
import { MessageTag } from "./MessageTag";

type MessageListProps = {
  messages: ChatMessage[];
  listRef: RefObject<HTMLDivElement | null>;
};

export function MessageList({ messages, listRef }: MessageListProps) {
  return (
    <div ref={listRef} className="min-h-0 flex-1 overflow-auto p-4 sm:p-6">
      <div className="space-y-4">
        {messages.map((m) => (
          <MessageTag key={m.id} message={m} />
        ))}
      </div>
    </div>
  );
}
