"use client";

import { motion } from "framer-motion";

const skills = [
  { category: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Vite"] },
  { category: "Backend & Infra", items: ["Node.js", "FastAPI", "Vercel", "Render", "Streamlit", "PostgreSQL", "GeoJSON", "MySQL", "GitHub"] },
  { category: "AI / ML", items: ["Python", "LangChain", "Plotly", "Hugging Face", "DuckDuckGo API", "LLM Integration"] },
];

export default function Skills() {
  return (
    <section className="relative z-20 bg-[#0a0a0a] min-h-screen py-32 px-4 md:px-12 overflow-hidden" id="skills">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Technical <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400">Arsenal</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
            A comprehensive stack enabling end-to-end development of scalable applications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skills.map((group, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{
                y: -10,
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(59, 130, 246, 0.15)",
                borderColor: "rgba(255, 255, 255, 0.2)"
              }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 rounded-3xl bg-white/[0.07] border border-white/10 transition-all duration-300 group relative"
            >
              <h3 className="text-2xl font-bold text-blue-300 mb-6 uppercase tracking-wider group-hover:text-blue-200 transition-colors">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {group.items.map((skill, sIdx) => (
                  <motion.span
                    key={sIdx}
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                    className="px-4 py-2 bg-white/5 rounded-full text-sm text-gray-400 border border-white/5 hover:text-white hover:border-blue-500/30 transition-all cursor-default relative overflow-hidden"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>

              {/* Subtle Ambient Glow inside the box */}
              <div className="absolute -inset-px bg-linear-to-r from-blue-500/0 via-blue-500/10 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
