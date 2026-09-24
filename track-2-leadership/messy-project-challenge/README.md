# ⚔️ Challenge — The Messy Project

> The competitive challenge for **Track 2**: a **messy project, with curveballs, where you have
> to talk across teams to solve a problem** — made real. Less code, more **test leadership**.

You and your team have just been handed a project that's already **in motion and in a mess**.
The requirements are **scattered** across people and documents, some **contradict** each other,
a few are **out of date**, and things will **change under you** during the session.

Your job: bring order to the chaos and produce a **test strategy & assurance story** you could
confidently take to stakeholders.

---

## The scenario (fictional)

> ⚠️ **Fictional scenario for training.** Any resemblance to real systems is coincidental — do
> not use real operational data.

**"FareRight" — automatic refunds for overcharged contactless journeys.**

A transport operator lets passengers pay with contactless cards. Sometimes passengers are
**overcharged** (incomplete journeys, reader outages, capping errors). Today refunds are manual
and slow. The business wants **FareRight**: detect likely overcharges and **automatically
refund** them, with passengers able to see and query refunds in the app and on the website.

It's due to a **board demo in 3 weeks**. Development started before testing was involved
(sound familiar?). You are the **test leadership** brought in to get it under control.

---

## What's in the box

Everything you need is **scattered on purpose** across [`artifacts/`](./artifacts):

| File | Who it's from | Watch out… |
|------|---------------|-----------|
| [`01-product-owner-brief.md`](./artifacts/01-product-owner-brief.md) | Product Owner | ambitious & vague |
| [`02-team-chat-thread.md`](./artifacts/02-team-chat-thread.md) | Dev team chat | informal; contradicts the PO |
| [`03-ops-email.md`](./artifacts/03-ops-email.md) | Operations | hard non-functional constraints |
| [`04-tickets.md`](./artifacts/04-tickets.md) | Backlog | partial acceptance criteria; some stale |
| [`05-accessibility-notes.md`](./artifacts/05-accessibility-notes.md) | Accessibility lead | legal requirements |
| [`06-security-compliance.md`](./artifacts/06-security-compliance.md) | Security & compliance | money + PII = high stakes |
| [`07-legacy-spec.md`](./artifacts/07-legacy-spec.md) | An old wiki page | **out of date** — a trap |
| [`personas.md`](./artifacts/personas.md) | — | who "owns" what info |

You will **not** find one tidy spec. That's the point — a real lead has to **collaborate** to
assemble the truth and spot the contradictions.

> 🗣️ **Talking to the right people:** each persona in [`personas.md`](./artifacts/personas.md)
> holds part of the picture. Ask your facilitator to "role-play" a persona to unlock the detail
> only they know. Teams that seek out the right people score higher.

---

## Your mission (deliverables)

Work as a team to produce (templates in [`templates/`](./templates)):

1. **A prioritised risk matrix** — what could go wrong, likelihood × impact, what to test first.
   ([template](./templates/risk-matrix-template.md))
2. **A test strategy** — scope, approach, **functional AND non-functional** (performance,
   resilience, accessibility, security), environments, data, entry/exit criteria.
   ([template](./templates/test-strategy-template.md))
3. **A one-slide stakeholder summary** — the assurance story for the board: are we safe to ship?
   what's the residual risk?

You have limited time — **prioritise**. A focused strategy on the top risks beats a boil-the-ocean
plan.

---

## The rules

- **Collaborate across "teams".** Information is deliberately siloed. Go get it.
- **Expect curveballs.** The facilitators will inject changes mid-session (see below). Adapt.
- **Justify your calls.** *Why* is this the top risk? *Why* test this first?
- **Use AI as a co-pilot** — summarise, structure, challenge your thinking. See [`prompts/`](../prompts).

## Curveballs

Your facilitator releases **curveballs on a timer** — a scope change, a contradicting
stakeholder, a shrinking deadline. You don't get these up front; how you **adapt** is scored.
(Facilitators: [`facilitator/curveballs.md`](./facilitator/curveballs.md).)

---

## How you're judged

[Full rubric](../../docs/scoring.md#-challenge-2--messy-project-in-track-2): collaboration
(30%) · risk-based prioritisation (25%) · handling curveballs (25%) · communication (20%).

## Readout (15:40)

~3–4 min: your **top 3 risks**, your **test strategy in a nutshell**, how you **handled the
curveballs**, and your **assurance story** — safe to ship or not, and why.

---

## 🤖 Bonus: go agentic

Feed the scattered artifacts to Copilot and have it **synthesise a coherent requirement set +
draft risk matrix**, then (if your team also did Track 1) **generate a thin slice of automated
tests for your #1 risk** — connecting a leadership decision to executable assurance, à la
[Anusha's workflow](../../docs/bonus-agentic-workflow.md).
