import type { RunInput } from "@/lib/types/run";
import { tutorGoalTitle } from "@/lib/copy/tutorGoals";

export const MESSAGE_MAX_LENGTH = 4000;

export function validateRunInput(input: RunInput): string | null {
  if (input.mode === "learn") {
    if (!input.tutorGoalId) {
      return "Please pick a task to learn.";
    }
    if (!tutorGoalTitle(input.tutorGoalId)) {
      return "Please pick a task to learn.";
    }
    return null;
  }

  const text = input.messageText.trim();
  if (text.length < 1) {
    return "Please paste or type the message or call you want to check.";
  }
  if (text.length > MESSAGE_MAX_LENGTH) {
    return `Please shorten the text to ${MESSAGE_MAX_LENGTH} characters or fewer.`;
  }
  return null;
}

export function previewMessage(messageText: string, maxLength = 80): string {
  const trimmed = messageText.trim().replace(/\s+/g, " ");
  if (trimmed.length <= maxLength) return trimmed;
  return `${trimmed.slice(0, maxLength).trimEnd()}…`;
}

export function previewRunInput(input: RunInput, maxLength = 80): string {
  if (input.mode === "learn") {
    return previewMessage(tutorGoalTitle(input.tutorGoalId), maxLength);
  }
  return previewMessage(input.messageText, maxLength);
}
