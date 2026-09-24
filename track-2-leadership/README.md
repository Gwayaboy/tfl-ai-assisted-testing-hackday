# Track 2 — Test Leadership (afternoon · everyone)

**Goal:** step up from *doing* testing to *leading* it. Think strategy, risk, assurance, and
**collaboration across teams** — closing the gap where very few people see the bigger picture
beyond their own team, which is exactly what this kind of leadership role is there to fix.

This track is **less about code, more about thinking**. Everyone takes part.

---

## Why this track exists

Testing leadership is a growing need, and this track targets it head-on:

- Testers are increasingly growing into **leadership** roles that need people who see beyond
  their own team.
- A test lead needs to understand the **non-functional** picture (performance, resilience,
  accessibility, security) enough to **drive** it — even if they don't run every test.
- Real projects are **messy**: requirements are scattered, people are in different teams,
  priorities shift.

So the centrepiece is a deliberately **messy project** you'll navigate as a team.

---

## What you'll do

| Part | Activity | Time |
|------|----------|------|
| 1 | **Framing** — what test leadership means; risk-based thinking | 15 min |
| 2 | ⚔️ [**Messy Project challenge**](./messy-project-challenge) | most of the session |
| 3 | **Readout** — present your test strategy & assurance story | at 15:40 |

---

## The Messy Project challenge (in brief)

You're dropped into a realistic, **deliberately chaotic** project. The requirements are
**scattered** across people and documents, some **contradict** each other, and the facilitators
will throw **curveballs** during the session.

Your job as a team:

1. **Assemble the real picture** — collaborate to gather scattered requirements (you'll have to
   "talk to the right people").
2. **Prioritise by risk** — decide what to test first and justify it.
3. **Design a test strategy & assurance story** — functional *and* the non-functional angles a
   leader must drive.
4. **Adapt** when curveballs land.
5. **Communicate** it clearly — as if to stakeholders.

Full brief + materials: **[messy-project-challenge/](./messy-project-challenge)**

You compete on collaboration, prioritisation, handling curveballs, and communication —
[full rubric](../docs/scoring.md#-challenge-2--messy-project-in-track-2).

---

## Internal roles (assign at the start)

You'll move faster if each teammate **owns a lane** — it's not bureaucracy, it stops things
falling through the cracks, and it maps straight onto the
[scoring](../docs/scoring.md#-challenge-2--messy-project-in-track-2):

| Role | Owns | Scores into |
|------|------|-------------|
| **Team lead** | keeps time, drives decisions, owns the readout | Communication |
| **Requirements liaison** | works the persona stations, assembles the real picture, spots contradictions | Collaboration |
| **Risk lead** | the prioritised risk matrix — what to test first & *why* | Prioritisation |
| **Strategy lead** | the test strategy — functional **and** non-functional | (core deliverable) |
| **Curveball wrangler** | catches injected changes and re-prioritises when they land | Handling curveballs |

Only three of you? **Double up** — the point is that *someone* owns each lane. You still think
together; the roles just make sure nothing gets dropped.

---

## Persona stations — who holds the requirements

The scattered requirements live with **people, not documents**. Each persona in
[`personas.md`](./messy-project-challenge/artifacts/personas.md) is **staffed by a facilitator**
(a Microsoft CSA or TfL coach) running a **persona station**. To unlock what only that persona
knows, send your **liaison** to talk to them **in role** — ask sharp questions, then cross-check
what you hear (some of it contradicts, some is out of date). Teams that seek out the right people
score higher.

A facilitator also **floats for your cluster of teams**, dropping curveballs on a timer and
keeping you unblocked. Not sure who holds a piece of the picture? Ask them.

---

## Use AI as a thinking partner

This isn't a coding exercise, but Copilot is a great **leadership co-pilot**:

- Summarise scattered requirements into a coherent picture
- Draft a **risk matrix** / test strategy
- Generate a **RACI** or stakeholder map
- Turn your strategy into a crisp stakeholder summary

See [`prompts/`](./prompts) for starters.

---

## 🤖 Bonus: go agentic

Have an agent help you **synthesise the scattered inputs into a test plan**, then (if you did
Track 1) **generate a thin slice of automated coverage** for the highest-risk requirement —
connecting leadership decisions to executable tests, à la
[Anusha's workflow](../docs/bonus-agentic-workflow.md).

Start with the **[Messy Project challenge →](./messy-project-challenge)**
