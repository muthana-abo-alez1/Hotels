import AdminElements from "./AdminElements";

class AdminAssertions extends AdminElements{

    validateUrlContain(value:string): void {cy.url().should('contain', value);}
    validateUrlNotContain(value:string): void {cy.url().should('not.contain', value);}
    validatePageTitleContains(value:string): void {this.titlePage.should('contain', value)}


}
export default AdminAssertions