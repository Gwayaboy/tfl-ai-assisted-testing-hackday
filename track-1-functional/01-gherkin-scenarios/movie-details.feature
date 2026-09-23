Feature: Movie details
  As a movie fan
  I want to view the details of a movie
  So that I can decide whether I want to watch it

  # Content-integrity + deep-link risk: details pages are often reached directly
  # from search engines or shared links, so they must stand on their own.

  Background:
    Given the user is on the movies app landing page

  # Worked example
  Scenario: Viewing details for a chosen movie
    When the user opens the details for "Sonic the Hedgehog 3"
    Then the details page should show the title "Sonic the Hedgehog 3"
    And the details page should show a synopsis and a rating

  # TODO 1 - returning to where you came from
  # Scenario: Returning from details preserves the previous results
  #   Given the user searched for "Sonic" and opened a result's details
  #   When the user goes back
  #   Then the user should return to the "Sonic" results they came from

  # TODO 2 - the details page is directly linkable (deep link)
  # Scenario: Opening a movie details page directly by its URL
  #   When the user navigates directly to a known movie's details URL
  #   Then the correct movie's details should be displayed

  # TODO 3 (stretch) - graceful handling of an unknown movie id
  # Scenario: Opening details for a movie that does not exist
  #   When the user navigates to a details URL for a non-existent movie
  #   Then the user should see a "not found" experience rather than a crash
