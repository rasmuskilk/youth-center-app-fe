import React from 'react';
import { AppState } from './AppState';

export const initialState: AppState = {
    jwt: null,
    email: null,
    roles: null,
};

export const AppContext = React.createContext<AppState>(initialState);
export const AppContextProvider = AppContext.Provider;
