Feature: Movie Search
  As a movie fan
  I want to search for a movie by title
  So that I can quickly find the movie I want to watch

  Scenario: Searching for a movie that exists
    Given the user is on the movies app landing page
    When the user searches for "Sonic the Hedgehog 3"
    Then the user should see results related to "Sonic the Hedgehog 3"

  Scenario: Searching for a movie that does not exist
    Given the user is on the movies app landing page
    When the user searches for "ThisMovieDoesNotExist12345"
    Then the user should be told that no matching movies were found

  Scenario: Searching with an empty query
    Given the user is on the movies app landing page
    When the user searches for ""
    Then the user should still see the browsable movie list
