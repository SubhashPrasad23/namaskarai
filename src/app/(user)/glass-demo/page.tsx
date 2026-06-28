"use client";

import { motion } from "framer-motion";
import { Sparkles, Cpu, Layers, Zap, BookOpen, Brain, ArrowRight } from "lucide-react";

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, delay, ease: "easeOut" }}>
      {children}
    </motion.div>
  );
}

function LiquidCard({ children, tint, className = "", innerClassName = "" }: { children: React.ReactNode; tint?: "red" | "blue" | "purple" | "amber"; className?: string; innerClassName?: string }) {
  return (
    <div className={`glass-apple-liquid ${tint ? `tint-${tint}` : ""} ${className}`}>
      <div className={`glass-apple-liquid-inner ${innerClassName}`}>{children}</div>
    </div>
  );
}

const demoCards = [
  { icon: <Sparkles className="h-7 w-7 text-red-500" />, title: "Prompt Packs", desc: "Curated prompts for every need.", tint: undefined as "red" | "blue" | "purple" | "amber" | undefined },
  { icon: <Brain className="h-7 w-7 text-indigo-500" />, title: "AI Learning", desc: "Step-by-step AI courses.", tint: "purple" as const },
  { icon: <Zap className="h-7 w-7 text-amber-500" />, title: "Smart Tools", desc: "AI-powered daily tools.", tint: "red" as const },
  { icon: <Layers className="h-7 w-7 text-blue-500" />, title: "Career Growth", desc: "CV builders and roadmaps.", tint: "blue" as const },
];

export default function GlassDemoPage() {
  return (
    <div className="flex flex-col overflow-x-hidden md:max-w-5/6 mx-auto px-4 sm:px-8 lg:px-4 py-16">
      <section className="text-center mb-16">
        <Reveal>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            Glass <span className="text-red-600">Cards</span>
          </h1>
          <p className="mt-4 text-lg text-slate-500 max-w-xl mx-auto">
            Clean frosted blur glass with subtle border, soft shadows, and padding.
          </p>
        </Reveal>
      </section>

      <section className="mb-16">
        <Reveal><h2 className="text-2xl font-bold text-slate-900 mb-6">Cards</h2></Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {demoCards.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.1}>
              <LiquidCard tint={card.tint} className="group cursor-pointer">
                <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/70 border border-white/50 shadow-sm">{card.icon}</div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">{card.title}</h3>
                <p className="text-slate-600 text-sm">{card.desc}</p>
                <div className="mt-4 inline-flex items-center gap-2 text-red-600 text-sm font-semibold group-hover:gap-3 transition-all">Explore <ArrowRight className="h-4 w-4" /></div>
              </LiquidCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <Reveal><h2 className="text-2xl font-bold text-slate-900 mb-6">Feature Card</h2></Reveal>
        <Reveal delay={0.1}>
          <LiquidCard innerClassName="p-10 sm:p-14 text-center">
            <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-red-500 to-red-700 shadow-lg shadow-red-500/30">
              <Cpu className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">AI-Powered Learning</h3>
            <p className="text-slate-600 max-w-lg mx-auto">Frosted glass with blur, soft elevation, no animations — clean and minimal.</p>
          </LiquidCard>
        </Reveal>
      </section>

      <section className="mb-16">
        <Reveal><h2 className="text-2xl font-bold text-slate-900 mb-6">Stats</h2></Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            { icon: <BookOpen className="h-6 w-6 text-emerald-600" />, title: "Guides", value: "120+" },
            { icon: <Brain className="h-6 w-6 text-violet-600" />, title: "Prompts", value: "500+" },
            { icon: <Zap className="h-6 w-6 text-amber-600" />, title: "Tools", value: "45+" },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 0.1}>
              <LiquidCard innerClassName="p-6 text-center">
                <div className="mb-3 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/70 border border-white/50">{item.icon}</div>
                <p className="text-2xl font-extrabold text-slate-900">{item.value}</p>
                <p className="text-sm text-slate-500 mt-1">{item.title}</p>
              </LiquidCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <Reveal>
          <LiquidCard tint="purple" innerClassName="p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-3">💡 Usage</h3>
            <div className="bg-slate-900/90 rounded-xl p-4 text-sm font-mono text-slate-200 overflow-x-auto">
              <pre>{`<div class="glass-apple-liquid tint-red">
  <div class="glass-apple-liquid-inner p-6">
    <h3>Title</h3>
    <p>Content</p>
  </div>
</div>`}</pre>
            </div>
          </LiquidCard>
        </Reveal>
      </section>
    </div>
  );
}
