// CenterPage.tsx
import React from 'react';
import {useParams} from "react-router-dom";

const CenterStatisticsPage: React.FC = () => {
    const {uuid} = useParams();

    const token = localStorage.getItem('token');
    return (
        <div className="container mt-5">
            <h2>Center Statistics Page</h2>
            <p>{uuid}</p>
        </div>
    );
};

export default CenterStatisticsPage;
