// src/App.tsx
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/login-page/Login';
import Register from './components/register-page/Register';
import GroupsPage from './components/activity-group-page/GroupsPage';
import CenterPage from './components/center-page/CenterPage';
import ActivityPage from './components/activity-page/ActivityPage';
import HomePage from './components/home-page/HomePage';
import StatisticsPage from './components/statistics-page/StatisticsPage';
import CenterStatisticsPage from './components/statistics-page/CenterStatisticsPage';
import { AppContextProvider, initialState } from './state/AppContext';
import Header from './components/common/Header';
import PageNotFound from './components/common/PageNotFound';
import VisitorPage from "./components/visitor-page/VisitorPage";
import EmployeePage from "./components/employee-page/EmployeePage";

export const App = () => {
  const setToken = () => {
    setAppState({ ...appState });
  };

  const [appState, setAppState] = useState({ ...initialState, setToken });

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
            <Route path="/visitors/:visitorUuid" element={<VisitorPage />} />
            <Route path="/employees/:employeeUuid" element={<EmployeePage />} />
            <Route
              path="/centers/:youthCenterUuid/groups/:activityGroupUuid"
              element={<GroupsPage />}
            />
            <Route
              path="/centers/:youthCenterUuid/groups/:activityGroupUuid/activities/:activityUuid"
              element={<ActivityPage />}
            />
            <Route path="/statistics" element={<StatisticsPage />} />
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
