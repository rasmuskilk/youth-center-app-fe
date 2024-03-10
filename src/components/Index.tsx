import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from '../state/AppContext';
import { getJwtFromLocalStorage } from '../utils/jwtUtil';
import HomePage from './home-page/HomePage';

export const Index = () => {
    const appState = useContext(AppContext);
    appState.jwt = getJwtFromLocalStorage();

    if (!appState.jwt) {
        return <Navigate to={'/login'} replace />;
    }

    // const userIsAdmin = () => {
    //     let roles = appState.roles;
    //     if (!roles) {
    //         const localStorageRoles = localStorage.getItem('roles');
    //         if (localStorageRoles) {
    //             roles = localStorageRoles.split(',');
    //         }
    //     }
    //     return roles && !!roles.find((role) => {
    //         return role === "admin";
    //     });
    // }
    //
    // if (!userIsAdmin()) {
    //     return <Navigate to={"/groups"} replace/>
    // }

    return (
        <div style={{ background: 'white' }}>
            <HomePage />
        </div>
    );
};
