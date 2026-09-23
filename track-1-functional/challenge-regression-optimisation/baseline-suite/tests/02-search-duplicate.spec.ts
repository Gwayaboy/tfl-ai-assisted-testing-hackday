import { test, expect } from "@playwright/test";
import { SEARCH_TERMS } from "./fixtures";
import { searchSlowly } from "./helpers";

// ~40 tests. THIS FILE IS A NEAR-DUPLICATE of 01-search.spec.ts.
// ANTI-PATTERN: duplicated coverage - the same searches, re-run under a
// different test name. A prime target for de-duplication.
for (const term of SEARCH_TERMS) {
  test(`regression search (dup): "${term}"`, async ({ page }) => {
    await searchSlowly(page, term);
    await expect(page.locator("body")).toBeVisible();
  });
}
