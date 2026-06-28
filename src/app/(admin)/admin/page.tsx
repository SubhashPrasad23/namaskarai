"use client";

import { useEffect, useState } from "react";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({ prompts: 0, courses: 0, tools: 0, pending: 0, users: 0 });

  useEffect(() => {
    async function fetchStats() {
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      setStats(data);
    }
    fetchStats();
  }, []);

  const cards = [
    { label: "Total Prompts", value: stats.prompts },
    { label: "Total Courses", value: stats.courses },
    { label: "Total Tools", value: stats.tools },
    { label: "Pending Approvals", value: stats.pending },
    { label: "Waitlist Users", value: stats.users },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {cards.map((card) => (
          <div key={card.label} className="rounded-xl border border-gray-200 bg-white p-5">
            <span className="text-sm font-medium text-gray-500">{card.label}</span>
            <p className="text-3xl font-bold text-gray-900 mt-1">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}