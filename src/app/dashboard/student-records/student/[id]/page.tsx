"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { StudentResponse } from "@/global/studentResponse";
import { SentimentAnalysis } from "@/components/SentimentAnalysis";

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
    <div className="min-h-screen bg-gray-50 sm:px-6 lg:px-8 py-6">
      <div className="w-full max-w-7xl mx-auto space-y-6">
        <div className="p-4 space-y-4">
          <h2 className="hidden min-w-full sm:table text-xl font-semibold">
            Student Information
          </h2>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-semibold bg-gray-100">
              <tr className="w-full border-b py-3 text-sm">
                <th className="px-4 py-5 sm:pl-6">Name</th>
                <th className="px-3 py-5">Birth date</th>
                <th className="px-3 py-5">Course</th>
                <th className="px-3 py-5">Teacher</th>
              </tr>
            </thead>
            <tbody className="bg-white text-sm border-b">
              <td className="px-4 py-3 sm:pl-6">{`${student.fullName}`}</td>
              <td className="px-4 py-3">{`${student.dateOfBirth}`}</td>
              <td className="px-4 py-3">{`${student.courseName}`}</td>
              <td className="px-4 py-3">{student.teacherName}</td>
            </tbody>
          </table>

          <h2 className="hidden min-w-full sm:table text-xl font-semibold mt-8">
            Student Contact Information
          </h2>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-semibold bg-gray-100">
              <tr className="w-full border-b py-3 text-sm">
                <th className="px-4 py-5 sm:pl-6">Parent</th>
                <th className="px-3 py-5">Email</th>
                <th className="px-3 py-5">Phone Number</th>
              </tr>
            </thead>
            <tbody className="bg-white text-sm border-b">
              <td className="px-4 py-3 sm:pl-6">{`${student.parentName}`}</td>
              <td className="px-4 py-3">{`${student.parentEmail}`}</td>
              <td className="px-4 py-3">{student.contactInfo}</td>
            </tbody>
          </table>

          <h2 className="hidden min-w-full sm:table text-xl font-semibold mt-8">
            Upload Assignment
          </h2>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-semibold bg-gray-100">
              <tr className="w-full border-b py-3 text-sm">
                <th className="px-4 py-5 sm:pl-6">Upload</th>
              </tr>
            </thead>
            <tbody className="bg-white border-b">
              <SentimentAnalysis />
            </tbody>
          </table>

          <h2 className="hidden min-w-full sm:table text-xl font-semibold mt-8">
            Student Report
          </h2>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-semibold bg-gray-100">
              <tr className="w-full border-b py-3 text-sm">
                <th className="px-4 py-3">Bar Chart Report</th>
              </tr>
            </thead>
            <tbody className="bg-white text-sm border-b">
              <td className="px-4 py-2"></td>
              {/* chart goes here */}
            </tbody>
          </table>
        </div>
        {/* Mobile View */}
        <div className="space-y-4 md:hidden">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold">Information</h2>
            <p className="font-semibold text-gray-900">{student.fullName}</p>
            <p className="text-sm text-gray-600">
              <span className="font-medium font-semibold">Birthday: </span>
              {`${student.dateOfBirth}`}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium font-semibold">Course: </span>
              {`${student.courseName}`}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium font-semibold">Teacher: </span>
              {`${student.teacherName}`}
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold">Contact Information</h2>
            <p className="text-sm text-gray-600">
              <span className="font-medium font-semibold">Parent: </span>
              {`${student.parentName}`}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium font-semibold">Email: </span>
              {`${student.parentEmail}`}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium font-semibold">Phone Number: </span>
              {`${student.contactInfo}`}
            </p>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg shadow">
            <p className="text-sm text-red-500">
              To see more functionalities use a computer
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
