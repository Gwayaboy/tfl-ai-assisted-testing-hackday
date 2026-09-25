using NUnit.Framework;

namespace RegressionOptimisation.Baseline.Tests;

// ~40 tests. Data-driven search over every term.
// ANTI-PATTERN: each iteration re-opens the app and sleeps (see Helpers.cs).
[TestFixture]
public class Search01Tests : BaselineTest
{
    public static IEnumerable<TestCaseData> Cases()
    {
        foreach (var term in Fixtures.SearchTerms)
        {
            yield return new TestCaseData(term).SetName($"search: \"{term}\" runs without error");
        }
    }

    [CancelAfter(120_000)]    // ANTI-PATTERN: enormous per-test timeout.
    [Retry(2)]                // ANTI-PATTERN: retries masking flakiness.
    [TestCaseSource(nameof(Cases))]
    public async Task Search(string term)
    {
        await Helpers.SearchSlowly(Page, term);
        // Over-broad assertion - doesn't actually check the results match.
        await Expect(Page.Locator("body")).ToBeVisibleAsync();
    }
}
