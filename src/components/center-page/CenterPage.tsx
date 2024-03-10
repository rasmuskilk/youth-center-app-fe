import React, { useContext, useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../../state/AppContext';
import { YouthCenter } from '../../domain/YouthCenter';
import { YouthCenterService } from '../../service/youth-center/YouthCenterService';
import { YouthCenterEmployeeService } from '../../service/employee/YouthCenterEmployeeService';
import { YouthCenterVisitorService } from '../../service/visitor/YouthCenterVisitorService';
import { ActivityGroupService } from '../../service/activity-group/ActivityGroupService';
import { Employee } from '../../domain/Employee';
import { Visitor } from '../../domain/Visitor';
import { ActivityGroup } from '../../domain/ActivityGroup';

const CenterPage: React.FC = () => {
    const { uuid } = useParams();
    const appState = useContext(AppContext);

    const navigate = useNavigate();

    const redirectToLink = (
        entity: string,
        entityUuid: string,
        centersPage: boolean,
    ) => {
        if (!centersPage) {
            navigate(`/${entity}/${entityUuid}`);
        } else {
            navigate(`${entity}/${entityUuid}`);
        }
    };

    const youthCenterService = new YouthCenterService();
    const youthCenterEmployeesService = new YouthCenterEmployeeService(uuid!);
    const youthCenterVisitorService = new YouthCenterVisitorService(uuid!);
    const youthCenterActivityGroupService = new ActivityGroupService();

    const [youthCenter, setYouthCenter] = useState<YouthCenter | null>(null);
    const [youthCenterEmployees, setYouthCenterEmployees] = useState<
        Employee[] | null
    >(null);
    const [youthCenterVisitors, setYouthCenterVisitors] = useState<
        Visitor[] | null
    >(null);
    const [youthCenterActivityGroups, setYouthCenterActivityGroups] = useState<
        ActivityGroup[] | null
    >(null);

    useEffect(() => {
        fetchCenterDetails(uuid!);
        fetchYouthCenterEmployees();
        fetchYouthCenterVisitors();
        fetchYouthCenterActivityGroups();
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

    const fetchYouthCenterEmployees = async () => {
        try {
            const response = await youthCenterEmployeesService.getAll(
                appState.jwt?.token!,
            );

            setYouthCenterEmployees(response);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

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

    const fetchYouthCenterActivityGroups = async () => {
        try {
            const response =
                await youthCenterActivityGroupService.getYouthCenterActivityGroups(
                    uuid!,
                    appState.jwt?.token!,
                );

            setYouthCenterActivityGroups(response);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    if (!youthCenter) {
        return <div>Loading...</div>;
    }

    return (
        <section className="vh-100 gradient-custom">
            <div className="container mt-5">
                <h2>{youthCenter.name}</h2>
                <p>{youthCenter.address}</p>
            </div>
            <hr />
            <div className="container mt-5">
                <h3>Töötajad</h3>
                <div className="list-group">
                    {youthCenterEmployees &&
                        youthCenterEmployees.map((employee) => (
                            <button
                                key={employee.uuid}
                                type="button"
                                onClick={() =>
                                    redirectToLink(
                                        'employees',
                                        employee.uuid,
                                        false,
                                    )
                                }
                                className="list-group-item list-group-item-action"
                            >
                                {employee.firstName} {employee.lastName}
                            </button>
                        ))}
                </div>
            </div>
            <hr />
            <div className="container mt-5">
                <h3>Külastajad</h3>
                <div className="list-group">
                    {youthCenterVisitors &&
                        youthCenterVisitors.map((visitor) => (
                            <button
                                key={visitor.uuid}
                                type="button"
                                onClick={() =>
                                    redirectToLink(
                                        'visitors',
                                        visitor.uuid!,
                                        false,
                                    )
                                }
                                className="list-group-item list-group-item-action"
                            >
                                {visitor.firstName} {visitor.lastName}
                            </button>
                        ))}
                </div>
            </div>
            <hr />
            <div className="container mt-5">
                <h3>Tegevused</h3>
                <div className="list-group">
                    {youthCenterActivityGroups &&
                        youthCenterActivityGroups.map((activityGroup) => (
                            <button
                                key={activityGroup.uuid}
                                type="button"
                                onClick={() =>
                                    redirectToLink(
                                        'groups',
                                        activityGroup.uuid,
                                        true,
                                    )
                                }
                                className="list-group-item list-group-item-action"
                            >
                                {activityGroup.name}
                            </button>
                        ))}
                </div>
            </div>
        </section>
    );
};

export default CenterPage;
