# Setup — detailed guide

Track 1 (and most of the day) runs **entirely on your laptop**. No Azure, no cloud accounts.

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

```bash
# from the repo root
./scripts/start-movies-app.sh      # macOS/Linux
./scripts/start-movies-app.ps1     # Windows PowerShell
```

or manually:

```bash
git clone https://github.com/debs-obrien/playwright-movies-app.git
cd playwright-movies-app
npm install
npm run dev
```

Open **http://localhost:3000**.

> ⚠️ **Must be port 3000.** The app's movie API is hard-wired to `localhost:3000`. Another
> port = no data.

### Troubleshooting

| Symptom | Fix |
|---------|-----|
| No movies load / blank list | You're not on port 3000. Free the port and restart. |
| `npm install` fails | Check Node is 18+. Delete `node_modules` and retry. |
| Copilot has no Playwright tools | Agent mode not on, or MCP server not allowed. Re-check step 3. |
| Login doesn't work | Use exactly `me@outlook.com` / `12345`. |
| Port 3000 busy | Find & stop the process, or set `MOVIES_APP_DIR` and a freed port. |

✅ Ready? Go to [Track 1](../track-1-functional/README.md).
