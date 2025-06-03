import Time from "@/components/dashboard/date";
import Search from "@/components/dashboard/SearchStudent";
import StudentTable from "@/components/dashboard/StudentTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Records",
};

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex justify-end">
          <Time />
        </div>
        <Search placeholder="Search for a student..." />
        <div className="bg-white rounded-lg shadow border border-gray-200 p-4">
          <StudentTable />
        </div>
      </div>
    </div>
  );
}
