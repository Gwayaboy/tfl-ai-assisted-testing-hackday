using Azure.Developer.Playwright;
using Azure.Developer.Playwright.NUnit;
using Azure.Identity;
using NUnit.Framework;

namespace RegressionOptimisation.Baseline;

// ============================================================================
//  ☁️  Microsoft Playwright Workspaces (Azure App Testing) — cloud browsers.
//
//  This is the C# equivalent of the JS suite's playwright.service.config.ts.
//  It's a NUnit [SetUpFixture], so it wires every test in this assembly to run
//  on the cloud service — BUT ONLY when PLAYWRIGHT_SERVICE_URL is set. With no
//  env var, this fixture is a no-op and `dotnet test` runs locally exactly as
//  before (so your local baseline is unaffected).
//
//  Run your optimised suite on 20 parallel cloud browsers:
//    # organiser gives you BOTH of these:
//    $env:PLAYWRIGHT_SERVICE_URL="wss://<region>.api.playwright.microsoft.com/playwrightworkspaces/<id>/browsers"
//    $env:PLAYWRIGHT_SERVICE_ACCESS_TOKEN="<token>"
//    dotnet test -- NUnit.NumberOfTestWorkers=20
//
//  Auth: uses the access token (PLAYWRIGHT_SERVICE_ACCESS_TOKEN) when present —
//  the path TfL participants use, no Azure sign-in needed. If no token is set but
//  the endpoint is, it falls back to Microsoft Entra ID (`az login`) for organisers.
//  Full walkthrough: ../MICROSOFT-PLAYWRIGHT-TESTING.md
// ============================================================================
[SetUpFixture]
public class PlaywrightServiceSetup : PlaywrightServiceBrowserNUnit
{
    public PlaywrightServiceSetup()
        : base(credential: new DefaultAzureCredential(), options: BuildOptions())
    {
    }

    private static PlaywrightServiceBrowserClientOptions BuildOptions()
    {
        var options = new PlaywrightServiceBrowserClientOptions();

        // Prefer access-token auth when a token is supplied (participants); otherwise
        // leave the default (Microsoft Entra ID) so organisers can use `az login`.
        var token = Environment.GetEnvironmentVariable("PLAYWRIGHT_SERVICE_ACCESS_TOKEN");
        if (!string.IsNullOrWhiteSpace(token))
        {
            options.ServiceAuth = ServiceAuthType.AccessToken;
        }

        return options;
    }
}
