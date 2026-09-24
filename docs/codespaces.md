# Using GitHub Codespaces — the easy path (all tracks)

**Codespaces is the recommended way to take part.** It's a full VS Code + dev environment
running in your browser (or desktop VS Code), so there's **nothing to install** and it works
on a locked-down laptop. A **free personal GitHub account is enough** — you do **not** need a
paid plan, an Azure subscription, or any TMDB/IMDb account or API key.

---

## 0. One-time: get a free GitHub account + Codespaces

1. **Create a free account** at **[github.com/signup](https://github.com/signup)** (skip if you
   already have one — a personal account is fine; you don't need to use a work account).
2. That free account includes a monthly Codespaces allowance:

   | Plan | Compute / month | Storage / month |
   |------|-----------------|-----------------|
   | **GitHub Free** (personal) | **120 core-hours** | **15 GB** |
   | GitHub Pro | 180 core-hours | 20 GB |

   On the **2-core** machine we use, 120 core-hours = **~60 hours** of runtime — far more than
   one hack day. If you ever exceed the free allowance and have **no payment method on file,
   Codespaces simply pauses — you are never charged**.
3. **GitHub Copilot:** we'll make sure everyone has Copilot access on the day. Personal accounts
   can also use **[Copilot Free](https://github.com/copilot)** (monthly limit) in the meantime.

---

## 1. Launch your Codespace

1. Open the repo: **[github.com/Gwayaboy/tfl-ai-assisted-testing-hackday](https://github.com/Gwayaboy/tfl-ai-assisted-testing-hackday)**
2. Click the green **`< > Code`** button ▸ **Codespaces** tab ▸ **Create codespace on main**.
3. Wait ~2–3 minutes on first build. The devcontainer automatically installs **Node, .NET 8,
   the GitHub CLI, Java 17 + Apache JMeter, the Azure CLI (with the `az load` extension) and
   Bicep**, Playwright + Chromium, the VS Code extensions (Copilot, Copilot Chat, Playwright,
   C# Dev Kit, Cucumber, **Azure Load Testing, Azure CLI, Bicep, Azure Resources**) and the
   **Playwright MCP** config — and it **pre-clones and builds the Movies app** for you.
4. **Sign in to Copilot:** click the Copilot icon in the bottom status bar ▸ **Sign in**.

> 💡 **Tip — save your quota:** when you finish, **stop** the Codespace
> (`< > Code` ▸ Codespaces ▸ **…** ▸ *Stop codespace*) so it doesn't keep consuming hours, and
> **delete** it when the day is done.

---

## 2. Turn on Copilot **agent mode** + Playwright MCP (Tracks 1 & 3)

1. Open **Chat** (`Ctrl/Cmd + Alt + I`).
2. In the chat-mode dropdown, choose **Agent**.
3. When prompted, **allow** the `playwright` MCP server (config ships in
   [`.vscode/mcp.json`](../.vscode/mcp.json)). Copilot can now open the running app, take an
   accessibility snapshot, and generate locators that match the *real* UI.

---

## 3. Track 1 — Functional testing

Everything is local inside the Codespace.

1. **Start the app (mock API + Movies app):**
   ```bash
   cd ../playwright-movies-app && npm run dev
   ```
   This starts the **mock API on `:4000`** and the **Movies app on `:3000`**.
2. When VS Code pops **"Your application running on port 3000 is available"**, click
   **Open in Browser** (or go to the **Ports** tab and open port 3000). Login:
   `me@outlook.com` / `12345`.
3. In a **second terminal** (keep the app running in the first), go through the labs:
   ```bash
   cd /workspaces/tfl-ai-assisted-testing-hackday/track-1-functional
   ```
   - **JavaScript / Cucumber.js path** → [`02-bdd-cucumber-js`](../track-1-functional/02-bdd-cucumber-js) — `npm install` then `npm test`.
   - **C# / Reqnroll path** → [`03-bdd-reqnroll-dotnet`](../track-1-functional/03-bdd-reqnroll-dotnet) — `dotnet test` (the .NET SDK is already installed in the Codespace).
   - **API testing** → [`04-api-testing`](../track-1-functional/04-api-testing).
   - **Regression-optimisation challenge** → [`challenge-regression-optimisation`](../track-1-functional/challenge-regression-optimisation).

> **Ports tab:** the little **Ports** panel (next to Terminal) lists every forwarded port. If
> the browser preview looks empty, confirm **both** 3000 *and* 4000 are listed and running.

---

## 4. Track 2 — Test leadership & governance

Track 2 is discussion- and artifact-based — **no app to run**. In your Codespace you can:

- Open the [`track-2-leadership`](../track-2-leadership) folder and the
  [`messy-project-challenge`](../track-2-leadership/messy-project-challenge) brief.
- Use **Copilot Chat** to analyse the messy artifacts, draft a test strategy, RAID log, or
  governance model, and pressure-test your plan against the facilitator curveballs.
- Edit your team's answers straight into the `templates/` files.

No extra setup — it works the moment your Codespace opens.

---

## 5. Track 3 — Performance (optional)

Your Codespace comes with everything Track 3 needs **preinstalled**: **Java 17**, the
**Apache JMeter** CLI, the **Azure CLI** (with the `az load` extension), **Bicep**, and the
**Azure Load Testing** VS Code extension (which adds its own MCP tools for Copilot agent mode).

- **Local JMeter learning path works out of the box** — run modest JMeter plans against the
  Movies app (`:3000`); just type `jmeter --version` to confirm. See
  [`track-3-performance-optional/jmeter`](../track-3-performance-optional/jmeter).
- **Real distributed load / Azure Load Testing / Chaos** needs an **Azure subscription** (sign in
  with `az login`, then use the Azure Load Testing extension or `az load`). This is a
  facilitator-run, back-pocket extra — you lose nothing by staying local.

---

## 6. Prefer desktop VS Code?

You can open the same Codespace in your installed VS Code: **Codespaces** panel ▸ **…** ▸
*Open in VS Code Desktop* (needs the **GitHub Codespaces** extension). Same environment, local
editor.

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| Movies list is empty | The **mock API (`:4000`)** isn't running. Always start with `npm run dev` (not `next dev`). |
| No port popup | Open the **Ports** tab, find **3000**, click the globe icon to open it. |
| Codespace won't create | You may have hit the free quota, or the repo is owned by a *managed* (work) account — use a **personal** account. |
| Copilot greyed out | Sign in to Copilot in the status bar; confirm your account has Copilot (or Copilot Free) enabled. |
| Running low on hours | **Stop** the Codespace when not in use; **delete** old Codespaces from [github.com/codespaces](https://github.com/codespaces). |
