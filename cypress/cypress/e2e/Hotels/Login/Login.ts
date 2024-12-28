import {
  When,
  Then,
  Given,
  Before,
} from "@badeball/cypress-cucumber-preprocessor";
import SharedDataUtils from "../pageObjects/sharedDataUtils";
import { IDataLogin } from "@support/types";
import LoginActions from "../pageObjects/login/actions";
import LoginAssertions from "../pageObjects/login/assertions";

const sharedDataUtils = new SharedDataUtils();
const loginAssertions = new LoginAssertions();
const loginActions = new LoginActions();

let USERNAME = "";
let PASSWORD = "";
let RESPONSE: Cypress.Chainable<IDataLogin> = null;

Given("the user visits the login page", () => {
  loginActions.visitLoginPage();
});

When("the user enters userName : {string}", (userName: string) => {
  loginActions.typeEmail(userName);
});
When("the user enters password : {string}", (password: string) => {
  loginActions.typePassword(password);
});
When("the user clicks on the login button", () => {
  loginActions.submitLogin();
});
When("the email input exists", () => {
  loginAssertions.validateEmailFieldExists;
});
When("the password input exists", () => {
  loginAssertions.validatePasswordFieldExists();
});

When("the login button exists", () => {
  loginAssertions.validateLoginButtonExists();
});

When(
  "the user enters userName : {string} and password : {string}",
  (userName: string, password: string) => {
    USERNAME = userName;
    PASSWORD = password;
    RESPONSE = sharedDataUtils.login({ userName: USERNAME, password: PASSWORD });
  }
);

Then("the user type response equal : {string}", (value: string) => {
  loginAssertions.confirmUserTypeResponse(RESPONSE, value);
});

Then("the status response equal : {string}", (status: string) => {
  loginAssertions.confirmStatusResponse(RESPONSE, status);
});

Then("the msg response equal : {string}", (value: string) => {
  loginAssertions.confirmMsgResponse(RESPONSE, value);
});

Then("the user should not be on the login page", () => {
  loginAssertions.validateUrlNotContainLogin();
});
Then("the user should be on the login page", () => {
  loginAssertions.validateUrlContain("login");
});
Then("the user should be on the user page", () => {
  loginAssertions.validateUrlContain("user");
});
Then("the user should be on the admin page", () => {
  loginAssertions.validateUrlContain("admin");
});
Then("the alert message should contain {string}", (message: string) => {
  loginAssertions.validateAlertMsgIsVisible(message);
});

Then("the email field should exist and be visible", () => {
  loginAssertions.validateEmailFieldExists(); 
});

Then("the password field should exist and be visible", () => {
  loginAssertions.validatePasswordFieldExists();
});

Then("the login button should exist and be visible", () => {
  loginAssertions.validateLoginButtonExists(); 
});

Then('the username helper message should be {string}', (message: string) => {
  loginAssertions.validateUserNameHelperMsg(message);
});

Then('the password helper message should be {string}', (message: string) => {
  loginAssertions.validatePasswordHelperMsg(message);
});