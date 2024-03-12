import React, {useContext, useEffect, useState} from "react";
import {AppContext} from "../../state/AppContext";
import {EmployeeService} from "../../service/employee/EmployeeService";
import {Employee} from "../../domain/Employee";
import {YouthCenterEmployeeService} from "../../service/employee/YouthCenterEmployeeService";
import {VisitorService} from "../../service/visitor/VisitorService";
import {YouthCenterVisitorService} from "../../service/visitor/YouthCenterVisitorService";
import {Visitor} from "../../domain/Visitor";

export const AddExistingVisitorModal = (props: Props) => {
    const appState = useContext(AppContext);
    const visitorService = new VisitorService();
    const youthCenterVisitorService = new YouthCenterVisitorService(props.youthCenterUuid);

    const [selectedVisitor, setSelectedVisitor] = useState<Visitor | null>(null);
    const [visitors, setVisitors] = useState<Visitor[] | null>(null);

    useEffect(() => {
        fetchVisitors();
    }, []);

    const fetchVisitors = async () => {
        const response = await visitorService.getAll(appState.jwt?.token!);

        setVisitors(response);
    }

    const handleSelectedVisitorOnClick = async (visitor: Visitor) => {
        setSelectedVisitor(visitor);
    }

    const handleSaveVisitorOnClick = async () => {
        if (selectedVisitor == null) {
            return;
        }

        await youthCenterVisitorService.addVisitorToYouthCenter(props.youthCenterUuid, selectedVisitor.uuid, appState.jwt?.token!);
    }

    return (
        <div className="modal fade" id="addExistingVisitorModal" tabIndex={-1}
             aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Lisa olemasolev külastaja</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                Vali külastaja
                            </button>
                            <ul className="dropdown-menu">
                                {visitors && visitors.map((visitor) => (
                                    <li key={visitor.uuid}>
                                        <a className="dropdown-item" onClick={() => handleSelectedVisitorOnClick(visitor)} href="#">{visitor.firstName} {visitor.lastName}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="m-1">
                            {selectedVisitor && (
                                <div>
                                    <hr/>
                                    Külastaja andmed
                                    <hr/>
                                    {selectedVisitor.firstName} {selectedVisitor.lastName}
                                    <br/>
                                    {selectedVisitor.address}
                                    <br/>
                                    {selectedVisitor.age}
                                </div>

                            )}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button"
                                onClick={() => {setSelectedVisitor(null)}}
                                className="btn btn-secondary"
                                data-bs-dismiss="modal">Tühista
                        </button>
                        <button type="button" className={`btn btn-primary ${selectedVisitor ? '' : 'disabled'}`} onClick={() => handleSaveVisitorOnClick()}>Lisa</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

interface Props {
    youthCenterUuid: string,
}