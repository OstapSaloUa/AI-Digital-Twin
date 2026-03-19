"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CUSTOMIZING_STEPS } from "./utils";

export function useCustomizing() {
  const router = useRouter();
  const [progress, setProgress] = useState([0, 0, 0]);
  const [overallProgress, setOverallProgress] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      for (let i = 0; i < CUSTOMIZING_STEPS.length && !cancelled; i++) {
        const { duration } = CUSTOMIZING_STEPS[i];
        const start = Date.now();
        const tick = () => {
          if (cancelled) return;
          const elapsed = Date.now() - start;
          const pct = Math.min(100, (elapsed / duration) * 100);
          setProgress((prev) => {
            const next = [...prev];
            next[i] = Math.round(pct);
            return next;
          });
          if (pct < 100) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        await new Promise((r) => setTimeout(r, duration));
      }

      if (cancelled) return;
      setProgress([100, 100, 100]);
      setOverallProgress(100);
      await new Promise((r) => setTimeout(r, 400));
      router.push("/chat");
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [router]);

  useEffect(() => {
    const total = progress.reduce((a, b) => a + b, 0);
    setOverallProgress(Math.round(total / 3));
  }, [progress]);

  return { progress, overallProgress };
}
