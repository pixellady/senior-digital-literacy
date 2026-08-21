import type { RunInput } from "@/lib/types/run";

export const MESSAGE_MAX_LENGTH = 4000;

export function validateRunInput(input: RunInput): string | null {
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
