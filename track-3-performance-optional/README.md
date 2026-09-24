# Track 3 — Performance & Non-Functional Testing (OPTIONAL back-pocket)

> 🚧 **Work in progress (updating before 6 Oct).** The local JMeter path is ready now. We're
> finishing the **Contoso Traders** integration as the richer cloud target and confirming
> whether it can deploy to a **personal MSDN subscription** (so nothing touches a TfL sub). If
> MSDN capacity/quota doesn't allow it, this track stays **local JMeter only** — the day does
> not depend on it either way.

> **Optional.** Performance is a **back-pocket** activity — there are few dedicated performance
> testers in the room, so this is for anyone who wants to go further, or a small group in the
> afternoon. Everything else in the day works without it.

**Goal:** get a feel for **load, performance and resilience** testing with **JMeter** and
**Azure Load Testing**, and see how AI can help design and analyse tests that focus on
**business outcomes and NFRs** — not just CPU/memory graphs.

---

## ⚠️ Read this first — do you even need to deploy anything?

Most of this track can be **learned locally**. You only need cloud for *real* distributed load.

| What you want to do | Needs cloud? |
|---------------------|:------------:|
| Learn JMeter, build a test plan, run modest local load | ❌ No |
| Analyse results, define NFRs, design SLAs | ❌ No |
| Real, high-scale distributed load from Azure | ✅ Azure Load Testing |
| Load-test a deployed microservices app (Contoso Traders) | ✅ Azure |
| Chaos / resilience experiments | ✅ Azure (Chaos Studio) |

> **Note:** this track **avoids cloud deploys** where possible. If you do run the cloud parts,
> they go to a **Microsoft sandbox / MSDN subscription** — never a TfL subscription — via the
> provided GitHub Actions + Bicep, so it's seamless and disposable. See [`infra/`](./infra). If
> no subscription is available, do the **local JMeter** parts only.

---

## Focus on business outcomes, not just system metrics

A common anti-pattern: staring at CPU/RAM and calling it "performance testing". Better questions:

- Can we **complete the overnight refund batch inside its 2-hour window** at peak volume?
- Does **search stay under 1s at the 95th percentile** on a strike day (10× load)?
- What happens to the **user journey** (not the server) when a dependency is slow?

Define **NFRs** (targets) first, then test against them. AI is great at helping draft these and
interpret results in business terms.

---

## What's here

```
track-3-performance-optional/
├── jmeter/                 # JMeter test plans (run locally, no cloud)
│   ├── README.md
│   └── movies-search-load.jmx   # sample plan vs the local movies app
├── azure-load-testing/     # take a JMeter plan to cloud scale
│   └── README.md + load-test.yaml
├── infra/                  # OPTIONAL Bicep to stand up a target (sandbox/MSDN only)
│   ├── README.md
│   └── main.bicep
├── chaos/                  # OPTIONAL resilience experiments (Azure Chaos Studio)
│   └── README.md
└── prompts/                # AI prompts for NFR design & analysis
    └── README.md
```

## Suggested path

1. **Local JMeter** ([`jmeter/`](./jmeter)) — build & run a load test against the **local movies
   app**. No cloud. Learn the tool, read the numbers, define NFRs.
2. **(Optional) Azure Load Testing** ([`azure-load-testing/`](./azure-load-testing)) — take that
   same JMeter plan to real scale, *if* a sandbox is available.
3. **(Optional) A target to test** ([`infra/`](./infra)) — the movies app is light; for a richer
   target, the **Contoso Traders** e-commerce app (microservices) can be deployed to a sandbox.
4. **(Optional) Chaos** ([`chaos/`](./chaos)) — break a dependency and test resilience.

---

## VS Code extension angle

Beyond JMeter, explore reviewing/generating/executing performance tests and **comparing against
a baseline** from inside VS Code with Copilot — moving the conversation from "CPU was 80%" to
"we met/missed the NFR". See [`prompts/`](./prompts).

---

## 🤖 Bonus: go agentic

Have an agent **generate a load-test plan from an NFR**, run it, **analyse the results against
the target**, and produce a short performance report with a pass/fail verdict — the performance
flavour of [Anusha's workflow](../docs/bonus-agentic-workflow.md).

Start local: **[jmeter/ →](./jmeter)**
