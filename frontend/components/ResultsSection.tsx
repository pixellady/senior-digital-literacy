import { SavePrintControl } from "@/components/SavePrintControl";
import { TutorStepCard } from "@/components/TutorStepCard";
import { VerifiedGuideBadge } from "@/components/VerifiedGuideBadge";
import { AI_DISCLOSURE_COPY, modeLabel } from "@/lib/copy/chatCopy";
import { shouldShowWeeklyCaps } from "@/lib/copy/caps";
import { crewStatusLabel } from "@/lib/copy/crewStatus";
import { resultsHeading } from "@/lib/copy/riskCopy";
import type { ChatResponse } from "@/lib/types/chat";
import type { RunPhase } from "@/lib/types/run";
import { surfaceCard } from "@/lib/ui/surfaces";

type ResultsSectionProps = {
  phase: RunPhase;
  result: ChatResponse | null;
  onPrintCurrent?: () => void;
};

export function ResultsSection({ phase, result, onPrintCurrent }: ResultsSectionProps) {
  const showResult = phase === "done" && result !== null;
  const links = result?.content.resource_links ?? [];

  return (
    <section
      aria-labelledby="results-heading"
      id="results-print-card"
      className={surfaceCard}
    >
      <div className="no-print">
        <h2 id="results-heading" className="text-2xl font-semibold text-slate-900">
          Results
        </h2>
        {showResult && onPrintCurrent ? (
          <div className="mt-4">
            <SavePrintControl onPrint={onPrintCurrent} />
          </div>
        ) : null}
      </div>

      {!showResult || !result ? (
        <p className="mt-4 text-xl text-slate-800">
          Results will appear here when {crewStatusLabel("done")}.
        </p>
      ) : (
        <div className="no-print mt-4 space-y-4" aria-live="polite">
          <p className="text-xl font-semibold text-slate-800">
            {crewStatusLabel("done")}
          </p>
          <p className="text-xl font-medium text-slate-900">
            {result.agent_display_name}
          </p>
          <VerifiedGuideBadge visible={result.content.verified_guide} />
          {result.route_intent === "TUTOR" ? (
            <TutorStepCard
              text={result.content.text}
              stepCard={result.content.step_card}
            />
          ) : (
            <p className="text-4xl font-semibold leading-tight text-slate-950">
              {resultsHeading(result)}
            </p>
          )}
          {result.route_intent === "SCAM" ? (
            <p className="text-xl text-slate-900">{modeLabel(result.mode)}</p>
          ) : null}
          {result.ai_disclosure ? (
            <p role="status" className="text-xl text-slate-900">
              {AI_DISCLOSURE_COPY}
            </p>
          ) : null}
          {result.route_intent === "SCAM" ? (
            <p className="text-xl leading-[1.2] text-slate-900">
              {result.content.text}
            </p>
          ) : null}
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
                      className="inline-flex min-h-11 items-center text-forest underline underline-offset-2 hover:text-ink"
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
