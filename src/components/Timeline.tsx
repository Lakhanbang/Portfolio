"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const TIMELINE_DATA = [
  {
    year: "2023 - 2027",
    title: "Beginning of My Tech Journey",
    org: "JIET University, Jodhpur",
    description: "Started B.Tech in Artificial Intelligence & Machine Learning at JIET University, Jodhpur. Focusing on building a strong foundation in core computer science and advanced AI concepts.",
    tags: ["B.Tech AIML", "JIET University", "CGPA: 9.47"],
    type: "education"
  },
  {
    year: "2024",
    title: "First Major Achievement",
    org: "JIET Universe",
    description: "Recognized as the First-Year Course Topper and awarded a Gold Medal for Academic Excellence. Achieved a 9.2+ CGPA during the first year and maintained consistent academic performance throughout the program.",
    tags: ["Gold Medalist", "Course Topper", "Academic Excellence"],
    type: "milestone"
  },
  {
    year: "2024",
    title: "Transition into AI & Machine Learning",
    org: "Self-Directed Learning",
    description: "Started exploring Machine Learning, NLP, and Generative AI through practical projects and online specializations from Stanford and Coursera. Developed an interest in building real-world AI systems.",
    tags: ["Machine Learning", "NLP", "Generative AI", "Stanford"],
    type: "milestone"
  },
  {
    year: "2025",
    title: "AI & Generative AI Internship",
    org: "YBI Foundation",
    description: "Worked on an LLM-powered herbal recommendation platform integrating conversational AI, intelligent search, and scalable backend systems. Optimized NLP-based disease matching for healthcare.",
    tags: ["Internship", "LLM Apps", "Node.js", "AI Healthcare"],
    type: "work"
  },
  {
    year: "2025 - 2026",
    title: "Developing AI-Powered Platforms",
    org: "Innovation Lab",
    description: "Built multiple AI-driven systems including a Doctor Copilot, multi-agent research automation system, and crime analytics dashboard using AI, APIs, and data visualization.",
    tags: ["SaaS Platform", "Multi-Agent AI", "Visualization", "Full Stack AI"],
    type: "work"
  }
];


export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative z-20 bg-[#0a0a0a] min-h-screen py-32 px-4 md:px-12 overflow-hidden" id="journey">
       {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[20%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
             My <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400">Journey</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            A chronological look at my academic excellence, professional growth, and specialized training in AI.
          </p>
        </motion.div>

        <div ref={containerRef} className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-linear-to-b from-blue-500/20 via-purple-500/50 to-blue-500/20 transform md:-translate-x-1/2" />

          <div className="space-y-12">
            {TIMELINE_DATA.map((item, index) => (
              <TimelineItem key={index} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ item, index }: { item: any; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative flex items-center ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Spacer for desktop layout */}
      <div className="hidden md:block w-1/2" />

      {/* Point on Line */}
      <div className="absolute left-[20px] md:left-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-[#121212] transform -translate-x-1/2 z-10 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
         <div className="absolute inset-0 bg-blue-400 blur-sm opacity-70" />
      </div>

      {/* Content Card */}
      <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"}`}>
        <div className="group relative p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-colors duration-300">
          <div className={`flex flex-col ${isEven ? "md:items-end" : "md:items-start"} mb-2`}>
             <span className="text-xs text-blue-400 font-mono border border-blue-500/30 px-2 py-1 rounded-full bg-blue-500/10 mb-2 w-fit">
              {item.year}
            </span>
            <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
              {item.title}
            </h3>
          </div>
          
          <p className="text-sm text-purple-300 mb-4 font-medium uppercase tracking-wider">
            {item.org}
          </p>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            {item.description}
          </p>

          {/* Tags */}
          <div className={`flex flex-wrap gap-2 ${isEven ? "md:justify-end" : "md:justify-start"}`}>
            {item.tags?.map((tag: string) => (
              <span key={tag} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold text-gray-300 uppercase tracking-tight">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
