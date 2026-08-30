import { PRINT_HEADING, PRINT_RESOURCES_HEADING } from "@/lib/copy/printSummary";
import { riskHeading } from "@/lib/copy/riskCopy";
import type { ChatResponse } from "@/lib/types/chat";

type PrintSummaryProps = {
  result: ChatResponse;
};

export function PrintSummary({ result }: PrintSummaryProps) {
  const links = result.content.resource_links ?? [];

  return (
    <article id="print-summary" className="print-only" aria-hidden="true">
      <h1>{PRINT_HEADING}</h1>
      {result.content.verified_guide ? (
        <p className="print-verified">Verified guide</p>
      ) : null}
      <h2>{riskHeading(result.content.risk_level)}</h2>
      <p className="print-body">{result.content.text}</p>
      {links.length > 0 ? (
        <section>
          <h3>{PRINT_RESOURCES_HEADING}</h3>
          <ul>
            {links.map((link) => (
              <li key={link.url}>
                <span>{link.label}</span>
                <span className="print-url"> {link.url}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
