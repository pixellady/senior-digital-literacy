"use client";

import { CrewStatusBanner } from "@/components/CrewStatusBanner";
import { HistorySection } from "@/components/HistorySection";
import { InputsSection } from "@/components/InputsSection";
import { PrintSummary } from "@/components/PrintSummary";
import { ResultsSection } from "@/components/ResultsSection";
import { SafetyBar } from "@/components/SafetyBar";
import { TutorTaskSection } from "@/components/TutorTaskSection";
import { WorkflowModeToggle } from "@/components/WorkflowModeToggle";
import { PRIVACY_REASSURANCE_COPY } from "@/lib/copy/privacyReassurance";
import { isFormLocked } from "@/lib/fsm/runFsm";
import { useCriticalResearchRun } from "@/lib/hooks/useCriticalResearchRun";

export function CriticalResearchWorkflow() {
  const workflow = useCriticalResearchRun();
  const formLocked = isFormLocked(workflow.phase);

  return (
    <div>
      <a
        href="#workflow-main"
        className="no-print sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-30 focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:text-lg focus:font-semibold focus:text-slate-900 focus:outline focus:outline-4 focus:outline-blue-800"
      >
        Skip to workflow
      </a>

      <div className="no-print sticky top-0 z-20">
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

      <div
        id="workflow-main"
        className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-8 sm:px-8"
      >
        <header className="no-print">
          <p className="text-base font-medium uppercase tracking-wide text-slate-700">
            Scam Defense
          </p>
          <h1 className="mt-2 text-4xl font-bold text-slate-950">
            Learn the Signs, Protect Yourself
          </h1>
          <p className="mt-3 text-lg text-slate-900">
            Check a suspicious message or call. You&apos;re safe here, and
            you&apos;re never wrong to ask.
          </p>
          <p className="mt-2 text-base text-slate-700">{PRIVACY_REASSURANCE_COPY}</p>
          <WorkflowModeToggle
            mode={workflow.input.mode}
            disabled={formLocked}
            onChange={workflow.updateWorkflowMode}
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
            {workflow.input.mode === "scam" ? (
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
            ) : (
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

        <footer className="no-print border-t-2 border-slate-300 pt-4 text-base text-slate-700">
          <p>
            Future work (not working yet): Extra Guidance, account signup, and
            progress for caregivers. Beginner and No-Device tracks, onboarding,
            and multi-step lessons are not on this page yet.
          </p>
        </footer>
      </div>
    </div>
  );
}
