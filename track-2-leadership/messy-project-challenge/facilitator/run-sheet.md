# Facilitator run-sheet — Messy Project (Track 2)

A one-page, minute-by-minute of how the Messy Project activity runs on the day.
Pairs with [`curveballs.md`](./curveballs.md) (the timed injects) and
[`model-answer.md`](./model-answer.md) (judging aid). Participant brief:
[`../README.md`](../README.md).

> **Shape:** Session 2 runs **13:30–15:00**; readouts at **15:40**. It's **one activity** —
> every team runs the **same FareRight scenario in parallel** and competes. Teams do **not**
> depend on each other; the "other teams" they consult are the **facilitator-played personas**
> (the fictional project's silos: PO, Dev, Ops, Security, Accessibility, Finance).

## At a glance

| Time | Phase | Facilitators do | Teams do |
|------|-------|-----------------|----------|
| 13:30 | Framing (15 min) | Frame test leadership + risk-based thinking; open the persona stations | Assign the 5 lanes |
| 13:45 | Challenge starts — **timer T+0** | Hold persona roles; **one facilitator floats per cluster** of ~2–3 teams | Triage the 7 artifacts (with Copilot) |
| ~14:00 | **Curveball 1** (T+15) | Drop *"demo moved up — half the time"* | Cut to a minimum viable scope; state residual risk |
| ~14:15 | **Curveball 2** (T+30) | Drop *"legal: the 'refunded' copy is misleading"* | Connect comms → risk; re-prioritise |
| ~14:30 | **Curveball 3** (T+45) | Drop *"false-positive bomb: 8,000 wrong refunds"* | Assurance story; idempotency/data-quality thinking |
| ~14:40 | **Curveball 4** (T+55, opt) | Drop *"the 'raise a query' button nobody owns"* | Make + justify the scope call |
| ~14:50 | **Curveball 5** (T+65, opt) | Drop *"strike/peak day — 10× volume"* | Add performance/resilience testing |
| ~15:00 | Wrap | Note scores-in-progress | Finalise the 3 deliverables |
| 15:00 | Break | — | — |
| 15:40 | Readouts (3–4 min/team) | Judge with the scoring sheet | Present the assurance story |

## Step by step

1. **Framing (13:30).** Short intro: what test *leadership* is (strategy, risk, assurance,
   driving the non-functional picture). Set the scene: a project already in motion and in a mess.
2. **Assign the lanes.** Each team picks: **team lead** (time, decisions, readout) ·
   **requirements liaison** (works the stations) · **risk lead** (risk matrix) ·
   **strategy lead** (test strategy) · **curveball wrangler** (catches injects). 3 people → double up.
3. **Drop the brief (13:45 · T+0).** Hand out **FareRight** + the **7 scattered artifacts**.
   Start the cluster's curveball timer.
4. **Triage.** Teams skim the artifacts and use **Copilot** to summarise — and quickly find it
   doesn't add up (the mess is deliberate).
5. **Work the persona stations.** The **liaison** interviews the facilitators **in role**, asks
   sharp questions, and cross-checks the **contradictions** (e.g. "instant" vs overnight batch;
   "auto-refund everything" vs £25 cap + manual review). **Send one liaison — don't crowd the station.**
6. **Build in parallel.** While the liaison is out: risk lead drafts the matrix, strategy lead
   drafts the strategy (functional **and** non-functional), lead preps the readout, wrangler stays alert.
7. **Curveballs on the timer.** ~every 15 min the floating facilitator drops an inject. Teams
   **re-prioritise**; the lead states what's now dropped and the residual risk.
   **Reward adaptation, not a perfect untouched plan.**
8. **Converge on 3 deliverables (~15:00):** ① prioritised **risk matrix** ② **test strategy**
   (scope, functional + non-functional, data, entry/exit) ③ **one-slide stakeholder summary**
   (safe to ship? residual risk?).
9. **Readout (15:40 · 3–4 min):** top-3 risks · strategy in a nutshell · how curveballs were
   handled · the safe-to-ship assurance story.

## Persona stations — staffing

- **Station A** — Product Owner + Operations
- **Station B** — Security/Compliance + Accessibility
- The **legacy wiki spec is a stale trap** — seed it as a document, no station needed.
- **TfL coaches** are ideal on the stations (real context); **MS CSAs** float and nudge AI-as-copilot use.
- **One facilitator floats per cluster of ~2–3 teams**, runs the curveball timer, keeps energy up, unblocks.

## Judging (per team)

**Collaboration 30 · Prioritisation 25 · Curveballs 25 · Communication 20.** Use the
[printable scoring sheet](../../../docs/facilitator-guide.md#printable-scoring-sheet-per-team)
and the [model answer](./model-answer.md).

## Facilitator reminders

- **Send a liaison, don't crowd** — reward the sharpest questions.
- **Nudge quiet teams** toward the forgotten personas: **Ops, Security, Accessibility, Finance**.
- **Watch the traps:** planning from the legacy spec; believing "instant"; ignoring the £25 cap
  conflict; forgetting accessibility.
- **Reward adaptation** over a beautiful plan that never changes.
- **Ham up the personas** — the role-play is half the fun. 🎭
