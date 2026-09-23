import { test, expect } from "@playwright/test";
import { openLandingPageSlowly, sleep } from "./helpers";

// ~60 tests. The SAME "landing page loads" smoke check, 60 times.
// ANTI-PATTERN: over-broad + massively duplicated. In reality one good
// smoke test (or a handful) covers this.
for (let i = 1; i <= 60; i++) {
  test(`smoke: landing page loads (${i}/60)`, async ({ page }) => {
    await openLandingPageSlowly(page);
    await sleep(1000); // yet another sleep
    await expect(page.locator("body")).toBeVisible();
  });
}
