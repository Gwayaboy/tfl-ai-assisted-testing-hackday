import { test, expect } from "@playwright/test";
import { SEARCH_TERMS } from "./fixtures";
import { searchSlowly } from "./helpers";

// ~40 tests. Data-driven search over every term.
// ANTI-PATTERN: each iteration re-opens the app and sleeps (see helpers.ts).
for (const term of SEARCH_TERMS) {
  test(`search: "${term}" runs without error`, async ({ page }) => {
    await searchSlowly(page, term);
    // Over-broad assertion - doesn't actually check the results match.
    await expect(page.locator("body")).toBeVisible();
  });
}
