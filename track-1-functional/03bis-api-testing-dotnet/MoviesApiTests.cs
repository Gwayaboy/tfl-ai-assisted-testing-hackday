// API tests against the movies app — C# / .NET mirror of the JS lab (../03-api-testing).
//
// IMPORTANT: The exact endpoint path may differ — use step 1 of the README (Copilot + MCP,
// or DevTools > Network) to discover the real search endpoint, then update SearchPath().
//
// One worked test is provided (it fetches the app root and checks it responds).
// The TODO tests are marked [Ignore] for you to implement once you've found the search API.

using Microsoft.Playwright;
using NUnit.Framework;

namespace HackDay.MovieApiTests;

[TestFixture]
public class MoviesApiTests
{
    private IPlaywright _playwright = null!;
    private IAPIRequestContext _request = null!;

    // Base URL of the SUT. Override with the BASE_URL environment variable if needed.
    private static string BaseUrl =>
        Environment.GetEnvironmentVariable("BASE_URL") ?? "http://localhost:3000";

    // TODO: replace with the real search endpoint you discover (e.g. "/api/search?query=").
    private static string SearchPath(string query) =>
        $"/api/search?query={Uri.EscapeDataString(query)}";

    [SetUp]
    public async Task SetUp()
    {
        _playwright = await Playwright.CreateAsync();
        _request = await _playwright.APIRequest.NewContextAsync(new()
        {
            BaseURL = BaseUrl,
        });
    }

    [TearDown]
    public async Task TearDown()
    {
        await _request.DisposeAsync();
        _playwright.Dispose();
    }

    [Test]
    public async Task TheAppRespondsAtTheRoot()
    {
        // Worked example: sanity-check the SUT is up.
        var res = await _request.GetAsync("/");
        Assert.That(res.Ok, Is.True);
    }

    // -----------------------------------------------------------------------
    // TODO 1: a search for a known movie returns matching results.
    // -----------------------------------------------------------------------
    [Test]
    [Ignore("TODO: assert matching results")]
    public async Task SearchReturnsResultsWhoseTitlesMatchTheQuery()
    {
        var res = await _request.GetAsync(SearchPath("Sonic"));
        Assert.That(res.Ok, Is.True);
        var body = await res.JsonAsync();
        // HINT: assert body has a non-empty results array and at least one
        // item's title contains "Sonic", e.g.:
        //   var results = body!.Value.GetProperty("results");
        //   Assert.That(results.GetArrayLength(), Is.GreaterThan(0));
        Assert.Fail("TODO: assert matching results");
    }

    // -----------------------------------------------------------------------
    // TODO 2: a nonsense search returns an EMPTY set, not an error.
    // -----------------------------------------------------------------------
    [Test]
    [Ignore("TODO: assert empty results")]
    public async Task NonsenseSearchReturnsAnEmptyResultSet()
    {
        var res = await _request.GetAsync(SearchPath("ThisMovieDoesNotExist12345"));
        Assert.That(res.Ok, Is.True);
        // HINT: assert the results array is empty (not a 4xx/5xx error).
        Assert.Fail("TODO: assert empty results");
    }

    // -----------------------------------------------------------------------
    // TODO 3: the response has the expected JSON shape.
    // -----------------------------------------------------------------------
    [Test]
    [Ignore("TODO: assert response shape")]
    public async Task SearchResponseItemsHaveTheExpectedShape()
    {
        var res = await _request.GetAsync(SearchPath("Sonic"));
        var body = await res.JsonAsync();
        // HINT: pick the first item and assert the fields you rely on exist,
        // e.g. id, title, image/poster, rating.
        Assert.Fail("TODO: assert response shape");
    }
}
