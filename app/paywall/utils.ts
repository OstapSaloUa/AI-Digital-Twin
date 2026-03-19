import type { LucideIcon } from "lucide-react";
import { Sparkles, Zap, Crown } from "lucide-react";

export type Plan = {
  title: string;
  price: string;
  Icon: LucideIcon;
};

export const PLANS: Plan[] = [
  { title: "Personal plan", price: "$9/mo", Icon: Sparkles },
  { title: "Plus plan", price: "$19/mo", Icon: Zap },
  { title: "Pro plan", price: "$39/mo", Icon: Crown },
];
