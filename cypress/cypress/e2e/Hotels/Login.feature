Feature: Login

        Scenario: Successful login with admin credentials
                Verify that an admin user can successfully log in and is redirected from the login page.
                Given the user visits the login page
                When the user enters userName : "admin"
                And the user enters password : "admin"
                And the user clicks on the login button
                Then the user should not be on the login page
                And the user should be on the admin page
                And the alert message should contain "Login Successful"

        Scenario: Successful login with regular user credentials
                Verify that a regular user can successfully log in and is redirected from the login page.
                Given the user visits the login page
                When the user enters userName : "user"
                And the user enters password : "user"
                And the user clicks on the login button
                Then the user should not be on the login page
                And the user should be on the user page
                And the alert message should contain "Login Successful"


        Scenario: Successful login and verifying user type from API response
                Verify that the user type returned from the API response is "Admin" after a successful login.
                Given the user visits the login page
                When the user enters userName : "admin" and password : "admin"
                Then the user type response equal : "Admin"
                And the status response equal : "200"


        Scenario: Successful login and verifying user type from API response
                Verify that the user type returned from the API response is "User" after a successful login.
                Given the user visits the login page
                When the user enters userName : "user" and password : "user"
                Then the user type response equal : "User"
                And the status response equal : "200"

        Scenario: Failed login and verifying status from API response
                Verify that the status returned from the API response is "400" after a Failed login.
                Given the user visits the login page
                When the user enters userName : "muthana" and password : "muthana"
                Then the status response equal : "401"
                And the msg response equal : "Unauthorized"



        Scenario: Failed login due to invalid credentials
                Verify that the user receives an error message when entering invalid credentials.
                Given the user visits the login page
                When the user enters userName : "MUTHANA"
                And the user enters password : "MUTHANA"
                And the user clicks on the login button
                Then the user should be on the login page
                And the alert message should contain "Error"
                And the alert message should contain "Unauthorized"

        Scenario: Failed login due to missing username
                Verify that the username helper message is displayed when the username is missing.
                Given the user visits the login page
                And the user enters password : "MUTHANA"
                And the user clicks on the login button
                Then the user should be on the login page
                And the username helper message should be "Username is required"

        Scenario: Failed login due to short password
                Verify that the password helper message is displayed when the password is too short.
                Given the user visits the login page
                And the user enters userName : "MUTHANA"
                And the user enters password : "mut"
                And the user clicks on the login button
                Then the user should be on the login page
                And the password helper message should be "Password must be at least 4 characters"

        Scenario: Failed login due to missing password
                Verify that the password helper message is displayed when the password is missing.
                Given the user visits the login page
                And the user enters userName : "MUTHANA"
                And the user clicks on the login button
                Then the user should be on the login page
                And the password helper message should be "Password is required"

        Scenario: Failed login due to missing username and password
                Verify that the appropriate helper messages are displayed when both username and password are missing.
                Given the user visits the login page
                And the user clicks on the login button
                Then the user should be on the login page
                And the username helper message should be "Username is required"
                And the password helper message should be "Password is required"


        Scenario: Check if the email field exists and is visible
                Given the user visits the login page
                Then the email field should exist and be visible

        Scenario: Check if the password field exists and is visible
                Given the user visits the login page
                Then the password field should exist and be visible

        Scenario: Check if the login button exists and is visible
                Given the user visits the login page
                Then the login button should exist and be visible

        Scenario: Check if the email, password field, and login button exist and are visible
                Given the user visits the login page
                Then the email field should exist and be visible
                And the password field should exist and be visible
                And the login button should exist and be visible

