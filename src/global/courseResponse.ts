import { ICourse } from "@/models/Course";

// Export the id of the model
export interface CourseResponse extends ICourse
{
    _id: string;
}