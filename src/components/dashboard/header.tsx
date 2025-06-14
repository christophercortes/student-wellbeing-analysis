"use client";

import Logo from "@/components/logo";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface HeaderProps {
  onMenuClick: () => void;
  showSidebar: boolean;
}

export default function Header({ onMenuClick, showSidebar }: HeaderProps) {
  const { data: session } = useSession();
  const [user, setUser] = useState<any>(null);

  // Call the database and obtain the user
    useEffect(() => {
      const fetchTeacher = async () => {
        const res = await fetch(`${ process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000" }/api/teachers/${session?.user.id}`, {
        cache: "no-store", // Don't save the cache into the browser
        });
        const data = await res.json();
        setUser(data);
      };
      fetchTeacher();
    }, [session?.user.id]);

  const usernameContext = user?.fullName ?? "UserName";
  const imageSrcContext = user?.profilePicture ?? "/";

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
        <img
          src={imageSrcContext as string}
          width={48}
          height={48}
          className="rounded-full object-cover border border-gray-300"
          alt="user profile"
        />
        <div className="text-sm leading-tight">
          <p className="text-xs text-gray-500">Welcome back,</p>
          <h2 className="font-medium text-gray-800">{usernameContext}</h2>
        </div>
      </div>
    </header>
  );
}
