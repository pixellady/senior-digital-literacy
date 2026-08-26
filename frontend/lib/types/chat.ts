/**
 * SAD §4 chat envelope (snake_case JSON). Copied into
 * project-context/2.build/frontend-funcional-spec.md Contracts.
 * Endpoint: POST /api/v1/chat (non-streaming, AD-5).
 * Do not invent a second request/response shape.
 * Live fetch is opt-in via NEXT_PUBLIC_API_BASE_URL; otherwise fixtures.
 */

export const CHAT_ENDPOINT = "/api/v1/chat";

export type ExplicitPath = "tutor" | "scam" | null;

export type ClientAction =
  | "none"
  | "pause"
  | "resume"
  | "explain_simpler"
  | "repeat_step"
  | "start_over"
  | "get_extra_help"
  | "confirm_step";

export type TrackOverride = "beginner" | "partial_user" | "no_device" | null;

export type RouteIntent = "TUTOR" | "SCAM";

export type AgentId = "step_by_step_tutor" | "scam_detector";

export type AgentDisplayName = "Your tutor" | "Scam checker";

export type ChatMode = "normal" | "patient" | "priority";

export type RiskLevel =
  | "likely_scam"
  | "suspicious"
  | "likely_safe"
  | "critical"
  | null;

export type ApiErrorCode =
  | "VALIDATION"
  | "UNAUTHORIZED"
  | "RATE_LIMIT"
  | "TOKEN_CAP"
  | "TUTOR_WEEKLY_CAP"
  | "RAG_REFUSAL"
  | "TIMEOUT"
  | "INTERNAL";

/** SAD §4 ChatRequest. Full envelope — do not invent a second request shape. */
export interface ChatRequest {
  session_id: string | null;
  message: string;
  explicit_path: ExplicitPath;
  client_action: ClientAction;
  track_override: TrackOverride;
}

export interface ResourceLink {
  label: string;
  url: string;
}

export interface ChatStepCard {
  illustration_url: string;
  alt_text: string;
  caption: string;
}

export interface ChatContent {
  text: string;
  verified_guide: boolean;
  step_card?: ChatStepCard | null;
  risk_level: RiskLevel;
  resource_links: ResourceLink[];
}

export interface ChatInterrupt {
  active: boolean;
  label: string;
}

export interface ChatUi {
  actions: ClientAction[];
  clarifying_question: boolean;
}

/** SAD envelope fields. Stub values until @backend.eng counts real weekly sessions — do not render. */
export interface ChatCaps {
  tutor_sessions_used_this_week: number;
  tutor_sessions_limit: number;
  tutor_capped: boolean;
}

export interface ChatProgressHint {
  continue_lesson: boolean;
  continue_drill: boolean;
}

/** SAD ChatResponse. Results UI reads content.*, mode, and ai_disclosure. */
export interface ChatResponse {
  session_id: string;
  route_intent: RouteIntent;
  agent_id: AgentId;
  agent_display_name: AgentDisplayName;
  mode: ChatMode;
  ai_disclosure: boolean;
  content: ChatContent;
  interrupt: ChatInterrupt;
  ui: ChatUi;
  caps: ChatCaps;
  progress_hint: ChatProgressHint;
}

export interface ApiErrorEnvelope {
  error: {
    code: ApiErrorCode;
    message: string;
    retryable: boolean;
  };
}
