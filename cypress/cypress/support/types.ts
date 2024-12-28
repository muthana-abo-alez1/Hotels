export interface IToken {
    access_token: string;
    refresh_token: string;
    id_token: string;
    scope: string;
    expires_in: number;
    token_type: string;
}

export interface IDataLogin {
    authentication:string
    userType:string
    status:number
    title?:string
}
export interface ILogin{
    userName:string,
    password: string
}
export interface IError{
    error:string
}

