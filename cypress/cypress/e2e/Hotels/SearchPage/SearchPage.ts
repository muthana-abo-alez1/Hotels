import {
    When,
    Then,
    Given,
    Before,BeforeAll
  } from "@badeball/cypress-cucumber-preprocessor";

  import SearchAssertions from "../pageObjects/searchPage/assertions";
  import SearchActions from "../pageObjects/searchPage/actions";

const searchAssertions = new SearchAssertions()
const searchActions = new SearchActions()

Before(() => {
    cy.userLogin();
});

When("the user clicks on the search button",()=>{
    searchActions.searchButtonClick()
})

When("the user clicks on the filter button",()=>{
    searchActions.filterButtonClick()
})

When("the user clicks on the sort button",()=>{
    searchActions.sortButtonClick()
})

When("the user clicks on the close filter sidebar button",()=>{
    searchActions.closeFilterSidebarButtonClick()
})

When("the user clicks on the close sort sidebar button",()=>{
    searchActions.closeSortSidebarButtonClick()
})

When("the user clicks on the back navigation button",()=>{
    searchActions.backNavigationButtonClick()
})
Then("the user should be on the {string} page",(value:string)=>{
    searchAssertions.validateUrlContain(value)
})
Then("the user should not be on the {string} page",(value:string)=>{
    searchAssertions.validateUrlNotContain(value)
})
Then("the filter button should exist and be visible", () => {
    searchAssertions.validateFilterIconVisible(); 
});
Then("the sort button should exist and be visible", () => {
    searchAssertions.validateSortIconVisible(); 
});
