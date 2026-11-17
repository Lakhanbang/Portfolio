"use client";
import PortfolioImage from "@/components/PortfolioImage";
import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";
import { CopyButton, SlidingImageBox, ArchitectureDiagram } from "./SubComponents";

export default function ProjectDetails({ selectedProject, onClose }: { selectedProject: Project; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const focused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab") return;
      const controls = dialogRef.current?.querySelectorAll<HTMLElement>('button, a[href], input, select, textarea, [tabindex="0"]');
      if (!controls?.length) return;
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      focused?.focus();
    };
  }, [onClose]);
  return createPortal(<>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => onClose()}
                                className="fixed inset-0 bg-black/95 z-[100]"
                            />
                            <div ref={dialogRef} role="dialog" aria-modal="true" aria-label={`${selectedProject.title} project details`} className="fixed inset-0 z-[110] overflow-y-auto scrollbar-hide py-20 px-4 md:px-12 flex items-start justify-center">
                                <motion.div
                                    layoutId={selectedProject.id}
                                    className="w-full max-w-6xl bg-[#0a0a0a] rounded-[64px] border border-white/10 overflow-hidden relative shadow-[0_0_100px_rgba(0,0,0,1)]"
                                >
                                    <button
                                        onClick={() => onClose()}
                                        aria-label="Close project"
                                        autoFocus
                                        className="fixed top-28 right-8 z-[150] p-4 bg-white/5 hover:bg-white/10 rounded-2xl text-white/50 hover:text-white transition-all border border-white/10 group flex items-center gap-3 backdrop-blur-xl"
                                    >
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M6 18L18 6M6 6l12 12" /></svg>
                                        <span className="text-xs font-bold tracking-widest uppercase md:block hidden">Close</span>
                                    </button>

                                    {selectedProject.overview && selectedProject.images ? (
                                        <div className="flex flex-col">
                                            {/* SECTION 1: OVERVIEW */}
                                            <section className="relative min-h-[90vh] flex flex-col items-center justify-center p-8 md:p-24 text-center border-b border-white/5">
                                                <div className="absolute inset-0 opacity-20 pointer-events-none">
                                                    <div className="absolute inset-0 bg-linear-to-b from-blue-500/10 to-transparent" />
                                                    {!selectedProject.internship && <PortfolioImage src={selectedProject.images?.overview} className="w-full h-full object-cover blur-3xl scale-125" alt="" />}
                                                </div>

                                                <div className="relative z-10 max-w-4xl mx-auto overflow-hidden">
                                                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-12">
                                                        {selectedProject.tag}
                                                    </motion.div>

                                                    <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className={`${selectedProject.internship ? 'text-5xl sm:text-6xl md:text-7xl lg:text-8xl break-words' : 'text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl break-words'} font-black text-white mb-8 tracking-tighter leading-none uppercase italic`}>
                                                        {selectedProject.title}
                                                    </motion.h2>

                                                    <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-xl md:text-2xl text-blue-400/80 font-bold mb-16 tracking-tight leading-relaxed">
                                                        {selectedProject.tagline}
                                                    </motion.p>

                                                    <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }} className="overflow-hidden rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-xl mb-16 shadow-2xl" style={{ isolation: 'isolate' }}>
                                                        <PortfolioImage src={selectedProject.images?.overview} className="w-full h-auto block rounded-[inherit]" alt={`${selectedProject.title} overview`} />
                                                    </motion.div>

                                                    <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto font-medium">
                                                        {selectedProject.overview}
                                                    </motion.p>
                                                    {selectedProject.internship && (
                                                        <div className="mt-12 p-6 md:p-8 rounded-[32px] border border-blue-500/20 bg-blue-500/5 text-left">
                                                            <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">Internship at {selectedProject.internship.company}</p>
                                                            <p className="text-white font-bold text-lg mb-2">{selectedProject.internship.role}</p>
                                                            <p className="text-gray-400 text-sm mb-4">{selectedProject.internship.duration}</p>
                                                            <p className="text-gray-400 leading-relaxed">{selectedProject.internship.contribution}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </section>

                                            {/* SECTION 2: TECH STACK */}
                                            <section className="p-12 md:p-24 bg-[#0c0c0c] border-b border-white/5">
                                                <h4 className="text-[14px] font-black tracking-[0.8em] text-cyan-400 uppercase mb-24 text-center">Engineered Stack</h4>
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                                                    {selectedProject.techStackCategorized && Object.entries(selectedProject.techStackCategorized).map(([key, techs]) => (
                                                        <div key={key} className="p-6 rounded-[32px] bg-white/[0.02] border border-white/10 hover:border-blue-500/40 transition-all hover:-translate-y-1 group shadow-xl">
                                                            <div className="flex items-center gap-4 mb-8">
                                                                <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                                                                    {key === 'frontend' && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                                                                    {key === 'backend' && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 012 2v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4a2 2 0 012-2" /></svg>}
                                                                    {key === 'database' && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>}
                                                                    {['ai_ocr', 'ai'].includes(key) && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
                                                                    {key === 'deployment' && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>}
                                                                    {key === 'utilities' && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z" /><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                                                                </div>
                                                                <span className="text-xs font-black tracking-widest text-white uppercase">{key.replace('_', ' ')}</span>
                                                            </div>
                                                            <div className="flex flex-wrap gap-2.5">
                                                                {techs.map(t => (
                                                                    <span key={t} className="px-3.5 py-2 rounded-xl bg-black/40 border border-white/5 text-[10px] font-bold text-gray-400 group-hover:text-blue-300 transition-colors uppercase italic whitespace-nowrap">{t}</span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </section>

                                            {/* SECTION 3: KEY FEATURES */}
                                            <section className="p-12 md:p-24 bg-[#0a0a0a] border-b border-white/5">
                                                <div className="max-w-4xl mx-auto">
                                                    <h4 className="text-[14px] font-black tracking-[0.8em] text-cyan-400 uppercase mb-16 text-center">Key Features</h4>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                                                        {selectedProject.featuresList?.map((f) => (
                                                            <div key={f.title} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 group hover:bg-white/[0.04] transition-all">
                                                                <h5 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{f.title}</h5>
                                                                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    {selectedProject.images?.features && selectedProject.images.features.length > 0 && (
                                                        <div className="max-w-5xl mx-auto overflow-hidden rounded-[20px]">
                                                            {selectedProject.images.features.length === 1 ? (
                                                                <PortfolioImage src={selectedProject.images.features[0]} alt={`${selectedProject.title} agent execution and logs`} className="block w-full h-auto rounded-[20px] border border-white/10" />
                                                            ) : <SlidingImageBox images={selectedProject.images.features} />}
                                                        </div>
                                                    )}
                                                </div>
                                            </section>

                                            {/* SECTION 4: ARCHITECTURE */}
                                            <section className="p-12 md:p-24 bg-[#0c0c0c] border-b border-white/5 text-center">
                                                <div className="max-w-4xl mx-auto">
                                                    <h4 className="text-[14px] font-black tracking-[0.8em] text-cyan-400 uppercase mb-12">Architecture & Data Flow</h4>
                                                    <p className="text-3xl font-bold text-white mb-8 tracking-tight italic">{selectedProject.architecture?.principle}</p>
                                                    {selectedProject.architecture?.flow && <ArchitectureDiagram flow={selectedProject.architecture.flow} />}
                                                    <div className="my-10 h-px bg-white/10" />

                                                    <p className="text-lg text-gray-400 leading-relaxed mb-20">{selectedProject.architecture?.details}</p>
                                                    {selectedProject.images?.architecture && (
                                                        <div className="rounded-[32px] border border-white/10 overflow-hidden bg-black shadow-2xl" style={{ isolation: 'isolate' }}>
                                                            <PortfolioImage src={selectedProject.images.architecture} className={`w-full h-auto ${selectedProject.internship ? '' : 'opacity-80'} block rounded-[inherit]`} alt={`${selectedProject.title} architecture and data flow`} />
                                                        </div>
                                                    )}
                                                </div>
                                            </section>

                                            {/* SECTION 5: CHALLENGES */}
                                            <section className="p-12 md:p-24 bg-[#0a0a0a] border-b border-white/5">
                                                <div className="max-w-4xl mx-auto">
                                                    <h4 className="text-[14px] font-black tracking-[0.8em] text-cyan-400 uppercase mb-16 text-center">Challenges & Solutions</h4>
                                                    <div className="space-y-6">
                                                        {selectedProject.challenges?.map((c) => (
                                                            <div key={c.issue} className="p-10 rounded-[40px] bg-white/[0.01] border border-white/5 hover:bg-white/[0.03] transition-colors flex flex-col md:flex-row gap-10">
                                                                <div className="flex-1">
                                                                    <div className="text-red-500/50 text-[10px] font-black tracking-widest uppercase mb-4">Complexity</div>
                                                                    <p className="text-xl font-bold text-white tracking-tight">{c.issue}</p>
                                                                </div>
                                                                <div className="flex-1 md:border-l md:border-white/10 md:pl-10">
                                                                    <div className="text-emerald-500/50 text-[10px] font-black tracking-widest uppercase mb-4">Solution</div>
                                                                    <p className="text-gray-400 leading-relaxed">{c.solve}</p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </section>

                                            {selectedProject.results && (
                                                <section className="p-8 md:p-24 bg-[#0c0c0c] border-b border-white/5">
                                                    <div className="max-w-4xl mx-auto">
                                                        <h4 className="text-[14px] font-black tracking-[0.4em] md:tracking-[0.8em] text-cyan-400 uppercase mb-16 text-center">Results & Impact</h4>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                                                            {selectedProject.results.map(result => (
                                                                <div key={result.title} className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                                                                    <h5 className="text-lg text-white font-bold mb-3">{result.title}</h5>
                                                                    <p className="text-gray-400 text-sm leading-relaxed">{result.desc}</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                        {selectedProject.images?.results && <PortfolioImage src={selectedProject.images.results} alt="RFP Intelligence session telemetry showing cost, tokens, remaining budget, and generation time" className="block w-full h-auto rounded-[20px] border border-white/10" />}
                                                    </div>
                                                </section>
                                            )}

                                            {/* LIVE DEMO + LINKS */}
                                            {(selectedProject.presentation || (selectedProject.demo && selectedProject.demo !== "#") || (selectedProject.repo && selectedProject.repo !== "#")) && (
                                            <section className="p-12 md:p-32 bg-linear-to-t from-blue-500/10 to-[#0a0a0a] text-center">
                                                <div className="max-w-4xl mx-auto">
                                                    <h2 className={`${selectedProject.presentation ? 'text-4xl sm:text-5xl md:text-7xl' : 'text-6xl md:text-8xl'} font-black text-white mb-12 tracking-tighter italic`}>{selectedProject.presentation ? 'PROJECT PRESENTATION' : 'LIVE DEMO'}</h2>
                                                    <p className="text-lg text-gray-400 mb-16">{selectedProject.presentation ? 'Explore the project presentation and GitHub repository. The company live website is not shared under company policy.' : 'Live site, GitHub repo, and demo credentials are available below.'}</p>

                                                    <div className="flex flex-wrap justify-center gap-6 mb-24">
                                                        {selectedProject.presentation ? <a href={selectedProject.presentation} target="_blank" rel="noopener noreferrer" className="px-8 md:px-12 py-6 rounded-3xl bg-blue-500 text-white font-black tracking-widest uppercase hover:bg-blue-400 transition-all shadow-[0_0_50px_rgba(59,130,246,0.3)]">PRESENTATION</a> : selectedProject.demo && selectedProject.demo !== "#" && <a href={selectedProject.demo} target="_blank" rel="noopener noreferrer" className="px-12 py-6 rounded-3xl bg-blue-500 text-white font-black tracking-widest uppercase hover:bg-blue-400 transition-all shadow-[0_0_50px_rgba(59,130,246,0.3)]">VISIT LIVE SITE</a>}
                                                        {selectedProject.repo && selectedProject.repo !== "#" && <a href={selectedProject.repo} target="_blank" rel="noopener noreferrer" className="px-12 py-6 rounded-3xl bg-white/5 border border-white/10 text-white font-black tracking-widest uppercase hover:bg-white/10 transition-all">REPOSITORY</a>}
                                                    </div>

                                                    {selectedProject.credentials && (
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                                                            <div className="p-10 rounded-[40px] bg-black/60 border border-white/10 backdrop-blur-3xl">
                                                                <h5 className="text-blue-400 text-xs font-black tracking-[0.2em] uppercase mb-8 flex items-center gap-3">
                                                                    <div className="w-1.5 h-3 bg-blue-500 rounded-full" /> Patient Access
                                                                </h5>
                                                                <div className="space-y-6">
                                                                    <div className="flex justify-between items-center"><span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">ID</span> <div className="flex items-center gap-4"><code className="text-white">{selectedProject.credentials.patient.id}</code> <CopyButton text={selectedProject.credentials.patient.id} /></div></div>
                                                                    <div className="flex justify-between items-center"><span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">PWD</span> <div className="flex items-center gap-4"><code className="text-white">{selectedProject.credentials.patient.pass}</code> <CopyButton text={selectedProject.credentials.patient.pass} /></div></div>
                                                                </div>
                                                            </div>
                                                            <div className="p-10 rounded-[40px] bg-black/60 border border-white/10 backdrop-blur-3xl">
                                                                <h5 className="text-purple-400 text-xs font-black tracking-[0.2em] uppercase mb-8 flex items-center gap-3">
                                                                    <div className="w-1.5 h-3 bg-purple-500 rounded-full" /> Doctor Access
                                                                </h5>
                                                                <div className="space-y-6">
                                                                    <div className="flex justify-between items-center"><span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">ID</span> <div className="flex items-center gap-4"><code className="text-white">{selectedProject.credentials.doctor.id}</code> <CopyButton text={selectedProject.credentials.doctor.id} /></div></div>
                                                                    <div className="flex justify-between items-center"><span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">PWD</span> <div className="flex items-center gap-4"><code className="text-white">{selectedProject.credentials.doctor.pass}</code> <CopyButton text={selectedProject.credentials.doctor.pass} /></div></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </section>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="max-w-4xl mx-auto p-8 md:p-16 bg-[#111111] rounded-4xl border border-white/10 shadow-2xl overflow-hidden relative">
                                            <div className="max-w-3xl mx-auto">
                                                <span className="text-xs font-bold tracking-[0.2em] text-blue-500 uppercase mb-4 block">
                                                    {selectedProject.tag}
                                                </span>
                                                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                                                    <h3 className="text-5xl md:text-7xl font-bold text-white tracking-tighter">
                                                        {selectedProject.title}
                                                    </h3>
                                                    <div className="flex gap-4">
                                                        <a href={selectedProject.repo} target="_blank" rel="noopener noreferrer" className="p-4 rounded-2xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
                                                        </a>
                                                        {selectedProject.demo !== "#" && (
                                                            <a href={selectedProject.demo} target="_blank" rel="noopener noreferrer" className="px-6 py-4 rounded-2xl bg-white text-black font-bold text-sm hover:bg-gray-200 transition-colors">
                                                                Live
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Info Section */}
                                                <div className="mb-24">
                                                    <p className="text-xl text-gray-400 leading-relaxed mb-12">
                                                        {selectedProject.longDescription || selectedProject.description}
                                                    </p>
                                                </div>

                                                {/* Details Grid */}
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
                                                    <div>
                                                        <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.4em] mb-10">Stack</h4>
                                                        <div className="flex flex-wrap gap-2.5">
                                                            {selectedProject.techStack.map(tech => (
                                                                <span key={tech} className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/5 text-[11px] font-bold text-gray-300 tracking-wider transition-all hover:bg-white/10 hover:text-white hover:-translate-y-0.5">{tech}</span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.4em] mb-10">{selectedProject.highlightsCategory}</h4>
                                                        <ul className="space-y-4">
                                                            {selectedProject.highlights.map(h => (
                                                                <li key={h} className="text-gray-400 text-sm font-medium flex items-center gap-4 group/li">
                                                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)] group-hover/li:scale-150 transition-transform" />
                                                                    {h}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>

                                                {/* Source Link */}
                                                <div className="flex gap-4 pt-12 border-t border-white/10">
                                                    <a
                                                        href={selectedProject.repo}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex-1 py-5 rounded-2xl bg-white text-black font-bold text-center hover:bg-gray-200 transition-colors flex items-center justify-center gap-3"
                                                    >
                                                        SOURCE CODE
                                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            </div>
  </>, document.body);
}
