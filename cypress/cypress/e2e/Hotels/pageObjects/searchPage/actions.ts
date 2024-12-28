import SearchPageElements from "./SearchPageElements"

class SearchActions extends SearchPageElements{
 
  searchButtonClick=()=>{this.searchButtonElement.click()}

  filterButtonClick=()=>{this.filterButtonElement.click()}

  sortButtonClick=()=>{this.sortButtonElement.click()}

  closeFilterSidebarButtonClick=()=>{this.closeFilterSidebarElement.click()}

  closeSortSidebarButtonClick=()=>{this.closeSortSidebarElement.click()}

  backNavigationButtonClick=()=>{this.backNavigationElement.click()}




}

export default SearchActions;
