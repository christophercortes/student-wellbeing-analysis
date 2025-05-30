import { Document, Schema, model } from 'mongoose';

export interface ITeacher extends Document {
  fullName: string;
  email: string;
  phoneNumber: string;
  subjectSpecialization: string;
  teacherId: string;
  address?: string;
  isActive: boolean;
  profilePicture?: string; 
  createdAt?: Date;
  updatedAt?: Date;
}

const teacherSchema = new Schema<ITeacher>(
  {
    fullName: {
      type: String,
      required: [true, 'Teacher full name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      unique: true,
    },
    phoneNumber: {
      type: String
    },
    subjectSpecialization: {
      type: String,
      required: [true, 'Subject specialization is required'],
    },
    teacherId: {
      type: String,
      required: [true, 'Employee ID is required'],
      unique: true,
    },
    address: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    profilePicture: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Teacher = model<ITeacher>('Teacher', teacherSchema);
export default Teacher;
