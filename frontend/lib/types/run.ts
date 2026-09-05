import type { ResourceLink, RiskLevel } from "@/lib/types/chat";

export type WorkflowMode = "scam" | "learn";

/** Printable snapshot for one completed run (no session id or pasted message). */
export interface PrintSnapshot {
  completedAt: string;
  mode: WorkflowMode;
  checkLabel: string;
  verifiedGuide: boolean;
  heading: string;
  text: string;
  resourceLinks: ResourceLink[];
}

/** Form state for this slice. Mapped to ChatRequest at the stub boundary. */
export interface RunInput {
  mode: WorkflowMode;
  messageText: string;
  activeScamNow: boolean;
  tutorGoalId: string | null;
}

export interface HistoryEntry {
  sessionId: string;
  completedAt: string;
  inputPreview: string;
  riskLevel: RiskLevel;
  activeScamNow: boolean;
  mode: WorkflowMode;
}
