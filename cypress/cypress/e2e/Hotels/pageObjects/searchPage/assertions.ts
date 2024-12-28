import SearchPageElements from "./SearchPageElements";

class SearchAssertions extends SearchPageElements{
  
    validateUrlContain(value:string): void {cy.url().should('contain', value);}
    validateUrlNotContain(value:string): void {cy.url().should('not.contain', value);}
    validateFilterIconVisible():void{this.filterButtonElement.should("exist").and("be.visible");}
    validateSortIconVisible():void{this.sortButtonElement.should("exist").and("be.visible");}


}

export default SearchAssertions;
