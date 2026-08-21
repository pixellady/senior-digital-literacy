import { STUB_RESULT_PAYLOAD, STUB_START_PAYLOAD } from "@/lib/fixtures/runFixtures";
import type { RunInput, RunStatusResponse, StartRunResponse } from "@/lib/types/run";
import { validateRunInput } from "@/lib/validation/runInput";

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

/**
 * Stubbed backend: start a run.
 * Returns a fixed mock payload. No network, streaming, tool-calls, or costs.
 */
export async function startRun(input: RunInput): Promise<StartRunResponse> {
  const validationError = validateRunInput(input);
  if (validationError) {
    throw new Error(validationError);
  }

  await delay(250);
  return { runId: STUB_START_PAYLOAD.runId };
}

/**
 * Stubbed backend: read run status.
 * After a short wait, always returns the same done mock. No polling stream.
 */
export async function getRunStatus(runId: string): Promise<RunStatusResponse> {
  await delay(700);
  const id = runId || STUB_START_PAYLOAD.runId;
  return {
    runId: id,
    status: "done",
    result: { ...STUB_RESULT_PAYLOAD, runId: id },
  };
}
