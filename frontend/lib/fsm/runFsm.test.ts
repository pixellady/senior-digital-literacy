import { describe, expect, it } from "vitest";

import { canReset, canRun, isFormLocked, transition } from "@/lib/fsm/runFsm";
import type { RunInput } from "@/lib/types/run";

const scamInput = (messageText: string): RunInput => ({
  mode: "scam",
  messageText,
  activeScamNow: false,
  tutorGoalId: null,
});

const learnInput = (tutorGoalId: string | null): RunInput => ({
  mode: "learn",
  messageText: "",
  activeScamNow: false,
  tutorGoalId,
});

describe("runFsm", () => {
  it("idle START goes to running", () => {
    expect(transition("idle", "START")).toBe("running");
  });

  it("running COMPLETE goes to done", () => {
    expect(transition("running", "COMPLETE")).toBe("done");
  });

  it("running RESET returns to idle (inline retry)", () => {
    expect(transition("running", "RESET")).toBe("idle");
  });

  it("canRun only when idle with non-empty paste in scam mode", () => {
    expect(canRun("idle", scamInput("  paste this  "))).toBe(true);
    expect(canRun("idle", scamInput("   "))).toBe(false);
    expect(canRun("running", scamInput("paste"))).toBe(false);
  });

  it("canRun in learn mode when a task is picked", () => {
    expect(canRun("idle", learnInput("send_email_daughter"))).toBe(true);
    expect(canRun("idle", learnInput(null))).toBe(false);
  });

  it("locks form while running or done", () => {
    expect(isFormLocked("idle")).toBe(false);
    expect(isFormLocked("running")).toBe(true);
    expect(isFormLocked("done")).toBe(true);
  });

  it("cannot Reset while running", () => {
    expect(canReset("running")).toBe(false);
    expect(canReset("idle")).toBe(true);
    expect(canReset("done")).toBe(true);
  });
});
