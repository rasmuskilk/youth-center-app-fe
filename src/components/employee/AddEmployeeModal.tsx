import React, {useContext, useState} from "react";
import {AppContext} from "../../state/AppContext";
import {EmployeeService} from "../../service/employee/EmployeeService";
import {YouthCenterEmployeeService} from "../../service/employee/YouthCenterEmployeeService";

export const AddEmployeeModal = (props: Props) => {
    const appState = useContext(AppContext);
    const employeeService = new EmployeeService();
    const youthCenterEmployeeService = new YouthCenterEmployeeService(props.youthCenterUuid);

    const [firstName, setFirstName] = useState<string | null>(null);
    const [lastName, setLastName] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [education, setEducation] = useState<string | null>(null);

    const handleCancelOnClick = () => {
        setFirstName(null);
        setLastName(null);
        setEmail(null);
        setEducation(null);
    }

    const handleSaveOnClick = async () => {
        if (!firstName || !lastName || !email || !education ) return;

        const employee = {
            firstName,
            lastName,
            email,
            education
        }

        const createdEmployee = await employeeService.createNewEmployee(employee, appState.jwt?.token!);
        await youthCenterEmployeeService.addEmployeeToYouthCenter(props.youthCenterUuid, createdEmployee.uuid, appState.jwt?.token!);
        props.fetchEmployees;
    }

    return (
        <div className="modal fade" id="addEmployeeModal" tabIndex={-1}
             aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Lisa uus töötaja</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="m-1">
                            <label htmlFor="employeeFirstName" className="form-label">Eesnimi</label>
                            <input id="employeeFirstName" className="form-control mb-1" type="text"
                                   value={firstName || ''}
                                   onChange={(e) => {
                                       return setFirstName(e.target.value);
                                   }}
                                   placeholder="eesnimi"/>
                        </div>
                        <div className="m-1">
                            <label htmlFor="employeeLastName" className="form-label">Perekonnanimi</label>
                            <input id="employeeLastName" className="form-control mb-1" type="text"
                                   value={lastName || ''}
                                   onChange={(e) => {
                                       return setLastName(e.target.value);
                                   }}
                                   placeholder="perekonnanimi"/>
                        </div>
                        <div className="m-1">
                            <label htmlFor="employeeEmail" className="form-label">E-mail</label>
                            <input id="employeeEmail" className="form-control mb-1" type="email"
                                   value={email || ''}
                                   onChange={(e) => {
                                       return setEmail(e.target.value);
                                   }}
                                   placeholder="example@email.com"/>
                        </div>
                        <div className="m-1">
                            <label htmlFor="employeeEducation" className="form-label">Haridus</label>
                            <input id="employeeEducation" className="form-control mb-1" type="text"
                                   value={education || ''}
                                   onChange={(e) => {
                                       return setEducation(e.target.value);
                                   }}
                                   placeholder="haridus"/>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary"
                                onClick={() => handleCancelOnClick()}
                                data-bs-dismiss="modal">Tühista
                        </button>
                        <button
                            onClick={() => handleSaveOnClick()}
                            type="button" className="btn btn-primary">Salvesta</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

interface Props {
    youthCenterUuid: string,
    fetchEmployees: object
}