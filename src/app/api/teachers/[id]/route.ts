
import { NextRequest, NextResponse } from 'next/server';
import Teacher from '@/models/Teacher';
import connectDB from '@/config/database';

// GET a single teacher by ID
export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();

  try {
    const teacher = await Teacher.findById(params.id);
    if (!teacher) {
      return NextResponse.json({ error: 'Teacher not found' }, { status: 404 });
    }
    return NextResponse.json(teacher);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT update a teacher by ID
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const updates = await req.json();

  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(params.id, updates, { new: true });
    if (!updatedTeacher) {
      return NextResponse.json({ error: 'Teacher not found' }, { status: 404 });
    }
    return NextResponse.json(updatedTeacher);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE a teacher by ID
export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();

  try {
    const deletedTeacher = await Teacher.findByIdAndDelete(params.id);
    if (!deletedTeacher) {
      return NextResponse.json({ error: 'Teacher not found' }, { status: 404 });
    }
    return NextResponse.json(deletedTeacher);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
