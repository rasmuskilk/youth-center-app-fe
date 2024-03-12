import React, {useContext, useState} from "react";
import {AppContext} from "../../state/AppContext";
import {VisitorService} from "../../service/visitor/VisitorService";

export const AddVisitorModal = (props: Props) => {
    const appState = useContext(AppContext);
    const visitorService = new VisitorService();

    const [firstName, setFirstName] = useState<string | null>(null);
    const [lastName, setLastName] = useState<string | null>(null);
    const [age, setAge] = useState<string | null>(null);

    const handleCancelOnClick = () => {
        setFirstName(null);
        setLastName(null);
        setAge(null);
    }

    const handleSaveOnClick = async () => {
        if (!firstName || !lastName || !age) return;

        const visitor = {
            firstName,
            lastName,
            age,
            youthCenterUuid: props.youthCenterUuid
        }

        await visitorService.createNewVisitor(visitor, appState.jwt?.token!);
    }

    return (
        <div className="modal fade" id="addVisitorModal" tabIndex={-1}
             aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Lisa uus külastaja</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="m-1">
                            <label htmlFor="visitorFirstName" className="form-label">Eesnimi</label>
                            <input id="visitorFirstName" className="form-control mb-1" type="text"
                                   value={firstName || ''}
                                   onChange={(e) => {
                                       return setFirstName(e.target.value);
                                   }}
                                   placeholder="eesnimi"/>
                        </div>
                        <div className="m-1">
                            <label htmlFor="visitorLastName" className="form-label">Perekonnanimi</label>
                            <input id="visitorLastName" className="form-control mb-1" type="text"
                                   value={lastName || ''}
                                   onChange={(e) => {
                                       return setLastName(e.target.value);
                                   }}
                                   placeholder="perekonnanimi"/>
                        </div>
                        <div className="m-1">
                            <label htmlFor="visitorAge" className="form-label">Vanus</label>
                            <input id="visitorAge" className="form-control mb-1" type="number"
                                   value={age || ''}
                                   onChange={(e) => {
                                       return setAge(e.target.value);
                                   }}/>
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
    youthCenterUuid: string
}