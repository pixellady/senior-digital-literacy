import { crewStatusLabel } from "@/lib/copy/crewStatus";
import { riskHeading } from "@/lib/copy/riskCopy";
import type { RunPhase, RunResult } from "@/lib/types/run";

type ResultsSectionProps = {
  phase: RunPhase;
  result: RunResult | null;
};

export function ResultsSection({ phase, result }: ResultsSectionProps) {
  const visible = phase === "done" && result;

  return (
    <section
      aria-labelledby="results-heading"
      className="rounded-xl border-2 border-slate-800 bg-white p-6 shadow-sm"
    >
      <h2 id="results-heading" className="text-2xl font-semibold text-slate-900">
        Results
      </h2>

      {!visible ? (
        <p className="mt-4 text-lg text-slate-800">
          Results will appear here when {crewStatusLabel("done")}.
        </p>
      ) : (
        <div className="mt-4 space-y-4">
          <p className="text-lg font-semibold text-slate-800">
            {crewStatusLabel("done")}
          </p>
          <p className="text-xl font-semibold text-slate-900">
            {riskHeading(result.riskLevel)}
          </p>
          <p className="text-lg text-slate-900">{result.summary}</p>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Suggested next steps
            </h3>
            <ul className="mt-2 list-disc space-y-2 pl-6 text-lg text-slate-900">
              {result.recommendedActions.map((action) => (
                <li key={action}>{action}</li>
              ))}
            </ul>
          </div>
          {result.resourceLinks.length > 0 ? (
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                Official resources
              </h3>
              <ul className="mt-2 space-y-2 text-lg">
                {result.resourceLinks.map((link) => (
                  <li key={link.url}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center text-blue-800 underline underline-offset-2 hover:text-blue-950"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      )}
    </section>
  );
}
