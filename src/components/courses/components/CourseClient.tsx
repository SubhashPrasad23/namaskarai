"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { ArrowRight, X, BookOpen, Users, Clock, Sparkles } from "lucide-react";

interface Course { id: string; name: string; description: string; }

const getStoredJoinedCourses = (): string[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("joinedCourses");
  return stored ? JSON.parse(stored) : [];
};

const CourseClient = ({ courses }: { courses: Course[] }) => {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [joinedCourses, setJoinedCourses] = useState<string[]>(getStoredJoinedCourses);
  const [formData, setFormData] = useState({ name: "", email: "", age: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourse) return;
    setLoading(true);
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formData.name, email: formData.email, age: parseInt(formData.age), courseName: selectedCourse }),
      });
      if (!res.ok) { alert("Something went wrong."); console.error(await res.json()); }
      else {
        const updated = [...joinedCourses, selectedCourse];
        setJoinedCourses(updated);
        localStorage.setItem("joinedCourses", JSON.stringify(updated));
        alert("Submitted");
        setSelectedCourse(null);
        setFormData({ name: "", email: "", age: "" });
      }
    } catch (err) { console.error(err); alert("Something went wrong."); }
    finally { setLoading(false); }
  };

  return (
    <div className="flex flex-col py-20">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-5">
            <Sparkles className="h-4 w-4 text-red-500" />
            <span className="text-xs font-semibold text-slate-700">AI Courses</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Learn AI in <span className="text-red-600">Assamese</span>
          </h1>
          <p className="mt-4 text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
            Structured courses built for learners in Assam. Join the waitlist to get early access.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {courses.map((course, i) => (
            <motion.div key={course.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.1 }} className="glass-card rounded-3xl p-6 flex flex-col justify-between group hover:-translate-y-2 hover:scale-[1.01] transition-all duration-300">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mb-5 shadow-inner shadow-red-50">
                  <BookOpen className="h-5 w-5 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 tracking-tight">{course.name}</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-6">{course.description}</p>
                <div className="flex items-center gap-4 mb-6">
                  <span className="inline-flex items-center gap-1.5 text-xs text-slate-500"><Users className="h-3.5 w-3.5" /> Beginner</span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-slate-500"><Clock className="h-3.5 w-3.5" /> Self-paced</span>
                </div>
              </div>
              {joinedCourses.includes(course.name) ? (
                <div className="glass-btn-pink w-full py-3 rounded-[22px] text-sm font-semibold text-slate-700 flex items-center justify-center gap-2 cursor-default">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Joined Waitlist
                </div>
              ) : (
                <button onClick={() => setSelectedCourse(course.name)} className="glass-btn-red w-full relative overflow-hidden inline-flex items-center justify-center gap-2.5 rounded-[22px] py-3 text-white font-semibold text-sm cursor-pointer hover:scale-[1.04] transition-all duration-250">
                  <span className="absolute top-[2px] left-[8px] right-[8px] h-[45%] rounded-full bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />
                  <span className="relative z-10">Join Waitlist</span>
                  <ArrowRight className="relative z-10 h-4 w-4" />
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {selectedCourse && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={() => setSelectedCourse(null)}>
            <motion.div initial={{ scale: 0.92, opacity: 0, y: 10 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.92, opacity: 0, y: 10 }} transition={{ duration: 0.25, ease: "easeOut" }} className="glass-card rounded-3xl shadow-2xl max-w-md w-full p-7 sm:p-8 border border-white/60" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className="inline-block text-xs font-semibold text-white bg-red-600 px-3 py-1 rounded-full mb-3">Waitlist</span>
                  <h2 className="text-xl font-bold text-slate-900 tracking-tight">Join {selectedCourse}</h2>
                </div>
                <button onClick={() => setSelectedCourse(null)} className="p-2 rounded-full hover:bg-slate-100 transition-colors"><X className="h-5 w-5 text-slate-500" /></button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Name</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full rounded-xl border border-slate-200 bg-white/80 backdrop-blur-sm px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-300 transition-all" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                  <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full rounded-xl border border-slate-200 bg-white/80 backdrop-blur-sm px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-300 transition-all" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Age</label>
                  <input type="number" required min="1" max="120" value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })} className="w-full rounded-xl border border-slate-200 bg-white/80 backdrop-blur-sm px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-300 transition-all" placeholder="Your age" />
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="submit" disabled={loading} className="flex-1 glass-btn-red relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-[22px] py-3 text-white font-semibold text-sm cursor-pointer disabled:opacity-50 hover:scale-[1.02] transition-all duration-250">
                    <span className="absolute top-[2px] left-[8px] right-[8px] h-[45%] rounded-full bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />
                    <span className="relative z-10">{loading ? "Submitting..." : "Submit"}</span>
                  </button>
                  <button type="button" onClick={() => { setSelectedCourse(null); setFormData({ name: "", email: "", age: "" }); }} className="glass-btn-pink px-6 py-3 rounded-[22px] text-sm font-semibold text-slate-600 cursor-pointer hover:scale-[1.02] transition-all duration-250">
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CourseClient;
