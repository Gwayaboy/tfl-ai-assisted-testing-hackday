# Lab 03bis — API testing with Playwright (C# / .NET)

**Goal:** the same API-testing approach as [Lab 03](../03-api-testing), but in **C# / .NET** —
test the movie **API** directly (no browser) using Playwright's `IAPIRequestContext`. Faster,
more stable, and great for data-level assertions.

**Time:** ~20 minutes · **Pick this _or_ [Lab 03 (JS/TS)](../03-api-testing).**

Choose this path if your team lives in .NET.

---

## Why API tests

UI tests are valuable but slow and brittle. Many behaviours are better checked at the **API**
level: search results, data shape, status codes, error handling. A healthy suite mixes both.

The movies app serves its data from a local API on the same origin (`http://localhost:3000`).

## What's in here

```
03bis-api-testing-dotnet/
├── HackDay.MovieApiTests.csproj   # NUnit + Microsoft.Playwright (API only)
└── MoviesApiTests.cs              # 1 worked test + 3 TODOs
```

## 1. Discover the API with Copilot

With the app running and Copilot in Agent mode:

```
Using the Playwright MCP server, browse http://localhost:3000, perform a search, and
watch the network requests. What API endpoint(s) serve the movie search and movie
details data? Show me the request URL, method, and an example JSON response shape.
```

> You can also open your browser's **DevTools ▸ Network** tab, search for a movie, and inspect
> the request the app makes.

## 2. Run the tests

With the **movies app running** on http://localhost:3000:

```bash
cd track-1-functional/03bis-api-testing-dotnet
dotnet test
```

> **No browser download needed** — API tests use Playwright's request client, not Chromium,
> so you can skip `playwright install`. The worked test (`the app responds at the root`)
> should pass; the three TODO tests are marked `[Ignore]` until you implement them.

Then ask Copilot:

```
Based on the search API endpoint we discovered, implement the [Ignore]d TODO tests in
MoviesApiTests.cs: (1) a search returns results whose titles match the query,
(2) a search for a nonsense term returns an empty result set (not an error),
(3) the response has the expected JSON shape. Use the IAPIRequestContext and
meaningful NUnit Assert.That assertions, and remove each [Ignore] as you implement it.
```

## 3. Extend

- Assert the **status code** and **content-type**.
- Add a **schema** check (title, id, image, rating present).
- Compare **UI vs API**: does the UI show what the API returns?
- Add negative cases (malformed query params).

## ✅ Done when…

- `dotnet test` passes with the TODO API tests implemented
- You've asserted **status, shape and content** — not just "200 OK"
- You can explain when you'd choose an API test over a UI test

Next: the **[⚔️ Regression Optimisation challenge →](../challenge-regression-optimisation)**
