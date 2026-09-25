using System.Text.RegularExpressions;
using Microsoft.Playwright;

namespace RegressionOptimisation.Baseline;

// ============================================================================
//  Shared helpers for the baseline suite - written the SLOW way on purpose.
//  These embody the anti-patterns you'll optimise away (see ANTIPATTERNS.md).
// ============================================================================
public static class Helpers
{
    // The app under test. Override with the BASE_URL env var to point at another
    // instance, e.g. the hosted app:
    //   BASE_URL=https://debs-obrien.github.io/playwright-movies-app/
    public static readonly string BaseUrl =
        Environment.GetEnvironmentVariable("BASE_URL") ?? "http://localhost:3000";

    // ANTI-PATTERN: a fixed sleep. Almost never the right tool - web-first
    // assertions wait exactly as long as needed and no longer.
    public static Task Sleep(int ms = 1500) => Task.Delay(ms);

    // ANTI-PATTERN: every test re-navigates from scratch and then sleeps,
    // instead of sharing setup / using web-first waits.
    public static async Task OpenLandingPageSlowly(IPage page)
    {
        await page.GotoAsync(BaseUrl);
        await page.WaitForLoadStateAsync(LoadState.NetworkIdle);
        await Sleep(1500); // pointless extra wait
        // Over-broad "assertion" that barely checks anything.
        await Assertions.Expect(page).ToHaveTitleAsync(new Regex(".+"));
    }

    // ANTI-PATTERN: a resilient-but-pointless search that always sleeps,
    // swallows detail, and asserts almost nothing.
    public static async Task SearchSlowly(IPage page, string term)
    {
        await OpenLandingPageSlowly(page);
        try
        {
            var search = page.GetByRole(AriaRole.Search);
            if (await search.CountAsync() > 0)
            {
                await search.ClickAsync();
                await Sleep(800);
            }

            var box = page.GetByRole(AriaRole.Textbox).First;
            if (await box.CountAsync() > 0)
            {
                await box.FillAsync(term);
                await box.PressAsync("Enter");
            }
        }
        catch
        {
            // ANTI-PATTERN: swallow errors so the test stays green no matter what.
        }

        await page.WaitForLoadStateAsync(LoadState.NetworkIdle);
        await Sleep(1500); // and another sleep for good measure
        // Over-broad assertion: the page still exists. Tells us almost nothing.
        await Assertions.Expect(page.Locator("body")).ToBeVisibleAsync();
    }
}
