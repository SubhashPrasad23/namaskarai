"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ChevronDown, ChevronUp, Mail, MessageCircle, Newspaper,  } from "lucide-react";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";

const contactChannels = [
  { icon: Mail, title: "Email", desc: "hello@namaskar.ai", href: "mailto:hello@namaskar.ai" },
  { icon: FaInstagram, title: "Instagram", desc: "@namaskar.ai", href: "https://instagram.com/namaskar.ai" },
  { icon: Newspaper, title: "Press & Collaboration", desc: "Media and collaboration brief", href: "/press" },
];

const faqs = [
  { q: "How fast can I expect a reply?", a: "We typically respond within 24–48 hours on weekdays. For urgent press queries, mention 'URGENT' in the subject line." },
  { q: "How should I send a collaboration pitch?", a: "Email hello@namaskar.ai with your idea, audience size, and preferred format (guest post, interview, or workshop). We review all pitches within a week." },
  { q: "Where should I send course-related questions?", a: "Use the same email hello@namaskar.ai with subject 'Course Query'. Include your name and the course you are interested in." },
];

const usefulPages = [
  { title: "Editorial Policy"},
  { title: "About"},
];

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="flex flex-col min-h-screen py-8 sm:py-10">
      <section className="mx-auto w-full md:max-w-5/6 px-4 sm:px-8 md:px-8 lg:px-4">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-red-600 mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" /><span className="text-sm font-medium">Back to home</span>
        </Link>

        {/* Hero */}
        <div className="glass-video-card mb-8">
          <div className="glass-video-card p-5!">
          <h1 className="mb-1 text-xl sm:text-2xl font-bold text-red-600">Contact</h1>
          <p className="text-gray-600 text-sm">Use the channels below for support, collaboration, press briefs, and course-related queries.</p>
        </div>
        </div>

        {/* Contact Channels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8 glass-video-card p-5!">
          {contactChannels.map((ch) => (
            <div key={ch.title} className="glass-apple-liquid-inner">
              <div className=" p-5 sm:p-6 flex flex-col items-center md:items-start h-full">
              <ch.icon className="h-5 md:w-5 md:h-4 w-4 text-red-500 mb-3" />
              <h3 className="text-sm font-bold text-gray-900 mb-1">{ch.title}</h3>
              <p className="text-xs text-gray-500 mb-4">{ch.desc}</p>
              <a href={ch.href} target={ch.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="mt-auto w-full py-2.5 rounded-xl text-sm font-medium border border-gray-200 bg-white/70 text-gray-700 hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                Open <ArrowRight className="h-4 w-4" />
              </a>
            </div></div>
          ))}
        </div>

        {/* FAQ */}
        <div className="glass-video-card mb-8">
          <div className=" glass-video-card p-5!">
          <div className="flex items-center gap-2 mb-4">
            <MessageCircle className="md:h-4 md:w-4 h-3 w-3 text-red-500" />
            <h2 className="text-sm font-semibold text-red-600">FAQ</h2>
          </div>
          {faqs.map((faq, i) => (
            <div key={i} className=" glass-apple-liquid-inner py-2!">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
               className="w-full py-1 flex items-center justify-between  text-left">
                <span className="font-medium md:text-sm text-xs">{faq.q}</span>
                {openFaq === i ? <ChevronUp className="h-5 w-5 text-gray-500 shrink-0" /> : <ChevronDown className="h-5 w-5 text-gray-500 shrink-0" />}
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} className="overflow-hidden">
                    <p className="text-xs text-gray-600 pb-4">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div></div>

        {/* Useful Pages */}
        <div className="glass-video-card">
          <div className="glass-video-card p-5!">
          <h2 className=" mb-4 text-sm font-semibold text-red-600">Useful pages</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {usefulPages.map((page) => (
              <Link key={page.title} href="" className="flex items-center justify-between border border-white/50 rounded-xl glass-apple-liquid-inner">
                <span className="text-xs font-medium ">{page.title}</span>
                <ArrowRight className="h-4 w-4 " />
              </Link>
            ))}
          </div>
        </div></div>
      </section>
    </div>
  );
}
