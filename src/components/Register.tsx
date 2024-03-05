// src/components/Register.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const response = await axios.post<{ message: string, userId: string }>(
                'http://localhost:5041/api/v1/register',
                {
                    email,
                    password,
                }
            );

            console.log(response.data.message); // Log the registration message

            // Redirect to the home page using useNavigate
            navigate('/home');
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Register</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input type="text" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="button" className="btn btn-success" onClick={handleRegister}>Register</button>
            </form>
        </div>
    );
}

export default Register;
