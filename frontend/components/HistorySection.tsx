import { formatCompletedAt, riskHeading } from "@/lib/copy/riskCopy";
import type { HistoryEntry } from "@/lib/types/run";

type HistorySectionProps = {
  entries: HistoryEntry[];
};

export function HistorySection({ entries }: HistorySectionProps) {
  return (
    <section
      aria-labelledby="history-heading"
      className="rounded-xl border-2 border-slate-800 bg-white p-6 shadow-sm"
    >
      <h2 id="history-heading" className="text-2xl font-semibold text-slate-900">
        History
      </h2>
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
                {riskHeading(entry.riskLevel)}
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
