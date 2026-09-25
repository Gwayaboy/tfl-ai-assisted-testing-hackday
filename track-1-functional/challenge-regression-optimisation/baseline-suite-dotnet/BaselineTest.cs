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
