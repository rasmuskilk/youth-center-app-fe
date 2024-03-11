import React, { useContext, useEffect, useState } from 'react';
import { ActivityGroup } from '../../domain/ActivityGroup';
import { AppContext } from '../../state/AppContext';
import { ActivityGroupService } from '../../service/activity-group/ActivityGroupService';
import { EmployeeTab } from '../employee/EmployeeTab';

export const ActivityGroupsTab = (props: Props) => {
    const appState = useContext(AppContext);

    const youthCenterActivityGroupService = new ActivityGroupService();

    const [youthCenterActivityGroups, setYouthCenterActivityGroups] = useState<
        ActivityGroup[] | null
    >(null);
    const [activeActivityGroupUuid, setActiveActivityGroupUuid] = useState<
        string | null
    >(null);

    useEffect(() => {
        fetchYouthCenterActivityGroups();
    }, []);

    const fetchYouthCenterActivityGroups = async () => {
        try {
            const response =
                await youthCenterActivityGroupService.getYouthCenterActivityGroups(
                    props.youthCenterUuid!,
                    appState.jwt?.token!,
                );

            setYouthCenterActivityGroups(response);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const handleActivityGroupClick = (activityGroupUuid: string) => {
        if (activityGroupUuid === activeActivityGroupUuid) {
            setActiveActivityGroupUuid(null);
            return;
        }

        setActiveActivityGroupUuid(activityGroupUuid);
    };

    return (
        <div className="container">
            <div className="row row-cols-2">
                <div className="list-group mt-2">
                    {youthCenterActivityGroups &&
                        youthCenterActivityGroups.map((activityGroup) => (
                            <button
                                key={activityGroup.uuid}
                                type="button"
                                onClick={() =>
                                    handleActivityGroupClick(activityGroup.uuid)
                                }
                                className={`list-group-item list-group-item-action mt-1 ${
                                    activeActivityGroupUuid ===
                                    activityGroup.uuid
                                        ? 'active'
                                        : ''
                                }`}
                            >
                                {activityGroup.name}
                            </button>
                        ))}
                </div>
                <div className="col list-group mt-2">
                    <EmployeeTab employeeUuid={activeActivityGroupUuid} />
                </div>
            </div>
        </div>
    );
};

export interface Props {
    youthCenterUuid: string;
}
