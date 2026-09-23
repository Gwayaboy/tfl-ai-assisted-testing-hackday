# Lab 03 — BDD with Reqnroll + Playwright (C# / .NET)

**Goal:** the same BDD approach as Lab 02, but in **C#** using
[Reqnroll](https://docs.reqnroll.net/) (the maintained successor to SpecFlow) + Playwright.

**Time:** ~30 minutes · **Pick this _or_ [Lab 02 (JS/TS)](../02-bdd-cucumber-js).**

Choose this path if your team lives in .NET.

---

## What's in here

```
03-bdd-reqnroll-dotnet/
├── HackDay.MovieTests.csproj     # NUnit + Reqnroll + Playwright
├── reqnroll.json                 # Reqnroll config
├── Features/
│   └── MovieSearch.feature       # scenarios (search)
├── StepDefinitions/
│   └── MovieSearchSteps.cs        # steps (1 done, rest TODO)
└── Support/
    └── Hooks.cs                   # browser lifecycle
```

## 1. Restore & install browsers

```bash
cd track-1-functional/03-bdd-reqnroll-dotnet
dotnet restore
dotnet build
# install the Playwright browsers (one-time)
pwsh bin/Debug/net8.0/playwright.ps1 install chromium
# (if you don't have pwsh: dotnet tool install --global Microsoft.Playwright.CLI
#  then: playwright install chromium)
```

## 2. Run

With the **movies app running** on http://localhost:3000:

```bash
dotnet test
```

The first scenario ("searching for a movie that exists") should pass.

## 3. Implement the rest with Copilot

Open `StepDefinitions/MovieSearchSteps.cs` — one step is implemented, the others are `TODO`.

Prompt (Agent mode, app running):

```
Using the Playwright MCP server, explore http://localhost:3000 and find reliable
role/name locators for the search control, the results list, and the no-results state.
Then implement the TODO steps in StepDefinitions/MovieSearchSteps.cs so the scenarios in
Features/MovieSearch.feature pass. Use Playwright's GetByRole/GetByLabel and meaningful
NUnit assertions.
```

Review before accepting — resilient locators, real assertions, `dotnet test` green.

## 4. Extend

- Add **login** + **create a list** scenarios (logged-in only).
- Refactor to a **Page Object** (`MoviesPage`).
- Parameterise search with `Scenario Outline` + `Examples`.

## ✅ Done when…

- `dotnet test` passes with all three search scenarios
- One extra journey added
- Locators resilient, assertions meaningful

Next: **[Lab 04 — API testing →](../04-api-testing)** or the
**[⚔️ Regression Optimisation challenge →](../challenge-regression-optimisation)**
