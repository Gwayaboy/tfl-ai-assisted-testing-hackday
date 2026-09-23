// Step definitions for movie-search.feature
//
// ONE step is fully implemented as a worked example (the "exists" path).
// The others are marked TODO — implement them (with Copilot's help) so all
// three scenarios pass. Prefer role/name locators and meaningful assertions.
//
// Tip: run the movies app, switch Copilot to Agent mode, and ask it to use the
// Playwright MCP server to find the real locators for the search box, the
// results list, and the empty-state message.

import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "playwright/test";
import { BASE_URL } from "./world.js";

Given("the user is on the movies app landing page", async function () {
  await this.page.goto(BASE_URL);
  await expect(this.page).toHaveTitle(/movie/i);
});

When("the user searches for {string}", async function (title) {
  // Open the search UI and submit the query.
  // These locators use accessible roles/names — adjust if your exploration
  // (Lab 00 / MCP) reveals better ones.
  const search = this.page.getByRole("search");
  await search.click();
  const box = this.page.getByRole("textbox", { name: /search/i });
  await box.fill(title);
  await box.press("Enter");
  // Give the results (or empty state) a moment to render.
  await this.page.waitForLoadState("networkidle");
});

Then(
  "the user should see results related to {string}",
  async function (title) {
    // Worked example: at least one result card mentions the searched title.
    const results = this.page.locator(".movie-card, [data-testid='movie-card']");
    await expect(results.first()).toBeVisible();
    await expect(
      this.page.getByText(new RegExp(title, "i")).first()
    ).toBeVisible();
  }
);

// -----------------------------------------------------------------------------
// TODO: implement the "no results" assertion.
// What does the app show when nothing matches? (an empty state / message)
// Replace the throw with a real assertion.
// -----------------------------------------------------------------------------
Then(
  "the user should be told that no matching movies were found",
  async function () {
    // HINT: try something like:
    //   await expect(this.page.getByText(/no .*results|nothing found|no movies/i)).toBeVisible();
    // Explore the app first to find the exact empty-state wording.
    throw new Error("TODO: assert the empty-state / no-results message");
  }
);

// -----------------------------------------------------------------------------
// TODO: implement the empty-query behaviour your team agreed on in Lab 01.
// e.g. the browsable movie list is still shown.
// -----------------------------------------------------------------------------
Then("the user should still see the browsable movie list", async function () {
  // HINT:
  //   const list = this.page.locator(".movie-list, [data-testid='movie-list']");
  //   await expect(list).toBeVisible();
  throw new Error("TODO: assert the browse/movie list is still visible");
});
