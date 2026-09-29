using Microsoft.Playwright;
using Reqnroll;

namespace HackDay.MovieTests.Support;

/// <summary>
/// Starts a Playwright browser before each scenario and disposes it afterwards.
/// The page is shared with step definitions via the ScenarioContext.
/// </summary>
[Binding]
public class Hooks
{
    public const string BaseUrl = "http://localhost:3000";

    private IPlaywright? _playwright;
    private IBrowser? _browser;

    private readonly ScenarioContext _scenario;

    public Hooks(ScenarioContext scenario) => _scenario = scenario;

    [BeforeScenario]
    public async Task StartBrowser()
    {
        _playwright = await Playwright.CreateAsync();
        var headed = Environment.GetEnvironmentVariable("HEADED") == "1";
        _browser = await _playwright.Chromium.LaunchAsync(
            new BrowserTypeLaunchOptions { Headless = !headed });
        var context = await _browser.NewContextAsync();
        var page = await context.NewPageAsync();
        _scenario["page"] = page;
    }

    [AfterScenario]
    public async Task StopBrowser()
    {
        if (_browser is not null) await _browser.DisposeAsync();
        _playwright?.Dispose();
    }
}
