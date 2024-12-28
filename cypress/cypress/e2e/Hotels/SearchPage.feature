Feature: Search

    Scenario: Successful search
        Verify that the user can perform a search, interact with the filter and sort sidebars, and close them successfully.
        When the user clicks on the search button
        And the user clicks on the filter button
        And the user clicks on the close filter sidebar button
        And the user clicks on the sort button
        And the user clicks on the close sort sidebar button

    Scenario: Successful filter interaction
        Verify that the user can open the filter sidebar and close it successfully.
        When the user clicks on the search button
        And the user clicks on the filter button
        And the user clicks on the close filter sidebar button

    Scenario: Successful sort interaction
        Verify that the user can open the sort sidebar and close it successfully.
        When the user clicks on the search button
        And the user clicks on the sort button
        And the user clicks on the close sort sidebar button

    Scenario: Successful search page load
        Verify that the user is navigated to the search page, the filter and sort buttons are visible, and the user is not on the home page.
        When the user clicks on the search button
        Then the user should be on the "search" page
        And the filter button should exist and be visible
        And the sort button should exist and be visible
        And the user should not be on the "home" page

    Scenario: Successful navigation to home from search
        Verify that the user is navigated back to the home page and not on the search page after clicking the back navigation button.
        When the user clicks on the search button
        And the user clicks on the back navigation button
        Then the user should be on the "home" page
        And the user should not be on the "search" page
