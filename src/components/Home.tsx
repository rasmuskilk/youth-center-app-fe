// src/components/Home.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home: React.FC = () => {
    const [centers, setCenters] = useState<{ id: number, centerName: string }[]>([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchCenters = async () => {
            try {
                const response = await axios.get<{ id: number, centerName: string }[]>('http://localhost:5041/api/v1/centers', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setCenters(response.data);
            } catch (error) {
                console.error('Error fetching centers:', error);
            }
        };

        fetchCenters();
    }, [token]);

    return (
        <div className="container mt-5">
            <h2>Centers Page</h2>
            <ul className="list-group">
                {centers.map(center => (
                    <li key={center.id} className="list-group-item">{center.centerName}</li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
