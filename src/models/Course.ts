import mongoose, { Document, Schema, model } from 'mongoose';

export interface ICourse extends Document {
  courseName: string;
  courseCode: string;
  description?: string;
  durationInWeeks: number;
  teacher: mongoose.Types.ObjectId; // Reference to Teacher
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const courseSchema = new Schema<ICourse>(
  {
    courseName: {
      type: String,
      required: [true, 'Course name is required'],
    },
    courseCode: {
      type: String,
      required: [true, 'Course code is required'],
      unique: true,
    },
    description: {
      type: String,
    },
    durationInWeeks: {
      type: Number,
      required: [true, 'Duration is required'],
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher',
      required: [true, 'Teacher reference is required'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Course = model<ICourse>('Course', courseSchema);
export default Course;
