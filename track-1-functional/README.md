# Track 1 — Functional Testing (morning · everyone)

**Goal:** get hands-on using **GitHub Copilot + Playwright** to explore the app, describe
behaviour in **Gherkin**, and automate it with **BDD** — in JavaScript/TypeScript *or* C#.

Everything here runs **locally** against the Movies app on `http://localhost:3000`.
No cloud. No Azure.

> New to automation? Do the labs in order (`00` → `03bis`).
> Comfortable already? Bring your own scenario and/or skim to the [Regression Optimisation challenge](./challenge-regression-optimisation) 

---

## Before you start

- SUT running at http://localhost:3000 — see **[Setup](../README.md#setup)** (Codespaces or local)
- Copilot **agent mode** on + **Playwright MCP** server allowed
- Login for authenticated flows: `me@outlook.com` / `12345`

---

## The labs

| # | Lab | You'll learn | Time |
|---|-----|--------------|------|
| [00](./00-warmup-guided) | **Warm-up — explore with Copilot + MCP** | Let Copilot drive the app, snapshot it, describe what it sees | 15 min |
| [01](./01-gherkin-scenarios) | **Gherkin fundamentals** | Write behaviour-focused Given/When/Then scenarios | 20 min |
| [02](./02-bdd-cucumber-js) | **BDD with Cucumber.js** | Turn scenarios into runnable Playwright tests (JS/TS) | 30 min |
| [02bis](./02bis-bdd-reqnroll-dotnet) | **BDD with Reqnroll (C#)** | Same as 02, in .NET — pick this *or* lab 02 | 30 min |
| [03](./03-api-testing) | **API testing (JS/TS)** | Test the movie API directly with Playwright | 20 min |
| [03bis](./03bis-api-testing-dotnet) | **API testing (C#)** | Same as 03, in .NET — pick this *or* lab 03 | 20 min |
| ⚔️ | [**Regression Optimisation challenge**](./challenge-regression-optimisation) | Make a bloated suite faster & better with AI | rest of session |

You do **not** have to finish everything.  path 00 to 03bis are optional.
Pick the path that fits you, and leave time to do the [**Regression Optimisation challenge**](./challenge-regression-optimisation) 

---

## The AI angle (what makes this different)

Old way: you hand-write every selector and every step.
Today: **Copilot explores the running app via the Playwright MCP server**, reads the real
element roles/names, and drafts accurate tests — you review, refine, and learn.

Try prompts from [`prompts/`](./prompts). Golden rule: **review what Copilot generates** and
ask it *why* it chose a locator or assertion. You're the tester; it's your assistant.

---

## The SUT — what you can test

The Movies app supports:

- Browse a list of movies
- **Search** for a movie by title
- **View details** of a movie
- Switch **dark / light** theme
- **Log in / log out** (`me@outlook.com` / `12345`)
- Authenticated-only: **create & view "my lists"**

Two paths worth covering: **anonymous** vs **logged-in**.

> There are no known bugs — but you're welcome to introduce one and write a test that catches
> it, or hunt for edge cases.

---

## 🤖 Bonus: go agentic

Done the labs? Push into **agentic** territory — make the AI drive more of the loop itself
(plan → explore → generate → **self-heal** → report → commit), inspired by
[Anusha's Agentic QA Workflow](../docs/bonus-agentic-workflow.md). Each activity in this track
has a bonus callout; the challenge has one too. Extra credit at the readout for a demonstrable
**self-heal** on a broken locator.

Start with **[Lab 00 →](./00-warmup-guided)**
