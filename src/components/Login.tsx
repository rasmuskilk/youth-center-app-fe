// src/components/Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login: React.FC = () => {
    const [email, setEmail] = useState('rasmus@admin.com');
    const [password, setPassword] = useState('password');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post<{ token: string, refreshToken: string, email: string, roles: string[] }>(
                'http://localhost:5041/api/v1/login',
                {
                    email,
                    password,
                }
            );

            const { token, refreshToken, email: userEmail, roles } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('userEmail', userEmail);
            localStorage.setItem('roles', JSON.stringify(roles));

            navigate('/home');
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Login</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input type="text" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="button" className="btn btn-primary" onClick={handleLogin}>Login</button>
            </form>
        </div>
    );
};

export default Login;
