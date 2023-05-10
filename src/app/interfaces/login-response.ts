import { User } from "./user";

export interface LoginResponse {
    code: number,
    message: string,
    token: string,
    data: User,
}