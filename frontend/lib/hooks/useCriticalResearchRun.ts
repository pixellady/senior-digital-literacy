"use client";

import { useCallback, useState } from "react";
import { flushSync } from "react-dom";
import { CREW_ERROR_DETAIL, RATE_LIMIT_DETAIL } from "@/lib/copy/crewStatus";
import { selectStubFixturePath } from "@/lib/fixtures/chatFixtures";
import { canReset, transition } from "@/lib/fsm/runFsm";
import { buildPrintSnapshot } from "@/lib/print/buildPrintSnapshot";
import { sendChat, toChatRequest } from "@/lib/services/chatService";
import type { ChatResponse } from "@/lib/types/chat";
import type { HistoryEntry, PrintSnapshot, RunInput, RunPhase } from "@/lib/types/run";
import { previewRunInput, validateRunInput } from "@/lib/validation/runInput";

const EMPTY_INPUT: RunInput = {
  mode: "scam",
  messageText: "",
  activeScamNow: false,
  tutorGoalId: null,
};

export function useCriticalResearchRun() {
  const [phase, setPhase] = useState<RunPhase>("idle");
  const [lastUpdated, setLastUpdated] = useState(() => new Date());
  const [input, setInput] = useState<RunInput>(EMPTY_INPUT);
  const [result, setResult] = useState<ChatResponse | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [printSnapshots, setPrintSnapshots] = useState<PrintSnapshot[]>([]);
  const [activePrintSnapshots, setActivePrintSnapshots] = useState<PrintSnapshot[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [retryable, setRetryable] = useState(false);
  const [paused, setPaused] = useState(false);

  const updateMessageText = useCallback((messageText: string) => {
    setInput((current) => ({ ...current, messageText }));
  }, []);

  const updateActiveScamNow = useCallback((activeScamNow: boolean) => {
    setInput((current) => ({ ...current, activeScamNow }));
  }, []);

  const updateWorkflowMode = useCallback((mode: RunInput["mode"]) => {
    setInput((current) => ({
      ...current,
      mode,
      messageText: mode === "learn" ? "" : current.messageText,
      activeScamNow: mode === "learn" ? false : current.activeScamNow,
      tutorGoalId: mode === "scam" ? null : current.tutorGoalId,
    }));
  }, []);

  const updateTutorGoalId = useCallback((tutorGoalId: string) => {
    setInput((current) => ({ ...current, tutorGoalId }));
  }, []);

  const executeRun = useCallback(async () => {
    const validationError = validateRunInput(input);
    if (validationError) {
      setErrorMessage(validationError);
      setRetryable(false);
      setLastUpdated(new Date());
      return;
    }

    const payload: RunInput = {
      mode: input.mode,
      messageText: input.messageText.trim(),
      activeScamNow: input.activeScamNow,
      tutorGoalId: input.tutorGoalId,
    };

    setErrorMessage(null);
    setRetryable(false);
    setResult(null);
    setPhase("running");
    setLastUpdated(new Date());

    try {
      const response = await sendChat(
        toChatRequest(payload, sessionId),
        selectStubFixturePath(payload),
      );
      setResult(response);
      setSessionId(response.session_id);
      const completedAt = new Date().toISOString();
      setHistory((previous) => [
        {
          sessionId: response.session_id,
          completedAt,
          inputPreview: previewRunInput(payload),
          riskLevel: response.content.risk_level,
          activeScamNow: payload.activeScamNow,
          mode: payload.mode,
        },
        ...previous,
      ]);
      setPrintSnapshots((previous) => [
        buildPrintSnapshot(response, completedAt, payload.mode),
        ...previous,
      ]);
      setPhase("done");
      setLastUpdated(new Date());
    } catch (err) {
      const waitCopy =
        err instanceof Error && err.message === RATE_LIMIT_DETAIL
          ? RATE_LIMIT_DETAIL
          : CREW_ERROR_DETAIL;
      setErrorMessage(waitCopy);
      setRetryable(true);
      setPhase("idle");
      setLastUpdated(new Date());
    }
  }, [input, sessionId]);

  const run = useCallback(async () => {
    if (paused) return;
    if (phase === "running" || phase === "done") return;
    await executeRun();
  }, [paused, phase, executeRun]);

  const reset = useCallback(() => {
    if (!canReset(phase)) return;
    setPhase((current) => transition(current, "RESET"));
    setResult(null);
    setSessionId(null);
    setErrorMessage(null);
    setRetryable(false);
    setPaused(false);
    setInput(EMPTY_INPUT);
    setLastUpdated(new Date());
  }, [phase]);

  const retry = useCallback(async () => {
    if (!retryable) return;
    setPaused(false);
    await executeRun();
  }, [retryable, executeRun]);

  const pause = useCallback(() => {
    setPaused(true);
    setLastUpdated(new Date());
  }, []);

  const resume = useCallback(() => {
    setPaused(false);
    setLastUpdated(new Date());
  }, []);

  const printCurrent = useCallback(() => {
    const latest = printSnapshots[0];
    if (!latest) return;
    flushSync(() => {
      setActivePrintSnapshots([latest]);
    });
    window.print();
  }, [printSnapshots]);

  const printVisit = useCallback(() => {
    if (printSnapshots.length === 0) return;
    flushSync(() => {
      setActivePrintSnapshots([...printSnapshots].reverse());
    });
    window.print();
  }, [printSnapshots]);

  return {
    phase,
    lastUpdated,
    input,
    result,
    history,
    activePrintSnapshots,
    errorMessage,
    retryable,
    paused,
    updateMessageText,
    updateActiveScamNow,
    updateWorkflowMode,
    updateTutorGoalId,
    run,
    reset,
    retry,
    pause,
    resume,
    printCurrent,
    printVisit,
  };
}
