export interface ILoginResponse {
    userType: 'Admin' | 'User';
    authentication: string;
}