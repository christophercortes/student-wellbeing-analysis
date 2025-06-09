"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { StudentResponse } from "@/global/studentResponse";

export default function StudentTable() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("student")?.toLowerCase() || "";

  const [students, setStudents] = useState<StudentResponse[]>([]);

  useEffect(() => {
    async function getStudents() {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
        }/api/students`,
        { cache: "no-store" }
      );
      if (!response.ok) {
        console.error("Error fetching students");
        return [];
      }
      const data = await response.json();
      setStudents(data.students || []);
    }

    getStudents();
  }, []);

  const filteredStudents = [...students]
    .filter((student) => student.fullName.toLowerCase().includes(searchTerm))
    .sort((a, b) => a.fullName.localeCompare(b.fullName));

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-semibold">List of Student</h1>
      <table className="hidden min-w-full text-gray-900 md:table">
        <thead className="rounded-lg text-left text-sm font-semibold bg-gray-100">
          <tr className="w-full border-b py-3 text-sm">
            <th className="px-4 py-5 sm:pl-6">Student</th>
            <th className="px-3 py-5">Age</th>
            <th className="px-3 py-5">Teacher</th>
            <th className="px-3 py-5">Course</th>
          </tr>
        </thead>
        <tbody className="bg-white text-sm divide-y divide-gray-200">
          {filteredStudents.map((student) => (
            <tr
              key={student.id}
              className="hover:bg-blue-50 cursor-pointer"
              onClick={() =>
                router.push(`/dashboard/student-records/student/${student._id}`)
              }
            >
              <td className="px-4 py-3 sm:lp-6">{student.fullName}</td>
              <td className="px-4 py-3">-</td>
              <td className="px-4 py-3">{student.teacherName}</td>
              <td className="px-4 py-3">{student.courseName}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Mobile view */}
      <div className="space-y-4 md:hidden">
        {filteredStudents.map((student) => (
          <div
            key={student.id}
            className="bg-white rounded-lg shadow p-4 border border-gray-200"
            onClick={() =>
              router.push(`/dashboard/student-records/student/${student._id}`)
            }
          >
            <p className="font-semibold text-gray-900">{student.fullName}</p>
            <p className="text-sm text-gray-600">
              <span className="font-medium font-semibold">Teacher: </span>
              {student.teacherName}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium font-semibold">Course: </span>
              {student.courseName}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
