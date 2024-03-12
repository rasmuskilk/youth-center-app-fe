import { BaseService } from '../base/BaseService';
import {YouthCenterVisit} from "../../domain/YouthCenterVisit";
import httpClient from "../../utils/http-client";

export class YouthCenterVisitService extends BaseService<YouthCenterVisit> {
    constructor() {
        super('centers');
    }

    async getYouthCenterVisits(youthCenterUuid: string, token: string): Promise<YouthCenterVisit[]> {
        const response = await httpClient.get(
            `/centers/${youthCenterUuid}/visits`,
            {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            },
        );

        return response.data;
    }
}
