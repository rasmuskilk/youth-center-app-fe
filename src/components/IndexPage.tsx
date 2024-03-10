import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from '../state/AppContext';
import { getJwtFromLocalStorage } from '../utils/jwtUtil';
import HomePage from './home-page/HomePage';
import CenterPage from "./center-page/CenterPage";

export const Index = () => {
    const appState = useContext(AppContext);
    appState.jwt = getJwtFromLocalStorage();

    if (!appState.jwt) {
        return <Navigate to={'/login'} replace />;
    }

    return (
        <div style={{ background: 'white' }}>
            <HomePage />
            <CenterPage />
        </div>
    );
};
