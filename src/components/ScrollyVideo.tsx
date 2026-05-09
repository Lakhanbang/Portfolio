"use client";

import { useScroll, useSpring, useMotionValueEvent, motion, MotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, ReactNode, useState } from "react";

interface VideoSource {
  src: string;
  start: number; // 0 to 1
  end: number;   // 0 to 1
  isLooping?: boolean;
}

interface ScrollyVideoProps {
  videos: VideoSource[];
  children?: (progress: MotionValue<number>) => ReactNode;
}

export default function ScrollyVideo({ videos, children }: ScrollyVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Use a map of refs for multiple videos
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Scroll progress for the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth out the scroll value
  const springScroll = useSpring(scrollYProgress, {
    damping: 50,
    stiffness: 400,
  });

  // Update video times based on scroll
  useMotionValueEvent(springScroll, "change", (latest) => {
    videos.forEach((video, index) => {
      const vRef = videoRefs.current[index];
      if (vRef && vRef.duration && !video.isLooping) {
        // Calculate relative progress for this specific video's range
        const range = video.end - video.start;
        const relativeProgress = Math.max(0, Math.min(1, (latest - video.start) / range));

        if (vRef.readyState > 0) {
          vRef.currentTime = relativeProgress * vRef.duration;
        }
      }
    });
  });

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-transparent">
        {videos.map((video, index) => {
          // Calculate opacity for this video based on scroll
          // We'll use a small buffer for cross-fading (0.05)
          const opacity = useTransform(
            springScroll,
            [video.start, video.start + 0.05, video.end - 0.05, video.end],
            [0, 1, 1, 0]
          );

          return (
            <motion.video
              key={video.src}
              ref={(el) => { videoRefs.current[index] = el; }}
              src={video.src}
              style={{ opacity }}
              className="absolute inset-0 h-full w-full object-contain"
              muted
              playsInline
              autoPlay={video.isLooping || true}
              loop={video.isLooping}
              preload="auto"
            />
          );
        })}

        {/* Render children (Overlay) passing the springScroll value */}
        {children && children(springScroll)}
      </div>
    </div>
  );
}

