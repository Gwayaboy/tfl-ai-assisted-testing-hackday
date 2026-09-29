#!/usr/bin/env node
// ============================================================================
//  Regression Optimisation — objective scorer
//  Reads two Playwright JSON reports (baseline "before" + optimised "after")
//  and produces a reproducible scorecard against the rubric:
//     Coverage 40% · Execution time 30% · Pass-rate/reliability 20% · AI use 10%
//
//  Usage:
//    node score.mjs --baseline baseline-results.json --optimised optimised-results.json [--ai 8] [--json]
//
//  Produce the JSON reports with Playwright's json reporter, e.g.:
//    npx playwright test --reporter=json  > results.json     (stdout), or
//    PLAYWRIGHT_JSON_OUTPUT_NAME=results.json npx playwright test --reporter=json
//  (both baseline and optimised configs in this challenge also emit results.json).
//
//  Coverage is measured against a fixed list of REQUIRED behaviours (below), so a
//  team can't win on time by simply deleting tests — dropping a behaviour costs
//  coverage points. Matching prefers explicit tags (e.g. @covers:search-exists)
//  and falls back to test-title keywords.
// ============================================================================

import fs from "node:fs";

// ---- rubric weights -------------------------------------------------------
const WEIGHTS = { coverage: 40, time: 30, reliability: 20, ai: 10 };

// For full time marks we ask for a ~90% wall-clock reduction (~10x) vs baseline
// — reasonable given the baseline is deliberately serial + sleep-ridden.
const TARGET_TIME_REDUCTION = 0.9;

