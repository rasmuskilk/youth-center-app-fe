import {BaseService} from "../base/BaseService";
import {Employee} from "../../domain/Employee";

export class EmployeeService extends BaseService<Employee> {
    constructor() {
        super(`employees`);
    }
}
