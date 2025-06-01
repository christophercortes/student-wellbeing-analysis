import { StudentResponse } from "@/global/studentResponse";
import Link from "next/link";
import RemoveStudent from "@/components/dashboard/student-management/RemoveStudent";

export default async function Page() {
	async function getStudents() {
		const response = await fetch(
			`${
				process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
			}/api/students`,
			{ cache: "no-store" }
		);
		if (!response.ok) {
			console.error(" Error fetching students");
			return [];
		}
		const data = await response.json();
		return (data.students as StudentResponse[]) || [];
	}

	const convertDateString = (oldDate: Date) => {
		// Workable date
		const date = new Date(oldDate);
		// Convert the date object
		const year = (date.getFullYear());
		const day = (date.getDate() + 1);
		const month = (date.getMonth() + 1);

		const dateString = `${month}/${day}/${year}`;

		return (dateString)
	}

	const students = await getStudents();
	return (
		<>
			<div className="flex m-5">
				<button className="bg-blue-300 shrink text-sm text-gray-700 py-3 px-6 border px-8 py-2 hover:bg-blue-400 hover:text-white">
					<Link
					href={"/dashboard/student-management/student/create"}
					>
						Create Student
					</Link>
				</button>
			</div>
			<h2 className="mt-8 text-lg font-semibold text-center">Management</h2>
			<table className="mt-9 w-3/5 mx-auto table-auto border-collapse text-sm">
				<thead>
					<tr className="border-b border-gray-200">
						<th className=" table-title">Name</th>
						<th className="table-title hidden md:table-cell">Birthdate</th>
						<th className="table-title">Course?</th>
						<th className="table-title">Teacher</th>
						<th className="table-title hidden lg:table-cell">Phone Number</th>
						{/* <th className="table-title hidden md:table-cell">Parent</th>
						<th className="table-title hidden lg:table-cell">Parent Email</th> */}
					</tr>
				</thead>
				<tbody>
					{students.map((student) => {
						return (
							<tr className="border-b border-gray-200" key={student._id}>
								
								<td className="table-title py-3">
									<Link
									href={`/dashboard/student-management/student/${student._id}`}
									className="hover:bg-gray-100"
									>
										{student.fullName}
									</Link>
								</td>
								<td className="table-title py-3 hidden md:table-cell">
									{convertDateString(student.dateOfBirth)}
								</td>
								<td className="table-title py-3">{student.courseName}</td>
								<td className="table-title py-3">{student.teacherName}</td>
								<td className="table-title py-3 hidden lg:table-cell">{student.contactInfo}</td>
								{/* <td className="table-title py-3 hidden md:table-cell">{student.parentName}</td>
								<td className="table-title py-3 hidden lg:table-cell">{student.parentEmail}</td> */}
								<td className="table-title py-3">
									<Link 
									href={`/dashboard/student-management/student/update/${student._id}`}
									className="text-blue-400 hover:text-blue-200"
									>
										Edit
									</Link>
								</td>
								<td className="table-title py-3">
									<RemoveStudent id={student._id} fullName={student.fullName} />
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
}
