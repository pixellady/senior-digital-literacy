"use client";

import { useEffect, useState } from "react";
import { formatCompletedAt } from "@/lib/copy/riskCopy";
import {
  PRINT_CHECKED_LABEL,
  PRINT_HEADING,
  PRINT_RESOURCES_HEADING,
  PRINT_VISIT_FOOTER,
  PRINT_WEBSITE_LABEL,
} from "@/lib/copy/printSummary";
import type { PrintSnapshot } from "@/lib/types/run";

type PrintSummaryProps = {
  snapshots: PrintSnapshot[];
};

export function PrintSummary({ snapshots }: PrintSummaryProps) {
  const [pageUrl, setPageUrl] = useState("");

  useEffect(() => {
    const { origin, pathname } = window.location;
    setPageUrl(`${origin}${pathname}`);
  }, []);

  if (snapshots.length === 0) {
    return null;
  }

  return (
    <article id="print-summary" className="print-only" aria-hidden="true">
      <h1>{PRINT_HEADING}</h1>
      {pageUrl ? (
        <p className="print-meta">
          {PRINT_WEBSITE_LABEL} <span className="print-url">{pageUrl}</span>
        </p>
      ) : null}

      {snapshots.map((snapshot, index) => {
        const links = snapshot.resourceLinks;
        const isLast = index === snapshots.length - 1;
        const sectionClass = !isLast ? "print-check-section print-page-break" : "print-check-section";

        return (
          <section key={`${snapshot.completedAt}-${index}`} className={sectionClass}>
            <p className="print-meta">
              {PRINT_CHECKED_LABEL} {formatCompletedAt(snapshot.completedAt)}
            </p>
            <p className="print-check-label">{snapshot.checkLabel}</p>
            {snapshot.verifiedGuide ? (
              <p className="print-verified">Verified guide</p>
            ) : null}
            <h2>{snapshot.heading}</h2>
            <p className="print-body">{snapshot.text}</p>
            {links.length > 0 ? (
              <div>
                <h3>{PRINT_RESOURCES_HEADING}</h3>
                <ul>
                  {links.map((link) => (
                    <li key={link.url}>
                      <span>{link.label}</span>
                      <span className="print-url"> {link.url}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </section>
        );
      })}

      {snapshots.length > 1 ? (
        <p className="print-footer">{PRINT_VISIT_FOOTER}</p>
      ) : null}
    </article>
  );
}
