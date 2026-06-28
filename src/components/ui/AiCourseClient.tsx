"use client";

import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";


import { motion, AnimatePresence } from "framer-motion";
import { Lock, Clock, PlayCircle, ArrowLeft, X, Send, Users } from "lucide-react";
import Link from "next/link";

interface Course {
  id: string;
  name: string;
  name_as: string;
  description: string;
  description_as: string;
}

const courseIcons = ["ðŸ ", "ðŸ’¼", "ðŸŽ“", "ðŸª", "ðŸ‘¨â€ðŸ«"];
const courseVideoMonths = ["March", "March", "April", "March", "April"];

const upcomingSeries = [
  { title: "AI Basics - Episode 1", subtitle: "Intro plus ChatGPT setup" },
  { title: "Career in AI - Episode 1", subtitle: "CV plus interview workflow" },
  { title: "Small Business AI - Episode 1", subtitle: "Offer plus customer reply flow" },
];

const getStoredJoinedCourses = (): string[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("joinedCourses");
  return stored ? JSON.parse(stored) : [];
};

export default function AiCourseClient({ courses: serverCourses }: { courses: Course[] }) {
  const { locale } = useTranslation();
  const isAs = locale === "as";

  const courses = serverCourses;
  const loading = false;
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [joinedCourses, setJoinedCourses] = useState<string[]>(getStoredJoinedCourses);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const [submitting, setSubmitting] = useState(false);

  // Data fetched on server

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourse) return;
    setSubmitting(true);
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        age: 0,
        courseName: selectedCourse,
      }),
    });
    if (res.ok) {
      const updated = [...joinedCourses, selectedCourse];
      setJoinedCourses(updated);
      localStorage.setItem("joinedCourses", JSON.stringify(updated));
      setSelectedCourse(null);
      setFormData({ name: "", phone: "", email: "" });
    }
    setSubmitting(false);
  };

  const getDescriptionPoints = (desc: string): string[] => {
    if (!desc) return [];
    const points = desc.split(/[.\n]/).map((s) => s.trim()).filter(Boolean);
    return points.slice(0, 3);
  };

  return (
    <div className="flex flex-col min-h-screen py-8 sm:py-10">
      <section className="mx-auto w-full md:max-w-5/6 px-4 sm:px-8 md:px-8 lg:px-4">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-red-600 mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" /><span className="text-sm font-medium">Back</span>
        </Link>

        <div className="glass-video-card mb-8 ">
          <div className=" glass-video-card p-5!">
          <h2 className="text-xl sm:text-2xl font-bold text-red-600 mb-5">Planned Roadmaps</h2>

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <span className="text-gray-500">Loading...</span>
            </div>
          ) : courses.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500">No courses available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {courses.map((course, idx) => {
                const desc = isAs && course.description_as ? course.description_as : course.description;
                const points = getDescriptionPoints(desc);
                const name = isAs && course.name_as ? course.name_as : course.name;
                return (
                  <div key={course.id} className="glass-apple-liquid-inner">
                    <div className=" flex flex-col h-full">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl bg-red-50 p-2 rounded-xl">{courseIcons[idx % courseIcons.length]}</span>
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-red-600 border border-red-200 bg-red-50 px-2.5 py-1 rounded-full">
                        <Lock className="h-3 w-3" /> Locked
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-gray-900 mb-3">{idx + 1}. {name}</h3>
                    <div className="space-y-2 mb-4 flex-1">
                      {points.map((point, i) => (
                        <div key={i} className="border border-gray-100 rounded-lg p-3 bg-white/60">
                          <p className="text-sm text-gray-600">{point}.</p>
                        </div>
                      ))}
                    </div>
                    <div className="mb-3">
                      <p className="text-xs text-red-600 flex items-center gap-1"><Clock className="h-3 w-3" /> Video coming in {courseVideoMonths[idx % courseVideoMonths.length]}</p>
                      <p className="text-xs text-gray-500">Video coming soon</p>
                    </div>
                    {joinedCourses.includes(course.name) ? (
                      <button disabled className="w-full py-2.5 rounded-xl text-sm font-semibold bg-green-500 text-white cursor-default opacity-80 flex items-center justify-center gap-2">
                        <Lock className="h-4 w-4" /> Joined
                      </button>
                    ) : (
                      <button onClick={() => setSelectedCourse(course.name)} className="w-full py-2.5 rounded-xl text-sm font-semibold glass-btn-red text-white hover:scale-[1.02] transition-colors flex items-center justify-center gap-2 cursor-pointer">
                        <Lock className="h-4 w-4" /> Join Waitlist
                      </button>
                    )}
                  </div></div>
                );
              })}
            </div>
          )}
        </div></div>


        <div className="glass-video-card mb-8">
          <div className=" p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Upcoming Series</h2>
          <p className="text-sm text-slate-500 mb-6">AI in Assamese Coming Soon</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
            {upcomingSeries.map((item, i) => (
              <div key={i} className="flex flex-col glass-apple-liquid p-5!">
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-green-100 to-green-200 aspect-video flex items-center justify-center mb-3 border border-green-200/50">
                  <PlayCircle className="h-12 w-12 text-gray-400/60" />
                  <span className="absolute bottom-3 left-3 text-xs font-semibold text-white bg-gray-800/80 px-2.5 py-1 rounded-md">Coming soon</span>
                </div>
                <h4 className="text-sm font-bold text-gray-900">{item.title}</h4>
                <p className="text-xs text-gray-500">{item.subtitle}</p>
              </div>
            ))}
          </div>

          <div className="flex md:flex-row flex-col items-center gap-3">
            <button className="inline-flex items-center gap-2 bg-red-500 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
              <PlayCircle className="h-4 w-4" /> Subscribe
            </button>
            <span className="md:text-sm  text-xs text-gray-500">Subscribe to get notified when new videos drop.</span>
          </div>
        </div>
        </div>

        <div className="">
          <div className="glass-video-card p-5!">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <h3 className="md:text-normal text-sm font-bold text-gray-900 mb-1">New courses are coming - join the waitlist</h3>
              <p className=" text-xs text-slate-500">
                  Namaskar AI — অসমীয়াৰ বাবে AI। সকলো ক’ৰ্ছ বিনামূলীয়া হ’ব।


              </p>
            </div>
            <button onClick={() => setSelectedCourse(courses[0]?.name || "AI Basics")} className="inline-flex items-center justify-center gap-2 glass-btn-red text-white text-sm font-medium px-5 py-2.5 rounded-full hover:scale-[1.02] transition-colors whitespace-nowrap cursor-pointer">
              <Users className="md:h-5 md:w-5 h-4 w-4 "/> Waitlist open now
            </button>
          </div>
          <div className="flex md:flex-row flex-col md:items-center gap-3 ">
            <span className="text-xs text-gray-500 shrink-0">Share this page</span>

              <div className="flex items-center md:justify-start justify-between w-full">
            <a href={`https://wa.me/?text=${encodeURIComponent("Check out Namaskar AI courses: " + (typeof window !== "undefined" ? window.location.href : ""))}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-medium border border-gray-200 rounded-full px-3 py-1.5 hover:bg-gray-50 transition-colors">
              <Send className="h-3 w-3" /> WhatsApp
            </a>
            <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-xs font-medium border border-gray-200 rounded-full px-3 py-1.5 hover:bg-gray-50 transition-colors">
              X
            </a>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-medium border border-gray-200 rounded-full px-3 py-1.5 hover:bg-gray-50 transition-colors">
              <span>f</span> Facebook
            </a>
              </div>
          </div>
        </div></div>
      </section>


      <AnimatePresence>
        {selectedCourse && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md p-4" onClick={() => setSelectedCourse(null)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} transition={{ duration: 0.2, ease: "easeOut" }} className="bg-white/90 backdrop-blur-xl border border-white/60 rounded-2xl shadow-xl max-w-md w-full p-5 sm:p-6" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-xl font-bold text-gray-900">Join the Waitlist</h3>
                <button onClick={() => setSelectedCourse(null)} className="p-2 rounded-full hover:bg-gray-100 transition-colors"><X className="h-5 w-5 text-gray-500" /></button>
              </div>
              <p className="text-sm text-gray-500 mb-6">Fill this form and get first updates on YouTube and email.</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1.5">Your Name</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full border-2 border-gray-200 focus:border-red-300 rounded-xl px-4 py-3 text-sm outline-none transition-colors" placeholder="Enter your name" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1.5">Phone Number</label>
                  <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full border-2 border-gray-200 focus:border-red-300 rounded-xl px-4 py-3 text-sm outline-none transition-colors" placeholder="+91 9876543210" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1.5">Email</label>
                  <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full border-2 border-gray-200 focus:border-red-300 rounded-xl px-4 py-3 text-sm outline-none transition-colors" placeholder="Enter your email" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1.5">Which course are you interested in?</label>
                  <select value={selectedCourse || ""} onChange={(e) => setSelectedCourse(e.target.value)} className="w-full border-2 border-gray-200 focus:border-red-300 rounded-xl px-4 py-3 text-sm outline-none transition-colors bg-white">
                    {courses.map((c) => (<option key={c.id} value={c.name}>{c.name}</option>))}
                  </select>
                </div>
                <button type="submit" disabled={submitting} className="w-full py-3.5 rounded-xl text-sm font-semibold glass-btn-red text-white hover:scale-[1.02] transition-colors disabled:opacity-50 cursor-pointer">
                  {submitting ? "Submitting..." : "Submit"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

