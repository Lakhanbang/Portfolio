"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

const CopyButton = ({ text }: { text: string }) => {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    return (
        <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
        >
            {copied ? (
                <svg className="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M5 13l4 4L19 7" /></svg>
            ) : (
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2" /></svg>
            )}
            {copied ? "COPIED" : "COPY"}
        </button>
    );
};

const SlidingImageBox = ({ images }: { images: string[] }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="relative w-full rounded-[20px] overflow-hidden border border-white/10 bg-black/40 group mt-12" style={{ isolation: 'isolate', WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}>
            <AnimatePresence mode="wait">
                <motion.img
                    key={images[index]}
                    src={images[index]}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="w-full h-auto block rounded-[20px]"
                />
            </AnimatePresence>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {images.map((_, i) => (
                    <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${i === index ? 'bg-blue-400 w-4' : 'bg-white/20'}`} />
                ))}
            </div>
        </div>
    );
};

const ArchitectureDiagram = ({ flow }: { flow: any[] }) => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-12 px-8 bg-white/[0.02] rounded-[40px] border border-white/10 relative overflow-hidden mb-12" style={{ isolation: 'isolate' }}>
        {(flow || []).map((item, index) => (
            <div key={item.step} className="flex flex-col items-center text-center relative z-10 px-2">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-black mb-4 text-xl">
                    {index + 1}
                </div>
                <h5 className="text-white font-black text-sm mb-2 uppercase tracking-[0.2em]">{item.step}</h5>
                <p className="text-gray-400 text-sm leading-relaxed font-medium">{item.desc}</p>
            </div>
        ))}
    </div>
);

// Project Data
const projects = [
    {
        id: "doctor-copilot",
        title: "Doctor Copilot",
        tagline: "An AI-powered healthcare platform that turns raw medical reports into structured health intelligence — for patients, doctors, and admins.",
        category: "Full-Stack Healthcare Intelligence",
        tag: "CORE PLATFORM",
        subtitle: "UPLOAD -> STRUCTURED -> REUSE",
        description: "An AI-powered healthcare platform that turns raw medical reports into structured health intelligence.",
        overview: "Patients upload medical reports but rarely understand them. Doctors spend time re-reading scattered data with no historical context. DoctorCopilot solves this by extracting structured health data from uploaded reports once, storing it in a database, and reusing that data across patient dashboards, doctor case reviews, trend charts, and consultation workflows.",
        techStackCategorized: {
            frontend: ["React", "Vite", "Tailwind CSS", "Framer Motion", "SWR"],
            backend: ["FastAPI", "Async SQLAlchemy", "JWT Auth", "WebSockets"],
            database: ["Supabase PostgreSQL", "Supabase Storage"],
            ai_ocr: ["PDF parsing", "Parameter extraction", "Insight generation"],
            deployment: ["Vercel (Frontend)", "Railway (Backend)", "Supabase (DB + Storage)"]
        },
        techStack: ["React", "FastAPI", "Supabase", "AI OCR", "WebSockets"],
        highlightsCategory: "KEY FEATURES",
        highlights: ["AI Health Dashboard", "Parameter Breakdown", "Trends Graph", "Live Case Chat"],
        featuresList: [
            { title: "AI Health Dashboard", desc: "System integrity score, signal stream, and subsystem health scores" },
            { title: "Parameter Breakdown", desc: "Tracks 12+ lab values with trend direction and anomaly flags" },
            { title: "Trends Graph", desc: "Historical parameter chart plotted across all uploaded reports" },
            { title: "Consultation Insights", desc: "Doctor-side read-only AI findings and anomaly panel" },
            { title: "Live Case Chat", desc: "WebSocket-based doctor-patient messaging linked to each consultation case" },
            { title: "Live Demo", desc: "Open demo credentials available for both patient and doctor portals" }
        ],
        architecture: {
            principle: "The core principle is: Process once, Reuse everywhere.",
            flow: [
                { step: "Patient Board", desc: "Reports, trends, insights, exports" },
                { step: "Doctor Board", desc: "Pending cases, overview, reports" },
                { step: "Case Insights", desc: "Read-only patient intelligence from trends" },
                { step: "Workflow Layer", desc: "Chat + appointments around case record" }
            ],
            details: "Upload → OCR + Parameter Extraction → Store in Database → Reuse across all dashboards, doctor views, trends, and exports. AI processing happens only at upload time. All later views read from stored data — no repeated AI calls."
        },
        challenges: [
            { issue: "Avoiding repeated AI calls", solve: "Solved by processing reports once at upload and storing all extracted values for reuse across every view." },
            { issue: "Role-based access across 3 portals", solve: "Solved with JWT authentication and route-level role protection for patient, doctor, and admin." },
            { issue: "Live doctor-patient chat", solve: "Implemented with WebSockets scoped per consultation case." }
        ],
        credentials: {
            patient: { id: "P-10005", pass: "demo2205" },
            doctor: { id: "D-10001", pass: "demo123" }
        },
        images: {
            overview: "/doctor-overview.webp.png",
            features: ["/doctor-features-1.webp.png", "/doctor-features-2.webp.png"],
            architecture: "/doctor-credentials.webp.png"
        },
        repo: "https://github.com/Lakhanbang/Doctorcopilotfinal",
        demo: "https://www.doctorcopilot.app",
        color: "from-blue-600/20 to-cyan-500/20",
        glowColor: "bg-blue-500/20",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                <path d="M12 5v14M5 12h14" />
            </svg>
        )
    },
    {
        id: "crime-analyst",
        title: "Crime Analyst",
        category: "Data Science • Web App",
        tag: "SUPPORTING MODULE",
        subtitle: "FORECASTING -> PATTERN ANALYSIS -> GEO-MAPPING",
        description: "A concepts-led accessibility system focused on helping users read, orient, and process information with more comfort and less cognitive friction.",
        longDescription: "A comprehensive dashboard for visualizing and predicting crime trends using historical data. Built to help authorities and citizens understand safety patterns through interactive mapping.",
        techStack: ["React 19", "Flask", "Python", "GeoJSON"],
        highlightsCategory: "EXPERIENCE CUES",
        highlights: ["Readable hierarchy", "Guided comprehension", "Inclusive visual rhythm"],
        repo: "https://github.com/Lakhanbang/Crime-Analyst",
        demo: "#",
        color: "from-purple-600/20 to-pink-500/20",
        glowColor: "bg-purple-500/20",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
        )
    },
    {
        id: "ai-herbalist",
        title: "Vatika AI Herbalist",
        tagline: "A conversational herbal wellness platform that brings traditional plant medicine into the modern age — powered by Gemini AI.",
        category: "AI • Herbal Wellness",
        tag: "WEB PLATFORM",
        subtitle: "HERB-ID -> REMEDIES -> PLANTING GUIDE",
        description: "An AI-powered herbal wellness web application that helps users explore medicinal herbs, discover natural remedies, and receive personalized health assessments.",
        longDescription: "Vatika AI Herbalist bridges the gap between traditional herbal wisdom and modern technology, offering a unified platform for symptom-based assessments and personalized wellness guidance.",
        overview: "Vatika AI Herbalist is an AI-powered herbal wellness web application that helps users explore medicinal herbs, discover natural remedies, and receive personalized health assessments. It combines a clean educational website with an intelligent AI chatbot that conducts symptom-based consultations and generates comprehensive wellness reports including herbal remedies, self-care guidance, and doctor recommendations — all from a single platform.",
        techStackCategorized: {
            frontend: ["HTML5", "CSS3", "JavaScript"],
            backend: ["Node.js", "Express.js"],
            ai: ["Google Gemini API"],
            utilities: ["dotenv", "CORS"],
            deployment: ["Render"]
        },
        techStack: ["HTML5", "CSS3", "JavaScript", "Node.js", "Gemini AI"],
        highlightsCategory: "KEY FEATURES",
        highlights: ["AI Herbalist Chatbot", "Guided Assessment Flow", "Live Assessment Panel", "Planting Guide"],
        featuresList: [
            { title: "AI Herbalist Chatbot", desc: "Conversational symptom intake that feels natural and supportive" },
            { title: "Guided Assessment Flow", desc: "Collects patient details, symptoms, severity, and duration step by step" },
            { title: "Live Assessment Panel", desc: "Generates structured reports with analysis, remedies, and doctor guidance" },
            { title: "Herb Detail Section", desc: "Covers medicinal uses, preparation methods, and precautions" },
            { title: "Natural Remedy Finder", desc: "Search remedies by common health concerns" },
            { title: "Herb Planting Guide", desc: "Location-aware planting guidance based on herb and region" }
        ],
        architecture: {
            principle: "Unified Knowledge Base x Conversational Intelligence",
            flow: [
                { step: "Symptom Intake", desc: "Conversational collection of health context" },
                { step: "Gemini Engine", desc: "Synthesis of herbal wisdom with patient data" },
                { step: "Assessment Panel", desc: "Live generation of structured health reports" },
                { step: "Educational DB", desc: "Static repository for herb data and planting" }
            ],
            details: "User describes symptoms → AI chatbot collects details → Data processed by Gemini API → Comprehensive assessment displayed including remedies, warnings, and doctor urgency."
        },
        challenges: [
            { issue: "AI Health Trust", solve: "Structured every assessment to include safety warnings and doctor consultation guidance with urgency indicators." },
            { issue: "Varied User Inputs", solve: "Implemented a structured step-by-step intake that standardizes symptoms collection before recommendation." },
            { issue: "Actionable Assessments", solve: "Designed a structured output format organizing AI responses into clear, actionable sections." }
        ],
        images: {
            overview: "/vatika-overview.png",
            features: ["/vatika-chatbot.png", "/vatika-assessment.png", "/vatika-features-1.png", "/vatika-features-2.png"],
            architecture: "/vatika-architecture.png"
        },
        repo: "https://github.com/Lakhanbang/AI-Herbalist",
        demo: "https://ai-herbalist.onrender.com/",
        color: "from-green-600/20 to-teal-500/20",
        glowColor: "bg-green-500/20",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8a9 9 0 0 1-10 10z" /><path d="M11 20a9 9 0 0 1-9-10c2 0 4.18-1 8-1 2 2 4.48 3.5 1 11z" /></svg>
        )
    },
    {
        id: "reportgenie",
        title: "ReportGenie",
        tagline: "An AI-powered research agent that automates web research, summarizes information, and generates clean markdown reports — built as a hands-on workshop project.",
        category: "AI • Research Automation",
        tag: "PRODUCT MODULE",
        subtitle: "WEB SEARCH -> SUMMARIZATION -> REPORTS",
        description: "An intelligent research automation tool that transforms hours of manual research into minutes of streamlined work.",
        longDescription: "ReportGenie was built to solve the time-consuming nature of online research by creating an end-to-end research pipeline that handles search, summarization, report generation, and export in one seamless workflow.",
        overview: "ReportGenie is an intelligent research automation tool that transforms hours of manual research into minutes of streamlined work. Enter any topic, and the AI agent scours the web, filters relevant information, summarizes content, and auto-generates a structured markdown report — complete with an in-app editor for final touches and instant download capability.",
        techStackCategorized: {
            frontend: ["Streamlit"],
            backend: ["Python"],
            search: ["DuckDuckGo Search API"],
            ai: ["Groq", "OpenAI API"],
            output: ["Markdown (.md)"]
        },
        techStack: ["Python", "Streamlit", "Groq", "DuckDuckGo API"],
        highlightsCategory: "KEY FEATURES",
        highlights: ["Web Search Automation", "Content Summarization", "Auto-Generated Reports", "Built-in Report Editor"],
        featuresList: [
            { title: "Web Search Automation", desc: "Fetches top search results from DuckDuckGo based on user-provided topic" },
            { title: "Content Summarization", desc: "Filters and condenses information using LLM integration to eliminate noise" },
            { title: "Auto-Generated Reports", desc: "Structures findings into a clean, well-formatted markdown document" },
            { title: "Built-in Report Editor", desc: "Allows users to edit, tweak, and refine the generated report before saving" },
            { title: "Instant Download", desc: "Exports the final report as a .md file ready to share or publish" },
            { title: "Multi-Step Research Pipeline", desc: "Handles the complete workflow from search → summarization → structuring → export" }
        ],
        architecture: {
            principle: "Automated End-to-End Research Pipeline",
            flow: [
                { step: "Topic Intake", desc: "User enters research topic" },
                { step: "Search Engine", desc: "DuckDuckGo API fetches top results" },
                { step: "LLM Processing", desc: "Summarizes and structures findings" },
                { step: "Export Layer", desc: "Editable markdown & download" }
            ],
            details: "User enters research topic → DuckDuckGo Search API fetches top results → Python backend extracts and cleans content → LLM (Groq/OpenAI) summarizes and structures information → Markdown report generated → Streamlit editor displays editable report → User downloads final .md file."
        },
        challenges: [
            { issue: "Filtering irrelevant search results", solve: "Implemented a content relevance scoring system that ranks results before summarization, ensuring only high-quality sources are processed." },
            { issue: "Handling large scraped content", solve: "Solved by chunking content and sending only the most relevant excerpts to the LLM for summarization within token limits." },
            { issue: "Unstructured AI output", solve: "Designed a prompt template that enforces consistent heading hierarchy, bullet points, and citation formatting." }
        ],
        images: {
            overview: "/reportgenie-overview.png",
            features: ["/reportgenie-results.png", "/reportgenie-editor.png"],
            architecture: "/reportgenie-architecture.png"
        },
        repo: "https://github.com/Lakhanbang/Research-Ai-Agent",
        demo: "https://research-ai-agent-9.streamlit.app/",
        color: "from-blue-600/20 to-cyan-500/20",
        glowColor: "bg-blue-500/20",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
                <path d="M12 6v6l4 2" />
            </svg>
        )
    }
];

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
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="group relative flex flex-col bg-[#111111] rounded-[40px] border border-white/10 p-10 h-full transition-all duration-500 hover:bg-[#1a1a1a]"
                            >
                                {/* Header Info */}
                                <div className="flex justify-between items-start mb-12">
                                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 group-hover:text-white transition-colors">
                                        {project.icon}
                                    </div>
                                    <span className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase px-4 py-2 rounded-full border border-white/10 bg-white/5">
                                        {project.tag}
                                    </span>
                                </div>

                                {/* Title & Subtitle */}
                                <div className="mb-8">
                                    <p className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase mb-2">
                                        {project.category}
                                    </p>
                                    <h3 className="text-4xl font-bold text-white mb-6 group-hover:translate-x-1 transition-transform">
                                        {project.title}
                                    </h3>
                                    <p className="text-[11px] font-bold tracking-[0.1em] text-blue-500/80 uppercase">
                                        {project.subtitle}
                                    </p>
                                </div>

                                {/* Description */}
                                <p className="text-gray-400 text-base leading-relaxed mb-10 flex-grow">
                                    {project.description}
                                </p>

                                {/* Experience Highlights */}
                                <div className="bg-white/5 rounded-3xl p-8 border border-white/5 relative overflow-hidden mb-12">
                                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 ${project.glowColor} rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000`} />

                                    <h4 className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase mb-6 relative z-10">
                                        {project.highlightsCategory}
                                    </h4>
                                    <div className="space-y-3 relative z-10">
                                        {(project.highlights as string[])?.map((highlight) => (
                                            <div
                                                key={highlight}
                                                className="inline-block w-full px-5 py-3 rounded-full border border-white/5 bg-black/20 text-xs text-gray-300 font-medium"
                                            >
                                                {highlight}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* CTAs */}
                                <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                                    <button
                                        onClick={() => setSelectedId(project.id)}
                                        className="flex items-center gap-3 text-sm font-bold text-gray-400 hover:text-white transition-colors group/btn"
                                    >
                                        VIEW PROJECT
                                        <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                    <a
                                        href={project.repo}
                                        target="_blank"
                                        className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" /></svg>
                                    </a>
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
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedId(null)}
                                className="fixed inset-0 bg-black/98 backdrop-blur-3xl z-[100]"
                            />
                            <div className="fixed inset-0 z-[110] overflow-y-auto scrollbar-hide py-20 px-4 md:px-12 flex items-start justify-center">
                                <motion.div
                                    layoutId={selectedId}
                                    className="w-full max-w-6xl bg-[#0a0a0a] rounded-[64px] border border-white/10 overflow-hidden relative shadow-[0_0_100px_rgba(0,0,0,1)]"
                                >
                                    <button
                                        onClick={() => setSelectedId(null)}
                                        className="fixed top-28 right-8 z-[150] p-4 bg-white/5 hover:bg-white/10 rounded-2xl text-white/50 hover:text-white transition-all border border-white/10 group flex items-center gap-3 backdrop-blur-xl"
                                    >
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M6 18L18 6M6 6l12 12" /></svg>
                                        <span className="text-xs font-bold tracking-widest uppercase md:block hidden">Close</span>
                                    </button>

                                    {selectedId === 'doctor-copilot' || selectedId === 'ai-herbalist' || selectedId === 'reportgenie' ? (
                                        // DOCTOR COPILOT 6-SECTION VERTICAL STORYTELLING
                                        <div className="flex flex-col">

                                            {/* SECTION 1: OVERVIEW */}
                                            <section className="relative min-h-[90vh] flex flex-col items-center justify-center p-8 md:p-24 text-center border-b border-white/5">
                                                <div className="absolute inset-0 opacity-20 pointer-events-none">
                                                    <div className="absolute inset-0 bg-linear-to-b from-blue-500/10 to-transparent" />
                                                    <img src={(selectedProject as any).images.overview} className="w-full h-full object-cover blur-3xl scale-125" />
                                                </div>

                                                <div className="relative z-10 max-w-4xl mx-auto overflow-hidden">
                                                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-12">
                                                        Artificial Intelligence in Healthcare
                                                    </motion.div>

                                                    <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-7xl md:text-9xl font-black text-white mb-8 tracking-tighter leading-none uppercase italic">
                                                        {(selectedProject as any).title}
                                                    </motion.h2>

                                                    <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-xl md:text-2xl text-blue-400/80 font-bold mb-16 tracking-tight leading-relaxed">
                                                        {(selectedProject as any).tagline}
                                                    </motion.p>

                                                    <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }} className="overflow-hidden rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-xl mb-16 shadow-2xl" style={{ isolation: 'isolate' }}>
                                                        <img src={(selectedProject as any).images.overview} className="w-full h-auto block rounded-[inherit]" />
                                                    </motion.div>

                                                    <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto font-medium">
                                                        {(selectedProject as any).overview}
                                                    </motion.p>
                                                </div>
                                            </section>

                                            {/* SECTION 2: TECH STACK */}
                                            <section className="p-12 md:p-24 bg-[#0c0c0c] border-b border-white/5">
                                                <h4 className="text-[14px] font-black tracking-[0.8em] text-cyan-400 uppercase mb-24 text-center">Engineered Stack</h4>
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                                                    {Object.entries((selectedProject as any).techStackCategorized).map(([key, techs]) => (
                                                        <div key={key} className="p-6 rounded-[32px] bg-white/[0.02] border border-white/10 hover:border-blue-500/40 transition-all hover:-translate-y-1 group shadow-xl">
                                                            <div className="flex items-center gap-4 mb-8">
                                                                <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                                                                    {key === 'frontend' && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                                                                    {key === 'backend' && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" /></svg>}
                                                                    {key === 'database' && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>}
                                                                    {(key === 'ai_ocr' || key === 'ai') && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
                                                                    {key === 'deployment' && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>}
                                                                    {key === 'utilities' && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z" /><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                                                                </div>
                                                                <span className="text-xs font-black tracking-widest text-white uppercase">{key.replace('_', ' ')}</span>
                                                            </div>
                                                            <div className="flex flex-wrap gap-2.5">
                                                                {(techs as string[]).map(t => (
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
                                                        {(selectedProject as any).featuresList.map((f: any) => (
                                                            <div key={f.title} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 group hover:bg-white/[0.04] transition-all">
                                                                <h5 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{f.title}</h5>
                                                                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className="max-w-5xl mx-auto overflow-hidden rounded-[20px]">
                                                        <SlidingImageBox images={(selectedProject as any).images.features} />
                                                    </div>
                                                </div>
                                            </section>

                                            {/* SECTION 4: ARCHITECTURE */}
                                            <section className="p-12 md:p-24 bg-[#0c0c0c] border-b border-white/5 text-center">
                                                <div className="max-w-4xl mx-auto">
                                                    <h4 className="text-[14px] font-black tracking-[0.8em] text-cyan-400 uppercase mb-12">Architecture & Data Flow</h4>
                                                    <p className="text-3xl font-bold text-white mb-8 tracking-tight italic">{(selectedProject as any).architecture.principle}</p>
                                                    <ArchitectureDiagram flow={(selectedProject as any).architecture.flow} />
                                                    <div className="my-10 h-px bg-white/10" />

                                                    <p className="text-lg text-gray-400 leading-relaxed mb-20">{(selectedProject as any).architecture.details}</p>
                                                    <div className="rounded-[32px] border border-white/10 overflow-hidden bg-black shadow-2xl" style={{ isolation: 'isolate' }}>
                                                        <img src={(selectedProject as any).images.architecture} className="w-full h-auto opacity-80 block rounded-[inherit]" />
                                                    </div>
                                                </div>
                                            </section>

                                            {/* SECTION 5: CHALLENGES */}
                                            <section className="p-12 md:p-24 bg-[#0a0a0a] border-b border-white/5">
                                                <div className="max-w-4xl mx-auto">
                                                    <h4 className="text-[14px] font-black tracking-[0.8em] text-cyan-400 uppercase mb-16 text-center">Challenges & Solutions</h4>
                                                    <div className="space-y-6">
                                                        {(selectedProject as any).challenges.map((c: any) => (
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

                                            {/* SECTION 6: LIVE DEMO + LINKS */}
                                            <section className="p-12 md:p-32 bg-linear-to-t from-blue-500/10 to-[#0a0a0a] text-center">
                                                <div className="max-w-4xl mx-auto">
                                                    <h2 className="text-6xl md:text-8xl font-black text-white mb-12 tracking-tighter italic">LIVE DEMO</h2>
                                                    <p className="text-lg text-gray-400 mb-16">Live site, GitHub repo, and demo credentials are available below.</p>

                                                    <div className="flex flex-wrap justify-center gap-6 mb-24">
                                                        <a href={(selectedProject as any).demo} target="_blank" className="px-12 py-6 rounded-3xl bg-blue-500 text-white font-black tracking-widest uppercase hover:bg-blue-400 transition-all shadow-[0_0_50px_rgba(59,130,246,0.3)]">VISIT LIVE SITE</a>
                                                        <a href={(selectedProject as any).repo} target="_blank" className="px-12 py-6 rounded-3xl bg-white/5 border border-white/10 text-white font-black tracking-widest uppercase hover:bg-white/10 transition-all">REPOSTORY</a>
                                                    </div>

                                                    {(selectedProject as any).credentials && (
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                                                            <div className="p-10 rounded-[40px] bg-black/60 border border-white/10 backdrop-blur-3xl">
                                                                <h5 className="text-blue-400 text-xs font-black tracking-[0.2em] uppercase mb-8 flex items-center gap-3">
                                                                    <div className="w-1.5 h-3 bg-blue-500 rounded-full" /> Patient Access
                                                                </h5>
                                                                <div className="space-y-6">
                                                                    <div className="flex justify-between items-center"><span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">ID</span> <div className="flex items-center gap-4"><code className="text-white">{(selectedProject as any).credentials.patient.id}</code> <CopyButton text={(selectedProject as any).credentials.patient.id} /></div></div>
                                                                    <div className="flex justify-between items-center"><span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">PWD</span> <div className="flex items-center gap-4"><code className="text-white">{(selectedProject as any).credentials.patient.pass}</code> <CopyButton text={(selectedProject as any).credentials.patient.pass} /></div></div>
                                                                </div>
                                                            </div>
                                                            <div className="p-10 rounded-[40px] bg-black/60 border border-white/10 backdrop-blur-3xl">
                                                                <h5 className="text-purple-400 text-xs font-black tracking-[0.2em] uppercase mb-8 flex items-center gap-3">
                                                                    <div className="w-1.5 h-3 bg-purple-500 rounded-full" /> Doctor Access
                                                                </h5>
                                                                <div className="space-y-6">
                                                                    <div className="flex justify-between items-center"><span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">ID</span> <div className="flex items-center gap-4"><code className="text-white">{(selectedProject as any).credentials.doctor.id}</code> <CopyButton text={(selectedProject as any).credentials.doctor.id} /></div></div>
                                                                    <div className="flex justify-between items-center"><span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">PWD</span> <div className="flex items-center gap-4"><code className="text-white">{(selectedProject as any).credentials.doctor.pass}</code> <CopyButton text={(selectedProject as any).credentials.doctor.pass} /></div></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </section>

                                        </div>
                                    ) : (
                                        // STANDARD MODAL FOR OTHER PROJECTS
                                        <>
                                            <button
                                                onClick={() => setSelectedId(null)}
                                                className="absolute top-8 right-8 z-20 p-3 bg-white/5 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-colors border border-white/10"
                                            >
                                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M6 18L18 6M6 6l12 12" /></svg>
                                            </button>

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
                                                            <a href={selectedProject.repo} target="_blank" className="p-4 rounded-2xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
                                                            </a>
                                                            {selectedProject.demo !== "#" && (
                                                                <a href={selectedProject.demo} target="_blank" className="px-6 py-4 rounded-2xl bg-white text-black font-bold text-sm hover:bg-gray-200 transition-colors">
                                                                    Live
                                                                </a>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Info Section */}
                                                    <div className="mb-24">
                                                        <p className="text-xl text-gray-400 leading-relaxed mb-12">
                                                            {selectedProject.longDescription}
                                                        </p>
                                                    </div>

                                                    {/* Details Grid */}
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
                                                        <div>
                                                            <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.4em] mb-10">Stack</h4>
                                                            <div className="flex flex-wrap gap-2.5">
                                                                {(selectedProject.techStack as string[]).map(tech => (
                                                                    <span key={tech} className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/5 text-[11px] font-bold text-gray-300 tracking-wider transition-all hover:bg-white/10 hover:text-white hover:-translate-y-0.5">{tech}</span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.4em] mb-10">{selectedProject.highlightsCategory}</h4>
                                                            <ul className="space-y-4">
                                                                {(selectedProject.highlights as string[]).map(h => (
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
                                                            className="flex-1 py-5 rounded-2xl bg-white text-black font-bold text-center hover:bg-gray-200 transition-colors flex items-center justify-center gap-3"
                                                        >
                                                            SOURCE CODE
                                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </motion.div>
                            </div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
