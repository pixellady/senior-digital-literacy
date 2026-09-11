import { PRINT_VISIT_HINT, PRINT_VISIT_LABEL } from "@/lib/copy/printSummary";
import { formatCompletedAt } from "@/lib/copy/riskCopy";
import type { HistoryEntry } from "@/lib/types/run";
import { btnSecondary, surfaceCard, surfaceInset } from "@/lib/ui/surfaces";

type HistorySectionProps = {
  entries: HistoryEntry[];
  onPrintVisit?: () => void;
};

export function HistorySection({
  entries,
  onPrintVisit,
}: HistorySectionProps) {
  return (
    <section
      aria-labelledby="history-heading"
      className={surfaceCard}
    >
      <div>
        <h2 id="history-heading" className="text-2xl font-semibold text-slate-900">
          History
        </h2>
        {entries.length > 0 && onPrintVisit ? (
          <div className="mt-4 flex flex-col items-start gap-2">
            <button type="button" onClick={onPrintVisit} className={btnSecondary}>
              {PRINT_VISIT_LABEL}
            </button>
            <p className="text-left text-xl text-slate-800">{PRINT_VISIT_HINT}</p>
          </div>
        ) : null}
      </div>
      <p className="mt-2 text-xl text-slate-800">
        Checks from this visit only. They are not saved on this device after you
        close the page.
      </p>

      {entries.length === 0 ? (
        <p className="mt-4 text-lg font-medium text-slate-800">
          No checks yet in this visit.
        </p>
      ) : (
        <ol className="mt-4 space-y-4">
          {entries.map((entry, index) => (
            <li
              key={`${entry.sessionId}-${entry.completedAt}-${index}`}
              className={surfaceInset}
            >
              <article aria-labelledby={`history-item-${index}`}>
                <p className="text-xl text-slate-700">
                  {formatCompletedAt(entry.completedAt)}
                </p>
                <h3
                  id={`history-item-${index}`}
                  className="mt-1 text-xl font-semibold text-slate-900"
                >
                  {entry.mode === "learn" ? "Learn a skill" : "Scam check"}
                </h3>
                <p className="mt-2 text-xl text-slate-900">
                  <span className="font-semibold">You asked: </span>
                  {entry.inputPreview}
                </p>
                <p className="mt-2 text-xl text-slate-900">
                  <span className="font-semibold">What we found: </span>
                  {entry.resultHeading}. {entry.resultPreview}
                </p>
                {entry.activeScamNow ? (
                  <p className="mt-2 text-lg font-medium text-slate-800">
                    Happening now
                  </p>
                ) : null}
              </article>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}