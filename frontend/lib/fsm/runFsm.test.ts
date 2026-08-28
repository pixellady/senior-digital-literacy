import { describe, expect, it } from "vitest";

import { canReset, canRun, isFormLocked, transition } from "@/lib/fsm/runFsm";

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

  it("canRun only when idle with non-empty paste", () => {
    expect(canRun("idle", "  paste this  ")).toBe(true);
    expect(canRun("idle", "   ")).toBe(false);
    expect(canRun("running", "paste")).toBe(false);
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
