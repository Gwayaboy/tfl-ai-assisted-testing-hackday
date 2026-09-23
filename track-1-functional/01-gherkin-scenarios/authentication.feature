Feature: Authentication
  As a returning user
  I want to log in and log out
  So that I can access my personalised experience securely

  # Security + session risk. Auth is a classic regression hotspot: it breaks
  # quietly and affects everything behind it.

  # Test credentials (public demo user): me@outlook.com / 12345

  Background:
    Given the user is on the movies app landing page

  # Worked example
  Scenario: Logging in with valid credentials
    When the user logs in as "me@outlook.com" with password "12345"
    Then the user should be signed in
    And personalised features should become available

  # TODO 1 - invalid credentials are rejected clearly
  # Scenario: Logging in with an incorrect password
  #   When the user logs in as "me@outlook.com" with password "wrong-password"
  #   Then the user should remain signed out
  #   And the user should see a clear, non-technical error message

  # TODO 2 - logging out ends the session
  # Scenario: Logging out
  #   Given the user is signed in as "me@outlook.com"
  #   When the user logs out
  #   Then the user should be signed out
  #   And personalised features should no longer be available

  # TODO 3 - anonymous users can't reach protected areas
  # Scenario: Accessing a personalised area while signed out
  #   Given the user is not signed in
  #   When the user tries to open their personal lists
  #   Then the user should be prompted to sign in

  # TODO 4 (stretch) - session persistence across a reload
  # Scenario: Staying signed in after a page reload
  #   Given the user is signed in as "me@outlook.com"
  #   When the user reloads the page
  #   Then the user should still be signed in
