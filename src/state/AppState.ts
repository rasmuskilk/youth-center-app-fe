import { JWTResponse } from '../domain/JWTResponse';

export interface AppState {
    jwt: JWTResponse | null;
    email: string | null;
    roles: string[] | null;
}
