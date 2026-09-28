# Track 3 — Performance & Non-Functional Testing (OPTIONAL back-pocket)

> **Optional.** Performance is a **back-pocket** activity — there are few dedicated performance
> testers in the room, so this is for anyone who wants to go further, or a small group in the
> afternoon. Everything else in the day works without it.

**Goal:** get a feel for **load, performance and resilience** testing with **Azure Load Testing**,
**Azure Chaos Studio** and **JMeter**, and see how AI can help design and analyse tests that focus
on **business outcomes and NFRs** — not just CPU/memory graphs.

---

## Two ways to do this track

1. **Contoso Traders — Azure Load Testing & Chaos Studio** *(recommended)* — a **live** cloud
   microservices app is **already deployed**; drive real distributed load and inject faults.
   Nothing to deploy — just an Azure portal sign-in. *(Section 1 below.)*
2. **Local load testing with JMeter** *(secondary)* — learn load testing entirely **locally**
   against the movies app. No cloud, no account. *(Section 2 below.)*

> Do as much or as little as you like — the day does not depend on this track either way.

---

## 1. Contoso Traders — Azure Load Testing & Chaos Studio (recommended)

Two cloud exercises — **performance** (Azure Load Testing) and **resilience** (Azure Chaos Studio) —
run against a **live, already-deployed** Contoso Traders environment. Nothing to deploy: you just
need portal access to the subscription hosting the app.

Contoso Traders is a microservices e-commerce app — a React UI, a **Carts API** on Azure Container
Apps, a **Products API** on AKS, plus Cosmos DB, Azure SQL and Key Vault. It's the richer cloud
target: the local movies app is great for *learning* JMeter, but this is where you drive **real
distributed load** and **inject faults**.

