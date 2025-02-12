import { IDataLogin, IError, ILogin } from "../../../support/types";

export const createLoginBody = (login: ILogin) => {
    return { ...login };
};

class SharedDataUtils {
    login(login: ILogin): Cypress.Chainable<IDataLogin> {
        return cy.request({
            method: "POST",
            url: "https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/api/auth/authenticate",
            body: createLoginBody(login),
            headers: {},
            failOnStatusCode: false
        }).then((response) => {
            return {
                ...response.body,
                status: response.status,
            };
        });
    }
}

export default SharedDataUtils;
