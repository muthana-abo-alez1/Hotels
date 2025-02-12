import { ILogin } from "./types"

export const createLoginBody=(login:ILogin)=>{
    return {...login}
}