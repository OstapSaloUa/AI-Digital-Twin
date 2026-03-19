import Link from "next/link";
import { Lock } from "lucide-react";
import { ActionBar } from "@/app/components/ActionBar";
import type { Plan } from "../utils";
import { PlanCard } from "./PlanCard";

type PaywallCardProps = {
  plans: Plan[];
};

export function PaywallCard({ plans }: PaywallCardProps) {
  return (
    <div className="rounded-xl sm:rounded-2xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-4 sm:p-8 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
            Unlock your AI Digital Twin
          </h1>
          <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
            Payments are out of scope for this task. This screen represents where billing would
            happen after the analysis.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-[var(--bg-subtle)] px-3 py-1 text-xs font-medium text-[var(--text-secondary)] border border-[var(--border-default)]">
          <Lock className="h-4 w-4" />
          Paywall
        </div>
      </div>

      <div className="mt-6 sm:mt-8 grid gap-3 sm:gap-4 sm:grid-cols-3">
        {plans.map((p) => (
          <PlanCard key={p.title} title={p.title} price={p.price} Icon={p.Icon} />
        ))}
      </div>

      <ActionBar
        className="mt-6 sm:mt-8"
        left={
          <>
            <Link
              href="/chat"
              className="rounded-xl px-4 py-3 text-sm font-semibold text-[var(--text-secondary)] hover:bg-[var(--bg-overlay)] touch-manipulation"
            >
              Back to chat
            </Link>
            <Link
              href="/debug/events"
              className="rounded-xl px-4 py-3 text-sm font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-overlay)] touch-manipulation"
            >
              View tracked events
            </Link>
          </>
        }
      />
    </div>
  );
}
