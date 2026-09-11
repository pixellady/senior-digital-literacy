"use client";

import { MODE_TOGGLE_HINT } from "@/lib/copy/pageChrome";
import type { WorkflowMode } from "@/lib/types/run";
import { btnSecondary, btnSelected } from "@/lib/ui/surfaces";

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
      <legend id="workflow-mode-heading" className="text-lg font-semibold text-slate-900">
        What would you like to do?
      </legend>
      <p id="workflow-mode-hint" className="mt-2 text-xl text-slate-800">
        {MODE_TOGGLE_HINT}
      </p>
      <div
        className="mt-3 flex flex-col gap-3 sm:flex-row"
        role="group"
        aria-describedby="workflow-mode-hint"
      >
        <button
          type="button"
          disabled={disabled}
          aria-pressed={mode === "scam"}
          onClick={() => onChange("scam")}
          className={mode === "scam" ? btnSelected : btnSecondary}
        >
          Check a scam
        </button>
        <button
          type="button"
          disabled={disabled}
          aria-pressed={mode === "learn"}
          onClick={() => onChange("learn")}
          className={mode === "learn" ? btnSelected : btnSecondary}
        >
          Learn a skill
        </button>
      </div>
    </fieldset>
  );
}
