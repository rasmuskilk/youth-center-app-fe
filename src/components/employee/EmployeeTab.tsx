import React, {useContext, useEffect, useState} from 'react';
import {AppContext} from '../../state/AppContext';
import {EmployeeService} from '../../service/employee/EmployeeService';
import {Employee} from '../../domain/Employee';

export const EmployeeTab = (props: Props) => {
    const appState = useContext(AppContext);
    const employeeService = new EmployeeService();

    const [employee, setEmployee] = useState<Employee | null>(null);
    const [editingEmployee, setEditingEmployee] = useState(false);

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

    const handleEditOnClick = () => {
        setEditingEmployee(!editingEmployee);
    }

    if (employee == null) {
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
                    {editingEmployee ?
                        <input className="form-control m-1" type="text" value={employee.firstName}/> :
                        <li className="list-group-item flex-fill">{employee.firstName}</li>
                    }
                </ul>
                <ul className="list-group list-group-horizontal">
                    <li className="list-group-item bold">Perekonnanimi</li>
                    {editingEmployee ?
                        <input className="form-control m-1" type="text" value={employee.lastName}/> :
                        <li className="list-group-item flex-fill">{employee.lastName}</li>
                    }
                </ul>
                <ul className="list-group list-group-horizontal">
                    <li className="list-group-item bold">Haridus</li>
                    {editingEmployee ?
                        <input className="form-control m-1" type="text" value={employee.education}/> :
                        <li className="list-group-item flex-fill">{employee.education}</li>
                    }
                </ul>
                <ul className="list-group list-group-horizontal">
                    <li className="list-group-item bold">Email</li>
                    <li className="list-group-item p-1 flex-fill">{employee.email}</li>
                </ul>
                <ul className="list-group list-group-horizontal">
                    <li className="list-group-item bold">Roll</li>
                    <li className="list-group-item flex-fill">{employee.role}</li>
                </ul>
            </div>
            <div>
                <button onClick={() => handleEditOnClick()}
                        className="btn btn-secondary m-1">{editingEmployee ? "Tühista" : "Muuda"}</button>

                <button className="btn btn-secondary m-1">Eemalda keskusest
                </button>

                <button className="btn btn-danger m-1">Kustuta
                </button>
            </div>
        </div>

    );
};

interface Props {
    employeeUuid: string | null;
}
