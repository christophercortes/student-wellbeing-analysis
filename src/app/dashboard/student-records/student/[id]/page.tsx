import { StudentResponse } from "@/global/studentResponse";

export default async function Page() {
        async function getStudentsById() {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/students`, { cache: "no-store" }
            );
            if (!response.ok) {
                console.error("Error fetching students");
                return [];
            }
            const data = await response.json();
            return (data.students as StudentResponse[]) || [];
        }
        const students = await getStudentsById();

    return (
        <div>
            <h1>Student special page</h1>
            <tbody>
                {students.map((student) => (
                    <tr
                        key={student.id}
                    >
                        <td>{student.id}</td>
                        <td>{ student.fullName}</td>
                    </tr>
                ))}
            </tbody>
        </div>
    )
}