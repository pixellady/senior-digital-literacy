import { chromium } from "playwright";

const STUB_SESSION = "11111111-1111-4111-8111-111111111111";
const STUB_SNIPPET = "gift-card bail request";
const MESSAGE =
  "ZQ9M4: a text says my grandson is in jail and I must buy Apple gift cards and send the codes to 555-0199.";

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const apiCalls = [];

  page.on("request", (req) => {
    if (req.url().includes("/api/v1/chat")) {
      apiCalls.push({ url: req.url(), method: req.method() });
    }
  });

  const errors = [];
  try {
    await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });
    await page.getByRole("heading", { name: "Critical Research Workflow" }).waitFor();
    const heading = await page.locator("h1").innerText();

    await page.getByRole("button", { name: "Pause" }).click();
    await page.getByRole("button", { name: "Resume" }).waitFor();
    await page.getByText("You can come back when you are ready").waitFor();
    await page.getByRole("button", { name: "Resume" }).click();
    await page.getByRole("button", { name: "Pause" }).waitFor();

    await page.locator("#message-text").fill(MESSAGE);
    await page.locator("#active-scam-now").check();
    await page.locator("#active-scam-now").uncheck();

    const chatResponse = page.waitForResponse(
      (res) => res.url().includes("/api/v1/chat") && res.request().method() === "POST",
      { timeout: 180000 },
    );
    await page.getByRole("button", { name: "Run" }).click();
    await page.getByText("Crew: running").first().waitFor({ timeout: 10000 });
    const res = await chatResponse;
    const body = await res.json();
    await page.getByText("Crew: done").first().waitFor({ timeout: 30000 });

    const resultSection = page.locator("#results-heading").locator("xpath=..");
    const historySection = page.locator("#history-heading").locator("xpath=..");
    const resultText = await resultSection.innerText();
    const historyBeforeReset = await historySection.innerText();

    const usedStub =
      body.session_id === STUB_SESSION ||
      String(body.content?.text || "").includes(STUB_SNIPPET);

    if (!res.ok()) throw new Error(`Chat API HTTP ${res.status()}`);
    if (usedStub) throw new Error("UI still used the stub fixture, not the live backend");
    if (body.route_intent !== "SCAM") throw new Error(`Expected SCAM, got ${body.route_intent}`);
    if (!resultText.includes(body.agent_display_name || "Scam checker")) {
      throw new Error("Results did not show the checker name");
    }
    if (historyBeforeReset.includes("No checks yet")) {
      throw new Error("History stayed empty after a completed check");
    }
    if (!historyBeforeReset.includes("ZQ9M4")) {
      throw new Error(`History did not include this visit’s message preview: ${historyBeforeReset.slice(0, 400)}`);
    }

    await page.getByRole("button", { name: "Reset" }).click();
    await page.getByText("Results will appear here").waitFor();
    const messageAfterReset = await page.locator("#message-text").inputValue();
    const historyAfterReset = await historySection.innerText();
    if (messageAfterReset !== "") throw new Error("Reset did not clear the message");
    if (historyAfterReset.includes("No checks yet")) {
      throw new Error("Reset should keep this visit’s history");
    }

    console.log(
      JSON.stringify(
        {
          pageHeading: heading,
          pauseResume: true,
          resetClearedForm: true,
          apiStatus: res.status(),
          apiUrl: res.url(),
          route_intent: body.route_intent,
          agent_display_name: body.agent_display_name,
          session_id: body.session_id,
          risk_level: body.content?.risk_level,
          mode: body.mode,
          textPreview: String(body.content?.text || "").slice(0, 220),
          usedStub,
          historyHasCheck: true,
          apiCalls,
        },
        null,
        2,
      ),
    );
  } catch (err) {
    errors.push(String(err && err.message ? err.message : err));
    console.error("CLICKTHROUGH_FAIL", errors.join(" | "));
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
})();
