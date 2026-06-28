"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

import {
  ArrowRight,
  Play,
  Users,
  Clock,
  BookOpen,
  ExternalLink,
  Wrench,
  Lightbulb,
  Newspaper,
  Sparkles,
  MessageSquareText,
  GraduationCap,
  Users2,
  FileText,
  Brain,
  ChartNoAxesCombined,
  AlarmClockCheck,
} from "lucide-react";
import Image from "next/image";
import VideoCarousel from "@/components/prompts/components/VideoCarousel";
import { BsAlarm } from "react-icons/bs";
import DiamondBorder from "@/components/ui/DiamondBorder";

function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

const heroCards = [
  {
    title: "Prompt Packs",
    desc: "Curated prompts for every need",
    icon: "/icons/prompt-pack.png",
  },
  {
    title: "Business AI",
    desc: "Grow your business with AI",
    icon: "/icons/business-ai.png",
  },
  {
    title: "Career AI",
    desc: "CV, Interview & Job Support",
    icon: "/icons/career.png",
  },
  {
    title: "Student Tools",
    desc: "Study, Notes & Exam Preparation",
    icon: "/icons/studentTools.png",
  },
];

const stats = [
  {
    icon: "/icons/learner.png",
    value: "25K+",
    label: "Learners in Assam",
  },
  {
    icon: "/icons/prompt-pack2.png",
    value: "500+",
    label: "Prompt Packs",
  },
  {
    icon: "/icons/feedback.png",
    value: "98%",
    label: "User Satisfaction",
  },
  {
    icon: "/icons/task.png",
    value: "50K+",
    label: "Tasks Simplified",
  },
];

const tenMinuteSteps = [
  { n: "1", t: "Pick your category", d: "Choose what you want to learn" },
  { n: "2", t: "Open and copy a prompt", d: "Get expert-crafted prompts" },
  { n: "3", t: "Run with your own data", d: "See real results in minutes" },
];

const categories = [
  {
    title: "Career & Job",
    desc: "CV, Interview, Skill roadmap",
    icon: "/icons/briefcase.png",
  },
  {
    title: "Students & Aspirers",
    desc: "Exam notes, Study discipline",
    icon: "/icons/student.png",
  },
  {
    title: "Small Business",
    desc: "Sales, WhatsApp Templates",
    icon: "/icons/house.png",
  },
  {
    title: "Parents & Family",
    desc: "Safe AI rules, Child guidance",
    icon: "/icons/family.png",
  },
];

const pillarGuides = [
  {
    title: "AI in Assamese",
    desc: "Beginner-first guide with core terms and a practical starting path.",
    icon: <BookOpen />,
  },
  {
    title: "ChatGPT in Assamese",
    desc: "Setup, daily use-cases, and safe usage checklist in one page.",
    icon: <MessageSquareText />,
  },
  {
    title: "AI Course in Assamese",
    desc: "Explore curriculum, tracks, and enrollment flow in one page.",
    icon: <GraduationCap />,
  },
];

const longFormGuides = [
  {
    title: "Learn AI in 30 Days",
    icon: <AlarmClockCheck className="h-4 w-4 text-red-600" />,
  },
  {
    title: "Best AI Course Comparison",
    icon: <ChartNoAxesCombined className="h-4 w-4 text-red-600" />,
  },
  {
    title: "Learning Assamese with AI",
    icon: <BookOpen className="h-4 w-4 text-red-600" />,
  },
  {
    title: "Assamese LLM Guide",
    icon: <Brain className="h-4 w-4 text-red-600" />,
  },
  {
    title: "Editorial Policy",
    icon: <FileText className="h-4 w-4 text-red-600" />,
  },
  {
    title: "Press & Collaboration",
    icon: <Users2 className="h-4 w-4 text-red-600" />,
  },
];

const newsItems = [
  {
    title: "U.S. scientist John Jumper to leave Google DeepMind for Anthropic",
    excerpt:
      "\"We are grateful for John's significant contributions to Google DeepMind's work in advancing science and AI. We wish him well in his next chapter,\" a Google DeepMind spo...",
    tag: "Industry News",
    readTime: "2 min read",
    date: "22 Jun 2026",
  },
  {
    title:
      "Amazon points to water conservation steps in India amid data centre scrutiny",
    excerpt:
      "Amazon is expanding its footprint in India, where it plans to invest more than $35 billion by 2030 to boost AI capabilities and exports",
    tag: "Industry News",
    readTime: "2 min read",
    date: "22 Jun 2026",
  },
  {
    title:
      "Trump tells Axios he no longer views Anthropic as national security threat",
    excerpt:
      "Trump and other G7 leaders met with tech bosses, including Amodei, at a summit in France this week",
    tag: "Industry News",
    readTime: "2 min read",
    date: "22 Jun 2026",
  },
];

