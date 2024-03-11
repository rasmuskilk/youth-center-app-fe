import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../state/AppContext';
import { EmployeeService } from '../../service/employee/EmployeeService';
import { Employee } from '../../domain/Employee';

export const EmployeeTab = (props: Props) => {
    const appState = useContext(AppContext);
    const employeeService = new EmployeeService();

    const [employee, setEmployee] = useState<Employee | null>(null);

    useEffect(() => {
        fetchEmployee();
    }, [props.employeeUuid]);

    const fetchEmployee = async () => {
        if (props.employeeUuid == null) {
            setEmployee(null);
            return;
        }

        try {
            const response = await employeeService.get(
                props.employeeUuid,
                appState.jwt?.token!,
            );

            setEmployee(response);
        } catch (error) {
            console.error('Error fetching visitor:', error);
        }
    };

    if (employee == null) {
        return <div></div>;
    }

    return (
        <div
            className="container mt-1"
            style={{ background: 'rgba(0, 80, 255, 0.15)' }}
        >
            <h4>Eesnimi: {employee.firstName}</h4>
            <h4>Perekonnanimi: {employee.lastName}</h4>
            <h4>Email: {employee.email}</h4>
            <h4>Haridus: {employee.education}</h4>
            <h4>Roll: {employee.role}</h4>
        </div>
    );
};

interface Props {
    employeeUuid: string | null;
}
