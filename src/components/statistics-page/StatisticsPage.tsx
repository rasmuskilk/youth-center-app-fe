// CenterPage.tsx
import React from 'react';

const StatisticsPage: React.FC = () => {
    const token = localStorage.getItem('token');
    return (
        <section className="vh-100 gradient-custom">
            <div className="container mt-5">
                <h2>Statistics Page</h2>
            </div>
        </section>
    );
};

export default StatisticsPage;
