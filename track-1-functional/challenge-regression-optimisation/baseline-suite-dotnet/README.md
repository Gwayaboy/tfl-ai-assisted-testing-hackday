# Baseline suite — C# / .NET (optimise me!)

A **deliberately slow, bloated** [Playwright for .NET](https://playwright.dev/dotnet/) +
**NUnit** regression suite (~300 tests) that runs against the local Movies app. This is the
**C# equivalent** of the [`baseline-suite/`](../baseline-suite) (JS/TS) — same anti-patterns,
same shape — for teams who live in .NET. Pick **either** language for the
[Regression Optimisation challenge](../README.md).

## Run it

```bash
cd track-1-functional/challenge-regression-optimisation/baseline-suite-dotnet
dotnet restore
dotnet build
# The Playwright browser is installed automatically on first `dotnet test`
# (see PlaywrightEnvironment.cs). To pre-install it yourself instead, run:
#   pwsh bin/Debug/net8.0/playwright.ps1 install chromium
# (no pwsh? dotnet tool install --global Microsoft.Playwright.CLI ; then: playwright install chromium)

# movies app must be running on http://localhost:3000
dotnet test
```

`dotnet test` picks up the deliberately-bad [`.runsettings`](./.runsettings) automatically
(single worker, huge timeouts). It writes a `.trx` you can point a report at, plus per-test
traces/videos/screenshots. **Record the total time and test count** — that's your baseline.

> 🧩 **Works in GitHub Codespaces / VS Code out of the box.** An assembly-level setup
> ([`PlaywrightEnvironment.cs`](./PlaywrightEnvironment.cs)) makes `dotnet test` robust there: it
> clears the `BROWSER=/vscode/…` variable VS Code injects (which older Playwright adapters mistake
> for a browser name → *"Invalid browser name from 'BROWSER'"*) and installs the .NET Playwright's
> chromium build on first run (Codespaces only pre-installs the JS one).

> ⏳ **It's slow on purpose** — serial, single-worker, full of sleeps, tracing + video on. That's
> the point. Expect a full run in the **same ~28–30 min ballpark** as the JS baseline. Grab your
> baseline time, then make it fast.

### View a trace

Every test records a Playwright trace zip (an anti-pattern you'll remove):

```bash
pwsh bin/Debug/net8.0/playwright.ps1 show-trace traces/<test-name>.zip
```

## ☁️ Required: run your optimised suite on Microsoft Playwright Workspaces

Like the JS suite, the **optimised "after" run happens on cloud browsers** via **Microsoft
Playwright Workspaces** — so the Execution-time score is measured on the same infrastructure for
every team. [`BaselineTest`](./BaselineTest.cs) wires this up via a `ConnectOptionsAsync` override.
It's a **no-op locally** — with no `PLAYWRIGHT_SERVICE_URL` set, `dotnet test` runs on your machine
exactly as above — and connects to the cloud when the organiser's endpoint + access token are set:

```powershell
# the organiser gives you BOTH of these — either set them in your shell…
$env:PLAYWRIGHT_SERVICE_URL          = "wss://<region>.api.playwright.microsoft.com/playwrightworkspaces/<id>/browsers"
$env:PLAYWRIGHT_SERVICE_ACCESS_TOKEN = "<token>"
dotnet test -- NUnit.NumberOfTestWorkers=20    # 20 parallel cloud browsers
```

> 💡 …**or** copy the shared [`../.env.example`](../.env.example) → `../.env` (git-ignored, at the
> challenge-folder root — the **same file the JS suite reads**) and paste the two values there. A
> tiny built-in loader ([`DotEnv.cs`](./DotEnv.cs)) walks up and reads that `.env` at startup — the
> C# equivalent of the JS suite's `dotenv` — so `dotnet test` picks them up with no shell setup.
> **In a Codespace you need neither**: the values are injected as Codespaces secrets and
> `post-create.sh` auto-writes the shared `.env` from them. **On a fork**, add your own
> `PLAYWRIGHT_SERVICE_URL` + `PLAYWRIGHT_SERVICE_ACCESS_TOKEN` Codespaces secrets (forks don't
> inherit the base repo's) and rebuild. Shell/injected env vars always win. **Never commit the real
> token;** it belongs only in `.env`.

Auth is the workspace **access token** (`Authorization: Bearer …`) — no Azure sign-in needed. We
build the service `wsEndpoint` ourselves with the current **`api-version=2025-09-01`**, because
Playwright's built-in service connect still pins the now-unsupported `2023-10-01-preview`. Full
walkthrough (organiser setup): [MICROSOFT-PLAYWRIGHT-TESTING.md](../MICROSOFT-PLAYWRIGHT-TESTING.md).

## 🧮 Score your before/after

The challenge scorer ([`../score.mjs`](../score.mjs)) reads a **`.trx`** directly — the same tool
JS/TS teams use, so both languages are judged identically (Coverage 40 · Time 30 · Reliability 20,
+ a judge's AI-use 10). Emit a `.trx` with the trx logger on each run:

```bash
# baseline "before"
dotnet test --logger "trx;LogFileName=before.trx"
# your optimised "after" suite
dotnet test --logger "trx;LogFileName=after.trx"

# score it (Node 18+; from the challenge folder one level up)
node ../score.mjs --baseline before.trx --optimised after.trx --ai 8
```

- **Time** is the run's wall-clock (`.trx` `<Times>` `finish − start`), so cloud (Playwright
  Workspaces) and local runs score the same way.
- **Coverage** matches the six required behaviours on the **NUnit test name**. For exact
  attribution put `@covers:<id>` (`search-exists`, `search-none`, `search-empty`, `browse`,
  `details`, `theme`) in the test's `SetName` — the `.trx` carries it through. **Only passing
  tests earn coverage**, so an always-red "coverage" test scores nothing.

## What's here

```
baseline-suite-dotnet/
├── RegressionOptimisation.Baseline.csproj   # NUnit + Microsoft.Playwright.NUnit
├── .runsettings              # deliberately bad: 1 worker, 30s expect timeout
├── AssemblyInfo.cs           # forces serial execution (LevelOfParallelism 1)
├── PlaywrightEnvironment.cs  # Codespaces/VS Code setup: clears bogus BROWSER, installs chromium
├── DotEnv.cs                 # tiny .env loader — reads the shared ../.env (Workspaces endpoint/token)
├── BaselineTest.cs           # base class: always-on trace + video + screenshot; ☁️ cloud-browser connect (Playwright Workspaces) when service env vars are set
├── Helpers.cs                # the slow helpers (hard sleeps, re-navigation)
├── Fixtures.cs               # ~40 search terms -> lots of data-driven tests
└── Tests/
    ├── Search01Tests.cs             # 40 tests
    ├── SearchDuplicate02Tests.cs    # 40 tests (near-duplicate!)
    ├── Nonsense03Tests.cs           # 40 tests (4 terms x 10)
    ├── BrowseSmoke04Tests.cs        # 60 tests (same smoke x60)
    ├── Details05Tests.cs            # 60 tests (UI doing API's job, 4 x 15)
    └── Theme06Tests.cs              # 60 tests (trivial toggle x60)
```

Start with [`ANTIPATTERNS.md`](./ANTIPATTERNS.md) — it's the checklist to beat.

> Tip: don't optimise in place blindly. Copy to an `optimised/` folder (or branch) so you can
> show a clean **before/after** at the readout.
