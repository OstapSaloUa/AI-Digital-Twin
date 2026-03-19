"use client";

import { useRouter } from "next/navigation";
import { FunnelStepIndicator } from "@/app/components/FunnelStepIndicator";
import { useEmail } from "./useEmail";
import { EmailForm } from "./components/EmailForm";

export default function EmailPage() {
  const router = useRouter();
  const { email, setEmail, valid, submitting, error, onSubmit } = useEmail();

  return (
    <div className="flex-1 bg-[var(--bg-base)]">
      <div className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
        <FunnelStepIndicator currentStep="email" />
        <EmailForm
          email={email}
          setEmail={setEmail}
          valid={valid}
          submitting={submitting}
          error={error}
          onSubmit={onSubmit}
          onBack={() => router.push("/quiz")}
        />
        <p className="mt-6 text-center text-xs text-[var(--text-muted)]">
          You can use a placeholder email for the test task.
        </p>
      </div>
    </div>
  );
}
