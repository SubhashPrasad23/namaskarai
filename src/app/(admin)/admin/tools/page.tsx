"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";

type ToolSubmission = {
  id: string;
  url: string;
  package: string;
  release_date: string;
  status: string;
};

export default function AdminToolsPage() {
  const [tools, setTools] = useState<ToolSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");

  useEffect(() => {
    async function loadTools() {
      const res = await fetch("/api/tool-submissions");
      const data = await res.json();
      if (Array.isArray(data)) setTools(data);
      setLoading(false);
    }
    loadTools();
  }, []);

  async function updateStatus(id: string, status: "approved" | "rejected") {
    await fetch("/api/tool-submissions", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status }) });
    setTools((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
  }

  const filtered = filter === "all" ? tools : tools.filter((t) => t.status === filter);

  function getStatusLabel(status: string) {
    if (status === "approved") return "Approved";
    if (status === "rejected") return "Rejected";
    return "Pending";
  }

  function getStatusClass(status: string) {
    if (status === "approved") return "bg-emerald-100 text-emerald-700";
    if (status === "rejected") return "bg-red-100 text-red-700";
    return "bg-amber-100 text-amber-700";
  }

  function getPackageLabel(pkg: string) {
    if (pkg === "website-only") return "Website Only";
    if (pkg === "maximum-exposure") return "Maximum Exposure";
    if (pkg === "custom-launch-plan") return "Custom Plan";
    return pkg;
  }

  function extractDomain(url: string) {
    try { return new URL(url).hostname.replace("www.", ""); } catch { return url; }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Tool Approvals</h1>

      <div className="flex gap-2 mb-6">
        {(["all", "pending", "approved", "rejected"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors capitalize ${
              filter === f ? "bg-red-50 text-red-700" : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            {f} ({f === "all" ? tools.length : tools.filter((t) => t.status === f).length})
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : filtered.length === 0 ? (
        <p className="text-gray-500">No tools found.</p>
      ) : (
        <div className="space-y-3">
          {filtered.map((tool) => (
            <div key={tool.id} className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <a href={tool.url} target="_blank" rel="noopener noreferrer" className="font-medium text-gray-900 hover:text-red-600 transition-colors">
                    {extractDomain(tool.url)} \u2197
                  </a>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusClass(tool.status)}`}>
                    {getStatusLabel(tool.status)}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                  <span>Package: {getPackageLabel(tool.package)}</span>
                  <span>Submitted: {new Date(tool.release_date).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                {tool.status === "pending" && (
                  <>
                    <Button variant="primary" size="sm" onClick={() => updateStatus(tool.id, "approved")}>Approve</Button>
                    <button onClick={() => updateStatus(tool.id, "rejected")} className="px-3 py-1.5 text-xs rounded-lg border border-red-200 text-red-600 hover:bg-red-50">Reject</button>
                  </>
                )}
                {tool.status === "approved" && (
                  <button onClick={() => updateStatus(tool.id, "rejected")} className="px-3 py-1.5 text-xs rounded-lg border border-red-200 text-red-600 hover:bg-red-50">Reject</button>
                )}
                {tool.status === "rejected" && (
                  <Button variant="primary" size="sm" onClick={() => updateStatus(tool.id, "approved")}>Approve</Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}