import { StudentResponse } from "@/global/studentResponse";

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
			<h2 className="mt-8 text-lg font-semibold text-center">Management</h2>
			<table className="mt-9 w-3/5 mx-auto table-auto border-collapse text-sm">
				<thead>
					<tr className="border-b border-gray-200">
						<th className=" table-title">Name</th>
						<th className="table-title">Birthdate</th>
						<th className="table-title">Course?</th>
						<th className="table-title">Teacher</th>
						<th className="table-title">Phone Number</th>
						<th className="table-title">Parent</th>
						<th className="table-title">Parent Email</th>
					</tr>
				</thead>
				<tbody>
					{students.map((student) => {
						return (
							<tr key={student._id} className="border-b border-gray-200">
								<td className="table-title py-3">{student.fullName}</td>
								<td className="table-title py-3">
									{convertDateString(student.dateOfBirth)}
								</td>
								<td className="table-title py-3">{student.courseName}</td>
								<td className="table-title py-3">{student.teacherName}</td>
								<td className="table-title py-3">{student.contactInfo}</td>
								<td className="table-title py-3">{student.parentName}</td>
								<td className="table-title py-3">{student.parentEmail}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
}
