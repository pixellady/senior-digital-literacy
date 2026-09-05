import { PRINT_VISIT_HINT, PRINT_VISIT_LABEL } from "@/lib/copy/printSummary";
import { formatCompletedAt, riskHeading } from "@/lib/copy/riskCopy";
import type { HistoryEntry } from "@/lib/types/run";

const controlClass =
  "min-h-11 min-w-11 rounded-lg border-2 border-slate-800 bg-white px-6 py-3 text-lg font-semibold text-slate-900 hover:bg-slate-100 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-slate-900";

type HistorySectionProps = {
  entries: HistoryEntry[];
  onPrintVisit?: () => void;
};

export function HistorySection({ entries, onPrintVisit }: HistorySectionProps) {
  return (
    <section
      aria-labelledby="history-heading"
      className="rounded-xl border-2 border-slate-800 bg-white p-6 shadow-sm"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <h2 id="history-heading" className="text-2xl font-semibold text-slate-900">
          History
        </h2>
        {entries.length > 0 && onPrintVisit ? (
          <div className="flex flex-col gap-2 sm:items-end">
            <button type="button" onClick={onPrintVisit} className={controlClass}>
              {PRINT_VISIT_LABEL}
            </button>
            <p className="text-base text-slate-800">{PRINT_VISIT_HINT}</p>
          </div>
        ) : null}
      </div>
      <p className="mt-2 text-lg text-slate-800">
        Checks from this visit only. They are not saved on this device after you
        close the page.
      </p>

      {entries.length === 0 ? (
        <p className="mt-4 text-lg text-slate-800">
          No checks yet in this visit.
        </p>
      ) : (
        <ol className="mt-4 space-y-4">
          {entries.map((entry, index) => (
            <li
              key={`${entry.sessionId}-${entry.completedAt}-${index}`}
              className="rounded-lg border border-slate-700 p-4"
            >
              <p className="text-base text-slate-700">
                {formatCompletedAt(entry.completedAt)}
              </p>
              <p className="mt-1 text-lg font-semibold text-slate-900">
                {entry.mode === "learn"
                  ? "Learn a skill"
                  : riskHeading(entry.riskLevel)}
              </p>
              <p className="mt-1 text-lg text-slate-900">{entry.inputPreview}</p>
              {entry.activeScamNow ? (
                <p className="mt-2 text-base font-medium text-slate-800">
                  Happening now
                </p>
              ) : null}
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
