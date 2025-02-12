export interface AuthenticationResponse {
    userType: 'Admin' | 'User';
    authentication: string;
}