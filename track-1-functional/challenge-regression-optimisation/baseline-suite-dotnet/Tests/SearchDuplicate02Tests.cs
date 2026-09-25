using NUnit.Framework;

namespace RegressionOptimisation.Baseline.Tests;

// ~40 tests. THIS FILE IS A NEAR-DUPLICATE of Search01Tests.
// ANTI-PATTERN: duplicated coverage - the same searches, re-run under a
// different test name. A prime target for de-duplication.
[TestFixture]
public class SearchDuplicate02Tests : BaselineTest
{
    public static IEnumerable<TestCaseData> Cases()
    {
        foreach (var term in Fixtures.SearchTerms)
        {
            yield return new TestCaseData(term).SetName($"regression search (dup): \"{term}\"");
        }
    }

    [CancelAfter(120_000)]
    [Retry(2)]
    [TestCaseSource(nameof(Cases))]
    public async Task SearchDuplicate(string term)
    {
        await Helpers.SearchSlowly(Page, term);
        await Expect(Page.Locator("body")).ToBeVisibleAsync();
    }
}
