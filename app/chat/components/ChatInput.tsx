import { Loader2, Send } from "lucide-react";

type ChatInputProps = {
  input: string;
  setInput: (value: string) => void;
  sending: boolean;
  onSend: () => void;
};

export function ChatInput({ input, setInput, sending, onSend }: ChatInputProps) {
  return (
    <div className="border-t border-[var(--border-default)] p-3 sm:p-4">
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSend();
            }
          }}
          placeholder="Write a message…"
          className="w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)] px-4 py-3 text-sm text-[var(--text-primary)] shadow-sm outline-none placeholder:text-[var(--text-disabled)] focus:border-[var(--violet)] focus:ring-4 focus:ring-[var(--violet-glow)]"
        />
        <button
          type="button"
          onClick={onSend}
          disabled={sending || input.trim().length === 0}
          className={[
            "flex shrink-0 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold shadow-sm transition touch-manipulation",
            !sending && input.trim().length > 0
              ? "bg-[var(--violet)] text-white hover:bg-[var(--violet-hover)]"
              : "bg-[var(--bg-subtle)] text-[var(--text-disabled)] border border-[var(--border-default)]",
          ].join(" ")}
        >
          {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          <span className="hidden sm:inline">Send</span>
        </button>
      </div>
      <div className="mt-2 text-xs text-[var(--text-muted)]">
        Tip: be specific—what happened, what you felt, and what you did next.
      </div>
    </div>
  );
}
