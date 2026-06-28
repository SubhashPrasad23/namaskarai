"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const adminLinks = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/prompts", label: "Prompts" },
  { href: "/admin/courses", label: "AI Course" },
  { href: "/admin/tools", label: "Launch Tool" },
  { href: "/admin/users", label: "Users" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-[#FFF8F6]">
      <aside className="w-56 border-r border-red-100 bg-[#FFF8F6] p-4 hidden md:flex md:flex-col">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900">Admin Panel</h2>
          <p className="text-xs text-gray-500">Manage content</p>
        </div>
        <nav className="flex flex-col gap-1 flex-1">
          {adminLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-red-100 text-red-700"
                    : "text-gray-600 hover:bg-red-50 hover:text-red-700"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="md:hidden fixed top-0 left-0 right-0 z-50 border-b border-red-100 bg-[#FFF8F6] p-2 flex gap-1 overflow-x-auto">
        {adminLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-3 py-2 text-xs font-medium whitespace-nowrap transition-colors ${
                isActive ? "bg-red-100 text-red-700" : "text-gray-500"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>

      <main className="flex-1 p-6 md:p-8 mt-12 md:mt-0 bg-[#FFF8F6]">
        {children}
      </main>
    </div>
  );
}
