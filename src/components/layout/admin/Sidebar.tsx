"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import {
  LayoutDashboard, FileText, BookOpen, Rocket, Users,
  LogOut, Menu, X, ChevronRight,
} from "lucide-react";

const adminLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/prompts", label: "Prompts", icon: FileText },
  { href: "/admin/courses", label: "AI Courses", icon: BookOpen },
  { href: "/admin/tools", label: "Tool Submissions", icon: Rocket },
  { href: "/admin/users", label: "Users", icon: Users },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleClose = useCallback(() => setMobileOpen(false), []);

  async function handleLogout() {
    const res = await fetch("/api/admin/logout", { method: "POST" });
    const data = await res.json();
    if (data.success) { router.push("/login"); router.refresh(); }
  }

  const NavContent = () => (
    <div className="flex flex-col h-full">
      <div className="px-5 py-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-sm">
            <span className="text-white text-sm font-bold">N</span>
          </div>
          <div>
            <h2 className="text-[15px] font-semibold text-gray-900">Namaskar AI</h2>
            <p className="text-[11px] text-gray-400 font-medium">Admin Panel</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <p className="px-3 mb-2 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Menu</p>
        {adminLinks.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link key={link.href} href={link.href}
              className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all duration-200 ${isActive ? "bg-red-50 text-red-700 shadow-sm border border-red-100" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}>
              <Icon size={18} className={`transition-colors ${isActive ? "text-red-600" : "text-gray-400 group-hover:text-gray-600"}`} />
              <span className="flex-1">{link.label}</span>
              {isActive && <ChevronRight size={14} className="text-red-400" />}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-gray-100">
        <button onClick={handleLogout}
          className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200">
          <LogOut size={18} /><span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:flex lg:flex-col w-[260px] min-h-screen border-r border-gray-100 bg-white shrink-0">
        <NavContent />
      </aside>

      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 h-14 bg-white/80 backdrop-blur-xl border-b border-gray-100 flex items-center px-4">
        <button onClick={() => setMobileOpen(true)} className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors" aria-label="Open menu">
          <Menu size={20} className="text-gray-700" />
        </button>
        <div className="flex items-center gap-2 ml-3">
          <div className="w-7 h-7 rounded-md bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
            <span className="text-white text-xs font-bold">N</span>
          </div>
          <span className="text-sm font-semibold text-gray-900">Admin</span>
        </div>
      </header>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" onClick={handleClose} aria-hidden="true" />
      )}

      <aside className={`lg:hidden fixed top-0 left-0 z-[60] h-full w-[280px] bg-white shadow-2xl transform transition-transform duration-300 ease-out ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <button onClick={handleClose} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors z-10" aria-label="Close menu">
          <X size={18} className="text-gray-500" />
        </button>
        <NavContent />
      </aside>
    </>
  );
}
