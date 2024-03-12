import { BaseService } from '../base/BaseService';
import { Visitor } from '../../domain/Visitor';
import httpClient from "../../utils/http-client";

export class YouthCenterVisitorService extends BaseService<Visitor> {
    constructor(uuid: string) {
        super(`centers/${uuid}/visitors`);
    }

    async addVisitorToYouthCenter(youthCenterUuid: string, visitorUuid: string, token: string): Promise<void> {
        await httpClient.post(
            `/centers/${youthCenterUuid}/visitors`,
            {visitorUuid},
            {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            },
        );
    }
}
