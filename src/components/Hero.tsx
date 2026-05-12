"use client";

import ScrollyVideo from "@/components/ScrollyVideo";
import Overlay from "@/components/Overlay";

const VIDEO_SEQUENCE = [
  { src: "/cubes.mp4", start: 0, end: 0.5, isLooping: true },
  { src: "/walk.mp4", start: 0.5, end: 1.0 },
];

export default function Hero() {
  return (
    <div className="relative bg-black" id="home">
      {/* Background Video Layer */}
      <video
        src="/backroung.mp4"
        autoPlay
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
