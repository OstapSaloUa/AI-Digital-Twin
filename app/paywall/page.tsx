"use client";

import { usePaywall } from "./usePaywall";
import { PLANS } from "./utils";
import { PaywallCard } from "./components/PaywallCard";

export default function PaywallPage() {
  usePaywall();

  return (
    <div className="flex-1 bg-[var(--bg-base)]">
      <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        <PaywallCard plans={PLANS} />
      </div>
    </div>
  );
}
