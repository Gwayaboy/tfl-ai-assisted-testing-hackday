using NUnit.Framework;

namespace RegressionOptimisation.Baseline.Tests;

// ~60 tests. The SAME "landing page loads" smoke check, 60 times.
// ANTI-PATTERN: over-broad + massively duplicated. In reality one good
// smoke test (or a handful) covers this.
[TestFixture]
public class BrowseSmoke04Tests : BaselineTest
{
    public static IEnumerable<TestCaseData> Cases()
    {
        for (int i = 1; i <= 60; i++)
        {
            yield return new TestCaseData(i).SetName($"smoke: landing page loads ({i}/60)");
        }
    }

    [CancelAfter(120_000)]
    [Retry(2)]
    [TestCaseSource(nameof(Cases))]
    public async Task Smoke(int i)
    {
        await Helpers.OpenLandingPageSlowly(Page);
        await Helpers.Sleep(1000); // yet another sleep
        await Expect(Page.Locator("body")).ToBeVisibleAsync();
    }
}
