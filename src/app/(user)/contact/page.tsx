"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ChevronDown, ChevronUp, Mail, MessageCircle, Newspaper } from "lucide-react";
import Link from "next/link";

const contactChannels = [
  { icon: Mail, title: "Email", desc: "hello@namaskar.ai", href: "mailto:hello@namaskar.ai" },
  { icon: MessageCircle, title: "Instagram", desc: "@namaskar.ai", href: "https://instagram.com/namaskar.ai" },
  { icon: Newspaper, title: "Press & Collaboration", desc: "Media and collaboration brief", href: "/press" },
];

const faqs = [
  { q: "How fast can I expect a reply?", a: "We typically respond within 24–48 hours on weekdays. For urgent press queries, mention 'URGENT' in the subject line." },
  { q: "How should I send a collaboration pitch?", a: "Email hello@namaskar.ai with your idea, audience size, and preferred format (guest post, interview, or workshop). We review all pitches within a week." },
  { q: "Where should I send course-related questions?", a: "Use the same email hello@namaskar.ai with subject 'Course Query'. Include your name and the course you are interested in." },
];

const usefulPages = [
  { title: "Editorial Policy", href: "/editorial-policy" },
  { title: "About", href: "/about" },
];

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="flex flex-col min-h-screen py-8 sm:py-12">
      <section className="mx-auto w-full md:max-w-5/6 px-4 sm:px-8 md:px-8 lg:px-4">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-red-600 mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" /><span className="text-sm font-medium">Back to home</span>
        </Link>

        {/* Hero */}
        <div className="glass-apple-liquid mb-8"><div className="glass-apple-liquid-inner p-6 sm:p-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-red-600 mb-3">Contact</h1>
          <p className="text-gray-600 text-base">Use the channels below for support, collaboration, press briefs, and course-related queries.</p>
        </div></div>

        {/* Contact Channels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {contactChannels.map((ch) => (
            <div key={ch.title} className="glass-apple-liquid"><div className="glass-apple-liquid-inner p-5 sm:p-6 flex flex-col h-full">
              <ch.icon className="h-5 w-5 text-red-500 mb-3" />
              <h3 className="text-base font-bold text-gray-900 mb-1">{ch.title}</h3>
              <p className="text-sm text-gray-500 mb-4">{ch.desc}</p>
              <a href={ch.href} target={ch.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="mt-auto w-full py-2.5 rounded-xl text-sm font-medium border border-gray-200 bg-white/70 text-gray-700 hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                Open <ArrowRight className="h-4 w-4" />
              </a>
            </div></div>
          ))}
        </div>

        {/* FAQ */}
        <div className="glass-apple-liquid mb-8"><div className="glass-apple-liquid-inner p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-4">
            <MessageCircle className="h-5 w-5 text-red-500" />
            <h2 className="text-xl font-bold text-red-600">FAQ</h2>
          </div>
          {faqs.map((faq, i) => (
            <div key={i} className="border-t border-gray-200/60">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between py-4 text-left">
                <span className="font-semibold text-gray-900 text-sm sm:text-base">{faq.q}</span>
                {openFaq === i ? <ChevronUp className="h-5 w-5 text-gray-500 shrink-0" /> : <ChevronDown className="h-5 w-5 text-gray-500 shrink-0" />}
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} className="overflow-hidden">
                    <p className="text-sm text-gray-600 pb-4">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div></div>

        {/* Useful Pages */}
        <div className="glass-apple-liquid"><div className="glass-apple-liquid-inner p-6 sm:p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Useful pages</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {usefulPages.map((page) => (
              <Link key={page.title} href={page.href} className="flex items-center justify-between border border-white/50 rounded-xl p-4 bg-white/40 backdrop-blur-sm hover:bg-white/60 transition-colors">
                <span className="text-sm font-medium text-gray-700">{page.title}</span>
                <ArrowRight className="h-4 w-4 text-gray-400" />
              </Link>
            ))}
          </div>
        </div></div>
      </section>
    </div>
  );
}
