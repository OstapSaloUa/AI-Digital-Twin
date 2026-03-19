export type Role = "assistant" | "user";

export type ChatMessage = {
  id: string;
  role: Role;
  content: string;
};

export type Analysis = {
  summary: string;
  themes: string[];
  stressors: string[];
  emotions: string[];
  copingStrategies: string[];
  suggestedNextSteps: string[];
};

export const ANALYSIS_SECTIONS: Array<{
  label: string;
  key: keyof Omit<Analysis, "summary">;
}> = [
  { label: "Themes", key: "themes" },
  { label: "Stressors", key: "stressors" },
  { label: "Emotions", key: "emotions" },
  { label: "Coping strategies", key: "copingStrategies" },
  { label: "Suggested next steps", key: "suggestedNextSteps" },
];
