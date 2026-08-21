import {
  STUB_FIXTURES,
  STUB_SESSION_ID,
  type StubFixturePath,
} from "@/lib/fixtures/chatFixtures";
import type { ChatRequest, ChatResponse } from "@/lib/types/chat";
import type { RunInput } from "@/lib/types/run";
import { MESSAGE_MAX_LENGTH } from "@/lib/validation/runInput";

export type { StubFixturePath };

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

/** Map UI form state to the full SAD ChatRequest. activeScamNow is not on the envelope. */
export function toChatRequest(
  input: RunInput,
  sessionId: string | null,
): ChatRequest {
  return {
    session_id: sessionId,
    message: input.messageText.trim(),
    explicit_path: "scam",
    client_action: "none",
    track_override: null,
  };
}

function validateChatRequest(request: ChatRequest): string | null {
  const text = request.message.trim();
  if (text.length < 1) {
    return "Please paste or type the message or call you want to check.";
  }
  if (text.length > MESSAGE_MAX_LENGTH) {
    return `Please shorten the text to ${MESSAGE_MAX_LENGTH} characters or fewer.`;
  }
  return null;
}

/**
 * Stub for one non-streaming POST /api/v1/chat (SAD §4, AD-5).
 * Returns a named fixture ChatResponse. Never inspects request.message
 * for keywords. stubPath is stub-only (not a ChatRequest field).
 */
export async function sendChat(
  request: ChatRequest,
  stubPath: StubFixturePath,
): Promise<ChatResponse> {
  const validationError = validateChatRequest(request);
  if (validationError) {
    throw new Error(validationError);
  }

  const fixture = STUB_FIXTURES[stubPath];
  await delay(900);
  return {
    ...fixture,
    session_id: request.session_id || STUB_SESSION_ID,
  };
}
