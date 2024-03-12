import React, { useContext, useEffect, useState } from 'react';
import { YouthCenterService } from '../../service/youth-center/YouthCenterService';
import { AppContext } from '../../state/AppContext';
import { YouthCenter } from '../../domain/YouthCenter';
import {YouthCenterVisitService} from "../../service/youth-center/YouthCenterVisitService";
import app from "../../App";
import {YouthCenterVisit} from "../../domain/YouthCenterVisit";

export const CenterDetailsTab = (props: Props) => {
    const appState = useContext(AppContext);
    const youthCenterService = new YouthCenterService();
    const youthCenterVisitService = new YouthCenterVisitService();

    const [youthCenter, setYouthCenter] = useState<YouthCenter | null>(null);
    const [youthCenterVisits, setYouthCenterVisits] = useState<YouthCenterVisit[] | null>(null);

    useEffect(() => {
        fetchCenterDetails(props.youthCenterUuid);
        fetchCenterVisits(props.youthCenterUuid);
    }, []);

    const fetchCenterDetails = async (uuid: string) => {
        try {
            const response = await youthCenterService.get(
                uuid,
                appState.jwt?.token!,
            );

            setYouthCenter(response);
        } catch (error) {
            console.error('Error fetching centers:', error);
        }
    };

    const fetchCenterVisits = async (uuid: string) => {
       const visits = await youthCenterVisitService.getYouthCenterVisits(props.youthCenterUuid, appState.jwt?.token!);

       setYouthCenterVisits(visits);
    };

    if (!youthCenter) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-2">
            <h2>{youthCenter.name}</h2>
            <h3>Aadress: {youthCenter.address}</h3>
            <hr/>
            <h3>Keskuse külastused</h3>
            {youthCenterVisits && youthCenterVisits.map((visit) => (
                <div key={visit.visitor.uuid}>
                    {visit.dateTime.toString()} - {visit.visitor.firstName} {visit.visitor.lastName}
                </div>
            ))}
        </div>
    );
};

export interface Props {
    youthCenterUuid: string;
}
