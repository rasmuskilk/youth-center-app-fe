import React, {useContext, useEffect, useState} from 'react';
import {AppContext} from "../../state/AppContext";
import {ActivityService} from "../../service/activity/ActivityService";
import {Activity} from "../../domain/Activity";
import {ActivityModal} from "./ActivityModal";

export const ActivitiesTab = (props: Props) => {
    const appState = useContext(AppContext);
    const activityService = new ActivityService();

    const [activities, setActivities] = useState<
        Activity[] | null
    >(null);

    useEffect(() => {
        fetchActivities();
    }, [props.activityGroupUuid]);

    const fetchActivities = async () => {
        if (props.activityGroupUuid === null) {
            setActivities(null);
            return;
        }

        const response =
            await activityService.getActivitiesByActivityGroupUuid(
                props.activityGroupUuid!,
                appState.jwt?.token!,
            );

        setActivities(response);
    };

    if (activities == null) {
        return <div></div>
    }

    return (
        <div className="container">
            <div className="row row-cols-2">
                <div className="list-group">
                    {
                        activities.map((activity) => (
                            <div key={activity.uuid}>
                                <button
                                    key={activity.uuid}
                                    type="button"
                                    className="list-group-item list-group-item-action mt-1"
                                    data-bs-toggle="modal"
                                    data-bs-target={`#activityModal${activity.uuid}`}
                                >
                                    {activity.startDate.toString()}
                                </button>
                                <ActivityModal activity={activity}/>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}

interface Props {
    activityGroupUuid: string
}