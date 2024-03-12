import { BaseService } from '../base/BaseService';
import { Activity } from '../../domain/Activity';
import httpClient from '../../utils/http-client';

export class ActivityService extends BaseService<Activity> {
    constructor() {
        super('activities');
    }

    async getActivitiesByActivityGroupUuid(activityGroupUuid: string | null, token: string): Promise<Activity[]> {
        if (activityGroupUuid == null) {
            return [];
        }

        const response = await httpClient.get(
            `/groups/${activityGroupUuid}/activities`,
            {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            },
        );

        return response.data;
    }

    async addActivityToGroup(
        activityGroupUuid: string,
        activity: Activity,
        token: string,
    ): Promise<void> {
        const response = await httpClient.post(
            `/groups/${activityGroupUuid}/activities`,
            activity,
            {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            },
        );
    }
}
