"use client";

import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden bg-[var(--bg-base)] px-4 py-10 sm:px-6 sm:py-16">
      {/* Floating decorative shapes */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
      >
        <div className="absolute left-[15%] top-[20%] h-32 w-32 rounded-full bg-[var(--violet)]/20 blur-3xl animate-float" />
        <div className="absolute right-[20%] top-[30%] h-40 w-40 rounded-full bg-[var(--cyan)]/15 blur-3xl animate-float-slow" style={{ animationDelay: "-2s" }} />
        <div className="absolute bottom-[25%] left-[25%] h-24 w-24 rounded-full bg-[var(--violet)]/10 blur-2xl animate-float" style={{ animationDelay: "-4s" }} />
        <div className="absolute bottom-[30%] right-[15%] h-36 w-36 rounded-full bg-[var(--cyan)]/20 blur-3xl animate-float-slow" style={{ animationDelay: "-6s" }} />
        <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--violet)]/10 blur-[80px] animate-pulse-glow" />
      </div>

      <div className="relative mx-auto w-full max-w-xl text-center">
        <p
          className="text-base sm:text-lg text-[var(--text-secondary)] animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          Hello, I&apos;m your
        </p>
        <h1
          className="mt-2 bg-gradient-to-r from-[var(--violet)] to-[var(--cyan)] bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          AI Twin
        </h1>
        <p
          className="mt-4 sm:mt-6 text-sm sm:text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg animate-fade-in-up"
          style={{ animationDelay: "0.35s" }}
        >
          Experience 24/7 support and guidance with a personal AI model, always
          at hand to help you navigate life&apos;s challenges.
        </p>
        <button
          type="button"
          onClick={() => router.push("/quiz")}
          className="mt-8 sm:mt-10 inline-flex items-center gap-2 rounded-xl bg-[var(--violet)] px-6 py-3.5 sm:px-8 sm:py-4 text-base font-semibold text-white shadow-lg transition hover:scale-105 hover:bg-[var(--violet-hover)] focus:outline-none focus:ring-4 focus:ring-[var(--violet-glow)] animate-fade-in-up touch-manipulation"
          style={{ animationDelay: "0.5s" }}
        >
          <Sparkles className="h-5 w-5" />
          Start now
        </button>
      </div>
    </div>
  );
}
