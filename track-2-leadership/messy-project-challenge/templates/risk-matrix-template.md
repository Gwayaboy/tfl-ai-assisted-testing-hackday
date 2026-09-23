# Risk matrix — FareRight

*Fill this in as a team. Rank risks by **likelihood × impact**, then decide what to test first.*

## How to use

1. Brainstorm what could go wrong (functional **and** non-functional).
2. Score **Likelihood** and **Impact** (Low / Med / High).
3. Priority = the combination. High×High tests first.
4. For your top risks, note **how you'd test** it.

## Matrix

| # | Risk | Likelihood | Impact | Priority | How we'd test it | Owner |
|---|------|:----------:|:------:|:--------:|------------------|-------|
| 1 | *e.g. Refunding passengers who weren't overcharged (false positives / double-refund)* | High | High | 🔴 P1 | *idempotency + data-quality + reversibility tests; late/duplicate feed scenarios* | |
| 2 | | | | | | |
| 3 | | | | | | |
| 4 | | | | | | |
| 5 | | | | | | |

## Prompts to remember

- Did you cover **non-functional** risks (performance, resilience, security, accessibility)?
- Which risks come from the **contradictions** between stakeholders?
- What's your **residual risk** — what are you knowingly *not* testing, and why is that OK?
