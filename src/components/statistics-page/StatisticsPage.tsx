// CenterPage.tsx
import React, {useContext} from 'react';
import {AppContext} from "../../state/AppContext";
import {Navigate} from "react-router-dom";

const StatisticsPage: React.FC = () => {
    const appState = useContext(AppContext);

    if (!appState.jwt) {
        return <Navigate to={"/login"} replace/>
    }

    return (
        <section className="vh-100 gradient-custom">
            <div className="container mt-5">
                <h2>Statistics Page</h2>
            </div>
        </section>
    );
};

export default StatisticsPage;
