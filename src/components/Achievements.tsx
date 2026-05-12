"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ACHIEVEMENTS = [
  {
    title: "Gold Medalist • B.Tech CSE",
    issuer: "JIET Universe, Jodhpur",
    description: "Awarded the Gold Medal and 'Course Topper' recognition for securing the highest academic performance with a 9.2 CGPA in B.Tech CSE (AI & ML) during the 2023-24 session.",
    date: "2024",
    image: "/certificate1.png",
  },
  {
    title: "Machine Learning Specialization",
    issuer: "Stanford University • DeepLearning.AI",
    description: "Mastered core AI concepts including supervised learning (linear regression, neural networks), unsupervised learning (clustering, anomaly detection), and reinforcement learning. Gained hands-on experience in building and deploying intelligent systems using real-world data.",
    date: "2025",
    image: "/certificate2.png",
  },
  {
    title: "Data Structures using C",
    issuer: "SWAYAM • CSVTU & IGNOU",
    description: "National-level certification program focused on core programming fundamentals, algorithmic problem-solving, and efficient data structure implementation through a rigorous proctored curriculum.",
    date: "2024",
    image: "/certificate3.png",
  },
  {
    title: "Big Data & Hadoop Architecture",
    issuer: "Simplilearn SkillUp",
    description: "Mastered the fundamentals of the Hadoop ecosystem, including distributed data management and HDFS. Gained practical insights into processing massive datasets and building scalable big data workflows.",
    date: "2026",
    image: "/certificate4.png",
  },
];

export default function Achievements() {
  const scrollRef = useRef(null);
  const isInView = useInView(scrollRef, { amount: 0.1 });

  return (
    <section className="relative z-20 bg-[#0a0a0a] py-32 overflow-hidden" id="achievements" ref={scrollRef}>
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 mb-16 text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
        >
          Professional <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400">Achievements</span>
        </motion.h2>
        <p className="text-gray-400 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          A showcase of my certifications, academic milestones, and professional recognitions.
        </p>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="flex w-max">
          <motion.div
            className="flex gap-8 px-4"
            animate={isInView ? { x: "-50%" } : { x: "0%" }}
            transition={{
              duration: 35,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {[...ACHIEVEMENTS, ...ACHIEVEMENTS].map((item, index) => (
              <div
                key={index}
                className="w-[350px] md:w-[500px] group rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm shrink-0 overflow-hidden"
              >
                {/* Certificate Preview */}
                <div className="w-full bg-black/40 overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-auto block opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-transparent to-transparent pointer-events-none" />
                </div>

                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-white font-bold text-xl mb-1 group-hover:text-blue-400 transition-colors">{item.title}</h4>
                      <p className="text-sm text-blue-500 font-mono uppercase tracking-wider">{item.issuer}</p>
                    </div>
                    <span className="text-gray-500 font-mono text-sm">{item.date}</span>
                  </div>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
