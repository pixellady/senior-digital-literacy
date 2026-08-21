import type { RunResult } from "@/lib/types/run";

export const STUB_RUN_ID = "stub-run-001";

/** Fixed mock from startRun. No streaming, tools, or costs. */
export const STUB_START_PAYLOAD = {
  runId: STUB_RUN_ID,
} as const;

/** Fixed mock result from getRunStatus. Same payload every successful run. */
export const STUB_RESULT_PAYLOAD: RunResult = {
  runId: STUB_RUN_ID,
  riskLevel: "suspicious",
  summary:
    "This is a stubbed check result. It is not a live scam verdict. Take a slow look at the next steps before you reply.",
  recommendedActions: [
    "Do not click links or call a number from the message.",
    "Do not share passwords, codes, or bank details.",
    "If you are unsure, wait and check with someone you trust.",
  ],
  extraGuidanceOffered: false,
  resourceLinks: [
    {
      label: "AARP Fraud Watch",
      url: "https://www.aarp.org/money/scams-fraud/",
    },
  ],
};
