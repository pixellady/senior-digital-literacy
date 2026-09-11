"use client";

import { CrewStatusBanner } from "@/components/CrewStatusBanner";
import { HistorySection } from "@/components/HistorySection";
import { InputsSection } from "@/components/InputsSection";
import { PrintSummary } from "@/components/PrintSummary";
import { ResultsSection } from "@/components/ResultsSection";
import { SafetyBar } from "@/components/SafetyBar";
import { TutorTaskSection } from "@/components/TutorTaskSection";
import { WorkflowModeToggle } from "@/components/WorkflowModeToggle";
import {
  PAGE_FOOTER_CLOSE,
  PAGE_FOOTER_DEFERRED,
  PAGE_FOOTER_LEAD,
  PAGE_PRIVACY_LEARN,
  PAGE_PRIVACY_SCAM,
  PAGE_SUBTITLE_LEARN,
  PAGE_SUBTITLE_SCAM,
  PAGE_TITLE,
} from "@/lib/copy/pageChrome";
import { isModeToggleLocked } from "@/lib/fsm/runFsm";
import { useCriticalResearchRun } from "@/lib/hooks/useCriticalResearchRun";
import type { WorkflowMode } from "@/lib/types/run";
import { surfaceCard, surfaceSticky } from "@/lib/ui/surfaces";

export function CriticalResearchWorkflow() {
  const workflow = useCriticalResearchRun();
  const learnMode = workflow.input.mode === "learn";

  const handleModeChange = (mode: WorkflowMode) => {
    workflow.updateWorkflowMode(mode);
    window.requestAnimationFrame(() => {
      const headingId = mode === "learn" ? "tutor-tasks-heading" : "inputs-heading";
      document.getElementById(headingId)?.focus();
    });
  };

  return (
    <div>
      <a
        href="#workflow-main"
        className="no-print sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-30 focus:rounded-lg focus:bg-card focus:px-4 focus:py-3 focus:text-lg focus:font-semibold focus:text-ink focus:outline focus:outline-4 focus:outline-forest"
      >
        Skip to workflow
      </a>

      <div className={`no-print sticky top-0 z-20 ${surfaceSticky}`}>
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-3">
          <CrewStatusBanner
            phase={workflow.phase}
            lastUpdated={workflow.lastUpdated}
            paused={workflow.paused}
          />
          <SafetyBar
            paused={workflow.paused}
            onPause={workflow.pause}
            onResume={workflow.resume}
          />
        </div>
      </div>

      <div
        id="workflow-main"
        className="mx-auto flex w-full max-w-4xl scroll-mt-40 flex-col gap-6 px-4 py-8 sm:px-8"
      >
        <header className={`no-print ${surfaceCard}`}>
          <h1 className="text-4xl font-semibold text-slate-950">{PAGE_TITLE}</h1>
          <p className="mt-3 text-xl font-light leading-[1.2] text-slate-900">
            {learnMode ? PAGE_SUBTITLE_LEARN : PAGE_SUBTITLE_SCAM}
          </p>
          <p className="mt-2 text-xl font-light leading-[1.2] text-slate-800">
            {learnMode ? PAGE_PRIVACY_LEARN : PAGE_PRIVACY_SCAM}
          </p>
          <WorkflowModeToggle
            mode={workflow.input.mode}
            disabled={isModeToggleLocked(workflow.phase)}
            onChange={handleModeChange}
          />
        </header>

        <form
          className="no-print"
          onSubmit={(event) => {
            event.preventDefault();
            void workflow.run();
          }}
        >
          <div className="flex flex-col gap-8">
            {learnMode ? (
              <TutorTaskSection
                phase={workflow.phase}
                input={workflow.input}
                errorMessage={workflow.errorMessage}
                retryable={workflow.retryable}
                paused={workflow.paused}
                selectedGoalId={workflow.input.tutorGoalId}
                onGoalChange={workflow.updateTutorGoalId}
                onReset={workflow.reset}
                onRetry={workflow.retry}
              />
            ) : (
              <InputsSection
                phase={workflow.phase}
                input={workflow.input}
                errorMessage={workflow.errorMessage}
                retryable={workflow.retryable}
                paused={workflow.paused}
                onMessageTextChange={workflow.updateMessageText}
                onActiveScamNowChange={workflow.updateActiveScamNow}
                onReset={workflow.reset}
                onRetry={workflow.retry}
              />
            )}
          </div>
        </form>

        <ResultsSection
          phase={workflow.phase}
          result={workflow.result}
          onPrintCurrent={workflow.printCurrent}
        />
        <PrintSummary snapshots={workflow.activePrintSnapshots} />
        <div className="no-print">
          <HistorySection
            entries={workflow.history}
            onPrintVisit={workflow.printVisit}
          />
        </div>

        <footer className="no-print text-xl text-ink">
          <p>
            <span className="font-medium">{PAGE_FOOTER_LEAD}</span>{" "}
            <span className="font-light">{PAGE_FOOTER_DEFERRED}</span>{" "}
            <span className="font-medium">{PAGE_FOOTER_CLOSE}</span>
          </p>
        </footer>
      </div>
    </div>
  );
}