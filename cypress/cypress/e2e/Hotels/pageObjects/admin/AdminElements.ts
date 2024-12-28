class AdminElements{
    protected get hotelsSidebarButton() { return cy.get('[href="/admin/hotels"] > .MuiButtonBase-root'); }
    protected get roomsSidebarButton() { return cy.get('[href="/admin/rooms"] > .MuiButtonBase-root'); }
    protected get citiesSidebarButton() { return cy.get('[href="/admin/cities"] > .MuiButtonBase-root'); }   
    protected get titlePage(){ return cy.get('.MuiTypography-root')} 

}
export default AdminElements