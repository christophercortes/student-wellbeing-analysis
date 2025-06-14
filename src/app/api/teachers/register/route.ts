import connectDB from '@/config/database';
import Teacher from '@/models/Teacher';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
	try {
		await connectDB();

		const { fullName, email, password, phoneNumber, address } = await req.json();

		const teacherId = crypto.randomUUID();
		const subjectSpecialization = 'none';
		if (
			!fullName ||
			!email ||
			!password ||
			!subjectSpecialization ||
			!teacherId ||
			!address
		) {
			return NextResponse.json(
				{ message: 'All required fields must be provided.' },
				{ status: 400 }
			);
		}

		const existingTeacher = await Teacher.findOne({
			$or: [{ email }, { teacherId }],
		});
		if (existingTeacher) {
			return NextResponse.json(
				{ message: 'A teacher with this email or Employee ID already exists.' },
				{ status: 409 }
			);
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		await Teacher.create({
			fullName,
			email,
			password: hashedPassword,
			phoneNumber,
			subjectSpecialization,
			teacherId,
			address,
		});

		return NextResponse.json(
			{ message: 'Teacher registered successfully.' },
			{ status: 201 }
		);
	} catch (error) {
		console.error('TEACHER_REGISTRATION_ERROR', error);
		return NextResponse.json(
			{ message: 'An unexpected error occurred during registration.' },
			{ status: 500 }
		);
	}
}
