"use client";
import { useEffect, useRef, useCallback, useMemo } from 'react';
import { gsap } from 'gsap';
import './TargetCursor.css';

interface TargetCursorProps {
  hideDefaultCursor?: boolean;
  smoothing?: number;
}

const TargetCursor = ({
  hideDefaultCursor = true,
  smoothing = 0.15
}: TargetCursorProps) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  const isMobile = useMemo(() => {
    if (typeof window === 'undefined') return false;
    const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth <= 768;
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
    const isMobileUserAgent = mobileRegex.test(userAgent.toLowerCase());
    return (hasTouchScreen && isSmallScreen) || isMobileUserAgent;
  }, []);

  const moveCursor = useCallback((x: number, y: number) => {
    if (!cursorRef.current) return;
    gsap.to(cursorRef.current, {
      x,
      y,
      duration: smoothing,
      ease: 'power4.out',
      overwrite: true
    });
  }, [smoothing]);

  useEffect(() => {
    if (isMobile || !cursorRef.current) return;

    const originalCursor = document.body.style.cursor;
    if (hideDefaultCursor) {
      document.body.style.cursor = 'none';
      // Apply to all elements to ensure it stays hidden
      const style = document.createElement('style');
      style.innerHTML = `* { cursor: none !important; }`;
      document.head.appendChild(style);
      
      return () => {
        document.body.style.cursor = originalCursor;
        document.head.removeChild(style);
      };
    }
  }, [hideDefaultCursor, isMobile]);

  useEffect(() => {
    if (isMobile) return;

    const moveHandler = (e: MouseEvent) => moveCursor(e.clientX, e.clientY);
    const mouseDownHandler = () => {
      if (dotRef.current) gsap.to(dotRef.current, { scale: 0.6, duration: 0.2 });
    };
    const mouseUpHandler = () => {
      if (dotRef.current) gsap.to(dotRef.current, { scale: 1, duration: 0.3 });
    };

    window.addEventListener('mousemove', moveHandler);
    window.addEventListener('mousedown', mouseDownHandler);
    window.addEventListener('mouseup', mouseUpHandler);

    // Initial position
    gsap.set(cursorRef.current, {
      xPercent: -50,
      yPercent: -50,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    });

    return () => {
      window.removeEventListener('mousemove', moveHandler);
      window.removeEventListener('mousedown', mouseDownHandler);
      window.removeEventListener('mouseup', mouseUpHandler);
    };
  }, [isMobile, moveCursor]);

  if (isMobile) return null;

  return (
    <div ref={cursorRef} className="target-cursor-wrapper">
      <div ref={dotRef} className="target-cursor-dot" />
    </div>
  );
};

export default TargetCursor;
