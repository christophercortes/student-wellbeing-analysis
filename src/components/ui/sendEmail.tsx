"use client";

import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { StudentResponse } from "@/global/studentResponse";

interface Props {
  student: StudentResponse;
}

export default function SendEmail({ student }: Props) {
  const [status, setStatus] = useState<string | null>(null);

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    const serviceId = process.env.NEXT_PUBLIC_SERVICE_ID || "";
    const templateId = process.env.NEXT_PUBLIC_TEMPLATE_ID || "";
    const userId = process.env.NEXT_PUBLIC_USER_ID || "";

    if (!serviceId || !templateId || !userId) {
      setStatus("Error: Emailjs sericeId, templateId, or userId is missing.");
      return;
    }

    try {
      await emailjs.sendForm(serviceId, templateId, form);
      setStatus("Message sent successfully");
      form.reset();
    } catch (error) {
      console.error("Email error:", error);
      setStatus(
        "Error: We can't send your email due to internal issues. Try later."
      );
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
          htmlFor="StudentName"
          className="block text-sm font-medium text-gray-700"
        >
          Student
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 p-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={student.fullName}
        ></input>
      </div>

      <div className="space-y-4">
        <label
          htmlFor="ParentName"
          className="block text-sm font-medium text-gray-700"
        >
          Parent
        </label>
        <input
          type="text"
          id="ParentName"
          name="name"
          required
          aria-required="true"
          className="mt-1 block w-full rounded-md border border-gray-300 p-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={student.parentName}
        ></input>
      </div>

      <div className="space-y-4">
        <label
          htmlFor="ParentEmail"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="text"
          id="ParentEmail"
          name="email"
          required
          aria-required="true"
          className="mt-1 block w-full rounded-md border border-gray-300 p-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={student.parentEmail}
        ></input>
      </div>

      <div className="space-y-4">
        <label
          htmlFor="StudentReport"
          className="block text-sm font-medium text-gray-700"
        >
          Report
        </label>
        <textarea
          name="StudentReport"
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
