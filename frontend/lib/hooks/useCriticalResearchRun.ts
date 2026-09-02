"use client";

import { useCallback, useState } from "react";
import { CREW_ERROR_DETAIL, RATE_LIMIT_DETAIL } from "@/lib/copy/crewStatus";
import { selectStubFixturePath } from "@/lib/fixtures/chatFixtures";
import { canReset, transition } from "@/lib/fsm/runFsm";
import { sendChat, toChatRequest } from "@/lib/services/chatService";
import type { ChatResponse } from "@/lib/types/chat";
import type { HistoryEntry, RunInput, RunPhase } from "@/lib/types/run";
import { previewMessage, validateRunInput } from "@/lib/validation/runInput";

const EMPTY_INPUT: RunInput = {
  messageText: "",
  activeScamNow: false,
};

export function useCriticalResearchRun() {
  const [phase, setPhase] = useState<RunPhase>("idle");
  const [lastUpdated, setLastUpdated] = useState(() => new Date());
  const [input, setInput] = useState<RunInput>(EMPTY_INPUT);
  const [result, setResult] = useState<ChatResponse | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [retryable, setRetryable] = useState(false);
  const [paused, setPaused] = useState(false);

  const updateMessageText = useCallback((messageText: string) => {
    setInput((current) => ({ ...current, messageText }));
  }, []);

  const updateActiveScamNow = useCallback((activeScamNow: boolean) => {
    setInput((current) => ({ ...current, activeScamNow }));
  }, []);

  const run = useCallback(async () => {
    if (paused) return;
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
      const response = await sendChat(
        toChatRequest(payload, sessionId),
        selectStubFixturePath(payload.activeScamNow),
      );
      setResult(response);
      setSessionId(response.session_id);
      setHistory((previous) => [
        {
          sessionId: response.session_id,
          completedAt: new Date().toISOString(),
          inputPreview: previewMessage(payload.messageText),
          riskLevel: response.content.risk_level,
          activeScamNow: payload.activeScamNow,
        },
        ...previous,
      ]);
      setPhase((current) => transition(current, "COMPLETE"));
      setLastUpdated(new Date());
    } catch (err) {
      const waitCopy =
        err instanceof Error && err.message === RATE_LIMIT_DETAIL
          ? RATE_LIMIT_DETAIL
          : CREW_ERROR_DETAIL;
      setErrorMessage(waitCopy);
      setRetryable(true);
      setPhase((current) => transition(current, "RESET"));
      setLastUpdated(new Date());
    }
  }, [input, paused, phase, sessionId]);

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

  const retry = useCallback(() => {
    if (paused || !retryable) return;
    void run();
  }, [paused, retryable, run]);

  const pause = useCallback(() => {
    setPaused(true);
    setLastUpdated(new Date());
  }, []);

  const resume = useCallback(() => {
    setPaused(false);
    setLastUpdated(new Date());
  }, []);

  return {
    phase,
    lastUpdated,
    input,
    result,
    history,
    errorMessage,
    retryable,
    paused,
    updateMessageText,
    updateActiveScamNow,
    run,
    reset,
    retry,
    pause,
    resume,
  };
}
