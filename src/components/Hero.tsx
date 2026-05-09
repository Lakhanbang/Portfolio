"use client";

import ScrollyVideo from "@/components/ScrollyVideo";
import Overlay from "@/components/Overlay";
import Galaxy from "@/components/Galaxy";

const VIDEO_SEQUENCE = [
  { src: "/cubes.mp4", start: 0, end: 0.5, isLooping: true },
  { src: "/walk.mp4", start: 0.5, end: 1.0 },
];

export default function Hero() {
  return (
    <div className="relative bg-black" id="home">
      {/* Galaxy Background Layer */}
      <div className="absolute inset-0 z-0" style={{ width: '100%', height: '100%' }}>
        <Galaxy
          mouseRepulsion={true}
          mouseInteraction={true}
          density={1.5}
          glowIntensity={0.5}
          saturation={0.8}
          hueShift={240}
          transparent={false}
          speed={0.8}
          twinkleIntensity={0.4}
          rotationSpeed={0.05}
        />
      </div>

      {/* Background Video Layer */}
      <video
        src="/background.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-[1] opacity-30"
      />

      {/* Main Video & Content Layer */}
      <div className="relative z-10">
        <ScrollyVideo videos={VIDEO_SEQUENCE}>
          {(progress: any) => <Overlay scrollYProgress={progress} />}
        </ScrollyVideo>
      </div>
    </div>
  );
}
