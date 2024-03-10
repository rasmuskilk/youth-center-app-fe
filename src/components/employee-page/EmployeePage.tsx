import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../state/AppContext';
import { Employee } from '../../domain/Employee';
import { EmployeeService } from '../../service/employee/EmployeeService';

const EmployeePage: React.FC = () => {
    const { employeeUuid } = useParams();
    const employeeService = new EmployeeService();
    const appState = useContext(AppContext);

    const [employee, setEmployee] = useState<Employee | null>(null);

    useEffect(() => {
        fetchEmployee();
    }, []);

    const fetchEmployee = async () => {
        try {
            const response = await employeeService.get(
                employeeUuid!,
                appState.jwt?.token!,
            );

            setEmployee(response);
        } catch (error) {
            console.error('Error fetching visitor:', error);
        }
    };

    return (
        <section className="vh-100 gradient-custom">
            <div className="container mt-5">
                <h2>
                    {employee?.firstName} {employee?.lastName}
                </h2>
            </div>
        </section>
    );
};

export default EmployeePage;
