// src/app/api/teachers/uploadPhoto/route.ts
import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Teacher from '@/models/Teacher'; // Adjust path if needed

// MongoDB connection
const connectMongo = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI!);
  }
};

export async function POST(req: NextRequest) {
  try {
    await connectMongo();

    const formData = await req.formData();
    const file = formData.get('file') as File;
    const teacherId = formData.get('teacherId')?.toString();

    if (!file || !teacherId) {
      return NextResponse.json({ error: 'Missing file or teacherId' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString('base64');
    const dataUri = `data:${file.type};base64,${base64}`;

    // Save to MongoDB
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      teacherId,
      { profilePicture: dataUri },
      { new: true }
    );

    if (!updatedTeacher) {
      return NextResponse.json({ error: 'Teacher not found' }, { status: 404 });
    }

    return NextResponse.json({
      message: 'Profile picture uploaded successfully',
      teacherId: updatedTeacher._id,
      profilePicture: updatedTeacher.profilePicture,
    });
  } catch (error) {
    console.error('Upload failed:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
