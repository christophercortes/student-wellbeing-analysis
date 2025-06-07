"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { StudentResponse } from "@/global/studentResponse";
import { ChartBarStacked } from "@/components/dashboard/BarChart";

export default function StudentDetailPage() {
  const params = useParams();
  const id = params?.id;

  const [student, setStudent] = useState<StudentResponse | null>(null);

  useEffect(() => {
    async function getStudents() {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
        }/api/students/${id}`,
        { cache: "no-store" }
      );

      if (!response.ok) {
        console.error("Error fetching students");
        return [];
      }
      const data = await response.json();
      setStudent(data.student);
    }

    getStudents();
  }, [id]);

  if (!student) return;

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-5xl mx-auto space-y-8">
        <section className="bg-white shadow rounded-xl p-6 space-y-4">
          <h1 className="text-xl font-semibold text-gray-800">
            Student Information
          </h1>
          <table className="hidden md:table w-full text-sm text-gray-700">
            <thead className="bg-gray-100">
              <tr className="text-left font-medium">
                <th className="px-4 py-3">Name:</th>
                <th className="px-4 py-3">Birth date:</th>
                <th className="px-4 py-3">Course:</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <td className="px-4 py-2">{`${student.fullName}`}</td>
              <td className="px-4 py-2">{`${student.dateOfBirth}`}</td>
              <td className="px-4 py-2">{`${student.courseName}`}</td>
            </tbody>
          </table>
        </section>

        <section className="bg-white shadow rounded-xl p-6 space-y-4">
          <h1 className="text-xl font-semibold text-gray-800">
            Student Contact Information
          </h1>
          <table className="hidden md:table w-full text-sm text-gray-700">
            <thead className="bg-gray-100">
              <tr className="text-left font-medium">
                <th className="px-4 py-3">Parent</th>
                <th className="px-4 py-3">Email:</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <td className="px-4 py-2">{`${student.parentName}`}</td>
              <td className="px-4 py-2">{`${student.parentEmail}`}</td>
            </tbody>
          </table>
        </section>

        <section className="bg-white shadow rounded-xl p-6 space-y-4">
          <h1 className="text-xl font-semibold text-gray-800">
            Upload Assignment
          </h1>
          <table className="hidden md:table w-full text-sm text-gray-700">
            <thead className="bg-gray-100">
              <tr className="text-left font-medium">
                <th className="px-4 py-3">Upload</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <td className="px-4 py-2">
                Upload student written assignment to analyze
              </td>
            </tbody>
          </table>
        </section>

        <section className="bg-white shadow rounded-xl p-6 space-y-4">
          <h1 className="text-xl font-semibold text-gray-800">
            Student Report
          </h1>
          <table className="hidden md:table w-full text-sm text-gray-700">
            <thead className="bg-gray-100">
              <tr className="text-left font-medium">
                <th className="px-4 py-3">Bar Chart Report</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <td className="px-4 py-2">
                <ChartBarStacked />
              </td>
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}
