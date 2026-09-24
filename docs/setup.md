# Setup — detailed guide

> ### ⭐ Preferred: GitHub Codespaces (nothing to install)
> A **free personal GitHub account** is all you need — sign up at
> [github.com/signup](https://github.com/signup) (includes **120 Codespaces core-hours +
> 15 GB/month**). Then on the repo: **`< > Code` ▸ Codespaces ▸ Create codespace on main**.
> Everything below is pre-installed for you, and the Movies app SUT is pre-cloned and built.
> See [`codespaces.md`](./codespaces.md) for the full per-track walkthrough.

Track 1 (and most of the day) runs **entirely locally** — no cloud, no external accounts,
**no TMDB/IMDb sign-up and no API key**. The steps below are for a **local** setup.

## 1. Install prerequisites

| Tool | Why | Install |
|------|-----|---------|
| Node.js 18+ (20 LTS) | Movies app + Playwright + Cucumber.js | https://nodejs.org/ |
| Git | clone repos | https://git-scm.com/ |
| VS Code | editor + Copilot | https://code.visualstudio.com/ |
| GitHub Copilot | the whole point 🙂 | sign in inside VS Code |
| .NET SDK 8+ | only for the C#/Reqnroll path | https://dotnet.microsoft.com/download |

Verify:

```bash
node --version    # v18+  (v20 recommended)
npm --version
git --version
dotnet --version  # optional, for C#
```

## 2. VS Code extensions

Install from the Extensions panel (the devcontainer installs these automatically in Codespaces):

- **GitHub Copilot** + **GitHub Copilot Chat**
- **Playwright Test for VS Code** (`ms-playwright.playwright`)
- **Cucumber** (`cucumberopen.cucumber-official`)
- **C# Dev Kit** (only if you're doing the C# path)

## 3. Enable Copilot **agent mode** + Playwright MCP

Agent mode lets Copilot *act* — run tools, explore the app, and write files.

1. Open the **Chat** view in VS Code (`Ctrl/Cmd + Alt + I`).
2. In the chat mode dropdown, choose **Agent**.
3. This repo ships a Playwright MCP config at [`.vscode/mcp.json`](../.vscode/mcp.json).
   When prompted, **allow** the `playwright` MCP server to start. You can also click
   **Install** on the buttons in the
   [Playwright Hands-On Lab](https://github.com/Gwayaboy/PlaywrightHandsOnLab#how-to-switch-to-agent-mode-and-install-playwright-mcp-server).
4. You should now see Playwright tools (navigate, snapshot, click, etc.) available to Copilot.

> **What the MCP server gives you:** Copilot can open the running app, take an accessibility
> snapshot, and read the *real* roles and names of elements — so generated locators actually
> match your app instead of being guessed.

## 4. Start the SUT (Movies app)

The Movies app is **100% local** — its data and login come from a **bundled mock API**, so
there's **no cloud account, no TMDB/IMDb sign-up and no API key**.

The helper script (recommended) also configures the SUT to serve its API **same-origin**, so
it works in a **GitHub Codespaces browser preview** with nothing else to open:

```bash
# from the repo root
./scripts/start-movies-app.sh      # macOS/Linux
./scripts/start-movies-app.ps1     # Windows PowerShell
```

or manually:

```bash
git clone https://github.com/debs-obrien/playwright-movies-app.git
cd playwright-movies-app
npm install               # also builds the local mock API
cp .env.example .env      # sets the test login (any user/pass also works)
npm run dev               # starts the mock (:4000) and the app (:3000)
```

Open **http://localhost:3000**.

> ℹ️ **Two ports:** `npm run dev` runs the **mock API on `:4000`** and the **app on `:3000`**.
> Keep both free. You only open **:3000** in the browser — the app calls the mock for you.

> 🧩 **Running in a Codespace (browser preview)?** Opening `http://localhost:3000` locally works
> as-is, but the app's default `127.0.0.1:4000` data URL fails in the `…-3000.app.github.dev`
> preview. Our `start-movies-app.*` scripts fix this automatically; if you cloned by hand, run
> `node scripts/enable-sut-proxy.mjs ../playwright-movies-app` once (proxies the API through the
> same port 3000). See [`codespaces.md`](./codespaces.md) for the full explanation.

### Troubleshooting

| Symptom | Fix |
|---------|-----|
| No movies / *"An error occurred on client"* in a **Codespace preview** | Run `node scripts/enable-sut-proxy.mjs ../playwright-movies-app`, then `npm run dev`. |
| No movies load / blank list (local) | The mock API (`:4000`) isn't running. Use `npm run dev` (not `next dev`) so it starts too. |
| `npm install` fails | Check Node is 18+. Delete `node_modules` and retry. |
| Copilot has no Playwright tools | Agent mode not on, or MCP server not allowed. Re-check step 3. |
| Login doesn't work | Use exactly `me@outlook.com` / `12345` (or any user/pass — the mock accepts both). |
| Port 3000 or 4000 busy | Find & stop the process, then re-run. |

✅ Ready? Go to [Track 1](../track-1-functional/README.md).
