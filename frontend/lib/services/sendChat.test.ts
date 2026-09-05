import { afterEach, describe, expect, it, vi } from "vitest";

import { STUB_PATH_A_GIFT_CARD_BAIL, STUB_SESSION_ID } from "@/lib/fixtures/chatFixtures";
import { sendChat, toChatRequest } from "@/lib/services/chatService";

describe("sendChat integration", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it("returns Path A fixture when API base is unset (does not inspect message)", async () => {
    vi.stubEnv("NEXT_PUBLIC_API_BASE_URL", "");
    vi.useFakeTimers();
    const request = toChatRequest(
      {
        mode: "scam",
        messageText: "anything can go here",
        activeScamNow: false,
        tutorGoalId: null,
      },
      null,
    );
    const pending = sendChat(request, "path_a_gift_card_bail");
    await vi.advanceTimersByTimeAsync(900);
    const response = await pending;
    expect(response.content.risk_level).toBe("likely_scam");
    expect(response.session_id).toBe(STUB_SESSION_ID);
    expect(response.agent_display_name).toBe(
      STUB_PATH_A_GIFT_CARD_BAIL.agent_display_name,
    );
  });

  it("POSTs SAD ChatRequest to /api/v1/chat when API base is set", async () => {
    vi.stubEnv("NEXT_PUBLIC_API_BASE_URL", "http://127.0.0.1:8000/");
    const envelope = {
      ...STUB_PATH_A_GIFT_CARD_BAIL,
      session_id: "live-session-id",
    };
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => envelope,
    });
    vi.stubGlobal("fetch", fetchMock);

    const request = toChatRequest(
      {
        mode: "scam",
        messageText: "Buy gift cards for jail",
        activeScamNow: false,
      tutorGoalId: null,
      },
      "sess-1",
    );
    const response = await sendChat(request, "path_b_active_scam");

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("http://127.0.0.1:8000/api/v1/chat");
    expect(init.method).toBe("POST");
    const body = JSON.parse(init.body);
    expect(body.explicit_path).toBe("scam");
    expect(body.message).toBe("Buy gift cards for jail");
    expect(body.session_id).toBe("sess-1");
    expect(body).not.toHaveProperty("stubPath");
    expect(response.session_id).toBe("live-session-id");
    expect(response.content.risk_level).toBe("likely_scam");
  });

  it("throws calm retry copy on HTTP 500 (does not parse error.code)", async () => {
    vi.stubEnv("NEXT_PUBLIC_API_BASE_URL", "http://127.0.0.1:8000");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({
        detail: {
          error: { code: "INTERNAL", message: "hidden", retryable: true },
        },
      }),
    }));

    await expect(
      sendChat(
        toChatRequest(
          {
            mode: "scam",
            messageText: "check this",
            activeScamNow: false,
            tutorGoalId: null,
          },
          null,
        ),
        "path_a_gift_card_bail",
      ),
    ).rejects.toThrow("The helper could not finish this check. Please try again.");
  });

  it("throws wait copy on HTTP 429 RATE_LIMIT", async () => {
    vi.stubEnv("NEXT_PUBLIC_API_BASE_URL", "http://127.0.0.1:8000");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: false,
      status: 429,
      json: async () => ({
        detail: {
          error: {
            code: "RATE_LIMIT",
            message: "Please wait a moment, then try again.",
            retryable: true,
          },
        },
      }),
    }));

    await expect(
      sendChat(
        toChatRequest(
          {
            mode: "scam",
            messageText: "check this",
            activeScamNow: false,
            tutorGoalId: null,
          },
          null,
        ),
        "path_a_gift_card_bail",
      ),
    ).rejects.toThrow(/wait a moment/i);
  });
});
