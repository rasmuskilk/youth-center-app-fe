import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ActivityService } from '../../service/activity/ActivityService';
import { Activity } from '../../domain/Activity';
import { AppContext } from '../../state/AppContext';
import { Visitor } from '../../domain/Visitor';
import { ActivityVisitorService } from '../../service/activity-visitor/ActivityVisitorService';

const ActivityPage: React.FC = () => {
    const { activityUuid } = useParams();
    const activityService = new ActivityService();
    const activityVisitorService = new ActivityVisitorService();
    const appState = useContext(AppContext);
    const navigate = useNavigate();

    const [activity, setActivity] = useState<Activity | null>(null);
    const [activityVisitors, setActivityVisitors] = useState<Visitor[] | null>(
        null,
    );

    useEffect(() => {
        fetchActivity();
        fetchActivityVisitors();
    }, []);

    const redirectToLink = (entityUuid: string) => {
        navigate(`/visitors/${entityUuid}`);
    };

    const fetchActivity = async () => {
        try {
            const response = await activityService.get(
                activityUuid!,
                appState.jwt?.token!,
            );

            setActivity(response);
        } catch (error) {
            console.error('Error fetching activity:', error);
        }
    };

    const fetchActivityVisitors = async () => {
        try {
            const response = await activityVisitorService.getActivityVisitors(
                activityUuid!,
                appState.jwt?.token!,
            );

            setActivityVisitors(response);
        } catch (error) {
            console.error('Error fetching activity visitors:', error);
        }
    };

    return (
        <section className="vh-100 gradient-custom">
            <div className="container mt-5">
                <h2>{activity?.description}</h2>
                <p>Algus: {activity?.startDate.toString()}</p>
                <p>L6pp: {activity?.endDate.toString()}</p>
                <hr />
                <h3>Külastajad</h3>
                <hr />
                <div className="list-group">
                    {activityVisitors &&
                        activityVisitors.map((visitor) => (
                            <button
                                key={visitor.uuid}
                                type="button"
                                onClick={() => redirectToLink(visitor.uuid!)}
                                className="list-group-item list-group-item-action"
                            >
                                {visitor.firstName} {visitor.lastName}
                            </button>
                        ))}
                </div>
            </div>
        </section>
    );
};

export default ActivityPage;
