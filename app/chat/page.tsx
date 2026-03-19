"use client";

import { useRouter } from "next/navigation";
import { FunnelStepIndicator } from "@/app/components/FunnelStepIndicator";
import { useChat } from "./useChat";
import { MessageList } from "./components/MessageList";
import { ChatInput } from "./components/ChatInput";
import { AnalysisModal } from "./components/AnalysisModal";

export default function ChatPage() {
  const router = useRouter();
  const {
    messages,
    input,
    setInput,
    sending,
    analysis,
    analysisOpen,
    userMessageCount,
    listRef,
    send,
    goToPaywall,
    closeAnalysis,
  } = useChat();

  return (
    <div className="flex flex-1 flex-col min-h-0 bg-[var(--bg-base)]">
      <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col min-h-0 px-4 py-4 sm:px-6 sm:py-8">
        <FunnelStepIndicator currentStep="chat" />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-[var(--text-primary)]">
              Your AI Twin Chat
            </h1>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              Messages sent: {userMessageCount}/5
            </p>
          </div>
          <button
            type="button"
            onClick={() => router.push("/debug/events")}
            className="rounded-xl px-4 py-2 text-sm font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-overlay)] touch-manipulation"
          >
            Debug events
          </button>
        </div>

        <div className="mt-4 flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] shadow-sm sm:mt-6 sm:rounded-2xl">
          <MessageList messages={messages} listRef={listRef} />
          <ChatInput input={input} setInput={setInput} sending={sending} onSend={send} />
        </div>
      </div>

      {analysisOpen && analysis ? (
        <AnalysisModal analysis={analysis} onContinue={goToPaywall} onClose={closeAnalysis} />
      ) : null}
    </div>
  );
}
