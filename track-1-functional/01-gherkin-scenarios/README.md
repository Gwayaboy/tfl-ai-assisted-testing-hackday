# Lab 01 — Gherkin fundamentals & a realistic regression pack

**Goal:** describe the Movies app's behaviour in **Gherkin**, focused on *what the user wants
to achieve* — and build up something that feels like a **real regression pack**, not three toy
search cases.

**Time:** ~20 minutes (core) · more if you tackle the full pack

---

## Why this shape

In the real world, the hard part isn't writing three search tests — it's living with a **large
regression suite**: hundreds of tests of mixed value that take an age to run. That's the problem
actually worth practising on. So instead of toy examples, you'll build up a **realistic pack** of
user journeys — the kind you'd genuinely maintain for a content- or booking-style app (think your
public website, a travel app like TfL Go, or ticketing). The Movies app is just a convenient
stand-in that runs locally.

> **Bring your own:** if your team maintains a real regression suite, use *these patterns* on a
> journey from your own app instead. Tell us how it went in the readout.

A Gherkin scenario is a shared language between testers, developers and the business:

```gherkin
# BAD - too UI-focused / brittle              # GOOD - behaviour-focused / durable
When the user clicks the search icon          When the user searches for "Sonic the Hedgehog 3"
And types "Sonic" into #search-input          Then they should see results related to "Sonic..."
And presses Enter
```

**Rules:** `Given` context -> `When` action -> `Then` outcome · high-level, not clicks · one
behaviour per scenario · readable by non-technical people.

---

## The regression pack

We've stubbed a realistic set of feature files covering the app's real journeys. Each has one
or two worked scenarios plus **TODOs** for you to complete — individually or with Copilot.

| Feature file | Journey | Why it's in a regression pack |
|--------------|---------|-------------------------------|
| [`movie-search.feature`](./movie-search.feature) | Search | Core discovery path; high traffic |
| [`browse-and-discovery.feature`](./browse-and-discovery.feature) | Browse, categories, pagination | Most users land & browse before searching |
| [`movie-details.feature`](./movie-details.feature) | View details, back navigation | Deep-link & content-integrity risk |
| [`authentication.feature`](./authentication.feature) | Log in / out, protected content | Security & session risk |
| [`watchlist.feature`](./watchlist.feature) | Create/view personal lists (signed-in) | Stateful, data-persistence risk |
| [`experience.feature`](./experience.feature) | Dark/light theme, responsive, a11y | Cross-cutting UX & accessibility |

> Realistic doesn't mean exhaustive. In a real pack you'd **prioritise by risk** — a skill
> you'll use directly in Track 2 (leadership).

---

## Your task

1. **Complete `movie-search.feature`** (exists / not-exists / empty) — the warm-up.
2. **Pick two more feature files** and complete their TODO scenarios. Choose by risk: what
   would hurt most if it broke?
3. **Keep it behaviour-focused.** No clicks/selectors in the Gherkin.

### Use Copilot - but review it

```
Here is the behaviour of a movies web app: browse & paginate movies, search by title,
view details, toggle dark/light theme, log in/out, and (when signed in) create personal
watchlists. Write Cucumber (Gherkin) scenarios for the WATCHLIST journey focusing on user
intent - include add, view, remove, empty-state, and the not-signed-in case. One behaviour
per scenario.
```

Then **critique together**: did it leak UI detail? Is each scenario a single behaviour? Would a
stakeholder understand it? Refine and share one with the group.

---

## Bonus: go spec-driven (agentic)

Flip the order - let AI **plan before it codes**, the first stage of the
[agentic workflow](../../docs/bonus-agentic-workflow.md):

```
Take this user story: "As a signed-in user I can add a film to my watchlist so I can find it
later." Produce a watchlist-spec.md test plan: Gherkin scenarios + acceptance criteria +
the edge cases you'd cover. Don't write test code yet.
```

Save that `*-spec.md` - you'll generate tests *from it* in Lab 02/03, exactly like Anusha's
"AI Test Plan Agent -> specs/..." stage.

---

## Done when...

- `movie-search.feature` is complete
- **Two** more feature files have their TODOs filled in
- Your steps describe **intent**, not clicks
- (Bonus) you produced a `*-spec.md` plan before any code

Next: implement them -> **[Lab 02 (Cucumber.js)](../02-bdd-cucumber-js)** or
**[Lab 03 (Reqnroll / C#)](../03-bdd-reqnroll-dotnet)**
