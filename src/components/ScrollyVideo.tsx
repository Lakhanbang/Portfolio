"use client";

import { useScroll, useSpring, motion, type MotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";
import { useVisibleActivity } from "@/hooks/useVisibleActivity";

interface VideoSource { src: string; start: number; end: number; isLooping?: boolean; }

function VideoLayer({ video, progress, active }: { video: VideoSource; progress: MotionValue<number>; active: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const frame = useRef<number | null>(null);
  const opacity = useTransform(progress, [video.start, video.start + 0.05, video.end - 0.05, video.end], [0, 1, 1, 0]);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const sync = () => {
      if (video.isLooping) {
        if (active && progress.get() >= video.start && progress.get() < video.end) void element.play().catch(() => {});
        else element.pause();
      } else if (active && Number.isFinite(element.duration) && element.duration > 0) {
        const relative = Math.max(0, Math.min(1, (progress.get() - video.start) / (video.end - video.start)));
        const target = Math.min(relative * element.duration, Math.max(0, element.duration - 0.001));
        if (Math.abs(element.currentTime - target) > 1 / 60 && !element.seeking) element.currentTime = target;
      }
    };
    element.addEventListener("loadedmetadata", sync);
    element.addEventListener("seeked", sync);
    sync();
    const unsubscribe = progress.on("change", () => {
      if (frame.current === null && active) frame.current = requestAnimationFrame(() => {
        frame.current = null;
        sync();
      });
    });
    return () => {
      unsubscribe();
      element.pause();
      element.removeEventListener("loadedmetadata", sync);
      element.removeEventListener("seeked", sync);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
      frame.current = null;
    };
  }, [active, progress, video]);
  return <motion.video ref={ref} src={video.src} style={{ opacity }} className="absolute inset-0 h-full w-full object-contain" muted playsInline loop={video.isLooping} preload={video.isLooping ? "auto" : "metadata"} />;
}

export default function ScrollyVideo({ videos, children }: { videos: VideoSource[]; children?: (progress: MotionValue<number>) => ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const active = useVisibleActivity(containerRef);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const springScroll = useSpring(scrollYProgress, { damping: 50, stiffness: 400 });
  return (
    <div ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-transparent">
        {videos.map(video => <VideoLayer key={video.src} video={video} progress={springScroll} active={active} />)}
        {children?.(springScroll)}
      </div>
    </div>
  );
}
