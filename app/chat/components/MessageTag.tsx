import type { ChatMessage } from "../utils";

type MessageTagProps = {
  message: ChatMessage;
};

export function MessageTag({ message }: MessageTagProps) {
  const isUser = message.role === "user";

  return (
    <div className={["flex", isUser ? "justify-end" : "justify-start"].join(" ")}>
      <div
        className={[
          "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6",
          isUser
            ? "bg-[var(--violet)] text-white"
            : "bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-default)]",
        ].join(" ")}
      >
        {message.content}
      </div>
    </div>
  );
}
