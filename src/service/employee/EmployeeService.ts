import { BaseService } from '../base/BaseService';
import { Employee } from '../../domain/Employee';
import httpClient from "../../utils/http-client";

export class EmployeeService extends BaseService<Employee> {
    constructor() {
        super(`employees`);
    }

    async createNewEmployee(employee: {firstName: string, lastName: string, email?: string, education?: string}, token: string): Promise<Employee> {
        const response = await httpClient.post('/employees', employee, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });

        return response.data;
    }
}
