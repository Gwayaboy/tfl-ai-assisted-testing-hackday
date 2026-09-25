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
# install the Playwright browsers (one-time)
pwsh bin/Debug/net8.0/playwright.ps1 install chromium
# (no pwsh? dotnet tool install --global Microsoft.Playwright.CLI ; then: playwright install chromium)

# movies app must be running on http://localhost:3000
dotnet test
```

`dotnet test` picks up the deliberately-bad [`.runsettings`](./.runsettings) automatically
(single worker, huge timeouts). It writes a `.trx` you can point a report at, plus per-test
traces/videos/screenshots. **Record the total time and test count** — that's your baseline.

> ⏳ **It's slow on purpose** — serial, single-worker, full of sleeps, tracing + video on. That's
> the point. Expect a full run in the **same ~28–30 min ballpark** as the JS baseline. Grab your
> baseline time, then make it fast.

### View a trace

Every test records a Playwright trace zip (an anti-pattern you'll remove):

```bash
pwsh bin/Debug/net8.0/playwright.ps1 show-trace traces/<test-name>.zip
```

## What's here

```
baseline-suite-dotnet/
├── RegressionOptimisation.Baseline.csproj   # NUnit + Microsoft.Playwright.NUnit
├── .runsettings              # deliberately bad: 1 worker, 30s expect timeout
├── AssemblyInfo.cs           # forces serial execution (LevelOfParallelism 1)
├── BaselineTest.cs           # base class: always-on trace + video + screenshot
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
