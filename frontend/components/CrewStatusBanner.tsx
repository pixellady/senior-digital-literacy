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
};

export function CrewStatusBanner({ phase, lastUpdated }: CrewStatusBannerProps) {
  const label = crewStatusLabel(phase);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="sticky top-0 z-20 border-b-2 border-slate-900 bg-white px-4 py-3 shadow-sm sm:px-8"
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
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
          Last updated: {formatLastUpdated(lastUpdated)}
        </p>
      </div>
    </div>
  );
}
