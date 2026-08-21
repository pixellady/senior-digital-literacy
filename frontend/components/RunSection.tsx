import { CREW_INLINE_MESSAGES, crewStatusLabel } from "@/lib/copy/crewStatus";
import { canReset, canRun } from "@/lib/fsm/runFsm";
import type { RunInput, RunPhase } from "@/lib/types/run";

const controlClass =
  "min-h-11 min-w-11 rounded-lg px-6 py-3 text-lg font-semibold focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 disabled:cursor-not-allowed";

type RunSectionProps = {
  phase: RunPhase;
  input: RunInput;
  errorMessage: string | null;
  retryable: boolean;
  onReset: () => void;
  onRetry: () => void;
};

export function RunSection({
  phase,
  input,
  errorMessage,
  retryable,
  onReset,
  onRetry,
}: RunSectionProps) {
  const runEnabled =
    canRun(phase, input.messageText) || Boolean(retryable && phase === "idle");
  const resetEnabled = canReset(phase);

  return (
    <section
      aria-labelledby="run-heading"
      className="rounded-xl border-2 border-slate-800 bg-white p-6 shadow-sm"
    >
      <h2 id="run-heading" className="text-2xl font-semibold text-slate-900">
        Run
      </h2>
      <p className="mt-2 text-lg font-semibold text-slate-900">
        {crewStatusLabel(phase)}
      </p>
      <p className="mt-4 min-h-11 text-lg font-medium text-slate-900">
        {CREW_INLINE_MESSAGES[phase]}
      </p>

      <fieldset className="mt-6">
        <legend className="text-lg font-medium text-slate-900">Controls</legend>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <button
            type="submit"
            disabled={!runEnabled}
            className={`${controlClass} bg-blue-800 text-white hover:bg-blue-900 focus-visible:outline-blue-800 disabled:bg-slate-400`}
          >
            Run
          </button>
          <button
            type="button"
            disabled={!resetEnabled}
            onClick={onReset}
            className={`${controlClass} border-2 border-slate-800 bg-white text-slate-900 hover:bg-slate-100 focus-visible:outline-slate-900 disabled:border-slate-400 disabled:text-slate-400`}
          >
            Reset
          </button>
        </div>
      </fieldset>

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
              className={`${controlClass} mt-3 bg-red-800 text-white hover:bg-red-900 focus-visible:outline-red-800`}
            >
              Retry
            </button>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
