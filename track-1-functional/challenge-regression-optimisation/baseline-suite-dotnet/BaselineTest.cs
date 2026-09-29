using System.Collections.Generic;
using Microsoft.Playwright;
using Microsoft.Playwright.NUnit;
using NUnit.Framework;

namespace RegressionOptimisation.Baseline;

// ============================================================================
//  Base class for every baseline test. Deliberately heavyweight.
//  Extends Playwright's PageTest, which gives each test a fresh browser
//  Context + Page (the C# equivalent of the JS `page` fixture).
// ============================================================================
public class BaselineTest : PageTest
{
    // ☁️  Microsoft Playwright Workspaces (Azure App Testing) — cloud browsers.
    //  When PLAYWRIGHT_SERVICE_URL + PLAYWRIGHT_SERVICE_ACCESS_TOKEN are set, connect
    //  the test to the cloud service (the C# equivalent of the JS service config).
    //  With no env vars this returns null and PageTest launches a LOCAL browser — so
    //  plain `dotnet test` on your machine is unchanged.
    //
    //  We build the wsEndpoint ourselves (with the CURRENT api-version) instead of
    //  relying on Playwright's built-in service connect, whose legacy path pins the
    //  now-unsupported "2023-10-01-preview" and fails with HTTP 400. Organiser gives
    //  you the endpoint + access token; see ../MICROSOFT-PLAYWRIGHT-TESTING.md.
    private const string ServiceApiVersion = "2025-09-01";

    public override Task<(string, BrowserTypeConnectOptions?)?> ConnectOptionsAsync()
    {
        var serviceUrl = Environment.GetEnvironmentVariable("PLAYWRIGHT_SERVICE_URL");
        var token = Environment.GetEnvironmentVariable("PLAYWRIGHT_SERVICE_ACCESS_TOKEN");
        if (string.IsNullOrWhiteSpace(serviceUrl) || string.IsNullOrWhiteSpace(token))
        {
            // No service configured → run on a local browser, exactly as before.
            return Task.FromResult<(string, BrowserTypeConnectOptions?)?>(null);
        }

        var os = Uri.EscapeDataString(Environment.GetEnvironmentVariable("PLAYWRIGHT_SERVICE_OS") ?? "linux");
        var runId = Uri.EscapeDataString(Environment.GetEnvironmentVariable("PLAYWRIGHT_SERVICE_RUN_ID") ?? Guid.NewGuid().ToString());
        var exposeNetwork = Environment.GetEnvironmentVariable("PLAYWRIGHT_SERVICE_EXPOSE_NETWORK") ?? "<loopback>";
        var wsEndpoint = $"{serviceUrl}?os={os}&runId={runId}&api-version={ServiceApiVersion}";

        var options = new BrowserTypeConnectOptions
        {
            Timeout = 3 * 60 * 1000, // 3 min to acquire a cloud browser
            ExposeNetwork = exposeNetwork,
            Headers = new Dictionary<string, string>
            {
                ["Authorization"] = $"Bearer {token}",
            },
        };

        return Task.FromResult<(string, BrowserTypeConnectOptions?)?>((wsEndpoint, options));
    }

    // ANTI-PATTERN: point BaseURL at the app AND record video for every single
    // test. The helpers then re-navigate from scratch every time (no reuse),
    // and always-on video recording adds overhead to each test.
    // (BaseURL honours the BASE_URL env var — see Helpers.BaseUrl.)
    public override BrowserNewContextOptions ContextOptions() => new()
    {
        BaseURL = Helpers.BaseUrl,
        RecordVideoDir = "videos/",
    };

    // ANTI-PATTERN: full tracing (screenshots + snapshots + sources) started for
    // EVERY test, pass or fail. Great for debugging one test; pure overhead x300.
    [SetUp]
    public async Task StartTracingSlowly()
    {
        await Context.Tracing.StartAsync(new()
        {
            Screenshots = true,
            Snapshots = true,
            Sources = true,
        });
    }

    // ANTI-PATTERN: write a trace zip AND a screenshot for every test regardless
    // of outcome. Should be retain-on-failure / on-first-retry instead.
    [TearDown]
    public async Task StopTracingSlowly()
    {
        var safe = TestContext.CurrentContext.Test.Name;
        foreach (var c in Path.GetInvalidFileNameChars())
        {
            safe = safe.Replace(c, '_');
        }

        Directory.CreateDirectory("traces");
        await Context.Tracing.StopAsync(new() { Path = Path.Combine("traces", safe + ".zip") });

        Directory.CreateDirectory("screenshots");
        await Page.ScreenshotAsync(new() { Path = Path.Combine("screenshots", safe + ".png") });
    }
}
