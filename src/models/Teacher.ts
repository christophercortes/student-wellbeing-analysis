import { Document, Schema, model, models } from 'mongoose';

// 1. The base interface now includes the optional 'password' field.
export interface ITeacher extends Document {
  fullName: string;
  email: string;
  password?: string; 
  phoneNumber: string;
  subjectSpecialization: string;
  teacherId: string;
  address?: string;
  isActive: boolean;
  profilePicture?: string; 
}

// 2. This helper type is for when we specifically request the password.
export type ITeacherWithPassword = ITeacher & { password: Required<ITeacher['password']> };


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
  
    password: { 
      type: String,
      required: [true, 'Password is required'],
      select: false,
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

// 4. Use 'models.Teacher' to prevent Next.js hot-reloading errors.
const Teacher = models.Teacher || model<ITeacher>('Teacher', teacherSchema);

export default Teacher;