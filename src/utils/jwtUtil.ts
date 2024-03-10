import { JWTResponse } from "../domain/JWTResponse";

export const getJwtFromLocalStorage = (): JWTResponse | null=> {
    let jwt;
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');

    if (token && refreshToken) {
        jwt = {
            token,
            refreshToken
        }
    }
    if (jwt) {
        return jwt;
    }
    return null;
}

export const getEmailFromLocalStorage = (): string | null => {
    const email = localStorage.getItem('email');
    return email ? email : null;
}

export const setLocalStorageAppState = (data: JWTResponse, email: string) => {
    const roles = data.roles ? data.roles?.join(',') : '';
    localStorage.setItem('token', data.token);
    localStorage.setItem('refreshToken', data.refreshToken);
    localStorage.setItem('email', email);
    localStorage.setItem('roles', roles)
}

export const unsetLocalStorage = () => {
    localStorage.clear();
}
