import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from '../state/AppContext';
import { getJwtFromLocalStorage } from '../utils/jwtUtil';
import HomePage from './home-page/HomePage';
import CenterPage from "./center-page/CenterPage";
import GroupsPage from "./activity-group-page/GroupsPage";
import ActivityPage from "./activity-page/ActivityPage";
import EmployeePage from "./employee-page/EmployeePage";
import VisitorPage from "./visitor-page/VisitorPage";

const IndexPage = () => {
    const appState = useContext(AppContext);
    appState.jwt = getJwtFromLocalStorage();

    if (!appState.jwt) {
        return <Navigate to={'/login'} replace />;
    }

    return (
        <div style={{ background: 'white' }}>
            <HomePage />
            <CenterPage />
            <GroupsPage />
            <ActivityPage />
            <EmployeePage />
            <VisitorPage />
        </div>
    );
};

export default IndexPage;