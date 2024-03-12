import {BaseService} from '../base/BaseService';
import {Employee} from '../../domain/Employee';
import httpClient from "../../utils/http-client";

export class YouthCenterEmployeeService extends BaseService<Employee> {
    constructor(uuid: string) {
        super(`centers/${uuid}/employees`);
    }

    async addEmployeeToYouthCenter(youthCenterUuid: string, employeeUuid: string, token: string): Promise<void> {
        await httpClient.post(
            `/centers/${youthCenterUuid}/employees`,
            {employeeUuid},
            {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            },
        );
    }
}
