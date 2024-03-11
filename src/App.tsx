// src/App.tsx
import React, { useState } from 'react';
import { redirect, Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import CenterPage from './components/youth-center/CenterPage';
import HomePage from './components/home-page/HomePage';
import StatisticsPage from './components/statistics-page/StatisticsPage';
import CenterStatisticsPage from './components/statistics-page/CenterStatisticsPage';
import { AppContextProvider, initialState } from './state/AppContext';
import Header from './components/common/Header';
import PageNotFound from './components/common/PageNotFound';

export const App = () => {
    const setToken = () => {
        setAppState({ ...appState });
    };

    const [appState, setAppState] = useState({ ...initialState, setToken });

    if (!appState.jwt?.token) {
        redirect('/login');
    }

    return (
        <div className="gradient-custom">
            <AppContextProvider value={appState}>
                <Header />
                <div>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/centers" element={<HomePage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/centers/:uuid" element={<CenterPage />} />
                        <Route
                            path="/statistics"
                            element={<StatisticsPage />}
                        />
                        <Route
                            path="/statistics/center/:uuid"
                            element={<CenterStatisticsPage />}
                        />
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </div>
            </AppContextProvider>
        </div>
    );
};

export default App;
