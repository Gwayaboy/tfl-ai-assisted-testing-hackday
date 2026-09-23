import { test, expect } from "@playwright/test";
import { KNOWN_MOVIES } from "./fixtures";
import { searchSlowly, sleep } from "./helpers";

// ~60 tests. Each known movie "detail" check repeated 15 times.
// ANTI-PATTERN: this is really a UI test doing what a fast API check could do,
// AND it's repeated 15x per movie for no reason.
for (const movie of KNOWN_MOVIES) {
  for (let i = 1; i <= 15; i++) {
    test(`details: "${movie}" is findable (run ${i}/15)`, async ({ page }) => {
      await searchSlowly(page, movie);
      await sleep(1000);
      // Over-broad: doesn't open details or verify the synopsis/rating.
      await expect(page.locator("body")).toBeVisible();
    });
  }
}
