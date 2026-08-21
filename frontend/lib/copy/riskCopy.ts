import type { RiskLevel } from "@/lib/types/run";

const RISK_HEADINGS: Record<RiskLevel, string> = {
  critical: "This may be a scam happening now",
  likely_scam: "This looks like a scam",
  suspicious: "This looks suspicious",
  likely_safe: "This looks likely safe — still be careful",
};

export function riskHeading(level: RiskLevel): string {
  return RISK_HEADINGS[level];
}

export function formatCompletedAt(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}
