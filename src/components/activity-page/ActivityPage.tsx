// CenterPage.tsx
import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import {ActivityDetails} from "../../domain/ActivityDetails";

const ActivityPage: React.FC = () => {
    const {uuid} = useParams();
    const [activityDetails, setActivityDetails] = useState<ActivityDetails | null>(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchActivityGroupDetails = async (uuid: string | undefined) => {
            try {
                const response = await axios.get<ActivityDetails>(`http://localhost:5041/api/v1/activities/${uuid}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setActivityDetails(response.data);
            } catch (error) {
                console.error('Error fetching centers:', error);
            }
        };

        fetchActivityGroupDetails(uuid);
    }, [token, uuid]);

    if (!activityDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-5">
            <h2>{activityDetails.description}</h2>
            <h3>Visitors</h3>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Ager</th>
                </tr>
                </thead>
                <tbody>
                {activityDetails.visitors.map(visitor => (
                    <tr key={visitor.uuid}>
                        <td>{visitor.firstName}</td>
                        <td>{visitor.lastName.toString()}</td>
                        <td>{visitor.age.toString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ActivityPage;
