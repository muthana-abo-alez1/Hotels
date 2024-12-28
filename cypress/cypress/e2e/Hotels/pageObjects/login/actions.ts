import LoginElements from "./LoginElements";

class LoginActions extends LoginElements{

  visitLoginPage = () => {cy.visit("http://localhost:3000/login");}

  typeEmail = (email: string) => {cy.get("#username").type(email);}

  typePassword = (password: string) => {this.passwordInput.type(password);}
  
  submitLogin = () => {this.submitButton.click();}
}

export default LoginActions;
