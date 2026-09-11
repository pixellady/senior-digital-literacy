"use client";

import { useEffect, useState } from "react";
import {
  CREW_DOT_CLASS,
  CREW_PILL_CLASS,
  crewStatusLabel,
  formatLastUpdated,
  type CrewStatus,
} from "@/lib/copy/crewStatus";

type CrewStatusBannerProps = {
  phase: CrewStatus;
  lastUpdated: Date;
  paused: boolean;
};

function trackFillClass(phase: CrewStatus, paused: boolean): string {
  if (phase === "idle") {
    return "w-0 bg-slate-400";
  }
  if (phase === "done") {
    return "w-full bg-green-700";
  }
  return paused ? "w-1/2 bg-ink" : "w-1/2 bg-forest";
}

const READY_HINT_LEAD = "Ready.";
const READY_HINT_REST = "The bar fills when a check is running.";

function trackHint(phase: CrewStatus, paused: boolean): string {
  if (paused) {
    if (phase === "done") {
      return "Paused. The check is finished.";
    }
    return "Paused. The bar is waiting with you.";
  }
  if (phase === "idle") {
    return `${READY_HINT_LEAD} ${READY_HINT_REST}`;
  }
  if (phase === "running") {
    return "Working on this. You can wait right here.";
  }
  return "The check is finished.";
}

export function CrewStatusBanner({
  phase,
  lastUpdated,
  paused,
}: CrewStatusBannerProps) {
  const label = crewStatusLabel(phase);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const progressNow = phase === "idle" ? 0 : phase === "done" ? 100 : undefined;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="grid gap-3 sm:grid-cols-2"
    >
      <div className="rounded-xl border border-forest/15 bg-white p-4 shadow-[0_6px_16px_rgba(70,124,83,0.16)]">
        <span
          className={`inline-flex min-h-11 w-fit items-center gap-2 rounded-full px-4 py-2 text-lg font-semibold ${CREW_PILL_CLASS[phase]}`}
        >
          <span
            aria-hidden="true"
            className={`h-3 w-3 shrink-0 rounded-full ${CREW_DOT_CLASS[phase]}`}
          />
          {label}
        </span>
        <p className="mt-3 text-lg font-medium text-slate-800">
          {hasMounted
            ? `Last updated: ${formatLastUpdated(lastUpdated)}`
            : "Last updated:"}
        </p>
      </div>

      <div className="rounded-xl border border-forest/15 bg-white p-4 shadow-[0_6px_16px_rgba(70,124,83,0.16)]">
        <div
          role="progressbar"
          aria-label="Crew progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progressNow}
          aria-valuetext={paused ? `Paused. ${label}` : label}
          aria-busy={phase === "running" && !paused}
          className="h-4 overflow-hidden rounded-full border-2 border-forest bg-white"
        >
          <div
            aria-hidden="true"
            className={`h-full rounded-full ${trackFillClass(phase, paused)}`}
          />
        </div>
        <p className="mt-3 text-xl font-light text-slate-800">
          {phase === "idle" && !paused ? (
            <>
              <span className="font-medium">{READY_HINT_LEAD}</span>{" "}
              <span className="font-light">{READY_HINT_REST}</span>
            </>
          ) : (
            trackHint(phase, paused)
          )}
        </p>
      </div>
    </div>
  );
}
