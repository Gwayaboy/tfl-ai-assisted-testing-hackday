# Facilitator guide (Microsoft CSAs + TfL track coaches)

Internal-facing notes for the people **running the floor**. Participants don't need to read this.

## Roles on the day

- **Franck (Microsoft)** — overall host, logistics, deck, judging, floats across tracks.
- **Microsoft CSA floor coaches** — 2–3 colleagues helping unblock technical issues.
- **TfL track coaches** (Sreelekha, Treasa + nominees) — lead in-house use cases and walk
  teams through TfL-context testing; co-judge.

## Shape of the day (consecutive, everyone together)

| Time | Facilitation notes |
|------|--------------------|
| 10:00 | Welcome. Get teams formed **fast** — 3–5 people, pick a name, write it on the board. Set expectations: guided labs *and* challenges; readout at the end. Cover fire exits. |
| 10:15 | **"How can we use AI to test end to end?"** — Uros/Amaury/Anusha. Keep it practical, tie to what they'll do next. |
| 11:15 | **Session 1 — Functional.** Everyone starts in `00-warmup-guided`. Coaches roam. Push fast movers into the **Regression Optimisation challenge**. Do a quick **check-in before lunch**. |
| 13:30 | **Session 2 — Leadership + Messy Project.** Hand out the messy brief. Release **curveballs on a timer** (see below). Less code, more thinking. |
| 15:00 | Break. |
| 15:10 | **LLM Testing Overview** — short talk on testing AI/LLM systems (separate topic; Jide's ask). |
| 15:40 | **Readouts.** ~3–4 min/team. Then prizes. |
| 16:30 | Close. |

## Balancing skill levels (Sri's key ask)

The room spans manual testers → seasoned SDETs. Keep it from being boring **or** overwhelming:

- **Newer testers →** guided, numbered labs (`00-`, `01-`, `02-`). Pair them up. It's fine if
  a team only completes the guided path.
- **Advanced testers →** send them straight to the challenges, or invite their **own use case**.
- Coaches: circulate and *level-set per team*, don't broadcast one pace to the room.

## Regression Optimisation challenge — running it

- Baseline suite lives in
  [`track-1-functional/challenge-regression-optimisation`](../track-1-functional/challenge-regression-optimisation).
  It is **intentionally** slow/redundant (hard waits, duplication, over-broad tests).
- Teams optimise with Copilot. Scoring in [scoring.md](./scoring.md): coverage · time · pass-rate · AI use.
- Ask for a **before/after** Playwright HTML report. Screenshot both.

## Messy Project challenge — running it

- Brief + artifacts in
  [`track-2-leadership/messy-project-challenge`](../track-2-leadership/messy-project-challenge).
- Requirements are **deliberately scattered** across personas/documents. Teams must
  collaborate across "roles" to assemble the real picture.
- **Curveball script** (release on a timer to keep energy up) is in
  [`messy-project-challenge/facilitator/curveballs.md`](../track-2-leadership/messy-project-challenge/facilitator/curveballs.md).
- Reward teams who **talk to the right people** and re-prioritise — not just the fastest coders.

## Printable scoring sheet (per team)

```
Team name: ____________________   Judges: ______________________

CHALLENGE 1 — Regression Optimisation
  Coverage (0-40)        ____
  Execution time (0-30)  ____
  Pass rate (0-20)       ____
  AI use (0-10)          ____                      Subtotal ____ /100

CHALLENGE 2 — Messy Project
  Collaboration (0-30)   ____
  Prioritisation (0-25)  ____
  Curveballs (0-25)      ____
  Communication (0-20)   ____                      Subtotal ____ /100

OVERALL craft & sharing (subjective)
  Notes: ______________________________________________________
                                                    Bonus  ____

                                            TEAM TOTAL ____
```

## Pre-day checklist (Microsoft)

- [ ] Repo public & clone tested from a clean machine
- [ ] Movies app runs locally end-to-end (guided labs pass)
- [ ] Sample Cucumber.js + Reqnroll tests go green
- [ ] Regression baseline suite runs (and is genuinely slow 🙂)
- [ ] Messy-project artifacts + curveball timers ready
- [ ] (Optional) Track 3 infra decision made — MS sandbox vs skip
- [ ] Swag on site; scoring sheets printed
- [ ] Pre-reqs sent to TfL (Node, Git, VS Code, **Copilot licence**, clone the repo)

## Pre-day checklist (TfL)

- [ ] Attendees have laptops + **GitHub Copilot licences** enabled
- [ ] Attendees can install/run Node + clone a public GitHub repo (or use Codespaces)
- [ ] Track coaches nominated
- [ ] Real use-case ideas gathered (optional but great)
