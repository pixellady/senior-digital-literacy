import { PrintSummary } from "@/components/PrintSummary";
import { SavePrintControl } from "@/components/SavePrintControl";
import { VerifiedGuideBadge } from "@/components/VerifiedGuideBadge";
import { AI_DISCLOSURE_COPY, modeLabel } from "@/lib/copy/chatCopy";
import { shouldShowWeeklyCaps } from "@/lib/copy/caps";
import { crewStatusLabel } from "@/lib/copy/crewStatus";
import { riskHeading } from "@/lib/copy/riskCopy";
import type { ChatResponse } from "@/lib/types/chat";
import type { RunPhase } from "@/lib/types/run";

type ResultsSectionProps = {
  phase: RunPhase;
  result: ChatResponse | null;
};

export function ResultsSection({ phase, result }: ResultsSectionProps) {
  const showResult = phase === "done" && result !== null;
  const links = result?.content.resource_links ?? [];

  return (
    <section
      aria-labelledby="results-heading"
      id="results-print-card"
      className="rounded-xl border-2 border-slate-800 bg-white p-6 shadow-sm"
    >
      <div className="no-print flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <h2 id="results-heading" className="text-2xl font-semibold text-slate-900">
          Results
        </h2>
        {showResult ? <SavePrintControl /> : null}
      </div>

      {showResult && result ? <PrintSummary result={result} /> : null}

      {!showResult || !result ? (
        <p className="mt-4 text-xl text-slate-800">
          Results will appear here when {crewStatusLabel("done")}.
        </p>
      ) : (
        <div className="no-print mt-4 space-y-4">
          <p className="text-xl font-semibold text-slate-800">
            {crewStatusLabel("done")}
          </p>
          <p className="text-xl font-medium text-slate-900">
            {result.agent_display_name}
          </p>
          <VerifiedGuideBadge visible={result.content.verified_guide} />
          <p className="text-4xl font-bold leading-tight text-slate-950">
            {riskHeading(result.content.risk_level)}
          </p>
          <p className="text-xl text-slate-900">{modeLabel(result.mode)}</p>
          {result.ai_disclosure ? (
            <p role="status" className="text-xl text-slate-900">
              {AI_DISCLOSURE_COPY}
            </p>
          ) : null}
          <p className="text-xl leading-relaxed text-slate-900">
            {result.content.text}
          </p>
          {links.length > 0 ? (
            <div>
              <h3 className="text-xl font-semibold text-slate-900">
                Official resources
              </h3>
              <ul className="mt-2 space-y-2 text-xl">
                {links.map((link) => (
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
          {shouldShowWeeklyCaps(result.caps) ? (
            <p className="text-xl text-slate-900">
              Tutor sessions this week: {result.caps.tutor_sessions_used_this_week}{" "}
              of {result.caps.tutor_sessions_limit}
            </p>
          ) : null}
        </div>
      )}
    </section>
  );
}
