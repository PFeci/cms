import {CategoryDTO} from "./category-dto";
import {SecondCategoryDTO} from "./second-category-dto";
import {ContentDTO} from "./content-dto";

export interface HappeningDTO {
    id?: number;
    date?: Date;
    location?: string;
    creator?: string;
    categories?: Array<CategoryDTO>;
    secondCategories?: Array<SecondCategoryDTO>;
    contents?: Array<ContentDTO>
    description?: string;
}