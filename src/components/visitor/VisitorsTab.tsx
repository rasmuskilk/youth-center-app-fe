import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../state/AppContext';
import { YouthCenterVisitorService } from '../../service/visitor/YouthCenterVisitorService';
import { Visitor } from '../../domain/Visitor';
import { VisitorTab } from './VisitorTab';
import {AddEmployeeModal} from "../employee/AddEmployeeModal";
import {AddExistingEmployeeModal} from "../employee/AddExistingEmployeeModal";
import {AddVisitorModal} from "./AddVisitorModal";
import {AddExistingVisitorModal} from "./AddExistingVisitorModal";

export const VisitorsTab = (props: Props) => {
    const appState = useContext(AppContext);
    const youthCenterVisitorService = new YouthCenterVisitorService(
        props.youthCenterUuid,
    );

    const [youthCenterVisitors, setYouthCenterVisitors] = useState<
        Visitor[] | null
    >(null);
    const [activeVisitorUuid, setActiveVisitorUuid] = useState<string | null>(
        null,
    );

    useEffect(() => {
        fetchYouthCenterVisitors();
    }, []);

    const fetchYouthCenterVisitors = async () => {
        try {
            const response = await youthCenterVisitorService.getAll(
                appState.jwt?.token!,
            );

            setYouthCenterVisitors(response);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const handleVisitorClick = (visitorUuid: string) => {
        if (visitorUuid === activeVisitorUuid) {
            setActiveVisitorUuid(null);
            return;
        }

        setActiveVisitorUuid(visitorUuid);
    };

    return (
        <div className="container">
            <div className="row row-cols-2">
                <div className="col list-group mt-2">
                    {youthCenterVisitors &&
                        youthCenterVisitors.map((visitor) => (
                            <button
                                key={visitor.uuid}
                                type="button"
                                onClick={() => handleVisitorClick(visitor.uuid)}
                                className={`list-group-item list-group-item-action mt-1 ${
                                    activeVisitorUuid === visitor.uuid
                                        ? 'active'
                                        : ''
                                }`}
                            >
                                {visitor.firstName} {visitor.lastName}
                            </button>
                        ))}
                    <div>
                        <button type="button" className="btn btn-primary mt-2 m-sm-0" data-bs-toggle="modal"
                                data-bs-target="#addVisitorModal">
                            Lisa uus külastaja
                        </button>
                        <button type="button" className="btn btn-primary m-1" data-bs-toggle="modal"
                                data-bs-target="#addExistingVisitorModal">
                            Lisa olemasolev külastaja
                        </button>
                        <AddVisitorModal youthCenterUuid={props.youthCenterUuid}/>
                        <AddExistingVisitorModal youthCenterUuid={props.youthCenterUuid}/>
                    </div>
                </div>
                <div className="col list-group mt-2">
                    <VisitorTab visitorUuid={activeVisitorUuid}/>
                </div>
            </div>
        </div>
    );
};

export interface Props {
    youthCenterUuid: string;
}
