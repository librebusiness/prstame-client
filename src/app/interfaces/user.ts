export interface User {
    _id: string,
    name: string,
    email: string,
    role: string,
    api_token: string,
    referred: string,
    emailConfirmed: boolean,
}
