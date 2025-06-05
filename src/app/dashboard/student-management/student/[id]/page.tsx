// Imports
import Link from 'next/link';

export default async function Page({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const response = await fetch(
		`${
			process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
		}/api/students/${id}`,
		{
			cache: "no-cache",
		}
	);
	console.log(response);
	if (!response.ok) {
		return <div className="text-center mt-8">Student not found</div>;
	}

	const { student } = await response.json();
	//const student = mosckStudents[0];
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
				</div>
			</div>
			<div className="mt-8">
                <Link className="text-blue-400 hover:text-blue-200 py-5" href={"/dashboard/student-management"}>Go Back</Link>
            </div>
		</div>
	);
}
