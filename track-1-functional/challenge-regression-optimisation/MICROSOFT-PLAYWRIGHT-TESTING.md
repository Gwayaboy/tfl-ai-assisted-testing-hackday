# ☁️ Scale the regression suite on Microsoft Playwright Workspaces

> **Microsoft Playwright Workspaces** (part of **Azure App Testing**, previously
> "Microsoft Playwright Testing") runs your *existing* Playwright tests on fleets of
> **cloud-hosted browsers** — Linux/Windows, all engines — with **massive parallelism**.
> Nothing about your tests changes; you just point Playwright at a service config.

This is an **optional accelerator** for the [Regression Optimisation challenge](./README.md).
After you've de-duplicated and de-slept your suite locally, running it on **20+ cloud workers**
is the last big lever on the **Execution-time (30%)** score — and running across multiple
browsers/OSes is a genuine **coverage** story for the readout.

---

## Why it fits this challenge

| Rubric criterion | How Playwright Workspaces helps |
|------------------|---------------------------------|
| ⏱️ **Execution time (30%)** | Fan a suite out to 20 parallel cloud browsers — wall-clock drops even below what your laptop's cores allow. |
| 🎯 **Coverage (40%)** | Same suite, run across Chromium/Firefox/WebKit and Linux/Windows without owning the machines. |
| 🤖 **How you used AI (10%)** | "We optimised locally with Copilot, then scaled on cloud browsers" is a strong, modern story. |

> The [objective scorer](./README.md#-objective-scoring-scoremjs) reads the same `results.json`
> whether the run was local or on the service — so a cloud run scores exactly the same way.

---

## Participant quickstart (≈5 min)

You can attach the service to **either** the `baseline-suite/` (great for a "watch 300 tests fly"
demo) **or** your own optimised suite. A ready-to-use
[`playwright.service.config.ts`](./baseline-suite/playwright.service.config.ts) and
[`.env.example`](./baseline-suite/.env.example) already ship in `baseline-suite/`.

1. **Install the service packages** (already listed in `baseline-suite/package.json`):

   ```bash
   cd track-1-functional/challenge-regression-optimisation/baseline-suite
   npm install         # pulls @azure/playwright, @azure/identity, dotenv
   ```

2. **Add the workspace endpoint.** Copy `.env.example` → `.env` and paste the URL the
   organiser gives you (the workspace **Get started → browser endpoint**):

   ```
   PLAYWRIGHT_SERVICE_URL=wss://<region>.api.playwright.microsoft.com/playwrightworkspaces/<id>/browsers
   ```

3. **Authenticate.** Microsoft Entra ID is the default:

   ```bash
   az login          # sign in to the tenant that owns the workspace
   ```

   > Using an **access token** instead? See [Authentication options](#authentication-options).

4. **Run on cloud browsers:**

   ```bash
   npm run test:mpt          # = playwright test --config=playwright.service.config.ts --workers=20
   ```

   Start with a single spec the first time to check plumbing, then open the report:

   ```bash
   npx playwright test tests/04-browse-smoke.spec.ts --config=playwright.service.config.ts
   npx playwright show-report
   ```

---

## Running against the Movies app (SUT)

The tests hit the Movies app. Two ways to expose it to the **remote** browser:

- **Local SUT (`http://localhost:3000`)** — the shipped service config sets
  `exposeNetwork: "<loopback>"`, which tunnels the cloud browser back to your machine's
  localhost. Keep the app running locally while the suite executes on the service.
- **Hosted SUT** — simplest for the cloud, no tunnelling:

  ```bash
  BASE_URL=https://debs-obrien.github.io/playwright-movies-app/ npm run test:mpt
  ```

---

## Authentication options

| Method | When to use | Setup |
|--------|-------------|-------|
| **Microsoft Entra ID** *(default, recommended)* | You have an Azure identity with access to the workspace (e.g. you're in the organiser's tenant). | `az login`; the config uses `DefaultAzureCredential`. |
| **Access token** | Fastest for **external participants** who don't have Azure access — a single shared secret. | Organiser enables it (below); set `PLAYWRIGHT_SERVICE_ACCESS_TOKEN` in `.env` and switch the config to `serviceAuthType: ServiceAuth.ACCESS_TOKEN` (commented example is in the config file). |

> ⚠️ Access tokens are like passwords — time-box them, don't commit them (`.env` is git-ignored),
> and revoke after the event.

---

## For organisers (setup before the day)

> This matches Franck's plan: a Playwright Workspace on a **personal Azure subscription**, with
> the TfL participants granted access via a resource group.

1. **Create the workspace.** Azure portal → **Create a resource** → search *Playwright Workspaces*
   → **Create**. Put it in a dedicated **resource group** (e.g. `rg-tfl-hackday-mpt`) on the
   personal subscription; pick a nearby **region** (e.g. UK South / West Europe). Or via CLI:

   ```bash
   az group create -n rg-tfl-hackday-mpt -l uksouth
   # then create the "Microsoft.LoadTestService/playwrightworkspaces" resource in the portal
   ```

2. **Grab the endpoint.** Open the workspace → **Get started** → copy the **browser endpoint**
   URL. That's the `PLAYWRIGHT_SERVICE_URL` every participant needs.

3. **Give participants access — pick one:**
   - **Entra ID + RBAC (their own identity):** invite each TfL email as a **guest** in the tenant,
     then assign them a role on the resource group / workspace so they can run tests (Contributor
     is the safe choice; review under **Access control (IAM)**). This is the "add the list of TfL
     emails to the resource group" step.
   - **Access token (simplest for external folks):** workspace → **Settings → Access Management**
     → tick **Playwright Service Access Token**, then generate a token and share it with the
     cohort over a secure channel. No guest invites needed.

4. **Cost note.** Billing is per **test-minute** (plus stored results); new workspaces include a
   **free trial** allotment. For a one-day workshop that's plenty, but tell teams to run a single
   spec first and avoid re-running the full 300-test baseline on the service repeatedly.

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| `PLAYWRIGHT_SERVICE_URL is not set` | Create `.env` from `.env.example` and paste the endpoint; the config loads it via `dotenv`. |
| `AuthenticationError` / 401 | `az login` to the **correct tenant** (`az login --tenant <id>`), or switch to access-token auth and set `PLAYWRIGHT_SERVICE_ACCESS_TOKEN`. |
| Tests can't reach `localhost:3000` | Keep `exposeNetwork: "<loopback>"` **and** keep the app running locally, or use the hosted `BASE_URL`. |
| Peer-dep warning on install | `@azure/playwright` needs `@playwright/test >= 1.47` — this suite already resolves a newer version. |

---

## References

- [Quickstart: run Playwright tests at scale](https://learn.microsoft.com/azure/app-testing/playwright-workspaces/quickstart-run-end-to-end-tests)
- [Manage authentication](https://learn.microsoft.com/azure/app-testing/playwright-workspaces/how-to-manage-authentication)
- [Service configuration reference](https://aka.ms/pww/docs/config)
