// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import GroupsPage from "./components/GroupsPage";
import CenterPage from "./components/CenterPage";
import ActivityPage from "./components/ActivityPage";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<Home />} />
                <Route path="/centers/:uuid" element={<CenterPage />} />
                <Route path="/groups/:uuid" element={<GroupsPage />} />
                <Route path="/activities/:uuid" element={<ActivityPage />} />
                <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;
