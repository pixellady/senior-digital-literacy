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
  return paused ? "w-1/2 bg-slate-500" : "w-1/2 bg-blue-700";
}

function trackHint(phase: CrewStatus, paused: boolean): string {
  if (paused) {
    if (phase === "done") {
      return "Paused. The check is finished.";
    }
    return "Paused. The bar is waiting with you.";
  }
  if (phase === "idle") {
    return "Ready. The bar fills when a check is running.";
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
      className="border-b-2 border-slate-900 bg-white px-4 py-3 shadow-sm sm:px-8"
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span
            className={`inline-flex min-h-11 w-fit items-center gap-2 rounded-full px-4 py-2 text-lg font-semibold ${CREW_PILL_CLASS[phase]}`}
          >
            <span
              aria-hidden="true"
              className={`h-3 w-3 shrink-0 rounded-full ${CREW_DOT_CLASS[phase]}`}
            />
            {label}
          </span>
          <p className="text-base font-medium text-slate-800">
            {hasMounted
              ? `Last updated: ${formatLastUpdated(lastUpdated)}`
              : "Last updated:"}
          </p>
        </div>

        <div>
          <div
            role="progressbar"
            aria-label="Crew progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progressNow}
            aria-valuetext={paused ? `Paused. ${label}` : label}
            aria-busy={phase === "running" && !paused}
            className="h-4 overflow-hidden rounded-full border-2 border-slate-900 bg-slate-200"
          >
            <div
              aria-hidden="true"
              className={`h-full rounded-full ${trackFillClass(phase, paused)}`}
            />
          </div>
          <p className="mt-2 text-base font-medium text-slate-800">
            {trackHint(phase, paused)}
          </p>
        </div>
      </div>
    </div>
  );
}
