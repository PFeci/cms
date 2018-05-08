import {CategoryDTO} from "./category-dto";
import {SecondCategoryDTO} from "./second-category-dto";
import {ContentDTO} from "./content-dto";
import {Location} from "../interface/location";

export interface HappeningDTO {
    id: string;
    startDate: Date;
    endDate: Date;
    location: Location;
    creator: string;
    categories: Array<CategoryDTO>;
    secondCategories: Array<SecondCategoryDTO>;
    contents: Array<ContentDTO>
    description: string;
    title: string;
}