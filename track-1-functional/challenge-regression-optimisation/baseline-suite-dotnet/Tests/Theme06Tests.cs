using System.Text.RegularExpressions;
using Microsoft.Playwright;
using NUnit.Framework;

namespace RegressionOptimisation.Baseline.Tests;

// ~60 tests. Theme toggling, repeated 60 times.
// ANTI-PATTERN: repeats a trivial interaction; re-navigates each time; sleeps.
[TestFixture]
public class Theme06Tests : BaselineTest
{
    public static IEnumerable<TestCaseData> Cases()
    {
        for (int i = 1; i <= 60; i++)
        {
            yield return new TestCaseData(i).SetName($"theme: page renders for toggle attempt {i}/60");
        }
    }

    [CancelAfter(120_000)]
    [Retry(2)]
    [TestCaseSource(nameof(Cases))]
    public async Task Theme(int i)
    {
        await Helpers.OpenLandingPageSlowly(Page);
        // Try to toggle a theme control if present - but don't actually assert the
        // theme changed (over-broad).
        try
        {
            var toggle = Page
                .GetByRole(AriaRole.Button, new() { NameRegex = new Regex("theme|dark|light|mode", RegexOptions.IgnoreCase) })
                .First;
            if (await toggle.CountAsync() > 0)
            {
                await toggle.ClickAsync();
                await Helpers.Sleep(800);
            }
        }
        catch
        {
            // swallow
        }

        await Helpers.Sleep(1000);
        await Expect(Page.Locator("body")).ToBeVisibleAsync();
    }
}
