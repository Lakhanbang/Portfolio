"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";

const TargetCursor = dynamic(() => import("./TargetCursor"), { ssr: false });
const SplashCursor = dynamic(() => import("./SplashCursor"), { ssr: false });

function subscribe(callback: () => void) {
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  window.addEventListener("resize", callback);
  motion.addEventListener("change", callback);
  return () => {
    window.removeEventListener("resize", callback);
    motion.removeEventListener("change", callback);
  };
}

export default function VisualEffects() {
  const fluidEnabled = useSyncExternalStore(subscribe, () => window.innerWidth >= 1024 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches, () => false);
  return <><TargetCursor />{fluidEnabled && <SplashCursor />}</>;
}
