import type { ChatResponse } from "@/lib/types/chat";
import type { RiskLevel } from "@/lib/types/chat";

const RISK_HEADINGS: Record<Exclude<RiskLevel, null>, string> = {
  critical: "This may be a scam happening now",
  likely_scam: "This looks like a scam",
  suspicious: "This looks suspicious",
  likely_safe: "This looks likely safe — still be careful",
};

export function riskHeading(level: RiskLevel): string {
  if (level === null) {
    return "No risk level in this check";
  }
  return RISK_HEADINGS[level];
}

/** Large-type Results heading: tutor steps vs scam risk labels. */
export function resultsHeading(result: ChatResponse): string {
  if (result.route_intent === "TUTOR") {
    return "Your next step";
  }
  return riskHeading(result.content.risk_level);
}

export function formatCompletedAt(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}
