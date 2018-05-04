import {CategoryDTO} from "./category-dto";
import {SecondCategoryDTO} from "./second-category-dto";
import {ContentDTO} from "./content-dto";
import {UserDTO} from "./user-dto";

export interface HappeningDTO {
    id: string;
    date: Date;
    location: string;
    creator: string;
    categories: Array<CategoryDTO>;
    secondCategories: Array<SecondCategoryDTO>;
    contents: Array<ContentDTO>
    description: string;
}