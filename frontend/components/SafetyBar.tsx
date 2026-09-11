import {
  PAUSE_HINT,
  PAUSE_IDLE,
  PAUSE_LABEL,
  RESUME_LABEL,
} from "@/lib/copy/safetyBar";
import { btnSecondary } from "@/lib/ui/surfaces";

type SafetyBarProps = {
  paused: boolean;
  onPause: () => void;
  onResume: () => void;
};

export function SafetyBar({ paused, onPause, onResume }: SafetyBarProps) {
  return (
    <div className="rounded-xl border border-forest/15 bg-white p-4 shadow-[0_6px_16px_rgba(70,124,83,0.16)]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={paused ? onResume : onPause}
          className={btnSecondary}
        >
          {paused ? RESUME_LABEL : PAUSE_LABEL}
        </button>
        {paused ? (
          <p className="text-xl text-slate-900">{PAUSE_HINT}</p>
        ) : (
          <p className="text-xl text-slate-800">
            {PAUSE_IDLE}
          </p>
        )}
      </div>
    </div>
  );
}
