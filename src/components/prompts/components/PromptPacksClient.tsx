"use client";

import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Search, ChevronDown, ChevronUp, Copy, X, Zap, Clipboard, AlertTriangle, BookOpen, NotepadText } from "lucide-react";
import Link from "next/link";

interface PromptPack {
  id?: string;
  title: string;
  title_as?: string;
  category: string;
  prompt: string;
  prompt_as?: string;
  tags?: string[];
  slug?: string;
}

export default function PromptPacksClient({ promptPacks }: { promptPacks: PromptPack[] }) {
  const { locale } = useTranslation();
  const [promptLang, setPromptLang] = useState<"en" | "as">(locale === "as" ? "as" : "en");
  const isAs = promptLang === "as";
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedPrompt, setSelectedPrompt] = useState<PromptPack | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [recentlyCopied, setRecentlyCopied] = useState<string[]>([]);

  const audienceQuickLanes = [
    { label: "Career", desc: "job, CV, interview", category: "Career and Jobs" },
    { label: "Aspirers", desc: "study and skill build", category: "Study and Skills" },
    { label: "Business", desc: "sales and customer replies", category: "Business and Income" },
    { label: "Parents", desc: "safe AI and child guidance", category: "Parents and Family" },
  ];

  const categoryMap: Record<string, number> = {};
  promptPacks.forEach((p) => { if (p.category) categoryMap[p.category] = (categoryMap[p.category] || 0) + 1; });
  const categories = Object.entries(categoryMap);

  const filtered = promptPacks.filter((pack) => {
    const matchesCategory = activeCategory === "All" || pack.category === activeCategory;
    const title = isAs && pack.title_as ? pack.title_as : pack.title;
    const promptText = isAs && pack.prompt_as ? pack.prompt_as : pack.prompt;
    const matchesSearch = search === "" || title.toLowerCase().includes(search.toLowerCase()) || promptText.toLowerCase().includes(search.toLowerCase()) || (pack.tags || []).some((tag) => tag.toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleCopy = (pack: PromptPack) => {
    const text = isAs && pack.prompt_as ? pack.prompt_as : pack.prompt;
    navigator.clipboard.writeText(text);
    setCopiedId(pack.title);
    setRecentlyCopied((prev) => [pack.title, ...prev.filter((t) => t !== pack.title)].slice(0, 3));
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleSection = (section: string) => setOpenSection(openSection === section ? null : section);

  const promptStructure = [
    { title: "Role", desc: "Define who AI should act as: teacher, coach, marketer, and so on." },
    { title: "Context", desc: "Share your situation, goal, constraints, and audience." },
    { title: "Task", desc: "Use action language for exactly what AI should produce." },
    { title: "Output", desc: "Specify output format: table, bullets, checklist, script." },
  ];

  const beginnerMistakes = [
    "Asking vague prompts without defining role", "Expecting specific output without context",
    "Combining too many tasks in one prompt", "Not specifying output format",
    "Not setting language preference clearly", "Using output without review",
    "Sharing sensitive data in prompts", "Testing only once before deciding quality",
    "Skipping follow-up refinement", "Not maintaining a personal prompt library",
  ];

  const copyReadyTemplates = [
    { label: "Weekly Study Plan Builder", en: "Act as a study coach. Context: I am preparing for [exam/subject] and can study [X] hours per day. Task: Create a 7-day plan with topic order, revision slots, and mini tests. Output format: A daily table with time blocks and one progress checkpoint per day.", as: "আপুনি এজন study coach হিচাপে কাম কৰক। Context: মই [exam/subject]-ৰ বাবে প্ৰস্তুতি লৈ আছো আৰু দৈনিক [X] ঘণ্টা পঢ়িব পাৰোঁ। Task: topic order, revision slot আৰু mini testসহ ৭ দিনৰ plan সাজি দিয়ক। Output format: দিন অনুসৰি time-block table আৰু প্ৰতিদিনে ৰটা progress checkpoint।" },
    { label: "Local Business Offer Message", en: "Act as a marketing assistant for a small Assamese business. Context: My business is [type], target customers are [audience], and offer is [offer]. Task: Write 5 WhatsApp-ready promotional messages in simple Assamese + English mix. Output format: Numbered list with one-line CTA in each.", as: "আপুনি অসমীয়াৰ small business-ৰ marketing assistant হিচাপে কাম কৰক। Context: মোৰ business [type], target customer [audience], আৰু offer [offer]। Task: সৰল Assamese + English mix-ত WhatsApp-ready ৫টা promotional message লিখক। Output format: numbered list আৰু প্ৰতিটোত ১ line CTA থাকিব।" },
    { label: "Interview Practice Simulator", en: "Act as an interviewer for the role [job role]. Context: My experience is [X], strengths are [Y], and weak area is [Z]. Task: Ask me 8 interview questions, wait for my answers, then score me on clarity, confidence, and relevance. Output format: Question-by-question feedback and 3 improvement actions.", as: "আপুনি [job role]-ৰ interviewer হিচাপে কাম কৰক। Context: মোৰ experience [X], strength [Y], আৰু weak area [Z]। Task: মোক ৮টা interview question সোধক, মোৰ উত্তৰৰ পাছত clarity, confidence আৰু relevance-ত score দিয়ক। Output format: question-wise feedback আৰু ৩টা improvement action।" },
    { label: "Parent AI Safety Rules", en: "Act as a family education advisor. Context: Child age is [age], uses phone for [purpose], and screen time is [duration]. Task: Create a simple home AI usage policy with do/don't rules, privacy rules, and homework boundaries. Output format: One-page checklist in Assamese-first language.", as: "আপুনি family education advisor হিচাপে কাম কৰক। Context: শিশুৰ বয়স [age], ফোন ব্যৱসৰ [purpose], screen time [duration]। Task: ঘৰ বাবে সৰল AI usage policy সাজক যাতে do/don't rules, privacy rules আৰু homework boundaries থাকে। Output format: Assamese-first one-page checklist।" },
    { label: "30-Day Content Ideas", en: "Act as a content strategist. Context: My niche is [topic], audience is [audience], platform is [Instagram/YouTube], and posting frequency is [X/week]. Task: Generate 30 content ideas with hook, format, and CTA. Output format: Table with columns: Day, Idea, Hook, Format, CTA.", as: "আপুনি content strategist হিচাপে কাম কৰক। Context: মোৰ niche [topic], audience [audience], platform [Instagram/YouTube], আৰু posting frequency [X/week]। Task: hook, format আৰু CTAসহ ৩০টা content idea তৈৰি কৰক। Output format: Day, Idea, Hook, Format, CTA তেওঁলা।" },
  ];

  return (
    <div className="flex flex-col min-h-screen py-8 sm:py-12">
      <section className="mx-auto w-full md:max-w-5/6 px-4 sm:px-8 md:px-8 lg:px-4">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-red-600 mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" /><span className="text-sm font-medium">Back</span>
        </Link>

        {/* ══════ AI PROMPTS GUIDE ══════ */}
        <div className="glass-apple-liquid mb-8">
          <div className="glass-apple-liquid-inner p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="h-5 w-5 text-red-600" />
            <h2 className="text-xl sm:text-2xl font-bold text-red-600">AI Prompts Guide</h2>
          </div>
          <p className="text-gray-600 text-sm mb-6">Use this guide to improve prompt quality with structure, mistakes to avoid, and copy-ready templates.</p>

          {/* Accordion: Prompt Structure */}
          <div className="border-t border-gray-200/60">
            <button onClick={() => toggleSection("structure")} className="w-full flex items-center justify-between py-4 text-left">
              <div className="flex items-center gap-3"><NotepadText className="h-5 w-5 text-gray-700" /><span className="font-semibold text-gray-900">Prompt structure (Role / Context / Task / Output)</span></div>
              {openSection === "structure" ? <ChevronUp className="h-5 w-5 text-gray-500" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
            </button>
            <AnimatePresence>
              {openSection === "structure" && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} className="overflow-hidden">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4">
                    {promptStructure.map((item) => (<div key={item.title} className="border border-gray-200 rounded-xl p-4 bg-white/50"><h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4><p className="text-sm text-gray-500">{item.desc}</p></div>))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Accordion: 10 Beginner Mistakes */}
          <div className="border-t border-gray-200/60">
            <button onClick={() => toggleSection("mistakes")} className="w-full flex items-center justify-between py-4 text-left">
              <div className="flex items-center gap-3"><AlertTriangle className="h-5 w-5 text-amber-500" /><span className="font-semibold text-gray-900">10 beginner mistakes</span></div>
              {openSection === "mistakes" ? <ChevronUp className="h-5 w-5 text-gray-500" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
            </button>
            <AnimatePresence>
              {openSection === "mistakes" && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} className="overflow-hidden">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-4">
                    {beginnerMistakes.map((m, i) => (<div key={i} className="border border-gray-200 rounded-xl p-4 bg-white/50"><p className="text-sm text-gray-700"><span className="text-red-600 font-semibold">{i + 1}.</span> {m}</p></div>))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Accordion: 5 Copy-Ready Templates */}
          <div className="border-t border-gray-200/60">
            <button onClick={() => toggleSection("templates")} className="w-full flex items-center justify-between py-4 text-left">
              <div className="flex items-center gap-3"><Clipboard className="h-5 w-5 text-" /><span className="font-semibold text-blue-700 underline underline-offset-2">5 copy-ready templates (EN + AS)</span></div>
              {openSection === "templates" ? <ChevronUp className="h-5 w-5 text-gray-500" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
            </button>
            <AnimatePresence>
              {openSection === "templates" && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} className="overflow-hidden">
                  <div className="space-y-5 pb-4">
                    {copyReadyTemplates.map((tpl, i) => (
                      <div key={i} className="border border-gray-200 rounded-xl p-5 bg-white/50">
                        <h4 className="font-bold text-gray-900 mb-4">{tpl.label}</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="border border-gray-200 rounded-xl p-4 bg-white/70">
                            <p className="text-xs font-semibold text-red-600 mb-2">অসমীয়া</p>
                            <p className="text-sm text-gray-700 mb-3">{tpl.as}</p>
                            <button onClick={() => navigator.clipboard.writeText(tpl.as)} className="w-full py-2 rounded-lg text-sm border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"><Clipboard className="h-3.5 w-3.5" /> Copy Assamese</button>
                          </div>
                          <div className="border border-gray-200 rounded-xl p-4 bg-white/70">
                            <p className="text-xs font-semibold text-red-600 mb-2">English</p>
                            <p className="text-sm text-gray-700 mb-3">{tpl.en}</p>
                            <button onClick={() => navigator.clipboard.writeText(tpl.en)} className="w-full py-2 rounded-lg text-sm border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"><Clipboard className="h-3.5 w-3.5" /> Copy English</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          </div>
        </div>


        {/* ══════ DAILY PROMPT HABIT + AUDIENCE QUICK LANES ══════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          {/* Daily Prompt Habit */}
          <div className="glass-apple-liquid">
            <div className="glass-apple-liquid-inner p-5 sm:p-6">
              <h3 className="text-lg font-bold text-red-600 mb-2">{isAs ? "দৈনিক প্ৰমপ্ট অভ্যাস" : "Daily Prompt Habit"}</h3>
              <p className="text-sm text-gray-700 mb-4">{isAs ? "দৈনিক কমেও ১ টা প্ৰমপ্ট কপি আৰু চলাওক। ১০ মিনিটৰ লুপে শিক্ষা বৃদ্ধি কৰে।" : "Copy and run at least 1 prompt daily. A 10-minute loop compounds learning."}</p>
              <p className="text-xs text-gray-500 font-medium mb-2">{isAs ? "শেহতীয়াকৈ কপি কৰা" : "Recently Copied"}</p>
              <div className="flex flex-wrap gap-2">
                {recentlyCopied.length > 0 ? recentlyCopied.map((title, i) => (
                  <span key={i} className="inline-block text-xs px-3 py-1.5 rounded-full border border-gray-200 bg-white/70 text-gray-700">{title}</span>
                )) : (
                  <span className="inline-block text-xs px-3 py-1.5 rounded-full border border-gray-200 bg-white/70 text-gray-700">{isAs ? "এতিয়ালৈকে কোনো প্ৰমপ্ট কপি কৰা হোৱা নাই" : "No prompts copied yet"}</span>
                )}
              </div>
            </div>
          </div>

          {/* Audience Quick Lanes */}
          <div className="glass-apple-liquid">
            <div className="glass-apple-liquid-inner p-5 sm:p-6">
              <h3 className="text-lg font-bold text-red-600 mb-3">Audience Quick Lanes</h3>
              <div className="grid grid-cols-2 gap-3">
                {audienceQuickLanes.map((lane) => (
                  <button key={lane.label} onClick={() => setActiveCategory(activeCategory === lane.category ? "All" : lane.category)} className={`text-left p-3 rounded-xl border transition-colors ${activeCategory === lane.category ? "border-red-500 bg-red-50" : "border-gray-200 bg-white/50 hover:border-red-200 hover:bg-red-50/50"}`}>
                    <span className="block text-sm font-semibold text-gray-900">{lane.label}</span>
                    <span className="block text-xs text-gray-500">{lane.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>


        {/* ══════ AI PROMPT PACKS ══════ */}
        <div className="glass-apple-liquid mb-8">
          <div className="glass-apple-liquid-inner p-5 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <div className="bg-red-600 p-2 rounded-xl"><Zap className="h-5 w-5 text-white" /></div>
                <h2 className="text-xl sm:text-2xl font-bold text-red-600">AI Prompt Packs</h2>
              </div>
              <p className="text-gray-600 text-sm">Quick navigation, compact cards, and copy-ready prompts.</p>
            </div>
            <div className="flex items-center gap-1 bg-white/70 border border-gray-200 rounded-full px-1 py-1">
              <span className="text-xs text-gray-500 px-2">Prompt Language</span>
              <button onClick={() => setPromptLang("as")} className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${isAs ? "bg-red-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}>অসমীয়া</button>
              <button onClick={() => setPromptLang("en")} className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${!isAs ? "bg-red-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}>English</button>
            </div>
          </div>

          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input type="text" placeholder="Search prompts..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-white/60 bg-white/50 backdrop-blur-md text-sm focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-200 transition shadow-sm" />
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            <button onClick={() => setActiveCategory("All")} className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${activeCategory === "All" ? "bg-red-600 text-white shadow-md shadow-red-500/20" : "bg-white/60 backdrop-blur-sm border border-white/50 text-gray-700 hover:bg-red-50 hover:border-red-200 shadow-sm"}`}>
              <span className="block">All Categories</span>
              <span className="block text-[10px] opacity-80">{promptPacks.length}</span>
            </button>
            {categories.map(([cat, count]) => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${activeCategory === cat ? "bg-red-600 text-white shadow-md shadow-red-500/20" : "bg-white/60 backdrop-blur-sm border border-white/50 text-gray-700 hover:bg-red-50 hover:border-red-200 shadow-sm"}`}>
                <span className="block">{cat}</span>
                <span className="block text-[10px] opacity-80">{count}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-500">Showing {filtered.length} prompts</p>
            {(activeCategory !== "All" || search) && (
              <button onClick={() => { setActiveCategory("All"); setSearch(""); }} className="text-sm text-gray-500 hover:text-red-600 transition-colors">Clear All</button>
            )}
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
              {filtered.map((pack, idx) => {
                const title = isAs && pack.title_as ? pack.title_as : pack.title;
                const promptText = isAs && pack.prompt_as ? pack.prompt_as : pack.prompt;
                return (
                  <div key={pack.slug || pack.title + idx} className="glass-apple-liquid group">
                    <div className="glass-apple-liquid-inner p-5 sm:p-6 flex flex-col justify-between h-full">
                    <div>
                      <span className="inline-block text-xs font-semibold text-white bg-red-600 px-3 py-1 rounded-full mb-3">{pack.category}</span>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-3">{promptText}</p>
                      {pack.tags && pack.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {pack.tags.map((tag, i) => (<span key={i} className="inline-block text-xs px-3 py-1 rounded-lg border border-gray-200 bg-white/60 text-gray-700">{tag}</span>))}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-3 mt-auto pt-3 border-t border-gray-200/50">
                      <button onClick={() => setSelectedPrompt(pack)} className="flex-1 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 bg-white/70 text-gray-700 hover:bg-gray-100 transition-colors">Open Prompt</button>
                      <button onClick={() => handleCopy(pack)} className="flex-1 py-2.5 rounded-xl text-sm font-semibold glass-btn-red text-white hover:scale-[1.02] transition-colors flex items-center justify-center gap-2">
                        <Copy className="h-4 w-4" />{copiedId === pack.title ? "Copied!" : "Copy Prompt"}
                      </button>
                    </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No prompts found</h3>
              <p className="text-gray-500 text-sm mb-4">Try a different search or category.</p>
              <button onClick={() => { setSearch(""); setActiveCategory("All"); }} className="px-5 py-2 rounded-xl text-sm font-semibold border border-red-300 text-red-600 hover:bg-red-50 transition-colors">Clear Filters</button>
            </div>
          )}
          </div>
        </div>
      </section>


      {/* ══════ MODAL ══════ */}
      <AnimatePresence>
        {selectedPrompt && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="fixed inset-0 z-100 flex items-center justify-center backdrop-blur-md p-4" onClick={() => setSelectedPrompt(null)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} transition={{ duration: 0.2, ease: "easeOut" }} className="bg-white/90 backdrop-blur-xl border border-white/60 rounded-2xl shadow-xl max-w-md w-full p-5 sm:p-6 flex flex-col max-h-[70vh]" onClick={(e) => e.stopPropagation()}>
              {/* Header — fixed */}
              <div className="flex items-start justify-between mb-3 shrink-0">
                <div>
                  <span className="inline-block text-xs font-semibold text-white bg-red-600 px-3 py-1 rounded-full mb-2">{selectedPrompt.category}</span>
                  <h3 className="text-lg font-bold text-gray-900">{isAs && selectedPrompt.title_as ? selectedPrompt.title_as : selectedPrompt.title}</h3>
                </div>
                <button onClick={() => setSelectedPrompt(null)} className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"><X className="h-5 w-5 text-gray-500" /></button>
              </div>
              {/* Prompt text — scrollable */}
              <div className="bg-gray-50 rounded-xl p-4 mb-3 border border-gray-100 overflow-y-auto flex-1 min-h-0">
                <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">{isAs && selectedPrompt.prompt_as ? selectedPrompt.prompt_as : selectedPrompt.prompt}</p>
              </div>
              {/* Tags — fixed */}
              {selectedPrompt.tags && selectedPrompt.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3 shrink-0">
                  {selectedPrompt.tags.map((tag, i) => (<span key={i} className="inline-block text-xs px-3 py-1 rounded-lg border border-gray-200 bg-gray-50 text-gray-600">{tag}</span>))}
                </div>
              )}
              {/* Copy button — fixed at bottom */}
              <button onClick={() => handleCopy(selectedPrompt)} className="w-full py-2.5 rounded-xl text-sm font-semibold glass-btn-red text-white hover:scale-[1.02] transition-colors flex items-center justify-center gap-2 shrink-0">
                <Copy className="h-4 w-4" />{copiedId === selectedPrompt.title ? "Copied to Clipboard!" : "Copy Prompt"}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

