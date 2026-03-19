import type { LucideIcon } from "lucide-react";
import {
  Leaf,
  Zap,
  Sparkles,
  Brain,
  Wind,
  Target,
  Heart,
  Trophy,
  Crosshair,
  CalendarCheck,
  Calendar,
  CalendarClock,
} from "lucide-react";

export type Personality = "calm" | "direct" | "playful";
export type TherapyStyle = "cbt" | "mindfulness" | "coach";

export type QuizState = {
  name: string;
  personality: Personality | "";
  therapyStyle: TherapyStyle | "";
  primaryGoal: "stress" | "confidence" | "focus" | "";
  stressFrequency: "rarely" | "sometimes" | "often" | "";
};

export const STEPS = [
  { id: "name", label: "Your name" },
  { id: "personality", label: "AI twin personality" },
  { id: "therapyStyle", label: "Therapy style" },
  { id: "primaryGoal", label: "Primary goal" },
  { id: "stressFrequency", label: "Stress frequency" },
] as const;

export const personalities: Array<{
  value: Personality;
  label: string;
  desc: string;
  Icon: LucideIcon;
}> = [
  { value: "calm", label: "Calm", desc: "Gentle, supportive, grounding.", Icon: Leaf },
  { value: "direct", label: "Direct", desc: "Clear, honest, action-oriented.", Icon: Zap },
  { value: "playful", label: "Playful", desc: "Light, warm, encouraging.", Icon: Sparkles },
];

export const therapyStyles: Array<{
  value: TherapyStyle;
  label: string;
  desc: string;
  Icon: LucideIcon;
}> = [
  { value: "cbt", label: "CBT", desc: "Thoughts → feelings → actions.", Icon: Brain },
  { value: "mindfulness", label: "Mindfulness", desc: "Awareness and acceptance.", Icon: Wind },
  { value: "coach", label: "Coaching", desc: "Goals, habits, accountability.", Icon: Target },
];

export const primaryGoals: Array<{
  value: QuizState["primaryGoal"];
  label: string;
  desc: string;
  Icon: LucideIcon;
}> = [
  { value: "stress", label: "Reduce stress", desc: "Feel calmer and more in control.", Icon: Heart },
  { value: "confidence", label: "Build confidence", desc: "Trust yourself more.", Icon: Trophy },
  { value: "focus", label: "Improve focus", desc: "Stay present and productive.", Icon: Crosshair },
];

export const stressFrequencies: Array<{
  value: QuizState["stressFrequency"];
  label: string;
  desc: string;
  Icon: LucideIcon;
}> = [
  { value: "rarely", label: "Rarely", desc: "Once in a while.", Icon: CalendarCheck },
  { value: "sometimes", label: "Sometimes", desc: "A few times a week.", Icon: Calendar },
  { value: "often", label: "Often", desc: "Most days.", Icon: CalendarClock },
];
