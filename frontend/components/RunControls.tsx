import { CREW_INLINE_MESSAGES } from "@/lib/copy/crewStatus";
import { canReset, canRun } from "@/lib/fsm/runFsm";
import type { RunInput, RunPhase } from "@/lib/types/run";
import { btnPrimary, btnSecondary } from "@/lib/ui/surfaces";

type RunControlsProps = {
  phase: RunPhase;
  input: RunInput;
  errorMessage: string | null;
  retryable: boolean;
  paused: boolean;
  onReset: () => void;
  onRetry: () => void;
};

export function RunControls({
  phase,
  input,
  errorMessage,
  retryable,
  paused,
  onReset,
  onRetry,
}: RunControlsProps) {
  const runEnabled =
    !paused &&
    (canRun(phase, input) || Boolean(retryable && phase === "idle"));
  const resetEnabled = canReset(phase);

  return (
    <div className="mt-6 border-t border-forest/15 pt-6">
      <p className="min-h-11 text-lg font-medium text-slate-900">
        {CREW_INLINE_MESSAGES[phase]}
      </p>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <button
          type="submit"
          disabled={!runEnabled}
          className={btnPrimary}
        >
          Run
        </button>
        <button
          type="button"
          disabled={!resetEnabled}
          onClick={onReset}
          className={btnSecondary}
        >
          Reset
        </button>
      </div>

      {errorMessage ? (
        <div
          role="alert"
          className="mt-6 rounded-lg border-2 border-red-800 bg-red-50 p-4"
        >
          <p className="text-lg font-medium text-red-900">{errorMessage}</p>
          {retryable ? (
            <button
              type="button"
              onClick={onRetry}
              className={`${btnPrimary} mt-3 bg-red-800 hover:bg-red-900 focus-visible:outline-red-800`}
            >
              Retry
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
