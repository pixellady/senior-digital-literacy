import type { ChatResponse } from "@/lib/types/chat";

export const STUB_SESSION_ID = "11111111-1111-4111-8111-111111111111";

/**
 * Named stub paths. Verdicts are these frozen ChatResponse blobs.
 * Do not derive risk_level, mode, or ai_disclosure from message text.
 */
export type StubFixturePath = "path_a_gift_card_bail" | "path_b_active_scam";

const SCAM_ENVELOPE: Omit<ChatResponse, "mode" | "ai_disclosure" | "content"> = {
  session_id: STUB_SESSION_ID,
  route_intent: "SCAM",
  agent_id: "scam_detector",
  agent_display_name: "Scam checker",
  interrupt: {
    active: false,
    label: "Scam checker tip",
  },
  ui: {
    actions: [
      "pause",
      "explain_simpler",
      "repeat_step",
      "start_over",
      "get_extra_help",
    ],
    clarifying_question: false,
  },
  caps: {
    // Envelope-only stubs. UI must not show these until WEEKLY_CAPS_ARE_REAL.
    tutor_sessions_used_this_week: 0,
    tutor_sessions_limit: 5,
    tutor_capped: false,
  },
  progress_hint: {
    continue_lesson: false,
    continue_drill: false,
  },
};

/** Path A — gift-card bail. likely_scam. Normal mode. No Priority disclosure. */
export const STUB_PATH_A_GIFT_CARD_BAIL: ChatResponse = {
  ...SCAM_ENVELOPE,
  mode: "normal",
  ai_disclosure: false,
  content: {
    text: "This looks like a gift-card bail request. People who need bail money do not ask strangers to buy gift cards. Do not buy cards, do not read numbers off a card, and do not send photos of receipts. Hang up and check with someone you already know using a number you already have.",
    verified_guide: true,
    step_card: null,
    risk_level: "likely_scam",
    resource_links: [
      {
        label: "FTC: How to avoid a gift card scam",
        url: "https://consumer.ftc.gov/articles/how-avoid-gift-card-scam",
      },
      {
        label: "AARP Fraud Watch",
        url: "https://www.aarp.org/money/scams-fraud/",
      },
    ],
  },
};

/** Path B — user-declared happening now / ambiguous in-progress. critical + Priority Mode + AI disclosure. */
export const STUB_PATH_B_ACTIVE_SCAM: ChatResponse = {
  ...SCAM_ENVELOPE,
  mode: "priority",
  ai_disclosure: true,
  content: {
    text: "If this is happening right now, pause. Hang up or stop the chat. Do not pay. Do not share a code, password, or bank detail. You can stay here. This check uses AI — it is not a person and it is not the police. When you feel steady, use the official links below.",
    verified_guide: true,
    step_card: null,
    risk_level: "critical",
    resource_links: [
      {
        label: "IC3 (FBI Internet Crime Complaint Center)",
        url: "https://www.ic3.gov/",
      },
      {
        label: "AARP Fraud Watch",
        url: "https://www.aarp.org/money/scams-fraud/",
      },
    ],
  },
};

export const STUB_FIXTURES: Record<StubFixturePath, ChatResponse> = {
  path_a_gift_card_bail: STUB_PATH_A_GIFT_CARD_BAIL,
  path_b_active_scam: STUB_PATH_B_ACTIVE_SCAM,
};

/**
 * Stub-only selector. Uses the Happening now checkbox, never message keywords.
 * false → Path A (gift-card likely_scam). true → Path B (critical + Priority disclosure).
 */
export function selectStubFixturePath(activeScamNow: boolean): StubFixturePath {
  return activeScamNow ? "path_b_active_scam" : "path_a_gift_card_bail";
}
