import {BaseService} from "../base/BaseService";
import {ActivityGroup} from "../../domain/ActivityGroup";
import httpClient from "../../utils/http-client";
import {Visitor} from "../../domain/Visitor";

export class ActivityVisitorService  extends BaseService<ActivityGroup> {
    constructor() {
        super(`visitors`);
    }

    async getActivityVisitors(
        activityUuid: string,
        token: string,
    ): Promise<Visitor[]> {
        const response = await httpClient.get(`/activities/${activityUuid}/visitors`, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });

        return response.data;
    }
}