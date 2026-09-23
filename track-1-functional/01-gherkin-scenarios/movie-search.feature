Feature: Movie Search
  As a movie fan
  I want to search for a movie by title
  So that I can quickly find the movie I want to watch

  Background:
    Given the user is on the movies app landing page

  # ---------------------------------------------------------------------------
  # Worked example - a good, behaviour-focused scenario.
  # ---------------------------------------------------------------------------
  Scenario: Searching for a movie that exists
    When the user searches for "Sonic the Hedgehog 3"
    Then the user should see results related to "Sonic the Hedgehog 3"

  # ---------------------------------------------------------------------------
  # TODO 1 - a search that returns no results.
  # Think: what should the user SEE when nothing matches? (an empty state / message)
  # ---------------------------------------------------------------------------
  Scenario: Searching for a movie that does not exist
    When the user searches for "ThisMovieDoesNotExist12345"
    Then the user should be told that no matching movies were found

  # ---------------------------------------------------------------------------
  # TODO 2 - searching with an empty query. Decide the expected behaviour with
  # your team, then assert it (e.g. the browse list remains).
  # ---------------------------------------------------------------------------
  # Scenario: Searching with an empty query
  #   When the user searches for ""
  #   Then ...

  # ---------------------------------------------------------------------------
  # TODO 3 (stretch) - partial and case-insensitive matching (real user behaviour).
  # ---------------------------------------------------------------------------
  # Scenario Outline: Partial and case-insensitive search
  #   When the user searches for "<query>"
  #   Then the user should see results related to "<expected>"
  #
  #   Examples:
  #     | query  | expected |
  #     | sonic  | Sonic    |
  #     | SONIC  | Sonic    |
  #     | son    | Sonic    |

  # ---------------------------------------------------------------------------
  # TODO 4 (stretch) - special characters / whitespace shouldn't crash search.
  #   e.g. "  ", "%%%", a very long string. A robust app degrades gracefully.
  # ---------------------------------------------------------------------------
