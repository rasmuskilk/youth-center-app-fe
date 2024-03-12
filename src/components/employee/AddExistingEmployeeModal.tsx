import React, {useContext, useEffect, useState} from "react";
import {AppContext} from "../../state/AppContext";
import {EmployeeService} from "../../service/employee/EmployeeService";
import {Employee} from "../../domain/Employee";
import {YouthCenterEmployeeService} from "../../service/employee/YouthCenterEmployeeService";

export const AddExistingEmployeeModal = (props: Props) => {
    const appState = useContext(AppContext);
    const employeeService = new EmployeeService();
    const youthCenterEmployeeService = new YouthCenterEmployeeService(props.youthCenterUuid);

    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [employees, setEmployees] = useState<Employee[] | null>(null);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        const response = await employeeService.getAll(appState.jwt?.token!);

        setEmployees(response);
    }

    const handleSelectedEmployeeOnClick = async (employee: Employee) => {
        setSelectedEmployee(employee);
    }

    const handleSaveEmployeeOnClick = async () => {
        if (selectedEmployee == null) {
            return;
        }

        await youthCenterEmployeeService.addEmployeeToYouthCenter(props.youthCenterUuid, selectedEmployee.uuid, appState.jwt?.token!);
        props.fetchYouthCenterEmployees;
    }

    return (
        <div className="modal fade" id="addExistingEmployeeModal" tabIndex={-1}
             aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Lisa olemasolev töötaja</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                Vali töötaja
                            </button>
                            <ul className="dropdown-menu">
                                {employees && employees.map((employee) => (
                                    <li key={employee.uuid}>
                                        <a className="dropdown-item" onClick={() => handleSelectedEmployeeOnClick(employee)} href="#">{employee.firstName} {employee.lastName}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="m-1">
                            {selectedEmployee && (
                                <div>
                                    <hr/>
                                    Töötaja andmed
                                    <hr/>
                                    {selectedEmployee.firstName} {selectedEmployee.lastName}
                                    <br/>
                                    {selectedEmployee.education}
                                    <br/>
                                    {selectedEmployee.email}
                                </div>

                            )}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button"
                                onClick={() => {setSelectedEmployee(null)}}
                                className="btn btn-secondary"
                                data-bs-dismiss="modal">Tühista
                        </button>
                        <button type="button" className={`btn btn-primary ${selectedEmployee ? '' : 'disabled'}`} onClick={() => handleSaveEmployeeOnClick()}>Lisa</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

interface Props {
    youthCenterUuid: string,
    fetchYouthCenterEmployees: any,
}