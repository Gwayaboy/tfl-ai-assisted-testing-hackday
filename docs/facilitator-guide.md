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

- **Minute-by-minute run-sheet:**
  [`messy-project-challenge/facilitator/run-sheet.md`](../track-2-leadership/messy-project-challenge/facilitator/run-sheet.md)
  — the step-by-step for the day (framing → stations → curveballs → readout).
- Brief + artifacts in
  [`track-2-leadership/messy-project-challenge`](../track-2-leadership/messy-project-challenge).
- Requirements are **deliberately scattered** across personas/documents. Teams must
  collaborate across "roles" to assemble the real picture.
- **Curveball script** (release on a timer to keep energy up) is in
  [`messy-project-challenge/facilitator/curveballs.md`](../track-2-leadership/messy-project-challenge/facilitator/curveballs.md).
- Reward teams who **talk to the right people** and re-prioritise — not just the fastest coders.

### Persona stations & facilitator-per-cluster model

The messy project only works if requirements come from **people, not a handout**. Run it like this:

- **Staff the personas as "stations."** Give each facilitator one or two personas from
  [`personas.md`](../track-2-leadership/messy-project-challenge/artifacts/personas.md) and have
  them **hold that role all session**. A workable split for a small crew:
  - **Station A** — Product Owner + Operations
  - **Station B** — Security / Compliance + Accessibility lead
  - The old wiki spec is a **stale trap** — seed it as a document, no station needed.
  TfL coaches are ideal on the stations (real context); MS CSAs float and nudge AI-as-copilot use.
- **One facilitator floats per cluster of ~2–3 teams.** They run the **curveball timer** for the
  cluster ([`curveballs.md`](../track-2-leadership/messy-project-challenge/facilitator/curveballs.md)),
  keep energy up, and unblock. Keep clusters small so curveballs land at the right moment.
- **Make teams send a liaison** to the stations rather than crowding them — reward the teams that
  ask the sharpest questions and surface the contradictions.
- **Nudge internal team roles** (see the
  [Track 2 README](../track-2-leadership/README.md#internal-roles-assign-at-the-start)): team lead,
  requirements liaison, risk lead, strategy lead, curveball wrangler. If a team is flailing, it's
  usually because nobody owns the **liaison** or **curveball** lane — assign them.

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
