import {Visitor} from "./Visitor";

export interface ActivityDetails {
    "uuid": string,
    "description": string,
    "startDate": Date,
    "endDate": Date,
    "activityTypeName": string,
    "visitors": Visitor[]
}