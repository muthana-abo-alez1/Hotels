export function setTheme(value:string){
    localStorage.setItem("theme",value)
}
export function getTheme(){
    return localStorage.getItem("theme")
}