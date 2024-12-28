import {
    When,
    Then,
    Given,
    Before,
} from "@badeball/cypress-cucumber-preprocessor";
import AdminAssertions from "../pageObjects/admin/assertions";
import AdminActions from "../pageObjects/admin/action";

const adminAssertions = new AdminAssertions()
const adminActions = new AdminActions()

Before(() => {
    cy.adminLogin();
});

When("the admin clicks on the hotels sidebar button",()=>{
    adminActions.hotelsSidebarButtonClick()
})
When("the admin clicks on the rooms sidebar button",()=>{
    adminActions.roomsSidebarButtonClick()
})
When("the admin clicks on the cities sidebar button",()=>{
    adminActions.citiesSidebarButtonClick()
})







Then("the page title should contain {string}", (value: string) => {
    adminAssertions.validatePageTitleContains(value);
});

Then("the user should be on the {string} page",(value:string)=>{
    adminAssertions.validateUrlContain(value)
})
Then("the user should not be on the {string} page",(value:string)=>{
    adminAssertions.validateUrlNotContain(value)
})