import {Location} from "../../interface/location";

export interface HappeningDb {
    startDate: Date;
    endDate: Date;
    location: Location,
    creator: string,
    categories: Array<string>,
    secondCategories: Array<string>,
    contents: Array<string>,
    description: string,
    subscribers: Array<string>,
    title: string
}