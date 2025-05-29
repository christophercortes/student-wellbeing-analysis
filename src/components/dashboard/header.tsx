"use client";
import Image from "next/image";
import Logo from "@/components/logo";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow border-b border-gray-200">
      <Logo />
      <div className="flex items-center gap-4">
        <Image
          src="/"
          width={48}
          height={48}
          className="rounded-full object-cover"
          alt="user profile"
        />
        <div className="text-sm text-gray-700 mr-10">
          <p className="text-xs text-gray-500">Welcome back,</p>
          <h2 className="font-medium">User Name</h2>
        </div>
      </div>
    </header>
  );
}
