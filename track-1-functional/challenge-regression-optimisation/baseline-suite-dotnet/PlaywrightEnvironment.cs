using System;
using Microsoft.Playwright;
using NUnit.Framework;

namespace RegressionOptimisation.Baseline;

// Assembly-level setup so the baseline "just runs" in GitHub Codespaces / VS Code
// dev containers, where two things otherwise break `dotnet test`:
//
//  1. VS Code sets BROWSER=/vscode/.../helpers/browser.sh (so tools can open a
//     browser). The Playwright NUnit adapter (<= 1.48) mistakes that for the
//     Playwright browser name and throws "Invalid browser name from 'BROWSER'".
//     We clear the bogus value so it falls back to chromium.
//
//  2. Codespaces pre-installs the *JS* Playwright browser build (a different
//     revision), so the .NET package cannot find the chromium build it expects.
//     We install it on first run (idempotent - a no-op once present).
[SetUpFixture]
public class PlaywrightEnvironment
{
    [OneTimeSetUp]
    public void EnsurePlaywrightReady()
    {
        var browser = Environment.GetEnvironmentVariable("BROWSER");
        if (!string.IsNullOrEmpty(browser)
            && browser != "chromium" && browser != "firefox" && browser != "webkit")
        {
            Environment.SetEnvironmentVariable("BROWSER", null);
        }

        var exitCode = Microsoft.Playwright.Program.Main(new[] { "install", "chromium" });
        if (exitCode != 0)
        {
            throw new Exception($"Playwright browser install failed with exit code {exitCode}.");
        }
    }
}
