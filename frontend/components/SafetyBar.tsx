import {
  PAUSE_HINT,
  PAUSE_LABEL,
  RESUME_LABEL,
} from "@/lib/copy/safetyBar";

const controlClass =
  "min-h-11 min-w-11 rounded-lg px-6 py-3 text-lg font-semibold focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2";

type SafetyBarProps = {
  paused: boolean;
  onPause: () => void;
  onResume: () => void;
};

export function SafetyBar({ paused, onPause, onResume }: SafetyBarProps) {
  return (
    <div className="border-b-2 border-slate-800 bg-stone-50 px-4 py-3 sm:px-8">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={paused ? onResume : onPause}
          className={`${controlClass} border-2 border-slate-800 bg-white text-slate-900 hover:bg-slate-100 focus-visible:outline-slate-900`}
        >
          {paused ? RESUME_LABEL : PAUSE_LABEL}
        </button>
        {paused ? (
          <p className="text-lg text-slate-900">{PAUSE_HINT}</p>
        ) : (
          <p className="text-lg text-slate-800">
            Pause is always here. It does not rush you.
          </p>
        )}
      </div>
    </div>
  );
}
