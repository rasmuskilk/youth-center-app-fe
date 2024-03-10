import {JWTResponse} from "../domain/JWTResponse";

export interface AppState {
    token: JWTResponse | null;
    email: string | null;
    roles: string[] | null;
}
