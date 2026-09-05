"use client";

import type { WorkflowMode } from "@/lib/types/run";

const baseClass =
  "min-h-11 rounded-lg border-2 px-6 py-3 text-lg font-semibold focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2";

type WorkflowModeToggleProps = {
  mode: WorkflowMode;
  disabled: boolean;
  onChange: (mode: WorkflowMode) => void;
};

export function WorkflowModeToggle({
  mode,
  disabled,
  onChange,
}: WorkflowModeToggleProps) {
  return (
    <fieldset className="mt-6" aria-labelledby="workflow-mode-heading">
      <legend id="workflow-mode-heading" className="text-lg font-medium text-slate-900">
        What would you like to do?
      </legend>
      <div className="mt-3 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          disabled={disabled}
          aria-pressed={mode === "scam"}
          onClick={() => onChange("scam")}
          className={`${baseClass} ${
            mode === "scam"
              ? "border-blue-800 bg-blue-800 text-white focus-visible:outline-blue-800"
              : "border-slate-800 bg-white text-slate-900 hover:bg-slate-100 focus-visible:outline-slate-900 disabled:border-slate-400 disabled:text-slate-400"
          }`}
        >
          Check a scam
        </button>
        <button
          type="button"
          disabled={disabled}
          aria-pressed={mode === "learn"}
          onClick={() => onChange("learn")}
          className={`${baseClass} ${
            mode === "learn"
              ? "border-blue-800 bg-blue-800 text-white focus-visible:outline-blue-800"
              : "border-slate-800 bg-white text-slate-900 hover:bg-slate-100 focus-visible:outline-slate-900 disabled:border-slate-400 disabled:text-slate-400"
          }`}
        >
          Learn a skill
        </button>
      </div>
    </fieldset>
  );
}