const videosData = [
  { id: 1, duration: "15s" },
  { id: 2, duration: "10s" },
  { id: 3, duration: "8s" },
  { id: 4, duration: "12s" },
  { id: 5, duration: "9s" },
  { id: 6, duration: "20s" },
  { id: 7, duration: "14s" },
];

type CommunityTab = "tools" | "tutorials" | "insights";

const communityContent: Record<
  CommunityTab,
  {
    cards: Array<{
      badge: string;
      icon: string;
      iconBg: string;
      title: string;
      desc: string;
      btnText: string;
      btnHref: string;
    }>;
  }
> = {
  tools: {
    cards: [
      {
        badge: "Community + Reels",
        icon: "/icons/fb-white.svg",

        iconBg: "bg-blue-600",
        title: "Facebook Community",
        desc: "Short reels, practical demos, and page updates from Namaskar AI",
        btnText: "Open Facebook",
        btnHref: "#",
      },
      {
        badge: "Visual Updates",
        icon: "/icons/insta-white.svg",

        iconBg: "bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400",
        title: "Instagram",
        desc: "Visual tips, carousels, and quick learning content for daily practice",
        btnText: "Open Instagram",
        btnHref: "#",
      },
    ],
  },
  tutorials: {
    cards: [
      {
        badge: "✦ Video Tutorials",
        icon: "▶",
        iconBg: "bg-red-600",
        title: "YouTube Tutorials",
        desc: "Step-by-step AI tutorials in Assamese for beginners and advanced users",
        btnText: "Watch Tutorials",
        btnHref: "#",
      },
      {
        badge: "Written Guides",
        icon: "📖",
        iconBg: "bg-emerald-600",
        title: "Blog Tutorials",
        desc: "Detailed written guides with screenshots and code examples",
        btnText: "Read Tutorials",
        btnHref: "#",
      },
    ],
  },
  insights: {
    cards: [
      {
        badge: "✦ Weekly Updates",
        icon: "💡",
        iconBg: "bg-amber-500",
        title: "AI Insights Newsletter",
        desc: "Weekly curated insights on AI trends, tools, and opportunities for Assam",
        btnText: "Subscribe Now",
        btnHref: "#",
      },
      {
        badge: "Research & Reports",
        icon: "📊",
        iconBg: "bg-indigo-600",
        title: "Industry Reports",
        desc: "In-depth analysis of AI adoption patterns and opportunities in Northeast India",
        btnText: "View Reports",
        btnHref: "#",
      },
    ],
  },
};

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<CommunityTab>("tools");
  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    const updateCount = () => {
      const w = window.innerWidth;
      let newCount = 5;
      if (w < 768) newCount = 1;
      else if (w < 1024) newCount = 3;

      setVisibleCount(newCount);
      setCurrentIndex((prev) => {
        const max = videosData.length - newCount;
        return prev > max ? Math.max(0, max) : prev;
      });
    };
    updateCount();
    window.addEventListener("resize", updateCount);
    return () => window.removeEventListener("resize", updateCount);
  }, []);

  return (
    <div className="flex flex-col overflow-x-hidden md:max-w-5/6 mx-auto px-8 sm:px-10 md:px-8 lg:px-4">
      <section className="relative  lg:pt-14 pt-10">
        <div className="relative mx-auto ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-6">
              <div className="flex md:items-start items-center md:justify-start justify-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-red-200/60 bg-white backdrop-blur-sm px-4 py-1.5 mb-6 shadow-inner shadow-gray-200">
                  <Sparkles className="h-4 w-4 text-red-600" />{" "}
                  <span className="text-xs md:text-sm font-medium text-red-600">
                    Assamese-first AI learning platform
                  </span>
                </div>
              </div>
              <h1 className="pt-4  md:text-start text-center text-[2rem] sm:text-5xl lg:text-[4.5rem] md:font-extrabold font-bold tracking-tight text-slate-900 leading-[0.9]">
                Learn AI in
                <br />
                <span className="text-[3rem] md:text-[5rem] text-red-700">
                  Assamese
                </span>
              </h1>

              <p className="mt-5 text-sm  lg:text-lg text-slate-500 md:max-w-md w-full">
                Namaskar AI helps Assam learners, job seekers, small businesses,
                and families use prompt packs, tool guides, and step-by-step
                roadmaps to get real work done.
              </p>

              <div className="w-full mt-7 flex gap-4">
                <Link
                  href="/ai-course"
                  className="md:w-auto w-1/2 glass-btn-red relative overflow-hidden inline-flex items-center justify-center gap-3 rounded-xl md:px-8 px-3 xl:py-3.5 py-2.5 text-white font-medium"
                >
                  {/* Top glossy arc */}
                  <span className="absolute top-[2px] left-[8px] right-[8px] h-[45%] rounded-full bg-gradient-to-b from-white/50 to-transparent pointer-events-none" />
                  <span className="relative z-10 whitespace-nowrap text-sm">
                    Start Learning
                  </span>
                  <ArrowRight className="relative z-10 h-5 w-5 md:block hidden" />
                </Link>

                <button className="md:w-auto w-1/2 glass-hero-card  whitespace-nowrap rounded-lg! backdrop-blur-md! cursor-pointer inline-flex items-center gap-2.5   md:px-8 px-3 xl:py-3.5 py-2.5 md:text-sm text-xs font-medium text-black transition-all">
                  <Play className="h-5 w-5 text-slate-500 md:block hidden " />
                  See Community Demos
                </button>
              </div>
            </div>
            {/* hero card */}
            <div className="lg:col-span-6 relative hidden md:block">
              <div className="relative grid grid-cols-2 ml-auto lg:gap-10 gap-4">
                {heroCards.map((card, i) => (
                  <motion.div
                    key={card.title}
                    animate={{ y: [0, -7, 0] }}
                    transition={{
                      duration: 4 + i * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.8,
                    }}
                    className={`w-[120px] md:w-[130px] lg:w-[160px] p-1.5 absolute ${card.title === "Prompt Packs" ? "lg:-left-36 md:left-6 lg:rotate-3" : ""}
                       ${card.title === "Career AI" ? "lg:-left-12 lg:bottom-2 lg:rotate-4" : ""} ${card.title === "Business AI" || card.title === "Student Tools" ? "lg:top-6 -left-20 lg:rotate-3" : ""} glass-hero-card transition-all duration-300  z-50`}
                  >
                    <div className="glass-hero-card rounded-xl p-3 lg:p-4">
                      <div className="space-y-2">
                        <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-2xl flex items-center justify-center text-lg bg-white/60 backdrop-blur-sm">
                          <Image
                            src={card.icon}
                            alt={card.title}
                            width={40}
                            height={40}
                          />
                        </div>
                        <h3 className="font-semibold text-slate-800 text-[11px] lg:text-[13px]">
                          {card.title}
                        </h3>
                        <p className="text-[10px] lg:text-[11px] text-slate-500">
                          {card.desc}
                        </p>
                      </div>
                      <div className="mt-2 flex justify-end">
                        <button className="w-6 h-6 lg:w-7 lg:h-7 rounded-full bg-white/60 backdrop-blur-sm shadow-md border border-white/40 flex items-center justify-center transition-all duration-300 hover:bg-red-500 hover:scale-105 group">
                          <ArrowRight className="h-3 w-3 text-red-500 group-hover:text-white" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* stats */}
          <Reveal delay={0.2}>
            <section className="md:mt-4 mt-6">
              <div className="lg:w-fit w-full glass-card rounded-2xl p-4 grid md:grid-cols-4 grid-cols-2 gap-2">
                {stats.map((stat, i) => (
                  <div key={stat.label} className="flex items-center gap-3">
                    <div className="md:h-8 md:w-8 h-6 w-6 flex items-center justify-center shrink-0">
                      <Image
                        src={stat.icon}
                        alt={stat.label}
                        width={40}
                        height={40}
                      />
                    </div>
                    <div>
                      <div className="md:text-lg text-sm font-bold text-slate-900">
                        {stat.value}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {stat.label}
                      </div>
                    </div>
                    {i < stats.length - 1 && (
                      <div className="hidden sm:block w-0.5 h-8 bg-slate-200/60" />
                    )}
                  </div>
                ))}
              </div>
            </section>
          </Reveal>
        </div>
      </section>

      {/* Today&apos;s 10-Minute AI Start */}
      <section className=" z-50 py-6">
        <Reveal>
          <div className="mx-auto glass-card p-0.5 ">
            <div className="glass-card p-4 backdrop-blur-xs">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center">
                  <Clock className="h-full w-full text-red-600" />
                </div>
                <h2 className="md:text-xl text-normal lg:text-lg font-bold text-slate-900">
                  Today&apos;s 10-Minute AI Start
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-1 space-y-5">
                  {tenMinuteSteps.map((step, index) => (
                    <div
                      key={step.n}
                      className="relative flex items-start gap-3"
                    >
                      <div className="relative flex flex-col items-center">
                        <div className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center text-[10px] font-bold z-10">
                          {step.n}
                        </div>
                        {index !== tenMinuteSteps.length - 1 && (
                          <div className="absolute top-7 w-px h-12 border-l-2 border-dashed border-red-300" />
                        )}
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-black">
                          {step.t}
                        </div>
                        <div className="text-[11px] text-slate-600 font-medium">
                          {step.d}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {categories.map((cat) => (
                    <div
                      key={cat.title}
                      className="glass-card bg-white/30 px-3 py-4 flex md:flex-row flex-col justify-center md:items-start items-center gap-3 rounded-2xl"
                    >
                      <div className=" w-11 h-11 rounded-2xl bg-slate-50  flex items-center justify-center shrink-0">
                        <Image
                          src={cat.icon}
                          alt={cat.title}
                          width={40}
                          height={40}
                        />
                      </div>

                      <div className="w-full h-full flex flex-col justify-between">
                        <div>
                          <h4 className="font-bold md:text-sm text-xs text-black">
                            {cat.title}
                          </h4>
                          <p className="md:text-xs text-[11px] text-slate-600 font-semibold mt-1 flex-1">
                            {cat.desc}
                          </p>
                        </div>

                        <div className="mt-1 flex  justify-end ">
                          <button className="w-8 h-8 rounded-full shadow-inner bg-[#FDF2EC]/45 shadow-gray-50 border border-white flex items-center justify-center transition-all duration-300 hover:bg-red-500 hover:scale-105 group">
                            <ArrowRight className="h-4 w-4 text-black group-hover:text-white" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <DiamondBorder />


      {/* pillar guide */}
      <section className="z-50">
        <div className="mx-auto text-center">
          <Reveal>
            <h2 className="text-2xl sm:text-4xl font-bold text-red-700 mb-2 tracking-tight">
              Pillar Guides
            </h2>
            <p className="text-slate-600 text-sm mb-5 font-medium">
              Assamese-first topic guides from first steps to practical use.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 mb-5">
            {pillarGuides.map((guide, i) => (
              <Reveal key={guide.title} delay={i * 0.1}>
                <div className="glass-card p-4 text-left rounded-2xl h-full backdrop-blur-xs bg-white/30">
                  <div className="w-10 h-10 rounded-full  border border-red-200 text-red-700 p-1 flex items-center justify-center mb-4 shadow-inner shadow-red-100">
                    {guide.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    {guide.title}
                  </h3>
                  <p className="text-sm text-slate-500 mb-5 leading-relaxed">
                    {guide.desc}
                  </p>
                  <button className="glass-btn-pink w-full py-3 text-sm font-semibold text-red-600 flex items-center justify-center gap-2">
                    Open Guide <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="glass-card p-7 text-left rounded-2xl backdrop-blur-xs ">
              <h3 className="text-base font-bold text-slate-900 mb-5">
                Search-targeted long-form guides
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {longFormGuides.map((guide) => (
                  <div
                    key={guide.title}
                    className="glass-card bg-white/30 flex items-center justify-between rounded-2xl px-4 py-3 hover:bg-red-50/40 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                        {guide.icon}
                      </div>
                      <span className="text-sm font-medium text-slate-700">
                        {guide.title}
                      </span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-red-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <DiamondBorder />

      {/* What&apos;s New in AI */}
      <section className="z-50">
        <div className=" text-center">
          <Reveal>
            <h2 className="text-2xl sm:text-4xl font-bold text-red-600 mb-2 tracking-tight">
              What&apos;s New in AI
            </h2>
            <p className="text-slate-500 text-sm mb-1 max-w-xl mx-auto">
              Stay updated with the latest AI developments,
            </p>
            <p className="text-slate-500 text-sm mb-9 max-w-xl mx-auto">
              breakthroughs, and industry news you might have missed.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {newsItems.map((news, i) => (
              <Reveal key={news.title} delay={i * 0.1}>
                <div className="glass-card p-1">
                  <div className="glass-card text-left group h-full flex flex-col backdrop-blur-xs">
                    {/* Image */}
                    <div className="h-48 bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center rounded-t-[1.5rem] overflow-hidden relative">
                      <Newspaper className="h-10 w-10 text-slate-500/50" />
                    </div>

                    {/* Content */}
                    <div className="p-5 pt-0 flex flex-col flex-1">
                      {/* Badge icon overlapping image */}
                      <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center -mt-5 mb-4 relative z-10 border-2 border-white shadow-md">
                        <Newspaper className="h-4 w-4 text-red-600" />
                      </div>

                      <h3 className="font-bold text-slate-900 text-base mb-2 line-clamp-2 leading-snug">
                        {news.title}
                      </h3>
                      <p className="text-[13px] text-slate-500 mb-4 line-clamp-3 leading-relaxed flex-1">
                        {news.excerpt}
                      </p>

                      <div className="flex items-center justify-between gap-2 mb-4">
                        <div className="flex items-center gap-3">
                          <span className="inline-block text-[11px] font-medium text-red-700 border border-red-300 bg-white rounded-full px-2.5 py-1">
                            {news.tag}
                          </span>
                          <span className="text-[11px] text-slate-400 flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {news.readTime}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400">
                          {news.date}
                        </span>
                      </div>

                      <Link
                        href="/news"
                        className="glass-btn-pink w-full flex items-center justify-center py-3.5 text-sm font-semibold text-red-600 hover:text-red-700 transition-colors"
                      >
                        <span className="flex items-center gap-3">
                          Read More
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <DiamondBorder />

      {/* Join Our Community */}
      <section id="community" className="">
        <div className="mx-auto  text-center">
          <Reveal>
            <div className="flex items-center justify-center gap-3 mb-3">
              <Users className="md:h-8 md:w-10 h-5 w-6 text-red-500" />
              <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                Join Our <span className="text-red-600">Community</span>
              </h2>
            </div>
            <p className="text-slate-500 text-sm mb-7 max-w-xl mx-auto">
              Follow Namaskar AI on Facebook and Instagram for reels, tutorials,
              and regular Assamese AI updates.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="glass-card inline-flex items-center gap-0.5 rounded-2xl p-1 mb-5 glass-card">
              <button
                onClick={() => setActiveTab("tools")}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-[13px] font-medium transition-colors ${activeTab === "tools" ? "glass-card bg-gradient-to-t from-white via-red-300 to-white shadow-inner shadow-white" : " hover:text-slate-700"}`}
              >
                <Wrench className="h-3.5 w-3.5 text-red-600" /> Tools
              </button>
              <button
                onClick={() => setActiveTab("tutorials")}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-[13px] font-medium transition-colors ${activeTab === "tutorials" ? "glass-card  bg-gradient-to-t from-white via-red-300 to-white shadow-inner shadow-white" : " hover:text-slate-700"}`}
              >
                <BookOpen className="h-3.5 w-3.5 text-red-600" /> Tutorials
              </button>
              <button
                onClick={() => setActiveTab("insights")}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-[13px] font-medium transition-colors ${activeTab === "insights" ? "glass-card  bg-gradient-to-t from-white via-red-300 to-white shadow-inner shadow-white" : " hover:text-slate-700"}`}
              >
                <Lightbulb className="h-3.5 w-3.5 text-red-600" /> Insights
              </button>
            </div>
          </Reveal>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto"
            >
              {communityContent[activeTab].cards.map((card) => (
                <div
                  key={card.title}
                  className="glass-card p-5 text-left rounded-2xl"
                >
                  <div className="flex items-center justify-between ">
                    <div className="shadow-md shadow-red-200 flex items-center gap-1.5 rounded-full bg-slate-100/80 px-3 py-1 text-[11px] font-medium text-slate-600">
                      <Sparkles className="text-red-500 h-3 w-3" /> {card.badge}
                    </div>
                    <div
                      className={`w-9 h-9 p-2 rounded-lg ${card.iconBg} flex items-center justify-center shadow-sm`}
                    >
                      {card.icon.startsWith("/") ? (
                        <Image
                          src={card.icon}
                          alt={card.title}
                          width={40}
                          height={40}
                        />
                      ) : (
                        <span className="text-white text-lg">{card.icon}</span>
                      )}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-500 mb-5">{card.desc}</p>
                  <a
                    href={card.btnHref}
                    className="relative overflow-hidden block w-full rounded-xl bg-[linear-gradient(to_right,#f97316_0%,#dc2626_10%,#dc2626_90%,#f97316_100%)] py-3 text-sm font-semibold text-white text-center transition-all duration-300 shadow-md shadow-red-600/15"
                  >
                    <span className="absolute top-[1px] left-[6px] right-[6px] h-[45%] rounded-xl bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />
                    <span className="relative z-10">
                      {card.btnText}
                      <ExternalLink className="h-3.5 w-3.5 inline ml-1" />
                    </span>
                  </a>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <DiamondBorder />

      {/* Latest Videos */}
      <section className=" z-50">
        <div className=" text-center">
          <Reveal>
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                <svg
                  width="256px"
                  height="256px"
                  viewBox="0 0 24.00 24.00"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="#f00505"
                  transform="rotate(0)"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke="#CCCCCC"
                    strokeWidth="0.144"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15Z"
                      stroke="#d40202"
                      strokeWidth="1.656"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                    <path
                      d="M2.52002 7.11011H21.48"
                      stroke="#d40202"
                      strokeWidth="1.656"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                    <path
                      d="M8.52002 2.11011V6.97011"
                      stroke="#d40202"
                      strokeWidth="1.656"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                    <path
                      d="M15.48 2.11011V6.52011"
                      stroke="#d40202"
                      strokeWidth="1.656"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                    <path
                      d="M9.75 14.4501V13.2501C9.75 11.7101 10.84 11.0801 12.17 11.8501L13.21 12.4501L14.25 13.0501C15.58 13.8201 15.58 15.0801 14.25 15.8501L13.21 16.4501L12.17 17.0501C10.84 17.8201 9.75 17.1901 9.75 15.6501V14.4501V14.4501Z"
                      stroke="#d40202"
                      strokeWidth="1.656"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
              </div>
              <h2 className="text-xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                Latest <span className="text-red-600">Videos</span>
              </h2>
            </div>
            <p className="text-gray-600 text-sm mb-6 font-medium">
              Watch our latest Facebook reels. Tap any thumbnail to open it on
              Facebook.
            </p>
          </Reveal>

          <div className="">
            <div className="overflow-hidden">
              <motion.div
                animate={{ x: `${-currentIndex * (100 / visibleCount)}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="flex gap-3 md:gap-4"
              >
                <VideoCarousel />
              </motion.div>
            </div>
          </div>

          <div className="my-5 flex flex-wrap items-center justify-center md:gap-3">
            <a
              href="#"
              className="glass-card p-1 rounded-xl shadow-inner shadow-white  text-sm font-semibold transition-all"
            >
              <div className="inline-flex items-center gap-2 glass-card bg-red-500 text-white  shadow-inner  shadow-white px-5 py-2.5 rounded-lg">
                <div className="h-5 w-5">
                  <Image
                    src="/images/fb.png"
                    alt="fb Icon"
                    width={500}
                    height={500}
                  />
                </div>{" "}
                Follow on facebook <ExternalLink className="h-3.5 w-3.5" />
              </div>
            </a>
            <a
              href="#"
              className="glass-card p-1 rounded-xl shadow-inner shadow-white  text-sm font-semibold transition-all"
            >
              <div className="inline-flex items-center gap-2 glass-card bg-gradient-to-tl from-transparent via-red-200 to-transparent  shadow-inner text-red-600 shadow-white px-5 py-2.5 rounded-lg">
                <div className="h-5 w-5">
                  <Image
                    src="/images/instagram.png"
                    alt="fb Icon"
                    width={500}
                    height={500}
                  />
                </div>{" "}
                Follow on Instagram <ExternalLink className="h-3.5 w-3.5" />
              </div>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
