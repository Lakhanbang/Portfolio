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
    internship?: { company: string; duration: string; role: string; contribution: string };
    results?: { title: string; desc: string }[];
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
        results?: string;
    };
    repo: string;
    demo: string;
    presentation?: string;
    color: string;
    glowColor: string;
    accent: { text: string; gradient: string; iconHover: string; background: string };
    icon: React.ReactNode;
    longDescription?: string;
}

export const projects: Project[] = [
    {
        id: "rfp-intelligence",
        title: "RFP Intelligence",
        tagline: "Company knowledge, grounded answers, and resilient AI orchestration in one RFP response platform.",
        category: "Full-Stack AI & Agentic Automation",
        tag: "INTERNSHIP PROJECT",
        subtitle: "INGEST -> RETRIEVE -> DRAFT",
        description: "Built end to end during my Myridius internship, RFP Intelligence helps sales and business development teams draft grounded proposal responses from company knowledge, reducing response time by 50–60%.",
        overview: "Responding to a request for proposal (RFP) can consume 30–40 hours of manual work. RFP Intelligence turns company PDFs into a searchable knowledge base, extracts RFP questions, retrieves supporting context, and drafts answers through a sequential agentic pipeline. Sales and business development teams receive a formatted response PDF for review, with visibility into AI spend, latency, and provider usage at every step.",
        internship: {
            company: "Myridius",
            duration: "3 months · May 15 – August 15, 2026",
            role: "Full-stack AI Engineer · Solo Development",
            contribution: "Owned the platform from architecture to deployment: the React frontend, LiteLLM routing gateway, CrewAI Organizer and Drafter agents, MCP document and tool integration, Qdrant hybrid retrieval, Redis-backed budget enforcement, and real-time logging and cost tracking."
        },
        techStackCategorized: {
            frontend: ["React", "Vite", "Tailwind CSS"],
            backend: ["Python", "CrewAI"],
            database: ["Qdrant", "BM25 sparse vectors", "Dense vectors"],
            ai: ["LiteLLM", "Groq", "OpenAI", "Gemini"],
            state: ["Redis", "Budget tracking", "Provider health"],
            integration: ["MCP", "PDF parsing", "OpenAI embeddings", "PDF generation"]
        },
        techStack: ["React", "Python", "CrewAI", "LiteLLM", "Qdrant", "Redis", "MCP"],
        highlightsCategory: "KEY CAPABILITIES",
        highlights: ["Sequential AI Agents", "Hybrid Knowledge Retrieval", "Adaptive LLM Routing", "Budget & Cost Visibility"],
        featuresList: [
            { title: "Budget & Observability", desc: "Checks spend before every LLM request, logs provider usage, cost, and latency, and enforces monthly spending caps through Redis." },
            { title: "Adaptive Load Balancer", desc: "Monitors provider latency, error rates, and traffic load to route requests to the best-performing provider at that moment." },
            { title: "Smart Routing & Fallback", desc: "Matches tasks to suitable providers and automatically switches to secondary and tertiary models when the primary fails." },
            { title: "Sequential Agentic Pipeline", desc: "The Organizer extracts questions into structured JSON, the Drafter generates context-grounded answers, and a PDF writer compiles the response." },
            { title: "Hybrid Data Ingestion", desc: "Chunks company PDFs and stores OpenAI dense embeddings alongside BM25 sparse vectors in Qdrant for semantic and keyword retrieval." },
            { title: "Real-time Cost & Performance Tracking", desc: "Exposes agent actions, consumed budget, token usage, latency, and generation time throughout the response workflow." }
        ],
        architecture: {
            principle: "Retrieve trusted context. Route intelligently. Draft sequentially.",
            flow: [
                { step: "Knowledge Ingestion", desc: "Company PDFs are chunked and indexed in Qdrant with dense and BM25 vectors." },
                { step: "Organizer Agent", desc: "MCP document reading extracts RFP questions into structured JSON." },
                { step: "Retrieve & Draft", desc: "Batches of three questions retrieve context and pass through the LiteLLM gateway to the Drafter." },
                { step: "PDF & Telemetry", desc: "Answers become a formatted PDF while cost, latency, and budget usage are logged." }
            ],
            details: "Company PDFs → Chunking and embedding → Qdrant hybrid index. RFP upload → Organizer agent → Structured questions → Hybrid retrieval in batches of three → Drafter agent → Formatted response PDF. LiteLLM provides adaptive routing and a three-tier fallback chain, while Redis enforces budgets and maintains provider health state."
        },
        challenges: [
            { issue: "Multi-provider resilience", solve: "Built a LiteLLM gateway that scores providers by quality, cost, latency, and success rate, with secondary and tertiary fallback models when the primary fails." },
            { issue: "Cost control at scale", solve: "Implemented Redis-backed monthly spending caps and rate limits. Every LLM request is checked before execution and its consumed budget is logged." },
            { issue: "Grounding answers in unstructured knowledge", solve: "Combined BM25 keyword matching with dense semantic embeddings in Qdrant to retrieve supporting company context and reduce unsupported answers." }
        ],
        results: [
            { title: "50–60% Less Response Time", desc: "Reported reduction in the overall RFP response workflow compared with a 30–40 hour manual baseline, with generated drafts reviewed before use." },
            { title: "Predictable AI Spend", desc: "Monthly budget caps are enforced automatically before LLM requests." },
            { title: "Resilient Provider Routing", desc: "A three-tier fallback chain reduces dependence on a single model provider during failures." },
            { title: "Knowledge-Grounded Answers", desc: "Hybrid retrieval supplies company context to support accurate, relevant draft responses." }
        ],
        images: {
            overview: "/rfp-home.png",
            features: ["/rfp-terminal.png"],
            architecture: "/rfp-sequential-process.png",
            results: "/rfp-results.png"
        },
        repo: "https://github.com/Lakhanbang/Portfolio.git",
        demo: "",
        presentation: "/rfp-presentation.html",
        color: "from-blue-600/20 to-cyan-500/20",
        glowColor: "bg-blue-500/20",
        accent: { text: "text-blue-400", gradient: "to-blue-400", iconHover: "group-hover:bg-blue-500/20", background: "bg-blue-500/20" },
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
                <path d="M14 2v6h6M8 13h8M8 17h5" />
            </svg>
        )
    },
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
        accent: { text: "text-blue-400", gradient: "to-blue-400", iconHover: "group-hover:bg-blue-500/20", background: "bg-blue-500/20" },
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
        accent: { text: "text-purple-400", gradient: "to-purple-400", iconHover: "group-hover:bg-purple-500/20", background: "bg-purple-500/20" },
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
        accent: { text: "text-green-400", gradient: "to-green-400", iconHover: "group-hover:bg-green-500/20", background: "bg-green-500/20" },
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
        accent: { text: "text-blue-400", gradient: "to-blue-400", iconHover: "group-hover:bg-blue-500/20", background: "bg-blue-500/20" },
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
                <path d="M12 6v6l4 2" />
            </svg>
        )
    }
];
