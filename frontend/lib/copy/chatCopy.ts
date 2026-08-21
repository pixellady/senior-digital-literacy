import type { ChatMode } from "@/lib/types/chat";

const MODE_LABELS: Record<ChatMode, string> = {
  normal: "Mode: normal",
  patient: "Mode: patient",
  priority: "Mode: priority",
};

export const AI_DISCLOSURE_COPY = "This check uses AI.";

export function modeLabel(mode: ChatMode): string {
  return MODE_LABELS[mode];
}
