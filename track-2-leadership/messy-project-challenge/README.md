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

## How the game runs — one simple loop

It's **one repeatable loop**, like a board game. Don't overthink it:

1. **Set up (~10 min).** Pick your lanes, skim the brief, and start your
   **[Leadership Board](./templates/leadership-board-template.md)** — one page, three columns:
   **Top Risks · Test Strategy · Open Questions**.
2. **Loop (repeat ~every 10 min):**
   - 🗣️ **INTERVIEW** — send your liaison to **one of three desks** (Product & Business ·
     Engineering & Ops · Risk & Compliance) to pull out what they know.
   - 📝 **UPDATE THE BOARD** — log risks, decisions, and any contradiction you spot.
   - 📣 **CURVEBALL** — the facilitators may throw in a change; **re-prioritise** and carry on.
3. **Readout (5–7 min).** Your board **is** your story: top risks, test strategy, how you handled
   the curveballs, and your "safe to ship?" call.

That's the whole game: **interview → update the board → adapt → present.** The richness is in the
people you talk to and the calls you make — not in complicated rules.

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

> 🗣️ **Talking to the right people:** the roles in [`personas.md`](./artifacts/personas.md) sit at
> **three interview desks** (Product & Business · Engineering & Ops · Risk & Compliance). Send your
> **liaison** to a desk to unlock the detail only those people know. Teams that seek out the right
> people — especially the easy-to-forget ones — score higher.

> 💻 **Also set up as a live Azure DevOps project (a facilitator demo).** The messy backlog (`04`)
> and the stale legacy spec (`07`) are mirrored in an **Azure DevOps project** your facilitators
> **show on screen** (and consult when you interview a persona) to make the mess feel real — with
> real work items and a real wiki you could triage with **GitHub Copilot + the Azure DevOps MCP**,
> à la [Anusha's agentic workflow](../../docs/bonus-agentic-workflow.md). **Your team's self-serve
> copy is the markdown [`artifacts/`](./artifacts)** — same content, nothing lost. The
> **persona-held detail is in neither** — you'll always have to talk to people to assemble the truth.

---

## Your mission (deliverables)

Capture everything on your **[Leadership Board](./templates/leadership-board-template.md)** (one
page) as you go — it rolls up the three things we're judging (deeper templates in
[`templates/`](./templates) if you want them):

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

Part-way through, the facilitators **throw in a change** — a shrinking deadline, a production
incident, a contradicting stakeholder. You don't get these up front; how you **adapt** is scored.
Expect **a couple** over the session (not a constant stream).

---

## How you're judged

[Full rubric](../../docs/scoring.md#-challenge-2--messy-project-in-track-2): collaboration
(0–30) · risk-based prioritisation (0–25) · handling curveballs (0–25) · communication (0–20) —
**scored out of 100**.

## Readout (16:00)

**5–7 min per team**: your **top 3 risks**, your **test strategy in a nutshell**, how you **handled the
curveballs**, and your **assurance story** — safe to ship or not, and why.

---

## 🤖 Bonus: go agentic

Feed the scattered artifacts to Copilot and have it **synthesise a coherent requirement set +
draft risk matrix**, then (if your team also did Track 1) **generate a thin slice of automated
tests for your #1 risk** — connecting a leadership decision to executable assurance, à la
[Anusha's workflow](../../docs/bonus-agentic-workflow.md).
