# Lab 04 — API testing with Playwright

**Goal:** test the movie **API** directly (no browser) using Playwright's request API. Faster,
more stable, and great for data-level assertions.

**Time:** ~20 minutes

---

## Why API tests

UI tests are valuable but slow and brittle. Many behaviours are better checked at the **API**
level: search results, data shape, status codes, error handling. A healthy suite mixes both.

The movies app serves its data from a local API on the same origin (`http://localhost:3000`).

## 1. Discover the API with Copilot

With the app running and Copilot in Agent mode:

```
Using the Playwright MCP server, browse http://localhost:3000, perform a search, and
watch the network requests. What API endpoint(s) serve the movie search and movie
details data? Show me the request URL, method, and an example JSON response shape.
```

> You can also open your browser's **DevTools ▸ Network** tab, search for a movie, and inspect
> the request the app makes.

## 2. Write API tests

A starter spec is provided: **[`movies-api.spec.js`](./movies-api.spec.js)** — one worked
test plus TODOs. Install & run:

```bash
cd track-1-functional/04-api-testing
npm install
npx playwright install chromium
npm test
```

Then ask Copilot:

```
Based on the search API endpoint we discovered, implement the TODO tests in
movies-api.spec.js: (1) a search returns results whose titles match the query,
(2) a search for a nonsense term returns an empty result set (not an error),
(3) the response has the expected JSON shape. Use Playwright's request fixture and
meaningful expect() assertions.
```

## 3. Extend

- Assert the **status code** and **content-type**.
- Add a **schema** check (title, id, image, rating present).
- Compare **UI vs API**: does the UI show what the API returns?
- Add negative cases (malformed query params).

## ✅ Done when…

- `npm test` passes with the TODO API tests implemented
- You've asserted **status, shape and content** — not just "200 OK"
- You can explain when you'd choose an API test over a UI test

Next: the **[⚔️ Regression Optimisation challenge →](../challenge-regression-optimisation)**
