"use client";

import ScrollyVideo from "@/components/ScrollyVideo";
import { useEffect, useRef } from "react";
import { useVisibleActivity } from "@/hooks/useVisibleActivity";
import Overlay from "@/components/Overlay";

const VIDEO_SEQUENCE = [
  { src: "/cubes.mp4", start: 0, end: 0.5, isLooping: true },
  { src: "/walk.mp4", start: 0.5, end: 1.0 },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const active = useVisibleActivity(containerRef);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (active) void video.play().catch(() => {});
    else video.pause();
  }, [active]);
  return (
    <div ref={containerRef} className="relative bg-black" id="home">
      {/* Background Video Layer */}
      <video
        src="/backroung.mp4"
        ref={videoRef}
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Main Video & Content Layer */}
      <div className="relative z-10">
        <ScrollyVideo videos={VIDEO_SEQUENCE}>
          {(progress) => <Overlay scrollYProgress={progress} />}
        </ScrollyVideo>
      </div>
    </div>
  );
}
