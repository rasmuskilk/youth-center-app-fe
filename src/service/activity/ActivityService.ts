import {BaseService} from "../base/BaseService";
import {Activity} from "../../domain/Activity";
import {ActivityGroup} from "../../domain/ActivityGroup";
import httpClient from "../../utils/http-client";

export class ActivityService extends BaseService<Activity> {
    constructor() {
        super('activities');
    }

    async addActivityToGroup(
        activityGroupUuid: string,
        activity: Activity,
        token: string,
    ): Promise<void> {
        const response = await httpClient.post(`/groups/${activityGroupUuid}/activities`, activity, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });
    }
}