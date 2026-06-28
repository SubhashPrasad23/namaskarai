"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronDown, ChevronUp, Target, Newspaper, Mic } from "lucide-react";
import Link from "next/link";

const priorityTopics = [
  "Assamese-first AI learning strategy",
  "AI adoption for Assam small businesses",
  "ChatGPT and prompt literacy for students",
  "Regional-language content workflows with AI",
  "Safe AI usage basics for families and parents",
];

const guestPostIdeas = [
  "How Assam learners can start AI in 10 minutes daily",
  "Prompt mistakes Assamese beginners make and quick fixes",
  "Free vs paid AI course path for regional-language learners",
  "AI for teachers in Assam: revision and lesson workflows",
  "Assam business WhatsApp plus AI response system starter",
];

const quoteWorkflow = [
  "Share your topic and publication name (email or DM).",
  "Mention your deadline and quote format.",
  "Namaskar AI shares concise Assamese and English input.",
  "After publishing, send the link and we will amplify it.",
];

const faqs = [
  { q: "Do you support guest article collaborations?", a: "Yes. We welcome guest posts on AI learning, regional-language AI adoption, and practical use cases for Assam audiences. Reach out with your topic idea." },
  { q: "Do you do podcast or YouTube interviews?", a: "Yes. We are open to podcast and YouTube interviews focused on AI literacy in Assam, beginner AI workflows, and regional-language AI tools." },
  { q: "What does your media kit include?", a: "Platform overview, audience focus, priority topics, quote workflow, and contact channels." },
];

export default function PressPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="flex flex-col min-h-screen py-8 sm:py-12">
      <section className="mx-auto w-full md:max-w-5/6 px-4 sm:px-8 md:px-8 lg:px-4">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-red-600 mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" /><span className="text-sm font-medium">Back to home</span>
        </Link>

        <div className="glass-apple-liquid mb-8">
          <div className="glass-apple-liquid-inner p-6 sm:p-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-red-500 mb-4">Press & Collaboration</h1>
            <p className="text-gray-700 text-base max-w-3xl">Practical collaborations with media, podcasts, YouTube channels, and education partners to expand AI literacy in Assam.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="glass-apple-liquid"><div className="glass-apple-liquid-inner p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-3"><Target className="h-5 w-5 text-red-500" /><h3 className="text-lg font-bold text-red-500">Focus</h3></div>
            <p className="text-sm text-gray-600">Assamese plus English practical AI learning for students, professionals, and small businesses.</p>
          </div></div>
          <div className="glass-apple-liquid"><div className="glass-apple-liquid-inner p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-3"><Newspaper className="h-5 w-5 text-red-500" /><h3 className="text-lg font-bold text-red-500">Media Use</h3></div>
            <p className="text-sm text-gray-600">Regional AI adoption, beginner workflows, and Assam-specific implementation angles.</p>
          </div></div>
          <div className="glass-apple-liquid"><div className="glass-apple-liquid-inner p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-3"><Mic className="h-5 w-5 text-red-500" /><h3 className="text-lg font-bold text-red-500">Format</h3></div>
            <p className="text-sm text-gray-600">Quote, guest post, short interview, or workshop snippet.</p>
          </div></div>
        </div>

        <div className="glass-apple-liquid mb-8"><div className="glass-apple-liquid-inner p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Priority Topics</h2>
          <ul className="space-y-3">
            {priorityTopics.map((topic, i) => (
              <li key={i} className="flex items-start gap-3"><span className="mt-1.5 w-2 h-2 rounded-full bg-gray-800 shrink-0" /><span className="text-sm text-gray-700">{topic}</span></li>
            ))}
          </ul>
        </div></div>

        <div className="glass-apple-liquid mb-8"><div className="glass-apple-liquid-inner p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-4"><Newspaper className="h-5 w-5 text-red-500" /><h2 className="text-xl font-bold text-red-500">Guest Post Ideas</h2></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {guestPostIdeas.map((idea, i) => (
              <div key={i} className="border border-white/50 rounded-xl p-4 bg-white/40 backdrop-blur-sm"><p className="text-sm text-gray-700">{idea}</p></div>
            ))}
          </div>
        </div></div>

        <div className="glass-apple-liquid mb-8"><div className="glass-apple-liquid-inner p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quote Request Workflow</h2>
          <div className="space-y-3">
            {quoteWorkflow.map((step, i) => (
              <div key={i} className="flex items-start gap-3"><span className="text-sm text-slate-600 font-medium">{i + 1}.</span><p className="text-sm text-gray-600">{step}</p></div>
            ))}
          </div>
        </div></div>


        <div className="glass-apple-liquid mb-8"><div className="glass-apple-liquid-inner p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">FAQ</h2>
          {faqs.map((faq, i) => (
            <div key={i} className="border-t border-gray-200/60">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between py-4 text-left">
                <span className="font-semibold text-gray-900 text-sm sm:text-base">{faq.q}</span>
                {openFaq === i ? <ChevronUp className="h-5 w-5 text-gray-500 shrink-0" /> : <ChevronDown className="h-5 w-5 text-gray-500 shrink-0" />}
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} className="overflow-hidden">
                    <p className="text-sm text-slate-600 pb-4">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div></div>

        <div className="glass-apple-liquid"><div className="glass-apple-liquid-inner p-5 sm:p-6 flex items-center gap-3 flex-wrap">
          <a href="mailto:hello@namaskar.ai" className="inline-flex items-center gap-2 glass-btn-red text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:scale-[1.02] transition-colors">
            hello@namaskar.ai
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-gray-200 text-sm font-medium px-4 py-2 rounded-full hover:bg-gray-50 transition-colors text-gray-700">
            Instagram
          </a>
        </div></div>
      </section>
    </div>
  );
}

