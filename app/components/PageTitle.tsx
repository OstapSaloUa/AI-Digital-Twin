"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const TITLES: Record<string, string> = {
  "/": "AI Digital Twin",
  "/quiz": "Quiz",
  "/email": "Email",
  "/customizing": "Customizing",
  "/chat": "Chat",
  "/paywall": "Paywall",
  "/debug/events": "Debug Events",
};

const BASE = "AI Digital Twin";

export function PageTitle() {
  const pathname = usePathname();

  useEffect(() => {
    const title = (TITLES[pathname] ?? pathname.slice(1)) || "Home";
    document.title = title === BASE ? BASE : `${title} | ${BASE}`;
  }, [pathname]);

  return null;
}
