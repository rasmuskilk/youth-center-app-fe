import {Employee} from "./Employee";
import {Visitor} from "./Visitor";
import {ActivityGroup} from "./ActivityGroup";

export interface YouthCenterDetails {
    uuid: string;
    name: string;
    employees: Employee[],
    visitors: Visitor[],
    activityGroups: ActivityGroup[]
}