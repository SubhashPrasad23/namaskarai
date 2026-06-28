"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Search, Bookmark, ExternalLink, Users, DollarSign, Code, PencilSparkles } from "lucide-react";
import Link from "next/link";

interface Tool {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  skillLevel: string;
  pricing: string;
  example: string;
  languages: string[];
  url: string;
  scope: "global" | "local";
}

const fallbackTools: Tool[] = [
  { id: "1", name: "Canva AI", category: "Image Generation AI", subcategory: "Design, Graphics", skillLevel: "Beginner", pricing: "Free", example: "Run one prompt for your immediate task and compare output quality.", languages: ["English", "Hindi"], url: "https://canva.com", scope: "global" },
  { id: "2", name: "ChatGPT", category: "Text & Writing AI", subcategory: "Writing, Chat, Research", skillLevel: "Beginner", pricing: "Free", example: "Draft an Assamese-English customer reply for a delayed order.", languages: ["English", "Hindi"], url: "https://chat.openai.com", scope: "global" },
  { id: "3", name: "Claude", category: "Text & Writing AI", subcategory: "Writing, Analysis", skillLevel: "Beginner", pricing: "Free", example: "Rewrite a resume bullet with measurable impact.", languages: ["English"], url: "https://claude.ai", scope: "global" },
  { id: "4", name: "Copy.ai", category: "Business & Productivity AI", subcategory: "Marketing Copy", skillLevel: "Beginner", pricing: "Free", example: "Run one prompt for your immediate task and compare output quality.", languages: ["English"], url: "https://copy.ai", scope: "global" },
  { id: "5", name: "DALL-E 3", category: "Image Generation AI", subcategory: "Image Creation", skillLevel: "Beginner", pricing: "Free", example: "Run one prompt for your immediate task and compare output quality.", languages: ["English"], url: "https://openai.com/dall-e-3", scope: "global" },
  { id: "6", name: "ElevenLabs", category: "Voice & Audio AI", subcategory: "Voice Generation", skillLevel: "Beginner", pricing: "Free", example: "Run one prompt for your immediate task and compare output quality.", languages: ["English", "Hindi", "32+ languages"], url: "https://elevenlabs.io", scope: "global" },
  { id: "7", name: "Gemini", category: "Text & Writing AI", subcategory: "Writing, Research", skillLevel: "Beginner", pricing: "Free", example: "Run one prompt for your immediate task and compare output quality.", languages: ["English", "Hindi"], url: "https://gemini.google.com", scope: "global" },
  { id: "8", name: "Grammarly", category: "Text & Writing AI", subcategory: "Grammar Check", skillLevel: "Beginner", pricing: "Free", example: "Run one prompt for your immediate task and compare output quality.", languages: ["English"], url: "https://grammarly.com", scope: "global" },
  { id: "9", name: "Midjourney", category: "Image Generation AI", subcategory: "Image Creation", skillLevel: "Beginner", pricing: "Paid", example: "Generate product mockups for a local Assamese tea brand.", languages: ["English"], url: "https://midjourney.com", scope: "global" },
  { id: "10", name: "Notion AI", category: "Business & Productivity AI", subcategory: "Notes, Productivity", skillLevel: "Beginner", pricing: "Freemium", example: "Run one prompt for your immediate task and compare output quality.", languages: ["English"], url: "https://notion.so", scope: "global" },
  { id: "11", name: "Murf AI", category: "Voice & Audio AI", subcategory: "Voice Over", skillLevel: "Beginner", pricing: "Freemium", example: "Create Assamese voiceover for a YouTube explainer.", languages: ["English", "Hindi"], url: "https://murf.ai", scope: "global" },
  { id: "12", name: "ContentBot", category: "Content Generation", subcategory: "Blog, Social", skillLevel: "Beginner", pricing: "Free", example: "Run one prompt for your immediate task and compare output quality.", languages: ["English"], url: "https://contentbot.ai", scope: "global" },
];

