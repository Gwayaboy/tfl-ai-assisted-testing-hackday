# Model answer / judging aid (facilitators)

**Not a script for teams.** A reference so judges can quickly recognise strong work. There's no
single right answer — reward **thinking**, not conformity to this.

## ⭐ Gold behaviours — the mark of a top team

Three standout moves separate a top team from a merely competent one. If you see these, **mark high
and call them out** at the readout:

1. **Drives the 24h‑vs‑48h promise to an honest decision.** Spots that the board's "within 24 hours"
   collides with Ops' real **48‑hour** batch — and instead of quietly building to 48 while advertising
   24, takes it **back to the PO for a ruling** and changes the *public promise* (or two‑speeds it:
   fast‑path small high‑confidence refunds, 48h for the rest). Leadership = surfacing the conflict and
   forcing the call, not hiding the gap.
2. **Under time pressure, cuts scope — not assurance.** When the demo is pulled forward, a top team
   **narrows breadth** (one overcharge category, a limited controlled pilot, small values) while
   **keeping every legitimacy/safety control** (feed‑quality gate, idempotency test, authN/authZ).
   They drop *features*, never the *tests*. A weak team cuts testing to save time.
3. **Makes an honest, phased "safe to ship?" call.** Not a binary yes/no: **"safe to *demo* as a
   controlled pilot; not safe for full live auto‑refund,"** with explicit green‑light conditions
   (feed validated · idempotency proven · pen‑test passed · >£25 review queue owned). Honest beats shiny.

## The contradictions a strong team surfaces

- [ ] **"Instant" vs overnight batch** → refund is next-day-ish; passenger copy must change to
      "refund on its way". Test the *actual* promise + the messaging.
- [ ] **"Auto-refund everything" vs cap + manual review** → recommends a threshold (e.g. £25)
      with manual review above it; understands false-positive & fraud cost.
- [ ] **Legacy spec is out of date** → notices the 2-year-old date; does NOT plan from it.
- [ ] **Query flow unowned** → flags that shipping an unsupported feature is a risk; either
      descope or resource it.
- [ ] **Accessibility & Security barely in tickets** → puts them on the map as first-class.

## A sensible top-3 risk pick

1. **Refunding money that shouldn't be refunded** (false positives, double-refunds from late
   data). *High impact (real money + trust), plausible likelihood.* → idempotency, data-quality,
   reversibility, cap+review.
2. **Batch performance / peak-day load** — refunds slip or the job fails when overcharges spike.
   → performance & resilience testing in the batch window; bad-day scenarios.
3. **Accessibility/authorisation of public money screens** — legal + IDOR risk. → a11y +
   authorisation checks.

(Reasonable teams may rank comms/"instant" or security first — fine if justified.)

## What a good test strategy covers

- **Functional:** detection accuracy (true/false positives), refund correctness (amount, right
  card, partial refunds), history screen accuracy, notification content.
- **Non-functional (the leadership gap!):**
  - **Performance:** batch completes in the 02:00–04:00 window at peak volumes.
  - **Resilience:** late/missing/duplicate outage feed → no double refunds (idempotency).
  - **Security:** authorisation (no IDOR), audit trail, reversibility, PII/PCI handling, fraud cap.
  - **Accessibility:** screen reader, keyboard, contrast, plain language, accessible notifications.
- **Data:** realistic test data incl. edge cases (incomplete journeys, Travelcard+PAYG overlap).
- **Environments & entry/exit criteria:** what "done/safe to ship" means; residual-risk statement.

## Handling curveballs well

- Re-prioritises calmly; states what's dropped and the residual risk.
- **Under a "less time" curveball, cuts scope — not assurance:** fewer features / a limited pilot,
  but keeps the safety tests (idempotency, feed‑quality, authZ). See ⭐ Gold behaviours.
- Connects the "misleading copy" curveball to the contradiction they (ideally) already spotted.
- Has an **assurance story** for the false-positive incident (what would have caught it).

## Red flags

- Planning straight from the legacy spec.
- "We'll test everything" (no prioritisation).
- No non-functional thinking (performance/resilience/security/accessibility).
- Never consulting Ops / Security / Accessibility / Finance personas.
- A beautiful plan that never changes when curveballs hit.

## Scoring

Use the [printable sheet](../../../docs/facilitator-guide.md#printable-scoring-sheet-per-team):
collaboration 30 · prioritisation 25 · curveballs 25 · communication 20.
