import { resultsHeading } from "@/lib/copy/riskCopy";
import type { ChatResponse, ResourceLink } from "@/lib/types/chat";
import type { PrintSnapshot, RunInput } from "@/lib/types/run";

export function dedupeResourceLinks(links: ResourceLink[]): ResourceLink[] {
  const seen = new Set<string>();
  return links.filter((link) => {
    const key = link.url.trim().toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function buildPrintSnapshot(
  response: ChatResponse,
  completedAt: string,
  mode: RunInput["mode"],
): PrintSnapshot {
  return {
    completedAt,
    mode,
    checkLabel: mode === "learn" ? "Learn a skill" : "Scam check",
    verifiedGuide: response.content.verified_guide,
    heading: resultsHeading(response),
    text: response.content.text,
    resourceLinks: dedupeResourceLinks(response.content.resource_links ?? []),
  };
}
