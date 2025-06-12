import { Document, Schema, model } from 'mongoose';

export interface IStudent extends Document {
  fullName: string;
  dateOfBirth: Date;
  courseName: string;
  teacherName: string;
  contactInfo: string;
  parentName: string;
  parentEmail: string;
  age: number;
  image_id: string; // This id hooks to the image object
  createdAt?: Date;
  updatedAt?: Date;
}

const studentSchema = new Schema<IStudent>(
  {
    fullName: {
      type: String,
      required: [true, 'Student full name is required'],
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'Date of birth is required'],
    },
    courseName: {
      type: String,
      required: [true, 'Course name is required'],
    },
    teacherName: {
      type: String,
      required: [true, 'Teacher name is required'],
    },
    contactInfo: {
      type: String
    },
    parentName: {
      type: String,
      required: [true, "Parent's full name is required"],
    },
    parentEmail: {
      type: String
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
      default: 0,
    },
    image_id: {
      type: String,
      required: false,
      default: ""
    },
  },
  {
    timestamps: true,
  }
);

const Student = model<IStudent>('Student', studentSchema);
export default Student;
