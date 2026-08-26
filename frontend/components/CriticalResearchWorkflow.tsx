"use client";

import { CrewStatusBanner } from "@/components/CrewStatusBanner";
import { HistorySection } from "@/components/HistorySection";
import { InputsSection } from "@/components/InputsSection";
import { ResultsSection } from "@/components/ResultsSection";
import { RunSection } from "@/components/RunSection";
import { SafetyBar } from "@/components/SafetyBar";
import { useCriticalResearchRun } from "@/lib/hooks/useCriticalResearchRun";

export function CriticalResearchWorkflow() {
  const workflow = useCriticalResearchRun();

  return (
    <div>
      <a
        href="#workflow-main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-30 focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:text-lg focus:font-semibold focus:text-slate-900 focus:outline focus:outline-4 focus:outline-blue-800"
      >
        Skip to workflow
      </a>

      <CrewStatusBanner phase={workflow.phase} lastUpdated={workflow.lastUpdated} />
      <SafetyBar
        paused={workflow.paused}
        onPause={workflow.pause}
        onResume={workflow.resume}
      />

      <div
        id="workflow-main"
        className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-8 sm:px-8"
      >
        <header>
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
        </header>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            void workflow.run();
          }}
        >
          <div className="flex flex-col gap-8">
            <InputsSection
              phase={workflow.phase}
              input={workflow.input}
              onMessageTextChange={workflow.updateMessageText}
              onActiveScamNowChange={workflow.updateActiveScamNow}
            />
            <RunSection
              phase={workflow.phase}
              input={workflow.input}
              errorMessage={workflow.errorMessage}
              retryable={workflow.retryable}
              paused={workflow.paused}
              onReset={workflow.reset}
              onRetry={workflow.retry}
            />
          </div>
        </form>

        <ResultsSection phase={workflow.phase} result={workflow.result} />
        <HistorySection entries={workflow.history} />

        <footer className="border-t-2 border-slate-300 pt-4 text-base text-slate-700">
          <p>
            Future work (not working yet): Extra Guidance, Learn a skill,
            account signup, and progress for caregivers. Extra routes wait until
            this scam check talks to Flow.
          </p>
        </footer>
      </div>
    </div>
  );
}
