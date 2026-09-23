using Microsoft.Playwright;
using NUnit.Framework;
using Reqnroll;
using HackDay.MovieTests.Support;

namespace HackDay.MovieTests.StepDefinitions;

// Step definitions for MovieSearch.feature.
//
// ONE step is fully implemented (the "exists" path) as a worked example.
// The others are marked TODO — implement them (with Copilot's help) so all three
// scenarios pass. Prefer role/name locators and meaningful assertions.
[Binding]
public class MovieSearchSteps
{
    private readonly ScenarioContext _scenario;
    private IPage Page => (IPage)_scenario["page"];

    public MovieSearchSteps(ScenarioContext scenario) => _scenario = scenario;

    [Given("the user is on the movies app landing page")]
    public async Task GivenTheUserIsOnTheMoviesAppLandingPage()
    {
        await Page.GotoAsync(Hooks.BaseUrl);
        await Assertions.Expect(Page).ToHaveTitleAsync(new System.Text.RegularExpressions.Regex("movie", System.Text.RegularExpressions.RegexOptions.IgnoreCase));
    }

    [When("the user searches for {string}")]
    public async Task WhenTheUserSearchesFor(string title)
    {
        await Page.GetByRole(AriaRole.Search).ClickAsync();
        var box = Page.GetByRole(AriaRole.Textbox, new() { NameRegex = new("search", System.Text.RegularExpressions.RegexOptions.IgnoreCase) });
        await box.FillAsync(title);
        await box.PressAsync("Enter");
        await Page.WaitForLoadStateAsync(LoadState.NetworkIdle);
    }

    [Then("the user should see results related to {string}")]
    public async Task ThenTheUserShouldSeeResultsRelatedTo(string title)
    {
        var results = Page.Locator(".movie-card, [data-testid='movie-card']");
        await Assertions.Expect(results.First).ToBeVisibleAsync();
        await Assertions.Expect(
            Page.GetByText(new System.Text.RegularExpressions.Regex(title, System.Text.RegularExpressions.RegexOptions.IgnoreCase)).First
        ).ToBeVisibleAsync();
    }

    // -------------------------------------------------------------------------
    // TODO: assert the no-results / empty-state message.
    // Explore the app to find the exact wording, then assert it's visible.
    // -------------------------------------------------------------------------
    [Then("the user should be told that no matching movies were found")]
    public Task ThenTheUserShouldBeToldThatNoMatchingMoviesWereFound()
    {
        // HINT:
        //   await Assertions.Expect(Page.GetByText(new Regex("no .*results|nothing found", RegexOptions.IgnoreCase))).ToBeVisibleAsync();
        throw new NotImplementedException("TODO: assert the empty-state / no-results message");
    }

    // -------------------------------------------------------------------------
    // TODO: implement the empty-query behaviour your team agreed in Lab 01.
    // -------------------------------------------------------------------------
    [Then("the user should still see the browsable movie list")]
    public Task ThenTheUserShouldStillSeeTheBrowsableMovieList()
    {
        // HINT:
        //   await Assertions.Expect(Page.Locator(".movie-list, [data-testid='movie-list']")).ToBeVisibleAsync();
        throw new NotImplementedException("TODO: assert the browse/movie list is still visible");
    }
}
