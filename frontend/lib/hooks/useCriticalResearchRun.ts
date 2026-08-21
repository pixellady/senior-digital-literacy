"use client";

import { useCallback, useState } from "react";
import { CREW_ERROR_DETAIL } from "@/lib/copy/crewStatus";
import { canReset, transition } from "@/lib/fsm/runFsm";
import { getRunStatus, startRun } from "@/lib/services/runService";
import type { HistoryEntry, RunInput, RunPhase, RunResult } from "@/lib/types/run";
import { previewMessage, validateRunInput } from "@/lib/validation/runInput";

const EMPTY_INPUT: RunInput = {
  messageText: "",
  activeScamNow: false,
};

export function useCriticalResearchRun() {
  const [phase, setPhase] = useState<RunPhase>("idle");
  const [lastUpdated, setLastUpdated] = useState(() => new Date());
  const [input, setInput] = useState<RunInput>(EMPTY_INPUT);
  const [result, setResult] = useState<RunResult | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [retryable, setRetryable] = useState(false);

  const updateMessageText = useCallback((messageText: string) => {
    setInput((current) => ({ ...current, messageText }));
  }, []);

  const updateActiveScamNow = useCallback((activeScamNow: boolean) => {
    setInput((current) => ({ ...current, activeScamNow }));
  }, []);

  const run = useCallback(async () => {
    if (phase === "running" || phase === "done") return;

    const validationError = validateRunInput(input);
    if (validationError) {
      setErrorMessage(validationError);
      setRetryable(false);
      setLastUpdated(new Date());
      return;
    }

    setErrorMessage(null);
    setRetryable(false);
    setResult(null);
    setPhase((current) => transition(current, "START"));
    setLastUpdated(new Date());

    const payload: RunInput = {
      messageText: input.messageText.trim(),
      activeScamNow: input.activeScamNow,
    };

    try {
      const { runId } = await startRun(payload);
      const status = await getRunStatus(runId);
      if (status.status !== "done" || !status.result) {
        throw new Error(CREW_ERROR_DETAIL);
      }

      const completed = status.result;
      setResult(completed);
      setHistory((previous) => [
        {
          runId,
          completedAt: new Date().toISOString(),
          inputPreview: previewMessage(payload.messageText),
          riskLevel: completed.riskLevel,
          activeScamNow: payload.activeScamNow,
        },
        ...previous,
      ]);
      setPhase((current) => transition(current, "COMPLETE"));
      setLastUpdated(new Date());
    } catch {
      setErrorMessage(CREW_ERROR_DETAIL);
      setRetryable(true);
      setPhase((current) => transition(current, "RESET"));
      setLastUpdated(new Date());
    }
  }, [input, phase]);

  const reset = useCallback(() => {
    if (!canReset(phase)) return;
    setPhase((current) => transition(current, "RESET"));
    setResult(null);
    setErrorMessage(null);
    setRetryable(false);
    setInput(EMPTY_INPUT);
    setLastUpdated(new Date());
  }, [phase]);

  const retry = useCallback(() => {
    if (!retryable) return;
    void run();
  }, [retryable, run]);

  return {
    phase,
    lastUpdated,
    input,
    result,
    history,
    errorMessage,
    retryable,
    updateMessageText,
    updateActiveScamNow,
    run,
    reset,
    retry,
  };
}
