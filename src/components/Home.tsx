import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { YouthCenter} from 'YouthCenter';

const Home: React.FC = () => {
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

    const addCenter = async () => {
        try {
            const response = await axios.post<YouthCenter>('http://localhost:5041/api/v1/centers', {
                name: newCenterName,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setCenters([...centers, response.data]);
            setNewCenterName('');
        } catch (error) {
            console.error('Error adding center:', error);
        }
    };

    const removeCenter = async (uuid: string) => {
        try {
            await axios.delete(`http://localhost:5041/api/v1/centers/${uuid}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setCenters(centers.filter(center => center.uuid !== uuid));
        } catch (error) {
            console.error('Error removing center:', error);
        }
    };

    const startEditing = (uuid: string) => {
        setEditingCenterUuid(uuid);
    };

    const cancelEditing = () => {
        setEditingCenterUuid(null);
    };

    const updateCenter = async (uuid: string, newName: string) => {
        try {
            const response = await axios.put<YouthCenter>(`http://localhost:5041/api/v1/centers/${uuid}`, {
                name: newName,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setCenters(centers.map(center => (center.uuid === uuid ? response.data : center)));
            setEditingCenterUuid(null);
        } catch (error) {
            console.error('Error updating center:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Centers Page</h2>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter center name"
                    value={newCenterName}
                    onChange={(e) => setNewCenterName(e.target.value)}
                />
                <button className="btn btn-primary" onClick={addCenter}>Add Center</button>
            </div>
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
                        <div>
                            {editingCenterUuid === center.uuid ? (
                                <>
                                    <button className="btn btn-success"
                                            onClick={() => updateCenter(center.uuid, newCenterName)}>Save
                                    </button>
                                    <button className="btn btn-secondary ml-2" onClick={cancelEditing}>Cancel</button>
                                </>
                            ) : (
                                <button className="btn btn-warning ml-2"
                                        onClick={() => startEditing(center.uuid)}>Edit</button>
                            )}
                            <button className="btn btn-danger ml-2" onClick={() => removeCenter(center.uuid)}>Remove
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