// ---- required behaviours (the "meaningful coverage" everyone must keep) ----
// id, human label, and matchers. A behaviour counts as covered when at least one
// PASSING test matches (by tag `@covers:<id>` or by title keyword regex).
const REQUIRED_BEHAVIOURS = [
  { id: "search-exists",   label: "Search returns matching results",     re: /search|find/i,               and: /exist|result|match|found|sonic|batman|moana|wicked/i, not: /no |empty|nonsense|not.?found|does ?n[o']?t|zzz|blank/i },
  { id: "search-none",     label: "Search with no matches shows empty",  re: /search|find|nonsense/i,      and: /no |empty|nonsense|not.?found|does ?n[o']?t|zzz|no result|no match/i },
  { id: "search-empty",    label: "Empty query keeps browsable list",    re: /empty query|empty search|blank|no query|empty string/i },
  { id: "browse",          label: "Browse / landing renders movies",     re: /browse|landing|home|popular|list of movies|renders|discover/i },
  { id: "details",         label: "Movie details render",                re: /detail|synopsis|rating|movie page|open .*movie|overview/i },
  { id: "theme",           label: "Dark / light theme toggles",          re: /theme|dark mode|light mode|dark\/light|toggle.*mode/i },
];

// ---- args -----------------------------------------------------------------
function parseArgs(argv) {
  const a = { ai: null, json: false };
  for (let i = 2; i < argv.length; i++) {
    const k = argv[i];
    if (k === "--baseline") a.baseline = argv[++i];
    else if (k === "--optimised" || k === "--optimized") a.optimised = argv[++i];
    else if (k === "--ai") a.ai = Number(argv[++i]);
    else if (k === "--json") a.json = true;
    else if (k === "--help" || k === "-h") a.help = true;
  }
  return a;
}

function loadReport(path, label) {
  if (!path) { console.error(`ERROR: missing --${label} <path-to-playwright-json>`); process.exit(2); }
  if (!fs.existsSync(path)) { console.error(`ERROR: ${label} report not found: ${path}`); process.exit(2); }
  let raw;
  try { raw = JSON.parse(fs.readFileSync(path, "utf8")); }
  catch (e) { console.error(`ERROR: ${label} report is not valid JSON (${path}): ${e.message}`); process.exit(2); }
  if (!raw || !raw.stats || !Array.isArray(raw.suites)) {
    console.error(`ERROR: ${label} report doesn't look like a Playwright JSON report (${path}). Run with --reporter=json.`);
    process.exit(2);
  }
  return raw;
}

// flatten all specs across nested suites
function collectSpecs(report) {
  const out = [];
  const walk = (suites) => {
    for (const s of suites || []) {
      for (const spec of s.specs || []) out.push(spec);
      if (s.suites) walk(s.suites);
    }
  };
  walk(report.suites);
  return out;
}

function specPassed(spec) {
  // a spec is "passing" when its final result across its tests is ok
  if (typeof spec.ok === "boolean") return spec.ok;
  return (spec.tests || []).every(t => t.status === "expected");
}

function summarise(report) {
  const st = report.stats || {};
  const passed = st.expected ?? 0;
  const failed = st.unexpected ?? 0;
  const flaky = st.flaky ?? 0;
  const skipped = st.skipped ?? 0;
  const total = passed + failed + flaky; // exclude skipped from the denominator
  const durationMs = st.duration ?? 0;   // wall-clock of the run
  return { passed, failed, flaky, skipped, total, durationMs };
}

function coverage(report) {
  const specs = collectSpecs(report);
  const covered = new Map(); // id -> boolean (by a passing test)
  for (const b of REQUIRED_BEHAVIOURS) covered.set(b.id, false);
  for (const spec of specs) {
    if (!specPassed(spec)) continue;
    const title = spec.title || "";
    const tags = (spec.tags || []).join(" ") + " " + title; // tags + title text
    for (const b of REQUIRED_BEHAVIOURS) {
      if (covered.get(b.id)) continue;
      const tagHit = new RegExp(`@covers:${b.id}\\b`, "i").test(tags);
      let titleHit = b.re.test(title);
      if (titleHit && b.and) titleHit = b.and.test(title);
      if (titleHit && b.not) titleHit = !b.not.test(title);
      if (tagHit || titleHit) covered.set(b.id, true);
    }
  }
  const matched = [...covered.values()].filter(Boolean).length;
  return { covered, matched, requiredCount: REQUIRED_BEHAVIOURS.length };
}

function clamp(n, lo, hi) { return Math.max(lo, Math.min(hi, n)); }
function round1(n) { return Math.round(n * 10) / 10; }

function score(baseline, optimised, aiManual) {
  const b = summarise(baseline);
  const o = summarise(optimised);
  const cov = coverage(optimised);

  // Coverage (40%): fraction of required behaviours still covered by a passing test.
  const coverageScore = WEIGHTS.coverage * (cov.matched / cov.requiredCount);

  // Time (30%): wall-clock reduction vs baseline; full marks at TARGET_TIME_REDUCTION.
  const reduction = b.durationMs > 0 ? clamp(1 - o.durationMs / b.durationMs, 0, 1) : 0;
  const speedup = o.durationMs > 0 ? b.durationMs / o.durationMs : 0;
  const timeScore = WEIGHTS.time * clamp(reduction / TARGET_TIME_REDUCTION, 0, 1);

  // Reliability (20%): pass-rate, penalised for flakiness.
  const passRate = o.total > 0 ? o.passed / o.total : 0;
  const flakyPenalty = o.total > 0 ? clamp(o.flaky / o.total, 0, 0.5) : 0;
  const reliabilityScore = WEIGHTS.reliability * passRate * (1 - flakyPenalty);

  // AI use (10%): manual judgement (0-10). Left blank if not supplied.
  const aiScore = (aiManual == null || Number.isNaN(aiManual)) ? null : WEIGHTS.ai * clamp(aiManual / 10, 0, 1);

  const objectiveTotal = coverageScore + timeScore + reliabilityScore;
  const total = objectiveTotal + (aiScore ?? 0);

  return { b, o, cov, reduction, speedup, passRate,
    coverageScore, timeScore, reliabilityScore, aiScore,
    objectiveTotal, total, aiSupplied: aiScore != null };
}

function fmtMs(ms) {
  if (ms >= 60000) return `${(ms / 60000).toFixed(1)} min`;
  if (ms >= 1000) return `${(ms / 1000).toFixed(1)} s`;
  return `${ms} ms`;
}

function report(r, aiManual) {
  const bar = "─".repeat(64);
  console.log(bar);
  console.log("  REGRESSION OPTIMISATION — SCORECARD");
  console.log(bar);
  console.log("  Metric            Baseline (before)     Optimised (after)");
  console.log(`  Tests (pass/tot)  ${String(r.b.passed + "/" + r.b.total).padEnd(20)} ${r.o.passed}/${r.o.total}${r.o.flaky ? `  (flaky ${r.o.flaky})` : ""}`);
  console.log(`  Wall-clock        ${fmtMs(r.b.durationMs).padEnd(20)} ${fmtMs(r.o.durationMs)}`);
  console.log(`  Speed-up          ${"—".padEnd(20)} ${r.speedup ? r.speedup.toFixed(1) + "×  (" + Math.round(r.reduction * 100) + "% faster)" : "n/a"}`);
  console.log(bar);
  console.log("  Coverage of required behaviours (passing tests):");
  for (const b of REQUIRED_BEHAVIOURS) {
    console.log(`    [${r.cov.covered.get(b.id) ? "x" : " "}] ${b.label}`);
  }
  console.log(`    → ${r.cov.matched}/${r.cov.requiredCount} behaviours covered`);
  console.log(bar);
  console.log("  Weighted score");
  console.log(`    Coverage    (40)  ${round1(r.coverageScore).toString().padStart(5)}`);
  console.log(`    Time        (30)  ${round1(r.timeScore).toString().padStart(5)}`);
  console.log(`    Reliability (20)  ${round1(r.reliabilityScore).toString().padStart(5)}   (pass-rate ${Math.round(r.passRate * 100)}%)`);
  if (r.aiSupplied) console.log(`    AI use      (10)  ${round1(r.aiScore).toString().padStart(5)}   (manual ${aiManual}/10)`);
  else               console.log(`    AI use      (10)      —   (manual — pass --ai <0-10>)`);
  console.log(bar);
  const shown = r.aiSupplied ? r.total : r.objectiveTotal;
  const denom = r.aiSupplied ? 100 : 90;
  console.log(`  TOTAL             ${round1(shown)} / ${denom}${r.aiSupplied ? "" : "   (objective only; add --ai for /100)"}`);
  console.log(bar);
}

// ---- main -----------------------------------------------------------------
const args = parseArgs(process.argv);
if (args.help) {
  console.log("Usage: node score.mjs --baseline <before.json> --optimised <after.json> [--ai 0-10] [--json]");
  process.exit(0);
}
const baseline = loadReport(args.baseline, "baseline");
const optimised = loadReport(args.optimised, "optimised");
const r = score(baseline, optimised, args.ai);

if (args.json) {
  console.log(JSON.stringify({
    baseline: r.b, optimised: r.o,
    speedup: round1(r.speedup), reductionPct: Math.round(r.reduction * 100),
    coverage: { matched: r.cov.matched, required: r.cov.requiredCount,
      behaviours: Object.fromEntries([...r.cov.covered.entries()]) },
    scores: {
      coverage: round1(r.coverageScore), time: round1(r.timeScore),
      reliability: round1(r.reliabilityScore),
      ai: r.aiSupplied ? round1(r.aiScore) : null,
      objectiveTotal: round1(r.objectiveTotal), total: round1(r.total),
    },
  }, null, 2));
} else {
  report(r, args.ai);
}
