# 🤖 Bonus challenge — build an Agentic QA Workflow

> Every activity today has an **agentic bonus**. Once you've done the guided part, try to make
> the AI do *more of the loop itself* — planning, exploring, generating, healing, reporting,
> committing — with you supervising.

This is inspired by **Anusha Ammaluru's Agentic QA Workflow**
([`AgenticQAWorkflow-Playwright`](https://github.com/anu-01/AgenticQAWorkflow-Playwright),
shown in the 10:15 "How can we use AI to test end to end?" session). Instead of AI being *just* a
test-code autocomplete, **AI participates across the whole QA lifecycle**.

## The 7-stage loop

```
 User Story
     │  ① Read user story ............ [MCP / repo context]
     ▼
 Test Plan  ② AI Test Plan Agent ...... → specs/<feature>-spec.md
     │
     ▼
 Explore    ③ Exploratory testing ..... [Playwright Browser MCP] → screenshots + observations
     │
     ▼
 Generate   ④ AI Test Generation Agent  → tests/<feature>.spec.(js|ts|cs)
     │
     ▼
 Run + Heal ⑤ Execute & self-heal ..... run tests, detect failures, fix locators, re-run
     │
     ▼
 Report     ⑥ Generate test report ..... pass/fail + coverage + defects
     │
     ▼
 Commit     ⑦ Commit to Git ........... [GitHub MCP Agent] → user-stories/ specs/ tests/ reports/
```

| Stage | Agent / tool | Output |
|-------|--------------|--------|
| ① Read user story | MCP / repo context | understood requirement + acceptance criteria |
| ② Plan | AI Test Plan Agent | `specs/<feature>-spec.md` |
| ③ Explore | Playwright **Browser** MCP | screenshots, observations |
| ④ Generate | AI Test Generation Agent | runnable Playwright tests |
| ⑤ Execute & Heal | test runner + healing agent | green suite, self-repaired locators |
| ⑥ Report | reporting step | pass/fail, coverage, defects |
| ⑦ Commit | **GitHub** MCP Agent | assets committed to source control |

## How to attempt it today

You don't need all 7 stages to score the bonus — **each stage you make autonomous counts.**
Suggested progression:

1. **Spec-driven start (②).** Give Copilot a short user story and have it produce a
   `spec.md` test plan (scenarios + acceptance criteria) *before* any code.
   > *"Here's a user story for the movies app: 'As a signed-in user I can add a film to my
   > watchlist so I can find it later.' Produce a `watchlist-spec.md` with Gherkin scenarios
   > and acceptance criteria."*

2. **Explore then generate (③→④).** Have Copilot use the Playwright MCP server to explore the
   feature, capture what it sees, then generate the tests from the spec + observations.
   > *"Using the Playwright MCP server, explore the watchlist feature, note the real
   > roles/names and any edge cases, then generate `watchlist.spec.ts` from watchlist-spec.md."*

3. **Self-heal (⑤).** Deliberately break a locator (rename/change the UI expectation), run the
   suite, and ask Copilot to **diagnose and heal** it, then re-run until green.
   > *"This test now fails because a locator changed. Investigate with the MCP server, update
   > the locator to a resilient role/name one, and re-run until it passes."*

4. **Report (⑥).** Produce a short QA report: pass/fail, rough coverage, any defects/edge
   cases found. A Playwright HTML report + a short `REPORT.md` is perfect.

5. **Commit (⑦).** If you have the **GitHub MCP** server available, have the agent commit the
   generated `specs/`, `tests/` and `reports/` to a branch. (Or just commit manually and note
   where the MCP agent *would* fit.)

## What "good" looks like (for judging)

- The **spec came first** and drove the tests (spec-driven, not code-first).
- The agent **explored the real app** (MCP) rather than guessing selectors.
- At least one **self-heal** cycle demonstrated.
- A **report** artifact exists.
- You can **explain the orchestration** — which agent/tool did what, and where a human stayed
  in the loop.

> ⚠️ Keep a human in the loop. Agentic ≠ unsupervised. Review specs, tests and heals before
> trusting them — that judgement *is* the tester's job.

See the per-track bonus notes:
[Track 1](../track-1-functional/README.md#-bonus-go-agentic) ·
[Track 2](../track-2-leadership/README.md#-bonus-go-agentic) ·
[Track 3](../track-3-performance-optional/README.md#-bonus-go-agentic)
