import { describe, expect, it } from "vitest";

import {
  SCAM_HISTORY_ASKED_LABEL,
  previewResultText,
  previewRunInput,
} from "@/lib/validation/runInput";
import type { RunInput } from "@/lib/types/run";

const scamInput = (messageText: string): RunInput => ({
  mode: "scam",
  messageText,
  activeScamNow: false,
  tutorGoalId: null,
});

describe("previewRunInput", () => {
  it("does not put pasted scam text on the History row", () => {
    expect(previewRunInput(scamInput("Buy Apple gift cards right now"))).toBe(
      SCAM_HISTORY_ASKED_LABEL,
    );
  });

  it("uses the tutor task title for learn mode", () => {
    expect(
      previewRunInput({
        mode: "learn",
        messageText: "",
        activeScamNow: false,
        tutorGoalId: "send_email_daughter",
      }),
    ).toBe("Send an email to my daughter");
  });
});

describe("previewResultText", () => {
  it("shortens long result copy for History", () => {
    const long = "A".repeat(200);
    const preview = previewResultText(long);
    expect(preview.endsWith("…")).toBe(true);
    expect(preview.length).toBeLessThanOrEqual(141);
  });
});
