import { test, expect } from "@playwright/test";
import { NONSENSE_TERMS } from "./fixtures";
import { searchSlowly } from "./helpers";

// ~40 tests. Each nonsense term repeated 10 times.
// ANTI-PATTERN: pointless repetition inflates the suite without adding coverage.
for (const term of NONSENSE_TERMS) {
  for (let i = 1; i <= 10; i++) {
    test(`nonsense search "${term}" (run ${i}/10)`, async ({ page }) => {
      await searchSlowly(page, term);
      // Doesn't even assert the empty-state - just that the page survived.
      await expect(page.locator("body")).toBeVisible();
    });
  }
}
