using NUnit.Framework;

namespace RegressionOptimisation.Baseline.Tests;

// ~60 tests. Each known movie "detail" check repeated 15 times.
// ANTI-PATTERN: this is really a UI test doing what a fast API check could do,
// AND it's repeated 15x per movie for no reason.
[TestFixture]
public class Details05Tests : BaselineTest
{
    public static IEnumerable<TestCaseData> Cases()
    {
        foreach (var movie in Fixtures.KnownMovies)
        {
            for (int i = 1; i <= 15; i++)
            {
                yield return new TestCaseData(movie).SetName($"details: \"{movie}\" is findable (run {i}/15)");
            }
        }
    }

    [CancelAfter(120_000)]
    [Retry(2)]
    [TestCaseSource(nameof(Cases))]
    public async Task Details(string movie)
    {
        await Helpers.SearchSlowly(Page, movie);
        await Helpers.Sleep(1000);
        // Over-broad: doesn't open details or verify the synopsis/rating.
        await Expect(Page.Locator("body")).ToBeVisibleAsync();
    }
}
