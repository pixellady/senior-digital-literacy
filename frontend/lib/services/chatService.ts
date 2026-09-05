import {
  STUB_FIXTURES,
  STUB_SESSION_ID,
  type StubFixturePath,
} from "@/lib/fixtures/chatFixtures";
import { RATE_LIMIT_DETAIL } from "@/lib/copy/crewStatus";
import { CHAT_ENDPOINT, type ChatRequest, type ChatResponse } from "@/lib/types/chat";
import { tutorGoalTitle } from "@/lib/copy/tutorGoals";
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
  const isLearn = input.mode === "learn";
  return {
    session_id: sessionId,
    message: isLearn
      ? tutorGoalTitle(input.tutorGoalId)
      : input.messageText.trim(),
    explicit_path: isLearn ? "tutor" : "scam",
    client_action: "none",
    track_override: isLearn ? "partial_user" : null,
  };
}

function validateChatRequest(request: ChatRequest): string | null {
  const text = request.message.trim();
  if (text.length < 1) {
    if (request.explicit_path === "tutor") {
      return "Please pick a task to learn.";
    }
    return "Please paste or type the message or call you want to check.";
  }
  if (text.length > MESSAGE_MAX_LENGTH) {
    return `Please shorten the text to ${MESSAGE_MAX_LENGTH} characters or fewer.`;
  }
  return null;
}

/**
 * One non-streaming POST /api/v1/chat (SAD §4, AD-5).
 * When NEXT_PUBLIC_API_BASE_URL is set, fetch the live Flow API.
 * Otherwise return a named fixture. Never inspects request.message
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

  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (apiBase) {
    const response = await fetch(`${apiBase.replace(/\/$/, "")}${CHAT_ENDPOINT}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });
    const payload: unknown = await response.json();
    if (!response.ok) {
      if (response.status === 429) {
        throw new Error(RATE_LIMIT_DETAIL);
      }
      throw new Error("The helper could not finish this check. Please try again.");
    }
    return payload as ChatResponse;
  }

  const fixture = STUB_FIXTURES[stubPath];
  await delay(900);
  return {
    ...fixture,
    session_id: request.session_id || STUB_SESSION_ID,
  };
}
