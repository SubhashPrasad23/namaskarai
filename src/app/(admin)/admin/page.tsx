"use client";

import { useEffect, useState } from "react";
import { FileText, BookOpen, Rocket, Users, Clock, TrendingUp, Activity } from "lucide-react";

type Stats = { prompts: number; courses: number; tools: number; pending: number; users: number; };

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats>({ prompts: 0, courses: 0, tools: 0, pending: 0, users: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/admin/stats");
        const data = await res.json();
        setStats(data);
      } catch (error) { console.error("Failed to fetch stats:", error); }
      finally { setLoading(false); }
    }
    fetchStats();
  }, []);

  const cards = [
    { label: "Total Prompts", value: stats.prompts, icon: FileText, bgLight: "bg-blue-50", textColor: "text-blue-600", gradient: "from-blue-500 to-blue-600" },
    { label: "AI Courses", value: stats.courses, icon: BookOpen, bgLight: "bg-emerald-50", textColor: "text-emerald-600", gradient: "from-emerald-500 to-emerald-600" },
    { label: "Tools Listed", value: stats.tools, icon: Rocket, bgLight: "bg-purple-50", textColor: "text-purple-600", gradient: "from-purple-500 to-purple-600" },
    { label: "Pending Review", value: stats.pending, icon: Clock, bgLight: "bg-amber-50", textColor: "text-amber-600", gradient: "from-amber-500 to-amber-600" },
    { label: "Waitlist Users", value: stats.users, icon: Users, bgLight: "bg-red-50", textColor: "text-red-600", gradient: "from-red-500 to-red-600" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
            <Activity size={16} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        </div>
        <p className="text-sm text-gray-500 ml-11">Overview of your platform metrics</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start justify-between mb-3">
                <div className={`${card.bgLight} w-10 h-10 rounded-xl flex items-center justify-center`}>
                  <Icon size={20} className={card.textColor} />
                </div>
                <TrendingUp size={14} className="text-green-500 mt-1" />
              </div>
              {loading ? (
                <div className="space-y-2">
                  <div className="h-8 w-16 bg-gray-100 rounded-lg animate-pulse" />
                  <div className="h-4 w-24 bg-gray-50 rounded animate-pulse" />
                </div>
              ) : (
                <>
                  <p className="text-3xl font-bold text-gray-900">{card.value}</p>
                  <p className="text-xs font-medium text-gray-500 mt-1">{card.label}</p>
                </>
              )}
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${card.gradient} opacity-[0.03] rounded-full -translate-y-8 translate-x-8`} />
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <a href="/admin/prompts" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group">
              <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center"><FileText size={16} className="text-blue-600" /></div>
              <div className="flex-1"><p className="text-sm font-medium text-gray-800">Manage Prompts</p><p className="text-xs text-gray-400">Add, edit or delete prompts</p></div>
            </a>
            <a href="/admin/courses" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group">
              <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center"><BookOpen size={16} className="text-emerald-600" /></div>
              <div className="flex-1"><p className="text-sm font-medium text-gray-800">Manage Courses</p><p className="text-xs text-gray-400">Create and update courses</p></div>
            </a>
            <a href="/admin/tools" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group">
              <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center"><Clock size={16} className="text-amber-600" /></div>
              <div className="flex-1"><p className="text-sm font-medium text-gray-800">Review Submissions</p><p className="text-xs text-gray-400">Approve or reject tool submissions</p></div>
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Platform Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between"><span className="text-sm text-gray-600">Content Health</span><span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-700 bg-green-50 px-2.5 py-1 rounded-full"><span className="w-1.5 h-1.5 rounded-full bg-green-500" />Healthy</span></div>
            <div className="flex items-center justify-between"><span className="text-sm text-gray-600">Pending Actions</span><span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${stats.pending > 0 ? "text-amber-700 bg-amber-50" : "text-green-700 bg-green-50"}`}><span className={`w-1.5 h-1.5 rounded-full ${stats.pending > 0 ? "bg-amber-500" : "bg-green-500"}`} />{stats.pending > 0 ? `${stats.pending} pending` : "All clear"}</span></div>
            <div className="flex items-center justify-between"><span className="text-sm text-gray-600">Database</span><span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-700 bg-green-50 px-2.5 py-1 rounded-full"><span className="w-1.5 h-1.5 rounded-full bg-green-500" />Connected</span></div>
            <div className="flex items-center justify-between"><span className="text-sm text-gray-600">Auth Status</span><span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-700 bg-green-50 px-2.5 py-1 rounded-full"><span className="w-1.5 h-1.5 rounded-full bg-green-500" />Authenticated</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
