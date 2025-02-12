Feature: Admin

    Scenario: Successful hotels admin page load
    When the admin clicks on the hotels sidebar button
    Then the user should be on the "hotels" page
    And the user should not be on the "login" page
    And the page title should contain "Hotels"

    Scenario: Successful cities admin page load
    When the admin clicks on the cities sidebar button
    Then the user should be on the "cities" page
    And the user should not be on the "login" page
    And the page title should contain "Cities"

    Scenario: Successful rooms admin page load
    When the admin clicks on the rooms sidebar button
    Then the user should be on the "rooms" page
    And the user should not be on the "login" page
    