const tasks = [
  { audience: "Business owners", title: "Business social posts", desc: "Create weekly Assamese-friendly social media content and creatives.", steps: ["Plan a weekly content calendar with local themes.", "Generate Assamese + English captions with AI.", "Create visuals using AI image tools."], topPicks: ["Canva AI", "ChatGPT", "Copy.ai"] },
  { audience: "Business owners", title: "Customer replies and DM", desc: "Handle customer questions quickly in polite Assamese and English.", steps: ["Draft polite replies in Assamese-English mix.", "Create saved reply templates for common queries.", "Automate follow-ups with AI suggestions."], topPicks: ["ChatGPT", "Claude", "Copy.ai"] },
  { audience: "Job seekers", title: "Resume and cover letter", desc: "Build job-ready resume drafts and role-specific cover letters.", steps: ["Generate a role-specific resume draft.", "Write a tailored cover letter for each application.", "Get AI feedback on clarity and impact."], topPicks: ["ChatGPT", "Claude", "Grammarly"] },
  { audience: "Job seekers / students", title: "Govt exam study", desc: "Summarize topics and create revision notes for competitive exams.", steps: ["Summarize chapters into key bullet points.", "Create quiz-style revision questions.", "Build a weekly study schedule with AI."], topPicks: ["ChatGPT", "Gemini", "Notion AI"] },
  { audience: "Students", title: "Student daily learning", desc: "Understand difficult concepts, make notes, and practice faster.", steps: ["Explain complex topics in simple language.", "Generate practice questions from textbook content.", "Create mind maps and summary notes."], topPicks: ["ChatGPT", "Gemini", "Claude"] },
  { audience: "Parents", title: "Parents supporting kids", desc: "Help children with homework plans, explanation, and study schedules.", steps: ["Create a weekly homework and revision plan.", "Simplify hard chapters into child-friendly explanations.", "Prepare quiz-style questions for practice at home."], topPicks: ["Canva AI", "ChatGPT", "Claude"] },
];

