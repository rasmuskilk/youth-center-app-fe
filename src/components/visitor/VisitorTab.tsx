import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../state/AppContext';
import { VisitorService } from '../../service/visitor/VisitorService';
import { Visitor } from '../../domain/Visitor';

export const VisitorTab = (props: Props) => {
    const appState = useContext(AppContext);
    const visitorService = new VisitorService();

    const [visitor, setVisitor] = useState<Visitor | null>(null);
    const [editingVisitor, setEditingVisitor] = useState(false);

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

    const handleEditOnClick = () => {
        setEditingVisitor(!editingVisitor);
    }

    if (visitor == null) {
        return <div></div>;
    }

    return (
        <div>
            <div
                className="container mt-1 p-1"
                style={{background: 'rgba(0, 80, 255, 0.15)'}}
            >
                <ul className="list-group list-group-horizontal">
                    <li className="list-group-item bold">Eesnimi</li>
                    {editingVisitor ?
                        <input className="form-control m-1" type="text" value={visitor.firstName}/> :
                        <li className="list-group-item flex-fill">{visitor.firstName}</li>
                    }
                </ul>
                <ul className="list-group list-group-horizontal">
                    <li className="list-group-item bold">Perekonnanimi</li>
                    {editingVisitor ?
                        <input className="form-control m-1" type="text" value={visitor.lastName}/> :
                        <li className="list-group-item flex-fill">{visitor.lastName}</li>
                    }
                </ul>
                <ul className="list-group list-group-horizontal">
                    <li className="list-group-item bold">Vanus</li>
                    <li className="list-group-item flex-fill">{visitor.age}</li>
                </ul>
            </div>
            <div>
                <button onClick={() => handleEditOnClick()}
                        className="btn btn-secondary m-1">{editingVisitor ? "Tühista" : "Muuda"}</button>

                <button className="btn btn-secondary m-1">Eemalda keskusest
                </button>

                <button className="btn btn-danger m-1">Kustuta
                </button>
            </div>
        </div>
    );
};

interface Props {
    visitorUuid: string | null;
}
