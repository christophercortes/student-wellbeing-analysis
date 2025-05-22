const mosckStudents = [];

export default function Page() {
	return (
		<>
			<h2 className="text-lg font-semibold text-center">Management</h2>
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
					<tr className="border-b border-gray-200">
						<td className="table-title py-3">pedro</td>
						<td className="table-title py-3">2005-02-6</td>
						<td className="table-title py-3">Math101</td>
						<td className="table-title py-3">steve jobs</td>
						<td className="table-title py-3">+984125257172</td>
						<td className="table-title py-3">pedro parent</td>
						<td className="table-title py-3">pedro@pedro.com</td>
					</tr>
				</tbody>
			</table>
		</>
	);
}