export default function AiToolsClient({ tools: serverTools }: { tools: Tool[] }) {
  const tools = serverTools.length > 0 ? serverTools : fallbackTools;
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [activeSkill, setActiveSkill] = useState("All Levels");
  const [activePricing, setActivePricing] = useState("All Pricing");
  const [activeScope, setActiveScope] = useState("all");
  const [activeTask, setActiveTask] = useState<string | null>(null);
  const [savedTools, setSavedTools] = useState<string[]>([]);
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  const categoryMap: Record<string, number> = {};
  tools.forEach((t) => { categoryMap[t.category] = (categoryMap[t.category] || 0) + 1; });
  const categories = Object.entries(categoryMap);

  const skillLevels = ["All Levels", "Beginner"];
  const pricingOptions = ["All Pricing", "Free", "Freemium", "Paid"];

  const toggleSave = (id: string) => {
    setSavedTools((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]);
  };

  const filtered = tools.filter((tool) => {
    if (showSavedOnly && !savedTools.includes(tool.id)) return false;
    if (activeCategory !== "All Categories" && tool.category !== activeCategory) return false;
    if (activeSkill !== "All Levels" && tool.skillLevel !== activeSkill) return false;
    if (activePricing !== "All Pricing" && tool.pricing !== activePricing) return false;
    if (activeScope === "global" && tool.scope !== "global") return false;
    if (activeScope === "local" && tool.scope !== "local") return false;
    if (search && !tool.name.toLowerCase().includes(search.toLowerCase()) && !tool.subcategory.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });


  return (
    <div className="flex flex-col min-h-screen py-8 md:py-10">
      <section className="mx-auto w-full md:max-w-5/6 px-4 sm:px-6 md:px-8 lg:px-4">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-red-600 mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" /><span className="text-sm font-medium">Back</span>
        </Link>

        {/* ══════ HERO ══════ */}
        <div className="glass-video-card mb-8">
          <div className=" p-5! glass-video-card">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 border border-red-200 bg-red-50 px-3 py-1 rounded-full mb-3"><PencilSparkles className="h-4 w-3"/> AI Tool Library</span>
          <h2 className="text-xl sm:text-2xl font-bold text-red-600 mb-1">AI Tool Library</h2>
          <p className="text-gray-600 text-sm mb-1">Assam-focused practical AI tools directory with real-world use cases.</p>
          <p className="text-gray-500 text-sm">Pick one tool today and run a 10-minute test.</p>
        </div></div>

        {/* ══════ WHAT DO YOU WANT TO GET DONE? ══════ */}
        <div className="glass-video-card mb-8">
          <div className=" glass-video-card p-5!">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-sm font-bold text-red-600 uppercase tracking-wide">WHAT DO YOU WANT TO GET DONE?</h2>
            {activeTask && (
              <button onClick={() => setActiveTask(null)} className="text-xs font-medium border border-gray-200 rounded-lg px-3 py-1.5 text-gray-700 hover:bg-gray-50 transition-colors">Reset task</button>
            )}
          </div>
          <p className="text-sm text-gray-600 mb-5">Choose a task first, then get Assam-relevant tool recommendations.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks.map((task) => (
              <button key={task.title} onClick={() => setActiveTask(activeTask === task.title ? null : task.title)} 
                className={`text-left p-4 rounded-xl border transition-colors ${activeTask === task.title ? "border-red-400 bg-red-50" : "border-gray-200 glass-apple-liquid-inner hover:border-red-200"}`}>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-red-600 border border-red-200 bg-red-50 px-2 py-0.5 rounded-full mb-2">👤 {task.audience}</span>
                <h4 className="text-sm font-semibold text-gray-900 mb-1">{task.title}</h4>
                <p className="text-xs text-gray-500">{task.desc}</p>
              </button>
            ))}
          </div>

          {/* Task Playbook */}
          <AnimatePresence>
          {activeTask && (() => {
            const task = tasks.find((t) => t.title === activeTask);
            if (!task) return null;
            return (
              <motion.div key="playbook" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} 
              className="overflow-hidden mt-6 border-t border-gray-200/60 pt-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-bold text-red-600 uppercase tracking-wide">TASK PLAYBOOK</h3>
                  <span className="text-xs font-medium text-white bg-red-600 px-3 py-1 rounded-full">Top tools for this task</span>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-4">{task.title}</h4>
                <div className="space-y-2 mb-5">
                  {task.steps.map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="glass-apple-liquid-inner shrink-0 w-6 h-6 rounded-full border-2 border-red-200 text-red-600 text-xs font-bold flex items-center justify-center">{i + 1}</span>
                      <p className="text-sm text-gray-700">{step}</p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {task.topPicks.map((pickName, i) => {
                    const matchedTool = tools.find((t) => t.name === pickName);
                    return (
                      <div key={i} className="border border-gray-200 rounded-xl p-4 bg-white/60">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold text-white bg-red-600 px-2.5 py-0.5 rounded-full">Top pick #{i + 1}</span>
                          <span className="text-xs text-gray-500">Match 2</span>
                        </div>
                        <h5 className="text-sm font-bold text-gray-900 mb-1">{pickName}</h5>
                        <p className="text-xs text-gray-500">Why this tool: <span className="text-slate-500">Low-cost to start quickly.</span></p>
                        {matchedTool && (
                          <a href={matchedTool.url} target="_blank" rel="noopener noreferrer" className="text-xs text-red-600 hover:underline mt-1 inline-block">Visit →</a>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })()}
          </AnimatePresence>
        </div></div>

        {/* ══════ FACEBOOK CTA ══════ */}
        <div className="glass-video-card mb-8">
          <div className="glass-video-card p-5! flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-sm text-gray-600">Join our Facebook community for fortnightly Assam-focused tool picks.</p>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center md:justify-start justify-center gap-2 glass-btn-red text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:scale-[1.02] transition-colors whitespace-nowrap">
            Facebook community <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div></div>

        {/* ══════ SCOPE TABS ══════ */}
        <div className="flex items-center gap-2 mb-6 glass-video-card w-auto">
          {[{ key: "all", label: "All" }, { key: "global", label: "Global" }, { key: "local", label: "Local" }].map((tab) => (
            <button key={tab.key} onClick={() => setActiveScope(tab.key)} className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${activeScope === tab.key ? "bg-red-600 text-white" : "bg-white border border-gray-200 text-gray-700 hover:bg-red-50"}`}>
              {tab.label}
            </button>
          ))}
        </div>


        {/* ══════ MAIN LAYOUT: SIDEBAR + TOOLS ══════ */}
        <div className="flex flex-col md:flex-row gap-6 glass-video-card">
          {/* Left Sidebar - Fixed */}
          <aside className="hidden md:block w-64 shrink-0 sticky top-24 self-start h-fit ">
            <div className="glass-apple-liquid">
              <div className="glass-apple-liquid-inner p-5 sm:p-6 space-y-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input type="text" placeholder="Search tools..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 bg-white/70 text-sm focus:outline-none focus:ring-2 focus:ring-red-200 transition" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-500">Active Filters</span>
                <button onClick={() => { setActiveCategory("All Categories"); setActiveSkill("All Levels"); setActivePricing("All Pricing"); setSearch(""); setShowSavedOnly(false); setActiveTask(null); }} className="text-xs text-gray-500 hover:text-red-600">Clear All</button>
              </div>
              <button onClick={() => setShowSavedOnly(!showSavedOnly)} className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm border transition-colors ${showSavedOnly ? "border-red-300 bg-red-50 text-red-700" : "border-gray-200 text-gray-700"}`}>
                <span className="flex items-center gap-2"><Bookmark className="h-3.5 w-3.5" /> Saved only</span>
                <span className="text-xs">{savedTools.length}</span>
              </button>
              <div>
                <h4 className="text-sm font-bold text-gray-900 mb-2">Categories</h4>
                <div className="space-y-1">
                  <button onClick={() => setActiveCategory("All Categories")} className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeCategory === "All Categories" ? "bg-red-600 text-white" : "text-gray-700 hover:bg-red-50"}`}>
                    <span className="flex items-center justify-between">All Categories <span className="text-xs opacity-80">{tools.length}</span></span>
                  </button>
                  {categories.map(([cat, count]) => (
                    <button key={cat} onClick={() => setActiveCategory(cat)} className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeCategory === cat ? "bg-red-600 text-white" : "text-slate-700 hover:bg-red-50"}`}>
                      <span className="flex items-center justify-between">{cat} <span className="text-xs opacity-80">{count}</span></span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900 mb-2">Skill Level</h4>
                <div className="space-y-1">
                  {skillLevels.map((level) => (
                    <button key={level} onClick={() => setActiveSkill(level)} className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeSkill === level ? "bg-red-600 text-white" : "text-gray-700 hover:bg-red-50"}`}>
                      {level}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900 mb-2">Pricing</h4>
                <div className="space-y-1">
                  {pricingOptions.map((price) => (
                    <button key={price} onClick={() => setActivePricing(price)} className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activePricing === price ? "bg-red-600 text-white" : "text-gray-700 hover:bg-red-50"}`}>
                      {price}
                    </button>
                  ))}
                </div>
              </div>
            </div></div>
          </aside>


          {/* Right Content - Scrollable */}
          <div className="flex-1 min-w-0 p-5">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <p className="text-sm text-gray-500">Showing {filtered.length} tools</p>
              <div className="flex items-center gap-2 flex-wrap">
                <button onClick={() => setShowSavedOnly(!showSavedOnly)} className={`inline-flex items-center gap-1.5 text-xs font-medium border rounded-full px-3 py-1.5 transition-colors ${showSavedOnly ? "border-red-300 bg-red-50 text-red-700" : "border-gray-200 text-gray-700"}`}>
                  <Bookmark className="h-3 w-3" /> Saved only ({savedTools.length})
                </button>
                <span className="text-xs border border-gray-200 rounded-full px-3 py-1.5 text-gray-600">Language</span>
                <span className="text-xs bg-red-600 text-white rounded-full px-3 py-1.5 font-medium">Assamese-first use cases</span>
              </div>
            </div>

            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
                {filtered.map((tool) => (
                  <div key={tool.id} className="glass-apple-liquid"><div className="glass-apple-liquid-inner p-5 sm:p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-semibold text-white bg-red-600 px-2.5 py-1 rounded-full">{tool.category}</span>
                        <span className="inline-flex items-center gap-1 text-xs border border-gray-200 rounded-full px-2 py-0.5 text-gray-600"><Users className="h-3 w-3" /> {tool.skillLevel}</span>
                        <span className="inline-flex items-center gap-1 text-xs border border-gray-200 rounded-full px-2 py-0.5 text-gray-600"><DollarSign className="h-3 w-3" /> {tool.pricing}</span>
                      </div>
                      <button onClick={() => toggleSave(tool.id)} className={`p-1.5 rounded-lg transition-colors ${savedTools.includes(tool.id) ? "text-red-600 bg-red-50" : "text-gray-400 hover:text-gray-600"}`}>
                        <Bookmark className={`h-5 w-5 ${savedTools.includes(tool.id) ? "fill-red-500" : ""}`} />
                      </button>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{tool.name}</h3>
                    <p className="text-sm text-slate-500 mb-2">{tool.subcategory}</p>
                    <p className="text-sm text-gray-600 mb-3"><span className="font-medium">Example:</span> {tool.example}</p>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-flex items-center gap-1 text-xs border border-gray-200 rounded-full px-2.5 py-1 text-gray-600"><Code className="h-3 w-3" /> {tool.languages.join(", ")}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{tool.pricing}</span>
                      <a href={tool.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 glass-btn-red text-white text-sm font-semibold px-4 py-2 rounded-xl hover:scale-[1.02] transition-colors">
                        Visit Tool <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div></div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 glass-apple-liquid"><div className="glass-apple-liquid-inner p-8">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">No tools found</h3>
                <p className="text-sm text-gray-500 mb-4">Try adjusting your filters.</p>
                <button onClick={() => { setActiveCategory("All Categories"); setActiveSkill("All Levels"); setActivePricing("All Pricing"); setSearch(""); setShowSavedOnly(false); }} className="px-5 py-2 rounded-xl text-sm font-semibold border border-red-300 text-red-600 hover:bg-red-50 transition-colors">Clear Filters</button>
              </div></div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

