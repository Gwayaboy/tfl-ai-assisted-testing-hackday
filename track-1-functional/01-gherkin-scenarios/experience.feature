Feature: Experience - theme, responsiveness and accessibility
  As any user
  I want a consistent, accessible experience across themes and devices
  So that the app is usable and comfortable for everyone

  # Cross-cutting UX + accessibility. For a public body like TfL, accessibility
  # isn't optional - it's a legal and reputational requirement. Great AI-assisted
  # testing territory (Copilot is strong at spotting a11y issues).

  Background:
    Given the user is on the movies app landing page

  # Worked example
  Scenario: Switching to dark mode
    When the user switches the theme to dark mode
    Then the app should be displayed using the dark theme

  # TODO 1 - theme persists across navigation
  # Scenario: Theme choice persists when navigating
  #   Given the user has switched to dark mode
  #   When the user opens a movie's details and returns
  #   Then the app should still be in dark mode

  # TODO 2 - keyboard-only navigation of the primary journey
  # Scenario: Searching using only the keyboard
  #   When the user searches for "Sonic" using only the keyboard
  #   Then the user should be able to reach and read the results without a mouse

  # TODO 3 - meaningful accessible names on key controls
  # Scenario: Key controls have accessible names
  #   Then the search control, theme toggle, and sign-in control
  #     should each expose a clear accessible name

  # TODO 4 (stretch) - responsive layout on a small viewport
  # Scenario: Browsing on a mobile-sized screen
  #   Given the user is on a mobile-sized viewport
  #   Then the movie list should remain usable and readable
