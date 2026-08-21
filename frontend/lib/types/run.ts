import type { RiskLevel } from "@/lib/types/chat";

export type RunPhase = "idle" | "running" | "done";

export type RunFsmEvent = "START" | "COMPLETE" | "RESET";

/** Form state for this slice. Mapped to ChatRequest at the stub boundary. */
export interface RunInput {
  messageText: string;
  activeScamNow: boolean;
}

export interface HistoryEntry {
  sessionId: string;
  completedAt: string;
  inputPreview: string;
  riskLevel: RiskLevel;
  activeScamNow: boolean;
}
