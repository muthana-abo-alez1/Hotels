import { IDataLogin, IError } from "@support/types";
import LoginElements from "./LoginElements";

class LoginAssertions extends LoginElements{
  confirmUserTypeResponse(response: Cypress.Chainable<IDataLogin>,userType: string): void {
    response.then((res) => {console.log(res)
      expect(res.userType).to.equal(userType);
    });
  }
  confirmStatusResponse(response: Cypress.Chainable<IDataLogin>,status: string): void {
    response.then((res) => {
      expect(res.status.toString()).to.equal(status);
    });
  }

  confirmMsgResponse(response: Cypress.Chainable<IDataLogin>,title: string): void {
    response.then((res) => {
      expect(res.title).to.equal(title);
    });
  }
  validateUrlNotContainLogin(): void {cy.url().should('not.contain', '/login');}

  validateUrlContain(value:string): void {cy.url().should('contain', value);}

  validateEmailFieldExists(): void {this.usernameInput.should("exist").and("be.visible");}

  validatePasswordFieldExists(): void {this.passwordInput.should("exist").and("be.visible");}

  validateLoginButtonExists(): void {this.submitButton.should("exist").and("be.visible");}

  validateAlertMsg(value:string): void {this.alertMsg.contains(value);}

  validateAlertMsgIsVisible(value: string): void {this.alertMsg.should("be.visible").and("contain", value);}

  validateUserNameHelperMsg(value: string): void { this.userNameHelperMsg.should("exist").and("be.visible").and("contain", value); }

  validatePasswordHelperMsg(value: string): void { this.passwordHelperMsg.should("exist").and("be.visible").and("contain", value); }

}

export default LoginAssertions;
