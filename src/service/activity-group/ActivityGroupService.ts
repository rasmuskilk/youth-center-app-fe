import { BaseService } from '../base/BaseService';
import { ActivityGroup } from '../../domain/ActivityGroup';
import { Activity } from '../../domain/Activity';
import httpClient from '../../utils/http-client';

export class ActivityGroupService extends BaseService<ActivityGroup> {
    constructor() {
        super('groups');
    }

    async getYouthCenterActivityGroups(
        centerUuid: string,
        token: string,
    ): Promise<ActivityGroup[]> {
        const response = await httpClient.get(`/centers/${centerUuid}/groups`, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });

        return response.data;
    }

    async getActivityGroup(
        groupUuid: string,
        token: string,
    ): Promise<Activity[]> {
        const response = await httpClient.get(
            `/groups/${groupUuid}/activities`,
            {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            },
        );

        return response.data;
    }
}
