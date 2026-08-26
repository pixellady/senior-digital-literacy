import type { ChatCaps } from "@/lib/types/chat";

/**
 * Weekly tutor cap numbers on ChatResponse.caps are still stubs (0 / 5 / false).
 * Do not render them. Flip this only after @backend.eng counts real sessions.
 */
export const WEEKLY_CAPS_ARE_REAL = false;

export function shouldShowWeeklyCaps(_caps?: ChatCaps): boolean {
  return WEEKLY_CAPS_ARE_REAL;
}
