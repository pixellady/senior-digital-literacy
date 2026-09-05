import { describe, expect, it } from "vitest";

import { WEEKLY_CAPS_ARE_REAL, shouldShowWeeklyCaps } from "@/lib/copy/caps";
import {
  CREW_ERROR_DETAIL,
  CREW_STATUS_LABELS,
  RATE_LIMIT_DETAIL,
} from "@/lib/copy/crewStatus";
import { riskHeading } from "@/lib/copy/riskCopy";
import { PAUSE_IDLE } from "@/lib/copy/safetyBar";
import {
  STUB_PATH_A_GIFT_CARD_BAIL,
  STUB_PATH_B_ACTIVE_SCAM,
  selectStubFixturePath,
} from "@/lib/fixtures/chatFixtures";
import { toChatRequest } from "@/lib/services/chatService";
import { validateRunInput } from "@/lib/validation/runInput";

describe("toChatRequest", () => {
  it("sends explicit_path scam for check mode (US-002-2)", () => {
    const request = toChatRequest(
      {
        mode: "scam",
        messageText: "  Check this text  ",
        activeScamNow: true,
        tutorGoalId: null,
      },
      null,
    );
    expect(request.explicit_path).toBe("scam");
    expect(request.client_action).toBe("none");
    expect(request.track_override).toBeNull();
    expect(request.message).toBe("Check this text");
    expect(request).not.toHaveProperty("activeScamNow");
  });

  it("sends explicit_path tutor and partial_user track for learn mode", () => {
    const request = toChatRequest(
      {
        mode: "learn",
        messageText: "",
        activeScamNow: false,
        tutorGoalId: "send_email_daughter",
      },
      null,
    );
    expect(request.explicit_path).toBe("tutor");
    expect(request.track_override).toBe("partial_user");
    expect(request.message).toBe("Send an email to my daughter");
  });
});

describe("selectStubFixturePath", () => {
  it("uses Happening now checkbox in scam mode, not message keywords", () => {
    expect(
      selectStubFixturePath({ mode: "scam", activeScamNow: false }),
    ).toBe("path_a_gift_card_bail");
    expect(selectStubFixturePath({ mode: "scam", activeScamNow: true })).toBe(
      "path_b_active_scam",
    );
    expect(STUB_PATH_A_GIFT_CARD_BAIL.content.risk_level).toBe("likely_scam");
    expect(STUB_PATH_A_GIFT_CARD_BAIL.mode).toBe("normal");
    expect(STUB_PATH_B_ACTIVE_SCAM.content.risk_level).toBe("critical");
    expect(STUB_PATH_B_ACTIVE_SCAM.mode).toBe("priority");
    expect(STUB_PATH_B_ACTIVE_SCAM.ai_disclosure).toBe(true);
  });

  it("returns tutor fixture in learn mode", () => {
    expect(selectStubFixturePath({ mode: "learn", activeScamNow: false })).toBe(
      "path_c_tutor_step",
    );
  });
});

describe("copy and caps", () => {
  it("hides weekly cap numbers until they are real", () => {
    expect(WEEKLY_CAPS_ARE_REAL).toBe(false);
    expect(shouldShowWeeklyCaps()).toBe(false);
  });

  it("maps risk levels to large-type headings", () => {
    expect(riskHeading("likely_scam")).toBe("This looks like a scam");
    expect(riskHeading("critical")).toBe("This may be a scam happening now");
  });

  it("send-failure copy does not blame the user (US-001-6, US-009-4)", () => {
    expect(CREW_ERROR_DETAIL.toLowerCase()).toContain("nothing you did caused this");
    expect(RATE_LIMIT_DETAIL.toLowerCase()).toContain("wait a moment");
    expect(RATE_LIMIT_DETAIL.toLowerCase()).toContain("nothing you did caused this");
    expect(CREW_STATUS_LABELS.running).toBe("Crew: running");
  });

  it("rejects empty paste (US-002-2)", () => {
    expect(
      validateRunInput({
        mode: "scam",
        messageText: "   ",
        activeScamNow: false,
        tutorGoalId: null,
      }),
    ).toMatch(/paste or type/i);
  });

  it("requires a picked task in learn mode", () => {
    expect(
      validateRunInput({
        mode: "learn",
        messageText: "",
        activeScamNow: false,
        tutorGoalId: null,
      }),
    ).toMatch(/pick a task/i);
  });

  it("keeps canonical Pause idle copy (US-009-2)", () => {
    expect(PAUSE_IDLE).toBe("Pause is always here, waiting for you.");
  });
});
