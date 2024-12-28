class LoginElements {
    protected get usernameInput() { return cy.get("#username"); }
    protected get passwordInput() { return cy.get("#password"); }
    protected get submitButton() { return cy.get(".MuiLoadingButton-label"); }
    protected get alertMsg() { return cy.get(".MuiAlert-message"); }
    protected get userNameHelperMsg() { return cy.get("#username-helper-text"); }
    protected get passwordHelperMsg() { return cy.get("#password-helper-text"); }
  }
  
  export default LoginElements;
  