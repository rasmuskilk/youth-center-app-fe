import {Employee} from "Employee";
import {Visitor} from "Visitor";
import {Activity} from "Activity";

export interface YouthCenterDetails {
    uuid: string;
    name: string;
    employees: Employee[],
    visitors: Visitor[],
    activities: Activity[]
}