// CenterPage.tsx
import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import {ActivityGroupDetails} from "../../domain/ActivityGroupDetails";

const GroupsPage: React.FC = () => {
    const { uuid } = useParams();
    const [activityGroupDetails, setActivityGroupDetails] = useState<ActivityGroupDetails | null>(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchActivityGroupDetails = async (uuid: string | undefined) => {
            try {
                const response = await axios.get<ActivityGroupDetails>(`http://localhost:5041/api/v1/groups/${uuid}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setActivityGroupDetails(response.data);
            } catch (error) {
                console.error('Error fetching centers:', error);
            }
        };

        fetchActivityGroupDetails(uuid);
    }, [token, uuid]);

    if (!activityGroupDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-5">
            <h2>{activityGroupDetails.name}</h2>
            <h3>Activities</h3>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>Description</th>
                    <th>Start</th>
                    <th>End</th>
                    <th>Type</th>
                </tr>
                </thead>
                <tbody>
                {activityGroupDetails.activities.map(activity => (
                    <tr key={activity.uuid}>
                        <td>
                            <Link to={`/activities/${activity.uuid}`}>
                                <span>{activity.description}</span>
                            </Link>
                       </td>
                        <td>{activity.startDate.toString()}</td>
                        <td>{activity.endDate.toString()}</td>
                        <td>{activity.activityTypeName}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default GroupsPage;
