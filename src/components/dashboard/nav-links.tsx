"use client";

import {
  UserCircleIcon,
  LockClosedIcon,
  IdentificationIcon,
  FolderPlusIcon,
  Squares2X2Icon,
  EnvelopeIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

// Main navigation links
const links = [
  { name: "Dashboard", href: "/dashboard", icon: Squares2X2Icon },
  { name: "Home", href: "/", icon: HomeIcon },
  { name: "User Profile", href: "/dashboard/user-profile", icon: UserCircleIcon },
  { name: "Email", href: "", icon: EnvelopeIcon },
];

// Student links
const StudentLink = [
  {
    name: "Management",
    href: "/dashboard/student-management",
    icon: IdentificationIcon,
  },
  {
    name: "Records",
    href: "/dashboard/student-records",
    icon: FolderPlusIcon,
  },
];

// Courses Links
const CourseLink = [
  {
    name: "Management",
    href: "/dashboard/course-management",
    icon: IdentificationIcon,
  },
];

// Sign out link
const SignOutLink = {
  name: "Sign Out",
  icon: LockClosedIcon,
  href: "/",
};

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full p-6 bg-white text-gray-800">
      {/* Main Menu */}
      <div className="mb-6">
        <h2 className="text-xs font-semibold text-gray-500 uppercase mb-4 tracking-wider">
          Main Menu
        </h2>
        <div className="space-y-2">
          {links.map(({ name, href, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={name}
                href={href}
                className={clsx(
                  "flex items-center gap-4 py-2 rounded-lg transition-all duration-200",
                  isActive
                    ? "bg-blue-100 text-blue-700 font-semibold shadow-sm"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                <Icon className="w-6 h-6" />
                <span className="text-base">{name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Student */}
      <div className="mb-6">
        <h2 className="text-xs font-semibold text-gray-500 uppercase mb-4 tracking-wider">
          Student
        </h2>
        <div className="space-y-2">
          {StudentLink.map(({ name, href, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={name}
                href={href}
                className={clsx(
                  "flex items-center gap-4 py-2 rounded-lg transition-all duration-200",
                  isActive
                    ? "bg-blue-100 text-blue-700 font-semibold shadow-sm"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                <Icon className="w-6 h-6" />
                <span className="text-base">{name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Course */}
      <div className="mb-6">
        <h2 className="text-xs font-semibold text-gray-500 uppercase mb-4 tracking-wider">
          Course
        </h2>
        <div className="space-y-2">
          {CourseLink.map(({ name, href, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={name}
                href={href}
                className={clsx(
                  "flex items-center gap-4 py-2 rounded-lg transition-all duration-200",
                  isActive
                    ? "bg-blue-100 text-blue-700 font-semibold shadow-sm"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                <Icon className="w-6 h-6" />
                <span className="text-base">{name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Sign Out */}
      <div className="mt-auto border-t pt-4">
        <Link
          href={SignOutLink.href}
          className={clsx(
            "flex items-center gap-4 py-2 rounded-lg transition-all duration-200",
            pathname === SignOutLink.href
              ? "bg-red-100 text-grey-700 font-semibold shadow-sm"
              : "text-gray-600 hover:bg-red-100 hover:text-gray-900"
          )}
        >
          <SignOutLink.icon className="w-6 h-6" />
          <span>{SignOutLink.name}</span>
        </Link>
      </div>
    </div>
  );
}
