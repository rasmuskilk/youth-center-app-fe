import {BaseService} from '../base/BaseService';
import {Visitor} from '../../domain/Visitor';
import {Employee} from "../../domain/Employee";
import httpClient from "../../utils/http-client";

export class VisitorService extends BaseService<Visitor> {
    constructor() {
        super(`visitors`);
    }

    async createNewVisitor(visitor: {
        firstName: string,
        lastName: string,
        age?: string,
        youthCenterUuid?: string
    }, token: string): Promise<Visitor> {
        const response = await httpClient.post('/visitors', visitor, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });

        return response.data;
    }
}
