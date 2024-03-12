import React, { useContext, useEffect, useState } from 'react';
import { Employee } from '../../domain/Employee';
import { AppContext } from '../../state/AppContext';
import { YouthCenterEmployeeService } from '../../service/employee/YouthCenterEmployeeService';
import { EmployeeTab } from './EmployeeTab';
import {AddEmployeeModal} from "./AddEmployeeModal";
import {AddExistingEmployeeModal} from "./AddExistingEmployeeModal";

export const EmployeesTab = (props: Props) => {
    const appState = useContext(AppContext);
    const youthCenterEmployeesService = new YouthCenterEmployeeService(
        props.youthCenterUuid
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

    const handleEmployeeClick = (visitorUuid: string) => {
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
                                        handleEmployeeClick(employee.uuid)
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
                        <div>
                            <button type="button" className="btn btn-primary mt-2 m-sm-0" data-bs-toggle="modal"
                                    data-bs-target="#addEmployeeModal">
                                Lisa uus töötaja
                            </button>
                            <button type="button" className="btn btn-primary m-1" data-bs-toggle="modal"
                                    data-bs-target="#addExistingEmployeeModal">
                                Lisa olemasolev töötaja
                            </button>
                            <AddEmployeeModal youthCenterUuid={props.youthCenterUuid}/>
                            <AddExistingEmployeeModal youthCenterUuid={props.youthCenterUuid}/>
                        </div>
                    </div>
                    <div className="col list-group mt-2">
                        <EmployeeTab employeeUuid={activeEmployeeUuid}/>
                    </div>
                </div>
            </div>

    );
};

export interface Props {
    youthCenterUuid: string;
}
