# Starter Copilot prompts — Track 1 (Functional)

Copy-paste these into **Copilot Chat (Agent mode)** with the movies app running. They're
starting points — adapt them, and **always review what Copilot generates**.

> Golden rule: after Copilot writes a test, ask it *"why did you choose that locator/assertion?"*
> You're the tester; it's your assistant.

---

## Explore (Lab 00)

```
Navigate to http://localhost:3000/ and explore the main functionality. Take a snapshot
and describe the navigation and the key interactive elements and their purposes.
```

```
Log in with me@outlook.com / 12345 and describe what new features appear after signing in.
```

```
Based on your exploration, list the 5 highest-risk user journeys we should have automated,
ordered by risk, with a one-line justification each.
```

## Author Gherkin (Lab 01)

```
Write Cucumber (Gherkin) scenarios for the SEARCH journey of this movies app, focusing on
user intent rather than UI clicks. Cover: a movie that exists, one that doesn't, and an
empty query. Keep each scenario to a single behaviour.
```

```
Review these Gherkin scenarios for me. Are any steps leaking UI detail instead of describing
behaviour? Rewrite any that are too implementation-specific.
```

## Implement — Cucumber.js (Lab 02)

```
Using the Playwright MCP server, find reliable role/name locators for the search box, the
results list, and the no-results state on http://localhost:3000. Then implement the TODO step
definitions in features/steps/movie-search.steps.js so all scenarios pass. Prefer
getByRole/getByLabel and add meaningful assertions.
```

```
Refactor these step definitions to use a Page Object Model with a MoviesPage class that
encapsulates the locators. Keep the tests green.
```

## Implement — Reqnroll / C# (Lab 03)

```
Using the Playwright MCP server, find role/name locators for search on http://localhost:3000,
then implement the TODO steps in StepDefinitions/MovieSearchSteps.cs using GetByRole/GetByLabel
and NUnit assertions so the scenarios pass.
```

## API testing (Lab 04)

```
Watch the network while I search on http://localhost:3000. Identify the search API endpoint
(URL, method, response shape). Then write Playwright API tests that assert: results match the
query, a nonsense query returns an empty set, and the response has the expected JSON shape.
```

## Level-up

```
Add data-driven search tests using a Scenario Outline with Examples covering partial and
case-insensitive matches.
```

```
Suggest 8 edge cases for the search feature we haven't tested yet, and implement the two you
think are highest value.
```

```
Introduce a small, realistic bug in how search handles an empty query, then write a test that
would catch it. Explain the bug and the test.
```
