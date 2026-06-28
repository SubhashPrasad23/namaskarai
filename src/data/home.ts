export const heroCards = [
  { title: "Prompt Packs", desc: "Curated prompts for every need", icon: "/icons/prompt-pack.png" },
  { title: "Business AI", desc: "Grow your business with AI", icon: "/icons/business-ai.png" },
  { title: "Career AI", desc: "CV, Interview & Job Support", icon: "/icons/career.png" },
  { title: "Student Tools", desc: "Study, Notes & Exam Preparation", icon: "/icons/studentTools.png" },
];

export const stats = [
  { icon: "/icons/learner.png", value: "25K+", label: "Learners in Assam" },
  { icon: "/icons/prompt-pack2.png", value: "500+", label: "Prompt Packs" },
  { icon: "/icons/feedback.png", value: "98%", label: "User Satisfaction" },
  { icon: "/icons/task.png", value: "50K+", label: "Tasks Simplified" },
];

export const tenMinuteSteps = [
  { n: "1", t: "Pick your category", d: "Choose what you want to learn" },
  { n: "2", t: "Open and copy a prompt", d: "Get expert-crafted prompts" },
  { n: "3", t: "Run with your own data", d: "See real results in minutes" },
];

export const categories = [
  { title: "Career & Job", desc: "CV, Interview, Skill roadmap", icon: "/icons/briefcase.png" },
  { title: "Students & Aspirers", desc: "Exam notes, Study discipline", icon: "/icons/student.png" },
  { title: "Small Business", desc: "Sales, WhatsApp Templates", icon: "/icons/house.png" },
  { title: "Parents & Family", desc: "Safe AI rules, Child guidance", icon: "/icons/family.png" },
];

export const newsItems = [
  {
    title: "U.S. scientist John Jumper to leave Google DeepMind for Anthropic",
    excerpt: "\"We are grateful for John's significant contributions to Google DeepMind's work in advancing science and AI. We wish him well in his next chapter,\" a Google DeepMind spo...",
    tag: "Industry News",
    readTime: "2 min read",
    date: "22 Jun 2026",
  },
  {
    title: "Amazon points to water conservation steps in India amid data centre scrutiny",
    excerpt: "Amazon is expanding its footprint in India, where it plans to invest more than $35 billion by 2030 to boost AI capabilities and exports",
    tag: "Industry News",
    readTime: "2 min read",
    date: "22 Jun 2026",
  },
  {
    title: "Trump tells Axios he no longer views Anthropic as national security threat",
    excerpt: "Trump and other G7 leaders met with tech bosses, including Amodei, at a summit in France this week",
    tag: "Industry News",
    readTime: "2 min read",
    date: "22 Jun 2026",
  },
];

export const videosData = [
  { id: 1, duration: "15s" },
  { id: 2, duration: "10s" },
  { id: 3, duration: "8s" },
  { id: 4, duration: "12s" },
  { id: 5, duration: "9s" },
  { id: 6, duration: "20s" },
  { id: 7, duration: "14s" },
];

export type CommunityTab = "tools" | "tutorials" | "insights";

export interface CommunityCard {
  badge: string;
  icon: string;
  iconBg: string;
  title: string;
  desc: string;
  btnText: string;
  btnHref: string;
}

export const communityContent: Record<CommunityTab, { cards: CommunityCard[] }> = {
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
        badge: "\u2726 Video Tutorials",
        icon: "\u25B6",
        iconBg: "bg-red-600",
        title: "YouTube Tutorials",
        desc: "Step-by-step AI tutorials in Assamese for beginners and advanced users",
        btnText: "Watch Tutorials",
        btnHref: "#",
      },
      {
        badge: "Written Guides",
        icon: "\uD83D\uDCD6",
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
        badge: "\u2726 Weekly Updates",
        icon: "\uD83D\uDCA1",
        iconBg: "bg-amber-500",
        title: "AI Insights Newsletter",
        desc: "Weekly curated insights on AI trends, tools, and opportunities for Assam",
        btnText: "Subscribe Now",
        btnHref: "#",
      },
      {
        badge: "Research & Reports",
        icon: "\uD83D\uDCCA",
        iconBg: "bg-indigo-600",
        title: "Industry Reports",
        desc: "In-depth analysis of AI adoption patterns and opportunities in Northeast India",
        btnText: "View Reports",
        btnHref: "#",
      },
    ],
  },
};
