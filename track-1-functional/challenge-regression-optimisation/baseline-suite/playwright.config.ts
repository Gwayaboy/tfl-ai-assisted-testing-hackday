import { defineConfig, devices } from "@playwright/test";

// ============================================================================
//  ⚠️  DELIBERATELY BAD CONFIG  ⚠️
//  This is part of the Regression Optimisation challenge. Everything here is a
//  realistic anti-pattern you will find in real, neglected regression suites.
//  Your job (with Copilot) is to FIX it. See ANTIPATTERNS.md.
// ============================================================================

export default defineConfig({
  testDir: "./tests",

  // ANTI-PATTERN: serial execution, a single worker. The #1 reason the suite is slow.
  fullyParallel: false,
  workers: 1,

  // ANTI-PATTERN: retries masking flakiness instead of fixing it.
  retries: 2,

  // ANTI-PATTERN: enormous timeouts that let slow tests hide.
  timeout: 120_000,
  expect: { timeout: 30_000 },

  reporter: [
    ["list"],
    ["html", { open: "never" }],
  ],

  use: {
    baseURL: process.env.BASE_URL || "http://localhost:3000",
    // ANTI-PATTERN: always-on tracing/video adds overhead to every test.
    trace: "on",
    video: "on",
    screenshot: "on",
  },

  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
});
