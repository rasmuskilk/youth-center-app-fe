import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../state/AppContext';
import { Visitor } from '../../domain/Visitor';
import { VisitorService } from '../../service/visitor/VisitorService';

const VisitorPage: React.FC = () => {
    const { visitorUuid } = useParams();
    const visitorService = new VisitorService();
    const appState = useContext(AppContext);

    const [visitor, setVisitor] = useState<Visitor | null>(null);

    useEffect(() => {
        fetchVisitor();
    }, []);

    const fetchVisitor = async () => {
        try {
            const response = await visitorService.get(
                visitorUuid!,
                appState.jwt?.token!,
            );

            setVisitor(response);
        } catch (error) {
            console.error('Error fetching visitor:', error);
        }
    };

    return (
        <section className="vh-100 gradient-custom">
            <div className="container mt-5">
                <h2>
                    {visitor?.firstName} {visitor?.lastName}
                </h2>
            </div>
        </section>
    );
};

export default VisitorPage;
