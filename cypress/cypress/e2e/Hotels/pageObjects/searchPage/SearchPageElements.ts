class SearchPageElements {
  protected get searchButtonElement() {return cy.get('.css-rap5ln > .MuiButtonBase-root')}
  protected get filterButtonElement() { return cy.get('[data-testid=FilterAltIcon]'); }
  protected get sortButtonElement() { return cy.get('[data-testid=SortIcon]'); }
  protected get closeFilterSidebarElement() { return cy.get('[data-testid=ChevronLeftIcon]').eq(1) }
  protected get backNavigationElement() { return cy.get('[data-testid=ChevronLeftIcon]').eq(0) }
  protected get closeSortSidebarElement() { return cy.get('[data-testid=ChevronRightIcon]') }
}

export default SearchPageElements;
  