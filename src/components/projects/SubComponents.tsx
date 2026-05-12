"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export const CopyButton = ({ text }: { text: string }) => {
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

export const SlidingImageBox = ({ images }: { images: string[] }) => {
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

export const ArchitectureDiagram = ({ flow }: { flow: any[] }) => (
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
