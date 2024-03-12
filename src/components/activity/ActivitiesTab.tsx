import React, {useContext, useEffect, useState} from 'react';
import {AppContext} from "../../state/AppContext";
import {ActivityService} from "../../service/activity/ActivityService";
import {Activity} from "../../domain/Activity";

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
                            <button
                                key={activity.uuid}
                                type="button"
                                className="list-group-item list-group-item-action mt-1"
                            >
                                {activity.description}
                            </button>
                        ))}
                </div>
            </div>
        </div>
    );
}

interface Props {
    activityGroupUuid: string
}