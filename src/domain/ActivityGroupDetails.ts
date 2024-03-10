import {Activity} from "./Activity";

export interface ActivityGroupDetails {
    uuid: string,
    name: string,
    activities: Activity[],
}