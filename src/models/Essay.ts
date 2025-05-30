// Required Variables
import {Document, Schema, model} from 'mongoose';

// Create the document
export interface IEssay extends Document 
{
    student_id: Schema.Types.ObjectId; // Which student wrote the essay, so we can track the data
    course_id: Schema.Types.ObjectId; // Which course was it for, so we can make the graph on the dashboard
    vaderData: Object; // The VADER data on the essay
}

// Schema Rules
const essaySchema = new Schema<IEssay>
(
    {
        student_id: 
        {
            type: Schema.Types.ObjectId,
            ref: 'Student', // References the Student model
            required: true
        },
        course_id:
        {
            type: Schema.Types.ObjectId,
            ref: 'Course', // References the Course model
            required: true
        },
        vaderData:
        {
            type: Object, // This allows a JSON file to be saved to the model
            required: true
        },
    },
    {
        timestamps: true
    }
);

const Essay = model<IEssay>('Essay', essaySchema);
export default Essay; // Export the Essay model for saving data