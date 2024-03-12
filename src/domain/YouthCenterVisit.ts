import {Visitor} from "./Visitor";

export interface YouthCenterVisit {
    dateTime: Date,
    youthCenterUuid: string,
    visitor: Visitor
}