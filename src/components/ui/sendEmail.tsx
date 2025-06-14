"use client";

import React, { useState } from "react";
import { StudentResponse } from "@/global/studentResponse";

interface Props {
  student: StudentResponse;
}

export default function SendEmail({ student }: Props) {
  const [status, setStatus] = useState<string | null>(null);

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const payload = {
      studentName: formData.get("studentName"),
      parentName: formData.get("parentName"),
      parentEmail: formData.get("parentEmail"),
      studentReport: formData.get("studentReport"),
    };

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (result.success) {
        setStatus("Message sent successfully");
        form.reset();
      } else {
        setStatus(`Error: ${result.error || "Failed to send email."}`);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setStatus("Error: Unable to send email. Try later.")
    }
  };

  return (
    <form
      onSubmit={sendEmail}
      className="hidden md:block max-w-2xl mx-auto px-6 py-8 bg-white shadow-xl rounded-xl space-y-6"
    >
      <h2 className="text-2xl font-semibold text-center text-gray-800">
        Send Student Report
      </h2>

      <div className="space-y-4">
        <label
          htmlFor="studentName"
          className="block text-sm font-medium text-gray-700"
        >
          Student
        </label>
        <input
          type="text"
          id="studentName"
          name="studentName"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 p-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={student.fullName}
        ></input>
      </div>

      <div className="space-y-4">
        <label
          htmlFor="parentName"
          className="block text-sm font-medium text-gray-700"
        >
          Parent
        </label>
        <input
          type="text"
          id="parentName"
          name="parentName"
          required
          aria-required="true"
          className="mt-1 block w-full rounded-md border border-gray-300 p-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={student.parentName}
        ></input>
      </div>

      <div className="space-y-4">
        <label
          htmlFor="parentEmail"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="text"
          id="parentEmail"
          name="parentEmail"
          required
          aria-required="true"
          className="mt-1 block w-full rounded-md border border-gray-300 p-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={student.parentEmail}
        ></input>
      </div>

      <div className="space-y-4">
        <label
          htmlFor="studentReport"
          className="block text-sm font-medium text-gray-700"
        >
          Report
        </label>
        <textarea
          name="studentReport"
          required
          aria-required="true"
          className="mt-1 block w-full rounded-md border border-gray-300 p-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>

      <button
        type="submit"
        className="w-full rounded-md bg-blue-600 text-white py-2 text-sm font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-offset-2 focus:ring-blue-500"
      >
        Send
      </button>
      {status && (
        <div
          className={`${
            status.includes("Error") ? "text-red-600" : "text-green-600"
          }`}
        >
          {status}
        </div>
      )}
    </form>
  );
}
