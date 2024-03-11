import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { ActivityGroup } from '../../domain/ActivityGroup';
import { Activity } from '../../domain/Activity';
import { ActivityGroupService } from '../../service/activity-group/ActivityGroupService';
import { AppContext } from '../../state/AppContext';
import { ActivityService } from '../../service/activity/ActivityService';

const GroupsPage: React.FC = () => {
    const { activityGroupUuid } = useParams();
    const navigate = useNavigate();
    const appState = useContext(AppContext);
    const activityGroupService = new ActivityGroupService();
    const activityService = new ActivityService();

    if (!appState.jwt) {
        return <Navigate to={'/login'} replace />;
    }

    const [activityGroup, setActivityGroup] = useState<ActivityGroup | null>(
        null,
    );
    const [activities, setActivities] = useState<Activity[] | null>(null);
    const [newActivityDescription, setNewActivityDescription] =
        useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            await fetchActivityGroup();
            await fetchActivityGroupActivities();
        };

        fetchData();
    }, []);

    const redirectToLink = (entity: string, entityUuid: string) => {
        navigate(`${entity}/${entityUuid}`);
    };

    const fetchActivityGroup = async () => {
        try {
            const response = await activityGroupService.get(
                activityGroupUuid!,
                appState.jwt?.token!,
            );

            setActivityGroup(response);
        } catch (error) {
            console.error('Error fetching centers:', error);
        }
    };

    const fetchActivityGroupActivities = async () => {
        try {
            const response = await activityGroupService.getActivityGroup(
                activityGroupUuid!,
                appState.jwt?.token!,
            );

            setActivities(response);
        } catch (error) {
            console.error('Error fetching activities:', error);
        }
    };

    const addActivity = async () => {
        const activity = {
            description: newActivityDescription,
            startDate: new Date(),
            endDate: new Date(),
        } as Activity;
        await activityService.addActivityToGroup(
            activityGroupUuid!,
            activity,
            appState.jwt?.token!,
        );
        fetchActivityGroupActivities();
    };

    return (
        <section className="vh-100 gradient-custom">
            <div className="container mt-5">
                <h2>{activityGroup && activityGroup!.name}</h2>
                <hr />
                <h3>Tegevused</h3>
                <div>
                    <div className="row g-5">
                        <div className="col-auto">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Tegevuse nimi"
                                onChange={(e) => {
                                    setNewActivityDescription(e.target.value);
                                }}
                            />
                        </div>
                        <div className="col-auto">
                            <button
                                className="btn btn-success"
                                onClick={async () => await addActivity()}
                            >
                                Lisa
                            </button>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="list-group">
                    {activities &&
                        activities.map((activity) => (
                            <button
                                key={activity.uuid}
                                type="button"
                                onClick={() =>
                                    redirectToLink('activities', activity.uuid!)
                                }
                                className="list-group-item list-group-item-action"
                            >
                                {activity.description}
                            </button>
                        ))}
                </div>
            </div>
        </section>
    );
};

export default GroupsPage;
