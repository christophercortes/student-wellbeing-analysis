
import { NextRequest, NextResponse } from 'next/server';
import Teacher from '@/models/Teacher';
import connectDB  from '@/config/database';

// GET all teachers
export async function GET() {
  await connectDB();
  try {
    const teachers = await Teacher.find();
    return NextResponse.json(teachers);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST a new teacher
export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const data = await req.json();
    const newTeacher = await Teacher.create(data);
    return NextResponse.json(newTeacher, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
