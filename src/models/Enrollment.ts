// Required Variables
import {Document, Schema, model} from 'mongoose';

// Create the document
export interface IEnrollment extends Document 
{
    student_id: Schema.Types.ObjectId; // A Student in a course
    course_id: Schema.Types.ObjectId; // The Course the Student is in
}

// Schema Rules
const enrollmentSchema = new Schema<IEnrollment>
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
    },
    {
        timestamps: true
    }
);

const Enrollment = model<IEnrollment>('Enrollment', enrollmentSchema);
export default Enrollment; // Export the Enrollment model for saving data and linking Courses to Students