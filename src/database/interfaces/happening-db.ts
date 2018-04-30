import {CategoryDb} from "./category-db";
import {SecondCategoryDb} from "./second-category-db";
import {ContentDb} from "./content-db";

export interface HappeningDb {
    date: Date;
    location: string,
    creator: string,
    categories: Array<CategoryDb>,
    secondCategories: Array<SecondCategoryDb>,
    contents: Array<ContentDb>,
    description: string
}