import { BaseService } from '../base/BaseService';
import { Employee } from '../../domain/Employee';

export class YouthCenterEmployeeService extends BaseService<Employee> {
    constructor(uuid: string) {
        super(`centers/${uuid}/employees`);
    }
}
