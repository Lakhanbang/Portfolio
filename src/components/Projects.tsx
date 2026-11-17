"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { projects } from "@/data/projects";
import dynamic from "next/dynamic";
const ProjectDetails = dynamic(() => import("./projects/ProjectDetails"), { ssr: false, loading: () => <div className="fixed inset-0 z-[110] grid place-items-center bg-black/95 text-white" role="status">Loading project...</div> });

const INITIAL_VISIBLE_COUNT = 3;

export default function Projects() {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

    const selectedProject = projects.find((p) => p.id === selectedId);
    const visibleProjects = projects.slice(0, visibleCount);
    const hasMore = visibleCount < projects.length;

    return (
        <section className="relative z-20 bg-[#0a0a0a] min-h-screen py-32 px-4 md:px-12 overflow-hidden" id="projects">
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
                    className="mb-24"
                >
                    <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                        Selected <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400">Works</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
                        A curated selection of projects demonstrating full-stack capabilities,
                        microservices architecture, and modern interface design.
                    </p>
                </motion.div>

                {/* Grid View */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {visibleProjects.map((project) => (
                            <motion.div
                                key={project.id}
                                layoutId={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                whileHover={{
                                    y: -15,
                                    scale: 1.02,
                                    transition: { duration: 0.4, ease: "easeOut" }
                                }}
                                className="group relative flex flex-col bg-[#0f0f0f] rounded-[48px] border border-white/10 p-10 h-full transition-all duration-500 hover:bg-[#151515] cursor-target overflow-hidden shadow-2xl"
                            >
                                {/* Outer Ambient Glow - Radiates from behind the card */}
                                <div className={`absolute -inset-4 ${project.glowColor} opacity-0 group-hover:opacity-20 blur-[100px] transition-opacity duration-700 -z-10`} />

                                {/* Inner Floating Glow Accent */}
                                <div className={`absolute -top-24 -right-24 w-48 h-48 ${project.glowColor} rounded-full blur-[80px] opacity-10 group-hover:opacity-30 transition-opacity duration-700`} />

                                {/* Header Info */}
                                <div className="flex justify-between items-start mb-12">
                                    <div className={`w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 group-hover:text-white group-hover:scale-110 transition-all duration-500 ${project.accent.iconHover}`}>
                                        {project.icon}
                                    </div>
                                    <div className={`px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-[10px] font-black tracking-widest uppercase ${project.accent.text}`}>
                                        {project.tag}
                                    </div>
                                </div>

                                {/* Title & Subtitle */}
                                <div className="mb-8">
                                    <p className={`text-[10px] font-black tracking-[0.3em] uppercase mb-3 ${project.accent.text} opacity-80`}>
                                        {project.category}
                                    </p>
                                    <h3 className={`text-4xl md:text-5xl font-black mb-6 tracking-tighter transition-all duration-500 bg-linear-to-r from-white via-white ${project.accent.gradient} bg-clip-text text-transparent italic`}>
                                        {project.title}
                                    </h3>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.subtitle.split('->').map((s, i) => (
                                            <span key={i} className={`text-[9px] font-black tracking-widest uppercase px-2 py-1 rounded-md bg-white/5 border border-white/5 ${project.accent.text}`}>
                                                {s.trim()}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-gray-400 text-[15px] leading-relaxed mb-10 flex-grow group-hover:text-gray-200 transition-colors font-medium">
                                    {project.description}
                                </p>

                                {/* Key Features Block - Blueish Glass Background */}
                                <div className={`rounded-[32px] p-8 border relative overflow-hidden mb-12 transition-all duration-500 border-white/5 group-hover:border-blue-500/30 shadow-2xl bg-blue-950/20 group-hover:bg-[#0a1120]`}>
                                    <div className={`absolute top-0 left-0 w-2 h-full ${project.glowColor} opacity-50 group-hover:opacity-100 transition-opacity`} />

                                    <h4 className={`text-[11px] font-black tracking-[0.3em] uppercase mb-6 relative z-10 flex items-center gap-2 ${project.accent.text}`}>
                                        <div className={`w-2.5 h-2.5 rounded-full ${project.glowColor} animate-pulse shadow-[0_0_10px_currentColor]`} />
                                        {project.highlightsCategory}
                                    </h4>
                                    <div className="space-y-4 relative z-10">
                                        {(project.highlights as string[])?.map((highlight) => (
                                            <div
                                                key={highlight}
                                                className="flex items-center gap-3 text-sm text-gray-300 font-bold group-hover:text-white transition-colors"
                                            >
                                                <svg className={`w-5 h-5 ${project.accent.text} opacity-70 group-hover:opacity-100`} fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-8 9z" />
                                                </svg>
                                                {highlight}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* CTAs - Colorful Button */}
                                <div className="pt-8 border-t border-white/5 flex items-center justify-between gap-4">
                                    <button
                                        onClick={() => setSelectedId(project.id)}
                                        className={`flex-1 py-4 rounded-2xl font-black text-xs tracking-[0.3em] uppercase transition-all duration-500 relative overflow-hidden group/btn flex items-center justify-center gap-3 border border-white/10 shadow-lg ${project.accent.background} hover:bg-white text-white hover:text-black`}
                                    >
                                        <div className={`absolute inset-0 ${project.glowColor} opacity-0 group-hover/btn:opacity-40 transition-opacity`} />
                                        <span className="relative z-10">VIEW PROJECT</span>
                                        <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                    {project.repo && project.repo !== "#" && <a
                                        href={project.repo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`w-14 h-14 rounded-2xl border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-500 hover:scale-110 ${project.accent.background} hover:bg-white/10`}
                                    >
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" /></svg>
                                    </a>}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Pagination Controls */}
                <motion.div layout className="flex justify-center mt-20">
                    {hasMore ? (
                        <button
                            onClick={() => setVisibleCount(prev => prev + 3)}
                            className="px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors"
                        >
                            View More Projects
                        </button>
                    ) : projects.length > INITIAL_VISIBLE_COUNT && (
                        <button
                            onClick={() => setVisibleCount(INITIAL_VISIBLE_COUNT)}
                            className="px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors"
                        >
                            Show Less
                        </button>
                    )}
                </motion.div>

                {/* Detailed Modal View */}
                <AnimatePresence>
                    {selectedId && selectedProject && (
                        <ProjectDetails key={selectedProject.id} selectedProject={selectedProject} onClose={() => setSelectedId(null)} />
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
