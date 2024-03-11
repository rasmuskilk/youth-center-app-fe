import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../state/AppContext';
import { VisitorService } from '../../service/visitor/VisitorService';
import { Visitor } from '../../domain/Visitor';

export const VisitorTab = (props: Props) => {
    const appState = useContext(AppContext);
    const visitorService = new VisitorService();

    const [visitor, setVisitor] = useState<Visitor | null>(null);

    useEffect(() => {
        fetchVisitor();
    }, [props.visitorUuid]);

    const fetchVisitor = async () => {
        if (props.visitorUuid == null) {
            setVisitor(null);
            return;
        }

        try {
            const response = await visitorService.get(
                props.visitorUuid,
                appState.jwt?.token!,
            );

            setVisitor(response);
        } catch (error) {
            console.error('Error fetching visitor:', error);
        }
    };

    if (visitor == null) {
        return <div></div>;
    }

    return (
        <div
            className="container mt-1"
            style={{ background: 'rgba(0, 80, 255, 0.15)' }}
        >
            <h4>Eesnimi: {visitor.firstName}</h4>
            <h4>Perekonnanimi: {visitor.lastName}</h4>
            <h4>Vanus: {visitor.age}</h4>
            <h4>Aadress: {visitor.address}</h4>
            <h4>Kool: {visitor.school}</h4>
            <h4>Vanema nimi: {visitor.parentName}</h4>
            <h4>Vanema telefon: {visitor.parentPhone}</h4>
            <h4>Vanema email: {visitor.parentEmail}</h4>
            <h4>Märkused: {visitor.notes}</h4>
        </div>
    );
};

interface Props {
    visitorUuid: string | null;
}
