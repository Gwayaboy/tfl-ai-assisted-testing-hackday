# Lab 00 — Warm-up: explore the app with Copilot + Playwright MCP

**Goal:** get comfortable letting **Copilot agent mode** drive a real browser through the
**Playwright MCP server**, so it can *see* the app and describe it accurately. No test code yet
— this is about building intuition for AI-assisted testing.

**Time:** ~15 minutes

---

## Prerequisites

- Movies app running at http://localhost:3000
- Copilot **Agent** mode selected in the Chat view
- Playwright **MCP server** allowed (you should see Playwright tools available to Copilot)

If any of these aren't ready, see [../../docs/setup.md](../../docs/setup.md).

---

## Step 1 — Let Copilot explore

In Copilot Chat (Agent mode), paste:

```
Navigate to http://localhost:3000/ and explore the main functionality of the site.
Take a snapshot of the page and describe what you see — the main navigation,
the key interactive elements (buttons, forms, links), and what each is for.
```

Watch it use the Playwright MCP tools to open the app and snapshot it. Read its description.

## Step 2 — Go deeper

```
What are the main navigation elements on this page, and what role/name does each have?
```

```
Identify the search feature. What is the accessible role and name of the search box?
Show me the locator you would use in Playwright to target it reliably.
```

> 💡 Notice it prefers **role/name** locators (`getByRole`, `getByLabel`) over brittle CSS.
> That's the resilient-locator habit we want.

## Step 3 — Discover the authenticated experience

```
Log in with the test user me@outlook.com / password 12345.
Then explore what new functionality becomes available after signing in,
and describe how the logged-in experience differs from anonymous.
```

You should discover the **"my lists"** feature (create / view lists) that only exists once
you're logged in. Keep this in mind — it's great material for scenarios in the next labs.

## Step 4 — Reflect

Ask Copilot:

```
Based on what you explored, what are the 5 most important user journeys we should
have automated tests for, and why? Order them by risk.
```

This "risk-first" thinking is exactly what you'll build on in Track 2 (leadership).

---

## ✅ Done when…

- Copilot has navigated and snapshotted the app for you
- You've seen it produce **role/name-based** locators
- You've discovered the **anonymous vs logged-in** difference (incl. "my lists")
- You have a short, risk-ordered list of journeys worth testing

Next: **[Lab 01 — Gherkin fundamentals →](../01-gherkin-scenarios)**
