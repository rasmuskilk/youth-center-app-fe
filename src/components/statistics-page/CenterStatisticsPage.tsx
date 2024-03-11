// CenterPage.tsx
import React, { useContext, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { AppContext } from '../../state/AppContext';

const CenterStatisticsPage: React.FC = () => {
    const { uuid } = useParams();
    const appState = useContext(AppContext);

    if (!appState.jwt) {
        return <Navigate to={'/login'} replace />;
    }

    const token = localStorage.getItem('token');
    return (
        <div className="container mt-5">
            <h2>Center Statistics Page</h2>
            <p>{uuid}</p>
        </div>
    );
};

export default CenterStatisticsPage;
