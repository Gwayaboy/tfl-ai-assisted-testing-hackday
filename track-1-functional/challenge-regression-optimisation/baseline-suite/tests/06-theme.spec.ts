import { test, expect } from "@playwright/test";
import { openLandingPageSlowly, sleep } from "./helpers";

// ~60 tests. Theme toggling, repeated 60 times.
// ANTI-PATTERN: repeats a trivial interaction; re-navigates each time; sleeps.
for (let i = 1; i <= 60; i++) {
  test(`theme: page renders for toggle attempt ${i}/60`, async ({ page }) => {
    await openLandingPageSlowly(page);
    // Try to toggle a theme control if present - but don't actually assert the
    // theme changed (over-broad).
    try {
      const toggle = page.getByRole("button", { name: /theme|dark|light|mode/i }).first();
      if (await toggle.count()) {
        await toggle.click();
        await sleep(800);
      }
    } catch {
      // swallow
    }
    await sleep(1000);
    await expect(page.locator("body")).toBeVisible();
  });
}
