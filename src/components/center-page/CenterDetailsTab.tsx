import React, { useContext, useEffect, useState } from 'react';
import { YouthCenterService } from '../../service/youth-center/YouthCenterService';
import { AppContext } from '../../state/AppContext';
import { YouthCenter } from '../../domain/YouthCenter';

export const CenterDetailsTab = (props: Props) => {
    const youthCenterService = new YouthCenterService();
    const appState = useContext(AppContext);

    const [youthCenter, setYouthCenter] = useState<YouthCenter | null>(null);

    useEffect(() => {
        fetchCenterDetails(props.youthCenterUuid);
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

    if (!youthCenter) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-2">
            <h2>{youthCenter.name}</h2>
            <h3>Aadress: {youthCenter.address}</h3>
        </div>
    );
};

export interface Props {
    youthCenterUuid: string;
}
