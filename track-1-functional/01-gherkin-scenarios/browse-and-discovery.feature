Feature: Browse and discovery
  As a visitor
  I want to browse and discover movies without searching
  So that I can find something to watch even when I don't know the title

  # Most users land and BROWSE before they search - this journey carries a lot of
  # real traffic, so it belongs in any serious regression pack.

  Background:
    Given the user is on the movies app landing page

  # Worked example
  Scenario: The landing page shows a browsable list of movies
    Then the user should see a list of movies with titles and poster images

  # TODO 1 - categories / genres (if present in your build)
  # Scenario: Filtering by a category shows only relevant movies
  #   When the user opens the "Action" category
  #   Then every movie shown should belong to the "Action" category

  # TODO 2 - pagination / "load more"
  # Scenario: Loading more movies appends to the list
  #   Given the user has scrolled to the end of the first page of movies
  #   When the user loads the next set of movies
  #   Then additional movies should be appended without losing the earlier ones

  # TODO 3 - a movie card exposes the key information a user needs to choose
  # Scenario: Each movie card shows enough to make a choice
  #   Then each movie card should show at least a title, a poster, and a rating

  # TODO 4 (stretch) - opening a movie from the browse list
  # Scenario: Selecting a browsed movie opens its details
  #   When the user selects the first movie in the list
  #   Then the user should be taken to that movie's details
