/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
//Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
declare namespace Cypress {
  interface Chainable {
    login(username: string, password: string): void;
    userLogin(): void;
    adminLogin(): void;
  }
}

Cypress.Commands.add('login', (username: string, password: string) => {
  cy.visit("http://localhost:3000/login");
  cy.get('#username').type(username);
  cy.get('#password').type(password);
  cy.get(".MuiLoadingButton-label").click();

  cy.url().should('not.contain', '/login');

  cy.getCookie('token').then((cookie) => {
    if (cookie) {
      const token = cookie.value; 
      Cypress.env('token', token);  
      cy.setCookie('token', token); 
    }
  });
});
Cypress.Commands.add('userLogin', () => {
  cy.login('user', 'user');
});

Cypress.Commands.add('adminLogin', () => {
  cy.login('admin', 'admin');
});

