"use client";

import Image from "next/image";
import Logo from "@/components/logo";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

interface HeaderProps {
  onMenuClick: () => void;
  showSidebar: boolean;
}

export default function Header({ onMenuClick, showSidebar }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow border-b border-gray-200">
      <div className="hidden md:block">
        <Logo />
      </div>
      <div>
        <button
          className="md:hidden p-2 text-gray-600 hover:text-gray-900"
          onClick={onMenuClick}
          aria-label="Toggle Menu"
        >
          {showSidebar ? (
            <XMarkIcon className="w-6 h-6" />
          ) : (
            <Bars3Icon className="w-6 h-6" />
          )}
        </button>
      </div>
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
