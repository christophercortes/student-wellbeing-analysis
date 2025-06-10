"use client";

import { useState } from "react";
import SideNav from "@/components/dashboard/sidenav";
import Header from "@/components/dashboard/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="flex h-screen flex-col">
      <Header onMenuClick={() => setShowSidebar(!showSidebar)} showSidebar={ showSidebar} />
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        <div
          className={`${
            showSidebar ? "block" : "hidden"
          } md:block w-full md:w-64 border-b md:border-r border-gray-200 bg-white`}
        >
          <SideNav />
        </div>
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}
