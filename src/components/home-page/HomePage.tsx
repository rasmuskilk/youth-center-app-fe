import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {YouthCenter} from "../../domain/YouthCenter";

const HomePage: React.FC = () => {
    const [centers, setCenters] = useState<YouthCenter[]>([]);
    const [newCenterName, setNewCenterName] = useState<string>('');
    const [editingCenterUuid, setEditingCenterUuid] = useState<string | null>(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchCenters = async () => {
            try {
                const response = await axios.get<YouthCenter[]>('http://localhost:5041/api/v1/centers', {
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
            <h2>Noortekeskused</h2>
            <ul className="list-group">
                {centers.map(center => (
                    <li key={center.uuid} className="list-group-item d-flex justify-content-between align-items-center">
                        {editingCenterUuid === center.uuid ? (
                            <input
                                type="text"
                                className="form-control"
                                value={newCenterName}
                                onChange={(e) => setNewCenterName(e.target.value)}
                            />
                        ) : (
                            <Link to={`/centers/${center.uuid}`}>
                                <span>{center.name}</span>
                            </Link>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HomePage;
