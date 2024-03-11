import React, { useContext, useEffect, useState } from 'react';
import { Employee } from '../../domain/Employee';
import { AppContext } from '../../state/AppContext';
import { YouthCenterEmployeeService } from '../../service/employee/YouthCenterEmployeeService';
import { EmployeeTab } from '../employee-page/EmployeeTab';

export const EmployeesTab = (props: Props) => {
    const appState = useContext(AppContext);
    const youthCenterEmployeesService = new YouthCenterEmployeeService(
        props.youthCenterUuid,
    );

    const [youthCenterEmployees, setYouthCenterEmployees] = useState<
        Employee[] | null
    >(null);
    const [activeEmployeeUuid, setActiveEmployeeUuid] = useState<string | null>(
        null,
    );

    useEffect(() => {
        fetchYouthCenterEmployees();
    }, []);

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

    const handleVisitorClick = (visitorUuid: string) => {
        if (visitorUuid === activeEmployeeUuid) {
            setActiveEmployeeUuid(null);
            return;
        }

        setActiveEmployeeUuid(visitorUuid);
    };

    return (
        <div className="container">
            <div className="row row-cols-2">
                <div className="list-group mt-2">
                    {youthCenterEmployees &&
                        youthCenterEmployees.map((employee) => (
                            <button
                                key={employee.uuid}
                                type="button"
                                onClick={() =>
                                    handleVisitorClick(employee.uuid)
                                }
                                className={`list-group-item list-group-item-action mt-1 ${
                                    activeEmployeeUuid === employee.uuid
                                        ? 'active'
                                        : ''
                                }`}
                            >
                                {employee.firstName} {employee.lastName}
                            </button>
                        ))}
                </div>
                <div className="col list-group mt-2">
                    <EmployeeTab employeeUuid={activeEmployeeUuid} />
                </div>
            </div>
        </div>
    );
};

export interface Props {
    youthCenterUuid: string;
}
