import { User } from "lucide-react";
import { STEPS, personalities, therapyStyles, primaryGoals, stressFrequencies } from "../utils";
import type { QuizState } from "../utils";
import { QuizOptionCard } from "./QuizOptionCard";

type QuizStepContentProps = {
  currentStepId: string;
  direction: "forward" | "back";
  state: QuizState;
  setState: React.Dispatch<React.SetStateAction<QuizState>>;
};

const stepClass = (direction: "forward" | "back") =>
  direction === "forward" ? "animate-step-forward" : "animate-step-back";

export function QuizStepContent({
  currentStepId,
  direction,
  state,
  setState,
}: QuizStepContentProps) {
  if (currentStepId === "name") {
    return (
      <div key="name" className={stepClass(direction)}>
        <label className="flex items-center gap-2 text-sm font-medium text-[var(--text-primary)]">
          <User className="h-4 w-4 text-[var(--violet)]" />
          Your name
        </label>
        <input
          value={state.name}
          onChange={(e) => setState((s) => ({ ...s, name: e.target.value }))}
          placeholder="e.g., Alex"
          className="mt-2 w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)] px-4 py-3 text-[var(--text-primary)] shadow-sm outline-none placeholder:text-[var(--text-disabled)] focus:border-[var(--violet)] focus:ring-4 focus:ring-[var(--violet-glow)]"
          autoFocus
        />
      </div>
    );
  }

  if (currentStepId === "personality") {
    return (
      <div key="personality" className={stepClass(direction)}>
        <div className="text-sm font-medium text-[var(--text-primary)]">AI twin personality</div>
        <div className="mt-3 grid gap-2 sm:gap-3 sm:grid-cols-3">
          {personalities.map((p) => (
            <QuizOptionCard
              key={p.value}
              value={p.value}
              label={p.label}
              desc={p.desc}
              Icon={p.Icon}
              selected={state.personality === p.value}
              onSelect={() => setState((s) => ({ ...s, personality: p.value }))}
            />
          ))}
        </div>
      </div>
    );
  }

  if (currentStepId === "therapyStyle") {
    return (
      <div key="therapyStyle" className={stepClass(direction)}>
        <div className="text-sm font-medium text-[var(--text-primary)]">Therapy style</div>
        <div className="mt-3 grid gap-2 sm:gap-3 sm:grid-cols-3">
          {therapyStyles.map((t) => (
            <QuizOptionCard
              key={t.value}
              value={t.value}
              label={t.label}
              desc={t.desc}
              Icon={t.Icon}
              selected={state.therapyStyle === t.value}
              onSelect={() => setState((s) => ({ ...s, therapyStyle: t.value }))}
            />
          ))}
        </div>
      </div>
    );
  }

  if (currentStepId === "primaryGoal") {
    return (
      <div key="primaryGoal" className={stepClass(direction)}>
        <div className="text-sm font-medium text-[var(--text-primary)]">Primary goal</div>
        <div className="mt-3 grid gap-2 sm:gap-3 sm:grid-cols-3">
          {primaryGoals.map((g) => (
            <QuizOptionCard
              key={g.value}
              value={g.value}
              label={g.label}
              desc={g.desc}
              Icon={g.Icon}
              selected={state.primaryGoal === g.value}
              onSelect={() => setState((s) => ({ ...s, primaryGoal: g.value }))}
            />
          ))}
        </div>
      </div>
    );
  }

  if (currentStepId === "stressFrequency") {
    return (
      <div key="stressFrequency" className={stepClass(direction)}>
        <div className="text-sm font-medium text-[var(--text-primary)]">
          How often do you feel stressed?
        </div>
        <div className="mt-3 grid gap-2 sm:gap-3 sm:grid-cols-3">
          {stressFrequencies.map((f) => (
            <QuizOptionCard
              key={f.value}
              value={f.value}
              label={f.label}
              desc={f.desc}
              Icon={f.Icon}
              selected={state.stressFrequency === f.value}
              onSelect={() => setState((s) => ({ ...s, stressFrequency: f.value }))}
            />
          ))}
        </div>
      </div>
    );
  }

  return null;
}
