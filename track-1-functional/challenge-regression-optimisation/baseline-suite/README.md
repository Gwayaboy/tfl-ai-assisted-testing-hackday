# Baseline suite (optimise me!)

A **deliberately slow, bloated** Playwright regression suite (~300 tests) that runs against the
local Movies app. This is your starting point for the
[Regression Optimisation challenge](../README.md).

## Run it

```bash
npm install
npx playwright install chromium
# movies app must be running on http://localhost:3000
npm run test:baseline
npx playwright show-report   # view the HTML report -> record time + test count
```

> ⏳ **It's slow on purpose** — serial, single-worker, full of sleeps. That's the point. Grab
> your baseline time, then make it fast.

## What's here

```
baseline-suite/
├── playwright.config.ts   # deliberately bad config (serial, huge timeouts, trace on)
├── tests/
│   ├── fixtures.ts        # ~40 search terms -> lots of data-driven tests
│   ├── helpers.ts         # the slow helpers (hard sleeps, re-navigation)
│   ├── 01-search.spec.ts             # ~40 tests
│   ├── 02-search-duplicate.spec.ts   # ~40 tests (near-duplicate!)
│   ├── 03-nonsense.spec.ts           # ~40 tests (10x repetition)
│   ├── 04-browse-smoke.spec.ts       # ~60 tests (same smoke x60)
│   ├── 05-details.spec.ts            # ~60 tests (UI doing API's job, x15)
│   └── 06-theme.spec.ts              # ~60 tests (trivial toggle x60)
└── ANTIPATTERNS.md        # the full hit-list of what to fix
```

Start with [`ANTIPATTERNS.md`](./ANTIPATTERNS.md) — it's the checklist to beat.

> Tip: don't optimise in place blindly. Copy to an `optimised/` folder (or branch) so you can
> show a clean **before/after** at the readout.
