import React from 'react';

export interface Project {
    id: string;
    title: string;
    tagline?: string;
    category: string;
    tag: string;
    subtitle: string;
    description: string;
    overview?: string;
    techStackCategorized?: Record<string, string[]>;
    techStack: string[];
    highlightsCategory: string;
    highlights: string[];
    featuresList?: { title: string; desc: string }[];
    architecture?: {
        principle: string;
        flow: { step: string; desc: string }[];
        details: string;
    };
    challenges?: { issue: string; solve: string }[];
    credentials?: {
        patient: { id: string; pass: string };
        doctor: { id: string; pass: string };
    };
    images?: {
        overview: string;
        features: string[];
        architecture: string;
    };
    repo: string;
    demo: string;
    color: string;
    glowColor: string;
    icon: React.ReactNode;
    longDescription?: string;
}

export const projects: Project[] = [
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
        description: "A comprehensive dashboard for visualizing and predicting crime trends using historical data.",
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
