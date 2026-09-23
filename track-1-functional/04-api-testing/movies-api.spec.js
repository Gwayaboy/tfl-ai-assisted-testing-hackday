// API tests against the movies app.
//
// IMPORTANT: The exact endpoint path may differ — use Lab 04 step 1 (Copilot + MCP,
// or DevTools ▸ Network) to discover the real search endpoint, then update SEARCH_PATH.
//
// One worked test is provided (it fetches the app root and checks it responds).
// The TODO tests are for you to implement once you've found the search API.

import { test, expect } from "@playwright/test";

// TODO: replace with the real search endpoint you discover (e.g. "/api/search?query=").
const SEARCH_PATH = (query) => `/api/search?query=${encodeURIComponent(query)}`;

test("the app responds at the root", async ({ request }) => {
  // Worked example: sanity-check the SUT is up.
  const res = await request.get("/");
  expect(res.ok()).toBeTruthy();
});

// ---------------------------------------------------------------------------
// TODO 1: a search for a known movie returns matching results.
// ---------------------------------------------------------------------------
test.skip("search returns results whose titles match the query", async ({ request }) => {
  const res = await request.get(SEARCH_PATH("Sonic"));
  expect(res.ok()).toBeTruthy();
  const body = await res.json();
  // HINT: assert body is a non-empty list and at least one item's title includes "Sonic".
  // expect(Array.isArray(body.results)).toBeTruthy();
  // expect(body.results.some(m => /sonic/i.test(m.title))).toBeTruthy();
  throw new Error("TODO: assert matching results");
});

// ---------------------------------------------------------------------------
// TODO 2: a nonsense search returns an EMPTY set, not an error.
// ---------------------------------------------------------------------------
test.skip("nonsense search returns an empty result set", async ({ request }) => {
  const res = await request.get(SEARCH_PATH("ThisMovieDoesNotExist12345"));
  expect(res.ok()).toBeTruthy();
  // HINT: assert the results array is empty.
  throw new Error("TODO: assert empty results");
});

// ---------------------------------------------------------------------------
// TODO 3: the response has the expected JSON shape.
// ---------------------------------------------------------------------------
test.skip("search response items have the expected shape", async ({ request }) => {
  const res = await request.get(SEARCH_PATH("Sonic"));
  const body = await res.json();
  // HINT: pick the first item and assert the fields you rely on exist,
  // e.g. id, title, image/poster, rating.
  throw new Error("TODO: assert response shape");
});
