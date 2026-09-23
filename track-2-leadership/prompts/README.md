# Starter Copilot prompts — Track 2 (Leadership / Messy Project)

Copilot is a strong **thinking partner** for leadership work — summarising, structuring and
challenging your reasoning. Paste the scattered artifacts in and go. **Always review its
output** — the judgement is yours.

---

## Make sense of the chaos

```
Here are several scattered documents about a project called FareRight (a product owner brief,
a dev chat, an ops email, backlog tickets, accessibility notes, a security checklist, and an
old legacy spec). Summarise the ACTUAL current requirements, and list every contradiction or
gap between the sources. Flag anything that looks out of date.
```

```
Based on these documents, who are the stakeholders I need to talk to, and what unique
information does each one hold? Note anyone easy to forget.
```

## Build the risk matrix

```
From these requirements and constraints, produce a prioritised risk matrix (likelihood x
impact) for testing FareRight. Include functional AND non-functional risks (performance,
resilience, security, accessibility). For the top 3, suggest how you'd test each.
```

## Draft the strategy

```
Draft a one-page test strategy for FareRight covering scope, top risks, functional and
non-functional approach, data and environment needs, and entry/exit criteria. Keep it concise
and stakeholder-friendly.
```

## Handle a curveball (live)

```
New constraint: the demo moved up and we have half the time. Given our risk matrix, what is the
minimum viable test scope to give the board confidence, and what are we explicitly NOT covering,
with the residual risk stated?
```

```
Incident: detection refunded 8,000 passengers who weren't overcharged because late data caused
double-counting. What testing would have caught this before go-live, and what's our assurance
story so it can't recur?
```

## Communicate up

```
Turn this test strategy into a single stakeholder slide for a board: are we safe to ship, what
did we test, what are the top residual risks, and a clear recommendation.
```

## 🤖 Bonus — connect to execution

```
Take our #1 risk and write a thin slice of automated Playwright tests (or Gherkin scenarios)
that would give us early assurance on it - so a leadership decision maps to executable coverage.
```
