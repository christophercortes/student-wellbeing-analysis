// Imports
import Link from 'next/link';

const obtainStudent = async (id: string) => {
	try {
		const response = await fetch(
			`${
				process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
			}/api/students/${id}`
		);

		if (!response.ok) {
			return false;
		}

		const { student } = await response.json();

		return student;
	} catch (error) {
		console.log(error);
	}
};

const obtainStudentImage = async (id: string) => {
	try {
		// Attempt to fetch the data
		const response = await fetch(
			`${
				process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
			}/api/images/obtain/${id}`
		);

		if (response.ok) {
			// Obtain the image from the json response
			const { image } = await response.json();
			// Return the div used in the page
			return (
				<div>
					<p className="font-semibold">Image:</p>
					<img
						src={`data:${image.contentType};base64,${Buffer.from(
							image.data
						).toString('base64')}`}
						alt={image.name}
						className="w-150"
					/>
				</div>
			);
		} else {
			return (
				<div>
					<p className="font-semibold">Image:</p>
					<p>Image Not Found.</p>
				</div>
			);
		}
	} catch (error) {
		// Log the error
		console.log(error);
	}
};

export default async function Page({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

	const student = await obtainStudent(id);

	if (!student) {
		return <div className="text-center mt-8">Student not found</div>;
	}

	let imageDiv;

	if (student.image_id.length === 0) {
		imageDiv = <div></div>; // This will equal an empty div
	} else {
		// Attempt to obtain the image now
		imageDiv = obtainStudentImage(student.image_id);
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<h2 className="text-2xl font-semibold mb-6">Student Details</h2>
			<div className="bg-white shadow-md rounded-lg p-6">
				<div className="grid grid-cols-1 text-center sm:text-left sm:grid-cols-2 gap-4">
					<div>
						<p className="font-semibold">Full Name:</p>
						<p>{student.fullName}</p>
					</div>
					<div>
						<p className="font-semibold">Date of Birth:</p>
						<p>{new Date(student.dateOfBirth).toLocaleDateString()}</p>
					</div>
					<div>
						<p className="font-semibold">Age:</p>
						<p>{student.age}</p>
					</div>
					<div>
						<p className="font-semibold">Course:</p>
						<p>{student.courseName}</p>
					</div>
					<div>
						<p className="font-semibold">Teacher:</p>
						<p>{student.teacherName}</p>
					</div>
					<div>
						<p className="font-semibold">Contact Info:</p>
						<p>{student.contactInfo}</p>
					</div>
					<div>
						<p className="font-semibold">Parent Name:</p>
						<p>{student.parentName}</p>
					</div>
					<div>
						<p className="font-semibold">Parent Email:</p>
						<p>{student.parentEmail}</p>
					</div>
					{imageDiv}
				</div>
			</div>
			<div className="mt-8">
				<Link
					className="text-blue-400 hover:text-blue-200 py-5"
					href={'/dashboard/student-management'}
				>
					Go Back
				</Link>
			</div>
		</div>
	);
}
