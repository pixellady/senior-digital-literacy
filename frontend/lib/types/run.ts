export type RunPhase = "idle" | "running" | "done";

export type RunFsmEvent = "START" | "COMPLETE" | "RESET";

export type RiskLevel =
  | "likely_scam"
  | "suspicious"
  | "likely_safe"
  | "critical";

export interface RunInput {
  messageText: string;
  activeScamNow: boolean;
}

export interface ResourceLink {
  label: string;
  url: string;
}

export interface RunResult {
  runId: string;
  riskLevel: RiskLevel;
  summary: string;
  recommendedActions: string[];
  extraGuidanceOffered: boolean;
  resourceLinks: ResourceLink[];
}

export interface StartRunResponse {
  runId: string;
}

export interface RunStatusResponse {
  runId: string;
  status: "running" | "done";
  result?: RunResult;
}

export interface HistoryEntry {
  runId: string;
  completedAt: string;
  inputPreview: string;
  riskLevel: RiskLevel;
  activeScamNow: boolean;
}
