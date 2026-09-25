# Anti-patterns in this baseline suite — C# / .NET (the checklist to beat)

This suite is **deliberately bad** — the C# mirror of
[`../baseline-suite/ANTIPATTERNS.md`](../baseline-suite/ANTIPATTERNS.md). Here's everything
that's wrong with it — use this as a hit-list (or paste it to Copilot) to drive your
optimisation. Every item you fix improves your **time** and/or **reliability** score without
hurting **coverage**.

## Configuration (`.runsettings` + `AssemblyInfo.cs`)

- [ ] `NumberOfTestWorkers = 1` + `[assembly: LevelOfParallelism(1)]` → **run in parallel**
      (raise the worker count and opt tests into `[Parallelizable(ParallelScope.Self)]`).
      Usually the single biggest win.
- [ ] `[Retry(2)]` on every test masking flakiness → fix the flakiness, then drop the retries.
- [ ] `[CancelAfter(120_000)]` per test / `<ExpectTimeout>30000</ExpectTimeout>` → **tighten**
      so slow tests surface instead of hiding.
- [ ] Always-on **tracing + video + screenshot** for every test (`BaselineTest.cs`) →
      record only on failure / first retry.

## Test design

- [ ] **Hard sleeps** (`Task.Delay` via `Helpers.Sleep`) everywhere → replace with **web-first
      assertions** (`await Expect(locator).ToBeVisibleAsync()`), which wait only as long as needed.
- [ ] **Duplicated fixture** — `SearchDuplicate02Tests` re-runs `Search01Tests` →
      **delete the duplication**, keep one parametrised version.
- [ ] **Pointless repetition** — `Nonsense03` ×10, `Details05` ×15, `BrowseSmoke04`/`Theme06` ×60
      → collapse to the coverage you actually need.
- [ ] **Over-broad assertions** — most tests only check `body` is visible → assert the **real
      outcome** (results match the query, empty-state shows, details render).
- [ ] **UI tests doing API work** — `Details05` searches through the UI to check a movie exists →
      move data checks to **fast API tests** (`APIRequestContext` / `Page.APIRequest`).
- [ ] **No reuse** — every test re-navigates from scratch (`OpenLandingPageSlowly`) → share
      context / storage state / `[OneTimeSetUp]` where sensible.

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
