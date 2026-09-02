import type { RunPhase } from "@/lib/types/run";

export type CrewStatus = RunPhase;

export const CREW_STATUS_LABELS: Record<CrewStatus, string> = {
  idle: "Crew: idle",
  running: "Crew: running",
  done: "Crew: done",
};

export const CREW_INLINE_MESSAGES: Record<CrewStatus, string> = {
  idle: "Crew: idle. Ready when you are. Fill in the form and tap Run.",
  running: "Crew: running. Working on this… This can take a few seconds. You can wait right here.",
  done: "Crew: done. The check is finished. Read the results below, or tap Reset.",
};

export const CREW_ERROR_DETAIL =
  "Something went wrong while checking. Nothing you did caused this. Your message is still here. Tap Retry to run again with the same inputs.";

export const RATE_LIMIT_DETAIL =
  "Please wait a moment, then try again. Nothing you did caused this. Your message is still here.";

export const CREW_PILL_CLASS: Record<CrewStatus, string> = {
  idle: "bg-slate-500 text-white",
  running: "bg-blue-700 text-white",
  done: "bg-green-700 text-white",
};

export const CREW_DOT_CLASS: Record<CrewStatus, string> = {
  idle: "bg-slate-200",
  running: "bg-blue-200",
  done: "bg-green-200",
};

export function crewStatusLabel(status: CrewStatus): string {
  return CREW_STATUS_LABELS[status];
}

export function formatLastUpdated(date: Date): string {
  return date.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "medium",
  });
}
