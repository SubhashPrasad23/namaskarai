"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";

type Prompt = {
  id: string;
  title: string;
  title_as: string;
  category: string;
  prompt: string;
  prompt_as: string;
  tags: string[];
  slug: string;
  created_at: string;
};

export default function AdminPromptsPage() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", title_as: "", category: "", prompt: "", prompt_as: "", tags: "", slug: "" });

  useEffect(() => {
    loadPrompts();
  }, []);

  async function loadPrompts() {
    const res = await fetch("/api/prompts");
    const data = await res.json();
    if (Array.isArray(data)) setPrompts(data);
    setLoading(false);
  }

  function resetForm() {
    setForm({ title: "", title_as: "", category: "", prompt: "", prompt_as: "", tags: "", slug: "" });
    setEditingId(null);
    setShowModal(false);
  }

  function generateSlug(title: string) {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  async function handleSave() {
    if (!form.title.trim() || !form.prompt.trim()) return;
    const tagsArray = form.tags.split(",").map((t) => t.trim()).filter(Boolean);
    const slug = form.slug || generateSlug(form.title);

    const payload = { title: form.title, title_as: form.title_as, category: form.category, prompt: form.prompt, prompt_as: form.prompt_as, tags: tagsArray, slug };

    if (editingId) {
      await fetch("/api/prompts", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: editingId, ...payload }) });
    } else {
      await fetch("/api/prompts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    }
    loadPrompts();
    resetForm();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this prompt?")) return;
    await fetch(`/api/prompts?id=${id}`, { method: "DELETE" });
    loadPrompts();
  }

  function handleEdit(p: Prompt) {
    setForm({ title: p.title, title_as: p.title_as || "", category: p.category, prompt: p.prompt, prompt_as: p.prompt_as || "", tags: (p.tags || []).join(", "), slug: p.slug || "" });
    setEditingId(p.id);
    setShowModal(true);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Prompts</h1>
        <Button variant="primary" size="sm" onClick={() => { resetForm(); setShowModal(true); }}>
          + Add Prompt
        </Button>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : prompts.length === 0 ? (
        <p className="text-gray-500">No prompts yet.</p>
      ) : (
        <div className="space-y-3">
          {prompts.map((p) => (
            <div key={p.id} className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4">
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 truncate">{p.title}</h4>
                {p.title_as && <p className="text-xs text-gray-400 truncate">{p.title_as}</p>}
                <p className="text-xs text-gray-500 truncate mt-0.5">{p.prompt.slice(0, 100)}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-xs bg-gray-100 text-gray-600 rounded-full px-2 py-0.5">{p.category}</span>
                  {p.tags?.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-xs bg-red-50 text-red-600 rounded-full px-2 py-0.5">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <button onClick={() => handleEdit(p)} className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 hover:bg-gray-50">Edit</button>
                <button onClick={() => handleDelete(p.id)} className="px-3 py-1.5 text-xs rounded-lg border border-red-200 text-red-600 hover:bg-red-50">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg mx-4 shadow-xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">{editingId ? "Edit Prompt" : "Add New Prompt"}</h3>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title (English) *</label>
                  <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" placeholder="English title" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title (Assamese)</label>
                  <input type="text" value={form.title_as} onChange={(e) => setForm({ ...form, title_as: e.target.value })} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" placeholder="Assamese title" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <input type="text" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" placeholder="e.g. Marketing" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                  <input type="text" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" placeholder="auto (leave blank)" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
                <input type="text" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" placeholder="chatgpt, writing, seo" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prompt (English) *</label>
                <textarea value={form.prompt} onChange={(e) => setForm({ ...form, prompt: e.target.value })} rows={4} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm resize-y" placeholder="English prompt text..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prompt (Assamese)</label>
                <textarea value={form.prompt_as} onChange={(e) => setForm({ ...form, prompt_as: e.target.value })} rows={4} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm resize-y" placeholder="Assamese prompt..." />
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="primary" size="sm" onClick={handleSave}>{editingId ? "Update" : "Save"}</Button>
                <Button variant="ghost" size="sm" onClick={resetForm}>Cancel</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}