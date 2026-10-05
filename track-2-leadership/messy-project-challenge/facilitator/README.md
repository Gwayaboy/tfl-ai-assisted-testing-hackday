# Facilitator pack — Messy Project (Track 2)

> 🔒 **Facilitators only — spoilers inside.** These files reveal the planted
> contradictions, the "noise" role and the judging answers. They live **only on the
> `facilitator` branch** and are deliberately absent from `main`, so participants
> browsing the repo don't see them. Don't merge this folder into `main`.

This is the start-here page for anyone running the **Messy Project** leadership
challenge. Read the four files below in order, then skim the participant materials so
you know exactly what each team has in front of them.

## Read in this order

| # | File | What it gives you |
|---|------|-------------------|
| 1️⃣ | [`../../../docs/facilitator-guide.md`](../../../docs/facilitator-guide.md) | **The whole day.** Roles, shape of the day, how *both* challenges run, the printable scoring sheet and the pre-day checklists. Read this first for the big picture. |
| 2️⃣ | [`run-sheet.md`](run-sheet.md) | **Minute-by-minute for the Messy Project.** The loop, the 3 interview desks, who sits where, timings and how to judge. Your on-the-day script. |
| 3️⃣ | [`curveballs.md`](curveballs.md) | **The injects to read aloud.** Five curveballs with timings — throw the **two tagged `DEFAULT`**, the rest only if a team is flying. |
| 4️⃣ | [`model-answer.md`](model-answer.md) | **Judging aid.** Gold behaviours, the contradictions a strong team surfaces, red flags and the scoring guide. Keep it next to you during readouts. |
|  | [`room-layout.svg`](room-layout.svg) | Desk/room diagram — print it or show it while setting up. |

## The challenge in 30 seconds

Teams lead testing on **FareRight**, a refunds project already in motion and in a mess.
The loop each team runs:

**interview 1 of 3 desks → update a one-page Leadership Board → adapt to a curveball → present.**

The scattered artifacts don't add up — that's the point. Teams discover the
contradictions by interviewing the desks (held **in character** by the coaches), rank
the risks, draft a functional **and** non-functional test strategy, and finish with a
**"safe to ship?"** call in the 16:00 readouts (5–7 min/team).

> 🙃 **The planted trap:** the exec sponsor (**Ryan Byrne**, Desk 1) is *noise* — he
> piles on non-MVP asks (social feed, 700M users, "manually test everything"). A strong
> lead pushes back and descopes. **Let teams discover this; don't announce it.** The
> participant `personas.md` deliberately hides the tell — only this branch spells it out.

## Desk line-up (your coaches)

| Desk | Stakeholders — Microsoft coaches | Holds… |
|------|----------------------------------|--------|
| **1 · Product & Business** | **Milo Farrell** (Product Owner) · **Ryan Byrne** (Exec Sponsor — *noise*) | vision & deadline, scope calls, + unreasonable non-MVP asks to say no to |
| **2 · Engineering & Ops** | **Leo Durrant** (Engineering) · **Franck Theolade** (Operations — also floats) | overnight batch vs "instant", false positives, idempotency, peak-day load |
| **3 · Risk & Compliance** | **Ajil Jins** (Security & Compliance) · **Najmah Mohamed** (Accessibility & Finance) | IDOR/audit/PII, a11y law, the £25 cap vs auto-refund conflict, false-positive cost |

TfL coaches pair in for real context; spare hands float and run the curveball dial.

## Timings on the day

`13:30` framing · `13:45` challenge starts (**T+0**) · `~14:05` Curveball 1 ·
`~14:30` Curveball 2 · `~15:15` wrap · `15:20` break · `15:30` LLM Testing Overview
(separate talk) · **`16:00–17:00` readouts (5–7 min/team).**

## Participant materials (for reference)

These sit on **both** branches — it's what the teams actually get:

- [`../README.md`](../README.md) — the challenge brief participants open first.
- [`../artifacts/`](../artifacts/) — the scattered, contradictory docs (PO brief, team
  chat, ops email, tickets, accessibility notes, security/compliance, the **stale
  legacy spec `07`** trap) plus [`personas.md`](../artifacts/personas.md) (desk who's-who
  — the softened, participant-safe version) and the room map.
- [`../templates/`](../templates/) — the blank Leadership Board, risk-matrix and
  test-strategy templates teams fill in.
