# Scoring & prizes

The day is **competitive and fun**. Teams present at the readout (16:00) and we award swag.
You don't have to "win" to get value — the goal is learning and sharing. But there's glory
(and swag) on offer. 🏆

## How teams are judged

We score on two competitive challenges plus an overall craft/sharing mark.

### ⚔️ Challenge 1 — Regression Optimisation (in Track 1)

You're given a deliberately **slow and bloated** regression suite. Optimise it with AI.

| Criterion | Weight | What "good" looks like |
|-----------|:------:|------------------------|
| **Coverage** | 40% | More meaningful behaviour covered — not just more asserts |
| **Execution time** | 30% | Faster suite: parallelism, dedup, removing waits, sharding |
| **Pass rate / reliability** | 20% | Green, stable, no flakiness |
| **How you used AI** | 10% | Smart prompting, MCP exploration, explainable choices |

Show us a **before/after**: baseline time & count vs your optimised run (a Playwright HTML
report is perfect).

> 🧮 **Objective scorer:** the challenge ships a
> [`score.mjs`](../track-1-functional/challenge-regression-optimisation/README.md#-objective-scoring-scoremjs)
> that reads the before/after reports — a Playwright JSON report (JS/TS) **or** a `.trx` (C#/.NET) —
> and computes the objective 90%
> (Coverage · Time · Reliability) reproducibly, with the AI-use 10% left as a judge's mark.
> Coverage is checked against a fixed list of required behaviours, so a team can't win on time
> by deleting tests.

> ☁️ **The optimised "after" run is executed on Microsoft Playwright Workspaces** (cloud browsers) —
> a required step, so every team's **Execution-time** score is measured on the same cloud
> infrastructure rather than on whoever brought the fastest laptop. See
> [MICROSOFT-PLAYWRIGHT-TESTING.md](../track-1-functional/challenge-regression-optimisation/MICROSOFT-PLAYWRIGHT-TESTING.md).

### ⚔️ Challenge 2 — Messy Project (in Track 2)

A realistic, deliberately messy testing scenario. This is **less about code, more about
thinking** like a test leader.

| Criterion | Points | What "good" looks like |
|-----------|:------:|------------------------|
| **Cross-team collaboration** | 0–30 | You found the right info by "talking to" the right people/personas |
| **Risk-based prioritisation** | 0–25 | You tested what matters most first, and can justify it |
| **Handling curveballs** | 0–25 | You adapted when requirements changed or were scattered |
| **Communication** | 0–20 | Clear test strategy / assurance story you could take to stakeholders |
| **Total** | **/100** | Sum of the four scores above |

### 🎨 Overall craft & sharing (all day)

| Criterion | What we look for |
|-----------|------------------|
| **Good testing practice** | Behaviour-focused scenarios, resilient locators, real assertions |
| **Learning shared** | A clear readout: what you tried, what worked, what surprised you |
| **Creativity** | Bringing your own use case, novel prompts, edge cases |

## Readout format (16:00)

Each team gets **5–7 minutes**:

1. **Team name** + who you are
2. What you **built / optimised / decided**
3. **One thing that surprised you** or that you'll take back to your team
4. (If competing) your **before/after** numbers or your messy-project approach

## Judging

Kept deliberately light — scored by Franck (Microsoft), Sreelekha & Treasa (TfL). We may
score formally on the two challenges and judge the rest subjectively on creativity and
sharing. **Prizes: swag for the winning team + spot prizes.**

> Team leads/coaches: see the [facilitator guide](https://github.com/Gwayaboy/tfl-ai-assisted-testing-hackday/blob/facilitator/docs/facilitator-guide.md) (on the `facilitator` branch) for a printable
> scoring sheet.
