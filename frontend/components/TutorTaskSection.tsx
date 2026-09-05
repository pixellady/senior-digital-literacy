"use client";

import { RunControls } from "@/components/RunControls";
import { TUTOR_GOALS } from "@/lib/copy/tutorGoals";
import { isFormLocked } from "@/lib/fsm/runFsm";
import type { RunInput, RunPhase } from "@/lib/types/run";

type TutorTaskSectionProps = {
  phase: RunPhase;
  input: RunInput;
  errorMessage: string | null;
  retryable: boolean;
  paused: boolean;
  selectedGoalId: string | null;
  onGoalChange: (goalId: string) => void;
  onReset: () => void;
  onRetry: () => void;
};

export function TutorTaskSection({
  phase,
  input,
  errorMessage,
  retryable,
  paused,
  selectedGoalId,
  onGoalChange,
  onReset,
  onRetry,
}: TutorTaskSectionProps) {
  const disabled = isFormLocked(phase);

  return (
    <section
      aria-labelledby="tutor-tasks-heading"
      className="rounded-xl border-2 border-slate-800 bg-white p-6 shadow-sm"
    >
      <h2 id="tutor-tasks-heading" className="text-2xl font-semibold text-slate-900">
        Pick a task
      </h2>
      <p className="mt-2 text-lg text-slate-800">
        Choose one task. You will get one clear step. Then tap Run.
      </p>

      <fieldset className="mt-6 space-y-3">
        <legend className="sr-only">Learning tasks</legend>
        {TUTOR_GOALS.map((goal) => {
          const checked = selectedGoalId === goal.id;
          return (
            <label
              key={goal.id}
              className={`flex min-h-11 cursor-pointer items-start gap-3 rounded-lg border-2 p-4 ${
                checked
                  ? "border-blue-800 bg-blue-50"
                  : "border-slate-800 bg-white hover:bg-stone-50"
              } ${disabled ? "cursor-not-allowed opacity-60" : ""}`}
            >
              <input
                type="radio"
                name="tutor-goal"
                value={goal.id}
                checked={checked}
                disabled={disabled}
                onChange={() => onGoalChange(goal.id)}
                className="mt-1 h-11 w-11 shrink-0 border-2 border-slate-800 accent-blue-800"
              />
              <span>
                <span className="block text-lg font-semibold text-slate-900">
                  {goal.title}
                </span>
                <span className="mt-1 block text-base text-slate-700">{goal.hint}</span>
              </span>
            </label>
          );
        })}
      </fieldset>

      <RunControls
        phase={phase}
        input={input}
        errorMessage={errorMessage}
        retryable={retryable}
        paused={paused}
        onReset={onReset}
        onRetry={onRetry}
      />
    </section>
  );
}
