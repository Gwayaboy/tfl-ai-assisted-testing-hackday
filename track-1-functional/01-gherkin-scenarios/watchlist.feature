Feature: Personal watchlists
  As a signed-in user
  I want to create and manage a personal list of movies
  So that I can keep track of films I want to watch

  # Stateful + data-persistence risk. "My lists" only exists when signed in -
  # a great journey for testing authenticated, data-carrying behaviour.

  Background:
    Given the user is signed in as "me@outlook.com"

  # Worked example
  Scenario: Adding a movie to my watchlist
    Given the user is viewing the details for "Sonic the Hedgehog 3"
    When the user adds the movie to their watchlist
    Then "Sonic the Hedgehog 3" should appear in the user's watchlist

  # TODO 1 - viewing the watchlist
  # Scenario: Viewing my watchlist
  #   Given the user has added "Sonic the Hedgehog 3" to their watchlist
  #   When the user opens their watchlist
  #   Then the user should see "Sonic the Hedgehog 3" in the list

  # TODO 2 - removing an item
  # Scenario: Removing a movie from my watchlist
  #   Given "Sonic the Hedgehog 3" is in the user's watchlist
  #   When the user removes it from the watchlist
  #   Then "Sonic the Hedgehog 3" should no longer be in the watchlist

  # TODO 3 - empty state
  # Scenario: An empty watchlist
  #   Given the user has no movies in their watchlist
  #   When the user opens their watchlist
  #   Then the user should see an empty-watchlist message

  # TODO 4 (stretch) - no duplicates
  # Scenario: Adding the same movie twice does not create duplicates
  #   Given "Sonic the Hedgehog 3" is already in the user's watchlist
  #   When the user adds "Sonic the Hedgehog 3" again
  #   Then the watchlist should still contain exactly one "Sonic the Hedgehog 3"
