import { describe, expect, it } from "vitest";
import { buildPrintSnapshot, dedupeResourceLinks } from "./buildPrintSnapshot";
import type { ChatResponse } from "@/lib/types/chat";

const baseResponse: ChatResponse = {
  session_id: "sess-1",
  route_intent: "SCAM",
  agent_id: "scam_detector",
  agent_display_name: "Scam checker",
  mode: "normal",
  ai_disclosure: true,
  content: {
    text: "Do not share codes.",
    verified_guide: true,
    risk_level: "likely_scam",
    resource_links: [
      { label: "FTC", url: "https://www.ftc.gov/scams" },
      { label: "FTC duplicate", url: "https://www.ftc.gov/scams" },
    ],
  },
  caps: { tutor_sessions_used_this_week: 0, tutor_sessions_limit: 5 },
  interrupt: { active: false, label: "" },
};

describe("dedupeResourceLinks", () => {
  it("removes duplicate URLs regardless of case", () => {
    const links = dedupeResourceLinks([
      { label: "A", url: "https://Example.com" },
      { label: "B", url: "https://example.com" },
      { label: "C", url: "https://other.gov" },
    ]);
    expect(links).toHaveLength(2);
    expect(links.map((link) => link.label)).toEqual(["A", "C"]);
  });
});

describe("buildPrintSnapshot", () => {
  it("builds a scam snapshot without session or pasted message fields", () => {
    const snapshot = buildPrintSnapshot(
      baseResponse,
      "2026-09-05T14:00:00.000Z",
      "scam",
    );
    expect(snapshot).toMatchObject({
      mode: "scam",
      checkLabel: "Scam check",
      heading: "This looks like a scam",
      text: "Do not share codes.",
      verifiedGuide: true,
    });
    expect(snapshot.resourceLinks).toHaveLength(1);
    expect(snapshot).not.toHaveProperty("sessionId");
    expect(snapshot).not.toHaveProperty("inputPreview");
  });

  it("uses tutor heading for learn mode", () => {
    const tutorResponse: ChatResponse = {
      ...baseResponse,
      route_intent: "TUTOR",
      agent_id: "step_by_step_tutor",
      agent_display_name: "Your tutor",
      content: {
        text: "Open your email app.",
        verified_guide: true,
        risk_level: null,
        resource_links: [],
      },
    };
    const snapshot = buildPrintSnapshot(
      tutorResponse,
      "2026-09-05T14:05:00.000Z",
      "learn",
    );
    expect(snapshot.checkLabel).toBe("Learn a skill");
    expect(snapshot.heading).toBe("Your next step");
  });
});
