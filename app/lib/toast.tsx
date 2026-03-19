"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { AlertCircle } from "lucide-react";

type Toast = { id: number; message: string; type: "error" };

const ToastContext = createContext<{
  showError: (message: string) => void;
} | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showError = useCallback((message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type: "error" }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  return (
    <ToastContext.Provider value={{ showError }}>
      {children}
      <div
        className="pointer-events-none fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 flex-col gap-2"
        aria-live="polite"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className="flex items-center gap-2 rounded-xl border border-[var(--danger-fg)]/30 bg-[var(--danger-bg)] px-4 py-3 text-sm text-[var(--danger-fg)] shadow-lg"
          >
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

/**
 * Returns toast context with showError. Use inside ToastProvider.
 * @returns { showError } - Call showError(message) to display an error toast
 */
export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    return {
      showError: () => {},
    };
  }
  return ctx;
}
