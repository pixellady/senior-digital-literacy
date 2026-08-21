import type { RunFsmEvent, RunPhase } from "@/lib/types/run";

/**
 * Tiny FSM: idle → running → done.
 * Errors are not a fourth state: RESET back to idle and show an inline Retry.
 */
export function transition(phase: RunPhase, event: RunFsmEvent): RunPhase {
  switch (phase) {
    case "idle":
      return event === "START" ? "running" : phase;
    case "running":
      if (event === "COMPLETE") return "done";
      if (event === "RESET") return "idle";
      return phase;
    case "done":
      return event === "RESET" ? "idle" : phase;
    default: {
      const _exhaustive: never = phase;
      return _exhaustive;
    }
  }
}

export function canRun(phase: RunPhase, messageText: string): boolean {
  return phase === "idle" && messageText.trim().length > 0;
}

export function canReset(phase: RunPhase): boolean {
  return phase !== "running";
}

export function isFormLocked(phase: RunPhase): boolean {
  return phase === "running" || phase === "done";
}
