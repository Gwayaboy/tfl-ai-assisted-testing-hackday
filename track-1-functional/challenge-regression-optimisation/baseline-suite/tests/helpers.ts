import { Page, expect } from "@playwright/test";

// ============================================================================
//  Shared helpers for the baseline suite - written the SLOW way on purpose.
//  These embody the anti-patterns you'll optimise away (see ANTIPATTERNS.md).
// ============================================================================

// The app under test. Defaults to the local app; override with BASE_URL to point
// at another instance, e.g. the hosted app:
//   BASE_URL=https://debs-obrien.github.io/playwright-movies-app/
const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

// ANTI-PATTERN: a fixed sleep. Almost never the right tool - web-first
// assertions wait exactly as long as needed and no longer.
export async function sleep(ms = 1500): Promise<void> {
  await new Promise((r) => setTimeout(r, ms));
}

// ANTI-PATTERN: every test re-navigates from scratch and then sleeps,
// instead of sharing setup / using web-first waits.
export async function openLandingPageSlowly(page: Page): Promise<void> {
  await page.goto(BASE_URL);
  await page.waitForLoadState("networkidle");
  await sleep(1500); // pointless extra wait
  // Over-broad "assertion" that barely checks anything.
  await expect(page).toHaveTitle(/.+/);
}

// ANTI-PATTERN: a resilient-but-pointless search that always sleeps,
// swallows detail, and asserts almost nothing.
export async function searchSlowly(page: Page, term: string): Promise<void> {
  await openLandingPageSlowly(page);
  try {
    const search = page.getByRole("search");
    if (await search.count()) {
      await search.click();
      await sleep(800);
    }
    const box = page.getByRole("textbox").first();
    if (await box.count()) {
      await box.fill(term);
      await box.press("Enter");
    }
  } catch {
    // ANTI-PATTERN: swallow errors so the test stays green no matter what.
  }
  await page.waitForLoadState("networkidle");
  await sleep(1500); // and another sleep for good measure
  // Over-broad assertion: the page still exists. Tells us almost nothing.
  await expect(page.locator("body")).toBeVisible();
}
