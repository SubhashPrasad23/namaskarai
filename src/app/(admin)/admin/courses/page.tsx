"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";

type Course = {
  id: string;
  name: string;
  name_as: string;
  description: string;
  description_as: string;
  created_at: string;
};

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", name_as: "", description: "", description_as: "" });

  useEffect(() => {
    loadCourses();
  }, []);

  async function loadCourses() {
    const res = await fetch("/api/courses");
    const data = await res.json();
    if (Array.isArray(data)) setCourses(data);
    setLoading(false);
  }

  function resetForm() {
    setForm({ name: "", name_as: "", description: "", description_as: "" });
    setEditingId(null);
    setShowModal(false);
  }

  async function handleSave() {
    if (!form.name.trim()) return;
    const payload = { name: form.name, name_as: form.name_as, description: form.description, description_as: form.description_as };
    if (editingId) {
      await fetch("/api/courses", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: editingId, ...payload }) });
    } else {
      await fetch("/api/courses", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    }
    loadCourses();
    resetForm();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this course?")) return;
    await fetch(`/api/courses?id=${id}`, { method: "DELETE" });
    loadCourses();
  }

  function handleEdit(course: Course) {
    setForm({ name: course.name, name_as: course.name_as || "", description: course.description, description_as: course.description_as || "" });
    setEditingId(course.id);
    setShowModal(true);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Courses</h1>
        <Button variant="primary" size="sm" onClick={() => { resetForm(); setShowModal(true); }}>
          + Add Course
        </Button>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : courses.length === 0 ? (
        <p className="text-gray-500">No courses yet.</p>
      ) : (
        <div className="space-y-3">
          {courses.map((course) => (
            <div key={course.id} className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4">
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900">{course.name}</h4>
                {course.name_as && <p className="text-xs text-gray-400">{course.name_as}</p>}
                <p className="text-xs text-gray-500 mt-0.5">{course.description || "No description"}</p>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <button onClick={() => handleEdit(course)} className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 hover:bg-gray-50">Edit</button>
                <button onClick={() => handleDelete(course.id)} className="px-3 py-1.5 text-xs rounded-lg border border-red-200 text-red-600 hover:bg-red-50">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4 shadow-xl">
            <h3 className="text-lg font-semibold mb-4">{editingId ? "Edit Course" : "Add New Course"}</h3>
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Course Name (English) *</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" placeholder="Course name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Course Name (Assamese)</label>
                <input type="text" value={form.name_as} onChange={(e) => setForm({ ...form, name_as: e.target.value })} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" placeholder="\u09AA\u09BE\u09A0\u09CD\u09AF\u0995\u09CD\u09B0\u09AE\u09B0 \u09A8\u09BE\u09AE" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description (English)</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm resize-y" placeholder="English description..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description (Assamese)</label>
                <textarea value={form.description_as} onChange={(e) => setForm({ ...form, description_as: e.target.value })} rows={2} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm resize-y" placeholder="\u0985\u09B8\u09AE\u09C0\u09AF\u09BC\u09BE \u09AC\u09BF\u09F1\u09B0\u09A3..." />
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