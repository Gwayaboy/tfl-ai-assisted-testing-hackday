# TfL × Microsoft — AI-Assisted Testing Hack Day

**Monday 6 October 2026 · 2 Kingdom Street, London (2KS)**

Welcome! Today is about getting **hands-on** with AI-assisted testing. You'll use
**GitHub Copilot** (agent mode + the Playwright MCP server) to explore an app, design
tests, automate them, and think like a test leader — then share what you learned.

> **Not sure where to start?** Jump to [Setup](#setup) → then
> [Track 1: Functional Testing](#track-1--functional-testing-morning--everyone).

---

## The day at a glance

| Time | What | Where |
|------|------|-------|
| 09:30 | Arrival / coffee | 2KS reception |
| 10:00 | Welcome, objectives, **form your teams + pick a team name** | Notting Hill |
| 10:15 | How Microsoft uses AI across the testing lifecycle | Notting Hill |
| 11:00 | Break | |
| 11:15 | **Track 1 — Functional testing** + Regression Optimisation challenge | Notting Hill / Kew |
| 12:30 | Lunch | 4th-floor canteen / local |
| 13:30 | **Track 2 — Test leadership** + Messy Project challenge | Notting Hill / Kew |
| 15:00 | Break | |
| 15:15 | Team readouts, prizes, LLM-testing sneak peek | Notting Hill |
| 16:00 | Close | |

Sessions run **consecutively** — everyone does Track 1 then Track 2.
[**Track 3 — Performance**](./track-3-performance-optional) is an **optional** back-pocket
activity for anyone who wants to go further.

---

## The tracks

| Track | Focus | SUT | Runs where |
|-------|-------|-----|-----------|
| [**1 — Functional**](./track-1-functional) | BDD, Playwright, Copilot-assisted test authoring | Movies app | **100% local** |
| [**2 — Leadership**](./track-2-leadership) | Strategy, assurance, cross-team collaboration | Messy Project brief | Whiteboard / laptop |
| [**3 — Performance** *(optional)*](./track-3-performance-optional) | Load testing, JMeter, Azure Load Testing | Contoso Traders | Cloud (optional) |

Each track has **guided step-by-step labs** (great if you're newer to automation)
**and** open challenges (if you want to push yourself). Do as much or as little as you like.

---

## Setup

You need three things before you start Track 1. All of Track 1 runs **locally** — no cloud, no Azure.

### 1. Prerequisites

| Tool | Version | Check |
|------|---------|-------|
| [Node.js](https://nodejs.org/) | 18+ (20 LTS recommended) | `node --version` |
| [Git](https://git-scm.com/) | any recent | `git --version` |
| [VS Code](https://code.visualstudio.com/) | latest | |
| [GitHub Copilot](https://github.com/features/copilot) | active licence, signed in | Copilot icon in VS Code |
| .NET SDK *(only for the C#/Reqnroll path)* | 8+ | `dotnet --version` |

> **Prefer zero local install?** Open this repo in a
> [**GitHub Codespace**](https://docs.github.com/codespaces) — the devcontainer installs
> Node, Playwright and the Copilot/Playwright-MCP config for you. Click
> **Code ▸ Codespaces ▸ Create codespace on main**.

### 2. Clone this repo

```bash
git clone https://github.com/Gwayaboy/tfl-ai-assisted-testing-hackday.git
cd tfl-ai-assisted-testing-hackday
```

### 3. Start the System Under Test (SUT) — the Movies app

The primary SUT is the open-source
[**playwright-movies-app**](https://github.com/debs-obrien/playwright-movies-app). It runs
locally on **port 3000**.

**Option A — helper script (recommended):**

```bash
# macOS/Linux
./scripts/start-movies-app.sh
```
```powershell
# Windows PowerShell
./scripts/start-movies-app.ps1
```

**Option B — manual:**

```bash
git clone https://github.com/debs-obrien/playwright-movies-app.git
cd playwright-movies-app
npm install
npm run dev
```

> ⚠️ **Port 3000 must be free.** The app's API expects `http://localhost:3000`; a
> different port breaks the movie data.

Open **http://localhost:3000** — you should see the movies app. Test login:
`me@outlook.com` / `12345`.

✅ **You're ready.** Head to [Track 1](./track-1-functional).

---

## House rules

- **Teams:** Form small teams (3–5). Pick a fun **team name** — you'll present as a team.
- **Objective:** Learn something practical and **share it** in the readout. This isn't about
  building for the sake of it — it's about ideas you can take back to your team.
- **Balance:** Newer to automation? Start with the **guided labs**. Comfortable already?
  Skip ahead to the **challenges** or bring your own scenario.
- **Bring your own use case:** Got a real testing problem? Great — adapt a track to it and
  tell us how you approached it.
- **Ask:** Microsoft CSAs and TfL track coaches are on the floor all day. Wave us over.
- **Have fun & compete:** There's swag. See [scoring](./docs/scoring.md).

---

## Repo map

```
.
├── track-1-functional/              # Functional testing (everyone, AM)
│   ├── 00-warmup-guided/            #   guided first steps
│   ├── 01-gherkin-scenarios/        #   write BDD scenarios
│   ├── 02-bdd-cucumber-js/          #   implement (JS/TS)
│   ├── 03-bdd-reqnroll-dotnet/      #   implement (C#)
│   ├── 04-api-testing/              #   API tests with Playwright
│   ├── challenge-regression-optimisation/   # ⚔️ competitive challenge
│   └── prompts/                     #   starter Copilot prompts
├── track-2-leadership/              # Test leadership (everyone, PM)
│   └── messy-project-challenge/     # ⚔️ cross-team collaboration challenge
├── track-3-performance-optional/    # Performance (optional back-pocket)
├── team-template/                   # copy this per team to track your work
├── docs/                            # setup, scoring, facilitator guide
└── scripts/                         # helpers to run the SUT
```

---

## Feedback

At the end of the day, please spend 2 minutes on the feedback form — it genuinely shapes the
next hack. 🙏

**📝 Form:** [forms.cloud.microsoft/r/HtPRpQYjj9](https://forms.cloud.microsoft/r/HtPRpQYjj9)

<img src="./assets/feedback-qr.png" alt="QR code linking to the feedback form" width="200" />

*Scan the QR code, or use the link above.*

*Built for the TfL × Microsoft AI-Assisted Testing Hack Day. Adapted from the
[Playwright Hands-On Lab](https://github.com/Gwayaboy/PlaywrightHandsOnLab).*
