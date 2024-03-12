import React, {useContext, useEffect, useState} from "react";
import {Activity} from "../../domain/Activity";
import {AppContext} from "../../state/AppContext";
import {ActivityVisitorService} from "../../service/activity-visitor/ActivityVisitorService";
import {Visitor} from "../../domain/Visitor";

export const ActivityModal = (props: Props) => {
    const { activity } = props;
    const appState = useContext(AppContext);
    const activityVisitorService = new ActivityVisitorService();

    const [activityVisitors, setActivityVisitors] = useState<Visitor[] | null>(null);

    useEffect(() => {
        fetchActivityVisitors();
    }, []);

    const fetchActivityVisitors = async () => {
        const response =  await activityVisitorService.getActivityVisitors(activity.uuid!, appState.jwt?.token!);

        setActivityVisitors(response);
    };


    return (
        <div className="modal fade" id={`activityModal${activity.uuid}`} tabIndex={-1}
             aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">{activity.startDate.toString()}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {activity.description}
                        <hr/>
                        Külastajad
                        {activityVisitors && activityVisitors.map((visitor, index) => (
                            <div key={visitor.uuid}>
                                {index + 1}. {visitor.firstName} {visitor.lastName}
                            </div>
                        ))}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary"
                                data-bs-dismiss="modal">Sulge
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface Props {
    activity: Activity
}