> Contoso Traders app repo (source, deployment templates & detailed walkthroughs):
> **[contosotraders-cloudtesting](https://github.com/Gwayaboy/contosotraders-cloudtesting/blob/main/README.md)**.

![Contoso Traders architecture](https://github.com/Gwayaboy/contosotraders-cloudtesting/raw/main/docs/architecture/contoso-traders-enhancements.drawio.png)

### Live environment (region: swedencentral)

| Service | URL | Hosted on |
|---------|-----|-----------|
| **UI (main app)** | https://contoso-traders-ui2ct26-budwfddfdjfbc7db.z03.azurefd.net/ | Storage + Front Door |
| **Carts API** (Swagger) | https://contoso-traders-cartsct26.happyrock-fb72c3f0.swedencentral.azurecontainerapps.io/swagger/index.html | Azure Container Apps |
| **Products API** (Swagger) | https://contoso-traders-productsct26.swedencentral.cloudapp.azure.com/swagger/index.html | AKS |

**Azure resources** (resource group `contoso-traders-rgct26`):

| Purpose | Resource name |
|---------|---------------|
| Load Testing service | `contoso-traders-loadtestct26` |
| Application Insights | `contoso-traders-aict26` |
| Key Vault (chaos target) | `contosotraderskvct26` |
| Chaos experiment — Key Vault deny access | `contoso-traders-chaos-kv-experimentct26` |
| Chaos experiment — AKS pod failures | `contoso-traders-chaos-aks-experimentct26` |

- **Load-test target endpoint:** `GET {Carts API base}/v1/ShoppingCart/loadtest`

> **Need Azure portal access?** These exercises run in the Azure portal against the resource group
> above. Ask an organizer to run the **[Grant participant access](https://github.com/Gwayaboy/contosotraders-cloudtesting/actions/workflows/grant-participant-access.yml)**
> workflow with your email — it grants the **least-privilege** roles for Load Testing + Chaos Studio.
> You'll get an Entra guest invitation to accept, then sign in at [portal.azure.com](https://portal.azure.com).

> These endpoints are live now. If they stop responding (the environment may be torn down after the
> event), it can be redeployed with a single GitHub Actions run against a **personal MSDN / sandbox**
> subscription — never a TfL one.

### Exercise 1 — Azure Load Testing (performance)

**Goal:** put the Carts API under load, push it to its breaking point, and use server-side metrics
to find the bottleneck (Cosmos DB RU saturation) — then guard against regressions in CI.

**Quick path:**
1. In the Azure portal, open the **Azure Load Testing** resource `contoso-traders-loadtestct26` in `contoso-traders-rgct26`.
2. Create a **URL-based test** against `GET {Carts API}/v1/ShoppingCart/loadtest` (start ~5 users, 120s).
3. Run it, then add the **Cosmos DB** app component to overlay **server-side metrics**.
4. Ramp to ~**250 users / 300s** to drive it to failure, then open **App Insights** (`contoso-traders-aict26`) → **Failures** to find the root cause (500s from a Cosmos gateway timeout).
5. See how the **GitHub Actions** workflow runs the same load test in CI with pass/fail criteria (e.g. `avg(response_time_ms) > 5000`).

👉 **Step-by-step with screenshots:** [Azure Load Testing walkthrough](https://github.com/Gwayaboy/contosotraders-cloudtesting/blob/main/demo-scripts/azure-load-testing/walkthrough.md)
Extras: [CI regression testing](https://github.com/Gwayaboy/contosotraders-cloudtesting/blob/main/demo-scripts/azure-load-testing/walkthrough.md#walkthrough-regression-testing-with-github-workflows) · [private endpoints](https://github.com/Gwayaboy/contosotraders-cloudtesting/blob/main/demo-scripts/azure-load-testing/private-endpoints.md) · [AKS right-sizing](https://github.com/Gwayaboy/contosotraders-cloudtesting/blob/main/demo-scripts/azure-load-testing/aks-cost-optimization.md)

### Exercise 2 — Azure Chaos Studio (resilience)

**Goal:** inject a real fault, watch the app degrade, then recover — testing *resilience*, not just
speed. The Products API reads its DB connection string from Key Vault on startup, so denying Key
Vault access is a great way to expose a resiliency gap.

**Quick path:**
1. In the Azure portal, open **Chaos Studio** → **Experiments** and select `contoso-traders-chaos-kv-experimentct26` (targets Key Vault `contosotraderskvct26` with a **Key Vault Deny Access** fault for 5 min).
2. Confirm the app works first: open the UI and click a product category (e.g. *laptops*).
3. **Start** the experiment.
4. Force the Products API pod to restart (delete it) so it must re-read Key Vault → it fails to start → the category page breaks. This exposes the resilience issue.
5. When the 5 minutes end, Key Vault access returns and AKS restarts the pod cleanly — the app recovers.
6. Explore the CI angle: `contoso-traders-chaos-aks-experimentct26` injects **pod failures** (via [Chaos Mesh](https://chaos-mesh.org/)) into the AKS cluster while a load test runs simultaneously.

👉 **Step-by-step with screenshots:** [Azure Chaos Studio walkthrough](https://github.com/Gwayaboy/contosotraders-cloudtesting/blob/main/demo-scripts/azure-chaos-studio/walkthrough.md)

### The AI angle

Use **GitHub Copilot** to: draft **NFRs / SLAs** (e.g. *"Carts API p95 < 1s at 250 users, error rate < 1%"*),
generate or tweak the **JMeter (JMX)** plan and the pass/fail YAML, interpret the **App Insights**
failure stack traces, and write a short **pass/fail performance report** — moving from *"CPU was 80%"*
to *"we met / missed the NFR, and here's why"*.

---

## 2. Local load testing with JMeter (no cloud)

No Azure and no account — everything runs on your laptop against the **local movies app** (the same
SUT as Tracks 1 & 2). This is the best place to *learn* the tool and practise reading results.

1. **Build & run a plan** ([`jmeter/`](./jmeter)) — a sample plan (`movies-search-load.jmx`) drives
   modest load at the local movies app. Learn JMeter, read the numbers, define NFRs.
2. **(Optional) Take it to cloud scale** ([`azure-load-testing/`](./azure-load-testing)) — feed the
   same JMX to **Azure Load Testing** for real distributed load, *if* a sandbox/MSDN sub is available.
3. **(Optional) Stand up your own richer target** ([`infra/`](./infra)) — Bicep to deploy a target to
   a sandbox/MSDN sub (never a TfL sub). Most people should just use the live Contoso Traders app in
   Section 1 instead.

### What's in this folder

```
track-3-performance-optional/
├── jmeter/                 # JMeter test plans (run locally, no cloud)
│   ├── README.md
│   └── movies-search-load.jmx   # sample plan vs the local movies app
├── azure-load-testing/     # take a JMeter plan to cloud scale
│   └── README.md + load-test.yaml
├── infra/                  # OPTIONAL Bicep to stand up your own target (sandbox/MSDN only)
│   ├── README.md
│   └── main.bicep
├── chaos/                  # OPTIONAL resilience experiments (Azure Chaos Studio)
│   └── README.md
└── prompts/                # AI prompts for NFR design & analysis
    └── README.md
```

---

## Focus on business outcomes, not just system metrics

A common anti-pattern: staring at CPU/RAM and calling it "performance testing". Better questions:

- Can we **complete the overnight refund batch inside its 2-hour window** at peak volume?
- Does **search stay under 1s at the 95th percentile** on a strike day (10× load)?
- What happens to the **user journey** (not the server) when a dependency is slow?

Define **NFRs** (targets) first, then test against them. AI is great at helping draft these and
interpret results in business terms.

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

Start with **[Section 1 — Contoso Traders (Load Testing & Chaos Studio)](#1-contoso-traders--azure-load-testing--chaos-studio-recommended)**, or go **[local with JMeter →](./jmeter)**.
