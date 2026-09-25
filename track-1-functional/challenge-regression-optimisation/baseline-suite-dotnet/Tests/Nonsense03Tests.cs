using NUnit.Framework;

namespace RegressionOptimisation.Baseline.Tests;

// ~40 tests. Each nonsense term repeated 10 times.
// ANTI-PATTERN: pointless repetition inflates the suite without adding coverage.
[TestFixture]
public class Nonsense03Tests : BaselineTest
{
    public static IEnumerable<TestCaseData> Cases()
    {
        foreach (var term in Fixtures.NonsenseTerms)
        {
            for (int i = 1; i <= 10; i++)
            {
                yield return new TestCaseData(term).SetName($"nonsense search \"{term}\" (run {i}/10)");
            }
        }
    }

    [CancelAfter(120_000)]
    [Retry(2)]
    [TestCaseSource(nameof(Cases))]
    public async Task Nonsense(string term)
    {
        await Helpers.SearchSlowly(Page, term);
        // Doesn't even assert the empty-state - just that the page survived.
        await Expect(Page.Locator("body")).ToBeVisibleAsync();
    }
}
