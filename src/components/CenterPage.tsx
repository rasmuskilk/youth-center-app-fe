// CenterPage.tsx
import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import {YouthCenterDetails} from "YouthCenterDetails";

const CenterPage: React.FC = () => {
    const {uuid} = useParams();
    const [centerDetails, setCenterDetails] = useState<YouthCenterDetails | null>(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchCenterDetails = async (uuid: string | undefined) => {
            try {
                const response = await axios.get<YouthCenterDetails>(`http://localhost:5041/api/v1/centers/${uuid}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setCenterDetails(response.data);
            } catch (error) {
                console.error('Error fetching centers:', error);
            }
        };

        fetchCenterDetails(uuid);
    }, [token, uuid]);

    if (!centerDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-5">
            <h2>{centerDetails.name}</h2>
            <h3>Employees</h3>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Education</th>
                </tr>
                </thead>
                <tbody>
                {centerDetails.employees.map(employee => (
                    <tr key={employee.uuid}>
                        <td>{employee.firstName}</td>
                        <td>{employee.lastName}</td>
                        <td>{employee.education}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <h3>Activities</h3>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Activities</th>
                </tr>
                </thead>
                <tbody>
                {centerDetails.activityGroups.map(activityGroup => (
                    <tr key={activityGroup.uuid}>
                        <td>
                            <Link to={`/groups/${activityGroup.uuid}`}>
                                <span>{activityGroup.name}</span>
                            </Link>
                        </td>
                        <td>{activityGroup.activityCount}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default CenterPage;
