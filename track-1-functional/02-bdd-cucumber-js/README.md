# Lab 02 — BDD with Cucumber.js + Playwright (JavaScript/TypeScript)

**Goal:** turn your Gherkin scenarios into **runnable** Playwright tests using Cucumber.js.

**Time:** ~30 minutes · **Pick this _or_ [Lab 03 (C#)](../03-bdd-reqnroll-dotnet).**

---

## What's in here

```
02-bdd-cucumber-js/
├── package.json              # deps + scripts
├── cucumber.mjs              # Cucumber.js config
├── features/
│   ├── movie-search.feature  # scenarios (starts with search)
│   └── steps/
│       ├── world.js          # shared browser/page (Playwright)
│       ├── hooks.js          # start/stop browser per scenario
│       └── movie-search.steps.js  # step definitions (1 done, rest TODO)
```

## 1. Install

```bash
cd track-1-functional/02-bdd-cucumber-js
npm install
npx playwright install chromium
```

## 2. Run

Make sure the **movies app is running** on http://localhost:3000, then:

```bash
npm test                # headless
npm run test:headed     # watch the browser drive itself
```

The first scenario ("searching for a movie that exists") should pass out of the box.

## 3. Implement the rest with Copilot

Open `features/steps/movie-search.steps.js`. You'll see one implemented step and some `TODO`s.

Try this prompt (Agent mode, with the app running so MCP can explore it):

```
Using the Playwright MCP server, explore http://localhost:3000 and find the reliable
role/name locators for: the search control, the results list, and an empty-state / "no
results" message. Then implement the TODO step definitions in
features/steps/movie-search.steps.js so the scenarios in features/movie-search.feature pass.
Prefer getByRole/getByLabel locators and add meaningful assertions.
```

**Review before you accept:**
- Are locators role/name-based (not brittle CSS)?
- Does each `Then` assert something meaningful?
- Does `npm test` go green?

## 4. Extend

- Add the **login** journey and a **create-a-list** scenario (logged-in only).
- Introduce the **Page Object Model** (ask Copilot to refactor locators into a `MoviesPage`).
- Add a **data-driven** search with a `Scenario Outline` + `Examples`.

---

## Config notes

- `cucumber.mjs` points Cucumber at `features/**/*.feature` and the `features/steps` glob.
- `world.js` exposes a fresh Playwright `browser`/`page` per scenario via a custom World.
- `hooks.js` launches Chromium in `Before` and closes it in `After`.
- Base URL is `http://localhost:3000` (override with `BASE_URL` env var).

## ✅ Done when…

- `npm test` passes with **all three** search scenarios implemented
- You've added at least one more journey (login or lists)
- Locators are resilient and assertions are meaningful

Next: **[Lab 04 — API testing →](../04-api-testing)** or the
**[⚔️ Regression Optimisation challenge →](../challenge-regression-optimisation)**
