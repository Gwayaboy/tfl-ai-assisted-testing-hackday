# ☁️ Scale the regression suite on Microsoft Playwright Workspaces

> **Microsoft Playwright Workspaces** (part of **Azure App Testing**, previously
> "Microsoft Playwright Testing") runs your *existing* Playwright tests on fleets of
> **cloud-hosted browsers** — Linux/Windows, all engines — with **massive parallelism**.
> Nothing about your tests changes; you just point Playwright at a service config.

This is a **required step** of the [Regression Optimisation challenge](./README.md) — every team runs
their optimised suite here, so the Execution-time score is measured on identical cloud infrastructure.
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
[`playwright.service.config.ts`](./baseline-suite/playwright.service.config.ts) ships in
`baseline-suite/`, and **both** the JS and .NET suites read ONE shared
[`.env`](./.env.example) at the challenge-folder root (`challenge-regression-optimisation/.env`).

> 🧩 **In a GitHub Codespace, skip steps 2–3 — *if your account can read the workspace secret.***
> When the endpoint + token are available as **Codespaces secrets**
> (`PLAYWRIGHT_SERVICE_URL` / `PLAYWRIGHT_SERVICE_ACCESS_TOKEN`), `.devcontainer/post-create.sh`
> writes the shared git-ignored `.env` from them and `npm run test:mpt` / `dotnet test` just work.
> Real env vars always win over the `.env` file.
>
> ⚠️ **GitHub only injects a repo Codespaces secret for accounts that can access it — repo
> **collaborators** or **org members**.** External participants (and anyone on a **fork** — forks
> never inherit the base repo's secrets) won't get it injected. If the token is absent,
> `post-create.sh` prints what to do: add your **own** Codespaces secret
> (*Settings ▸ Secrets and variables ▸ Codespaces ▸ New repository secret*:
> `PLAYWRIGHT_SERVICE_URL`, `PLAYWRIGHT_SERVICE_ACCESS_TOKEN`) and rebuild, **or**
> `cp ../.env.example ../.env` and paste the values the organiser gave you.

1. **Install the service packages** (already listed in `baseline-suite/package.json`):

   ```bash
   cd track-1-functional/challenge-regression-optimisation/baseline-suite
   npm install         # pulls @azure/playwright, @azure/identity, dotenv
   ```

2. **Add the workspace endpoint.** Copy the shared `../.env.example` → `../.env` (at the
   challenge-folder root — both suites read it) and paste the URL the organiser gives you
   (the workspace **Get started → browser endpoint**):

   ```
   PLAYWRIGHT_SERVICE_URL=wss://<region>.api.playwright.microsoft.com/playwrightworkspaces/<id>/browsers
   ```

3. **Add your access token.** Paste the token the organiser gave you into that same `../.env` as
   `PLAYWRIGHT_SERVICE_ACCESS_TOKEN` — no Azure sign-in needed:

   ```
   PLAYWRIGHT_SERVICE_ACCESS_TOKEN=<token from the organiser>
   ```

   > Have your own Azure identity on the workspace instead? You can use Microsoft Entra ID
   > (`az login`) — see [Authentication options](#authentication-options).

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

## For organisers

> ✅ **Workspace pre-created; token stored centrally.** The `mpt-tfl-hackday` workspace exists and
> the access token is a **GitHub Codespaces secret** on the repo, so `post-create.sh` writes the
> shared `.env` and participants just run `npm run test:mpt` / `dotnet test` — **as long as their
> account can read that secret.** GitHub injects a repo Codespaces secret only for **collaborators**
> or **org members**; plain external accounts and **forks** don't get it (verified). Decide your
> access model before the day (see the delivery row).

**What's provisioned**

| | |
|---|---|
| Workspace | `mpt-tfl-hackday` — resource group `rg-tfl-hackday-mpt`, **West Europe** |
| Auth mode | Playwright **access token** (local auth enabled) |
| Central store | Codespaces secrets `PLAYWRIGHT_SERVICE_URL` + `PLAYWRIGHT_SERVICE_ACCESS_TOKEN` on the repo |
| Who gets auto-injection | Repo **collaborators** / **org members** only. For a whole cohort: host in a **GitHub org**, add participants as **members**, and set an **org-level** Codespaces secret scoped to the repo. |
| Everyone else (this event) | External accounts + forks don't get injection. **Token delivery for TfL = a secure Microsoft 365 channel** — the organiser shares it over **Teams** (message / meeting chat) or an **access-controlled OneDrive/SharePoint note**, *never* the repo or a public link. Participants paste it into the git-ignored `.env` (`cp .env.example .env`) or their **own** Codespaces secret. `post-create.sh` prints these steps when the secret is absent. |

> 🔒 **Token stays out of the repo.** It's an access token (bearer secret) — distribute it only
> through the M365 channel above, keep it in the git-ignored `.env`, and revoke + regenerate it in
> the portal after the event (it already expires 2026-10-29).

<details>
<summary><b>Rotate the token / recreate the workspace — reference only</b></summary>

Only needed to **rotate** an expiring token or **stand up a fresh** workspace (e.g. reusing this
repo for a later event).

1. **(Re)create the workspace** — skip if `mpt-tfl-hackday` still exists. Use a region that offers
   Playwright Workspaces (e.g. West Europe / Switzerland North; **UK South is not supported**):

   ```bash
   az group create -n rg-tfl-hackday-mpt -l westeurope
   az resource create -g rg-tfl-hackday-mpt -n mpt-tfl-hackday \
     --resource-type Microsoft.LoadTestService/playwrightWorkspaces \
     -l westeurope --api-version 2026-08-01-preview --properties '{}'
   ```

2. **Generate a token + grab the endpoint.** Workspace → **Settings → Access Management** → tick
   **Playwright Service Access Token** → **Generate token** (set an expiry past the event; it's shown
   **once** — copy it). The **Get started → browser endpoint** is `PLAYWRIGHT_SERVICE_URL`.
   *(The Azure CLI can't mint this token — Entra blocks the CLI app from the Playwright API — so use
   the portal.)*

3. **Store it centrally** so every base-repo Codespace gets it injected (run from a machine that has
   the two values in the shared `.env`):

   ```bash
   gh secret set --app codespaces --repo <owner>/<repo> \
     --env-file track-1-functional/challenge-regression-optimisation/.env
   ```

   **Never** commit the token — even base64-"obfuscated" it's trivially decoded, and this repo is
   public. Forks don't inherit repo secrets; forkers add their own (see the quickstart).

   *Alternative — Entra ID + RBAC:* invite testers as **guests** and assign a role on the workspace
   instead of a shared token (more setup per person).
</details>

**Cost.** Billing is per **test-minute** — **$0.01/min** on the default Linux cloud
browsers in West Europe (Windows browsers are $0.02/min); stored reports are just ordinary Azure
Blob Storage. A subscription's **first** workspace gets a one-time **free trial: 30 days / 100
browser-minutes**. A whole 10-team workshop (each running ~300 tests a few times on 20 workers)
lands around **$7–$15 total** — trivially covered by VS Enterprise monthly credits. Still, tell
teams to run a **single spec first** to check plumbing, and to avoid re-running the full
300-test baseline on the service repeatedly.

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| `PLAYWRIGHT_SERVICE_URL is not set` | Create the shared `../.env` from `../.env.example` (at the challenge-folder root) and paste the endpoint; both suites load it. In a Codespace it's injected as a secret. |
| `AuthenticationError` / 401 | `az login` to the **correct tenant** (`az login --tenant <id>`), or switch to access-token auth and set `PLAYWRIGHT_SERVICE_ACCESS_TOKEN`. |
| Tests can't reach `localhost:3000` | Keep `exposeNetwork: "<loopback>"` **and** keep the app running locally, or use the hosted `BASE_URL`. |
| Peer-dep warning on install | `@azure/playwright` needs `@playwright/test >= 1.47` — this suite already resolves a newer version. |

---

## References

- [Quickstart: run Playwright tests at scale](https://learn.microsoft.com/azure/app-testing/playwright-workspaces/quickstart-run-end-to-end-tests)
- [Manage authentication](https://learn.microsoft.com/azure/app-testing/playwright-workspaces/how-to-manage-authentication)
- [Service configuration reference](https://aka.ms/pww/docs/config)
