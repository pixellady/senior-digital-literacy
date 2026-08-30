"use client";

import { useEffect, useState } from "react";
import {
  PRINT_CHECKED_LABEL,
  PRINT_HEADING,
  PRINT_RESOURCES_HEADING,
  PRINT_WEBSITE_LABEL,
} from "@/lib/copy/printSummary";
import { formatLastUpdated } from "@/lib/copy/crewStatus";
import { riskHeading } from "@/lib/copy/riskCopy";
import type { ChatResponse } from "@/lib/types/chat";

type PrintSummaryProps = {
  result: ChatResponse;
  checkedAt: Date;
};

export function PrintSummary({ result, checkedAt }: PrintSummaryProps) {
  const links = result.content.resource_links ?? [];
  const [checkedWhen, setCheckedWhen] = useState("");
  const [pageUrl, setPageUrl] = useState("");

  useEffect(() => {
    setCheckedWhen(formatLastUpdated(checkedAt));
    const { origin, pathname } = window.location;
    setPageUrl(`${origin}${pathname}`);
  }, [checkedAt]);

  return (
    <article id="print-summary" className="print-only" aria-hidden="true">
      <h1>{PRINT_HEADING}</h1>
      {checkedWhen ? (
        <p className="print-meta">
          {PRINT_CHECKED_LABEL} {checkedWhen}
        </p>
      ) : null}
      {pageUrl ? (
        <p className="print-meta">
          {PRINT_WEBSITE_LABEL} <span className="print-url">{pageUrl}</span>
        </p>
      ) : null}
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
