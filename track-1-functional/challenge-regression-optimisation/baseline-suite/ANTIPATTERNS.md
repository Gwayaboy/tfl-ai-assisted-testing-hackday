# Anti-patterns in this baseline suite (the checklist to beat)

This suite is **deliberately bad**. Here's everything that's wrong with it — use this as a
hit-list (or paste it to Copilot) to drive your optimisation. Every item you fix improves your
**time** and/or **reliability** score without hurting **coverage**.

## Configuration (`playwright.config.ts`)

- [ ] `fullyParallel: false` + `workers: 1` → **run in parallel** (`fullyParallel: true`,
      raise `workers`). Usually the single biggest win.
- [ ] `retries: 2` masking flakiness → fix the flakiness, then reduce retries.
- [ ] `timeout: 120_000` / `expect.timeout: 30_000` → **tighten** so slow tests surface.
- [ ] `trace/video/screenshot: "on"` for every test → set to `on-first-retry` / `retain-on-failure`.

## Test design

- [ ] **Hard sleeps** (`waitForTimeout` / `sleep()` in `helpers.ts`) everywhere →
      replace with **web-first assertions** (`await expect(locator).toBeVisible()`), which
      wait only as long as needed.
- [ ] **Duplicated files** — `02-search-duplicate.spec.ts` re-runs `01-search.spec.ts` →
      **delete the duplication**, keep one parametrised version.
- [ ] **Pointless repetition** — `03-nonsense` ×10, `05-details` ×15, `04`/`06` ×60 →
      collapse to the coverage you actually need.
- [ ] **Over-broad assertions** — most tests only check `body` is visible →
      assert the **real outcome** (results match the query, empty-state shows, details render).
- [ ] **UI tests doing API work** — `05-details` searches through the UI to check a movie
      exists → move data checks to **fast API tests**.
- [ ] **No reuse** — every test re-navigates from scratch (`openLandingPageSlowly`) →
      share context / storage state / `beforeAll` where sensible.

## Coverage — don't throw the baby out

The suite is bloated, but the *intent* behind it is real. As you cut, make sure you still cover:

- Search: exists / not-exists / empty
- Browse / landing renders
- A real **details** check (open it, verify content) — not just "findable"
- A real **theme** check (assert it actually changed) — not just "page renders"

> **Scoring reminder:** coverage is **40%**, time **30%**, reliability **20%**, AI use **10%**.
> The winning move is *faster AND still meaningful* — not just deleting tests.

## Suggested target

A well-optimised version typically lands around **20–40 focused tests** running in a **fraction**
of the baseline time, with **tighter assertions** and **zero hard sleeps**. Show the before/after!
