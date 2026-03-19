"use client";

import { useCustomizing } from "./useCustomizing";
import { CustomizingCard } from "./components/CustomizingCard";

export default function CustomizingPage() {
  const { progress, overallProgress } = useCustomizing();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[var(--bg-base)]/90 backdrop-blur-md py-4 px-4 sm:py-8 sm:px-6">
      <CustomizingCard progress={progress} overallProgress={overallProgress} />
    </div>
  );
}
