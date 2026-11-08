"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Decorative motion runs only while it can be seen. */
export default function MotionRegion({ children, className, colored }: { children: ReactNode; className?: string; colored?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element || !("IntersectionObserver" in window)) return;
    let visible = false;
    const sync = () => element.style.setProperty("--ambient-play-state", visible && !document.hidden ? "running" : "paused");
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    observer.observe(element);
    document.addEventListener("visibilitychange", sync);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", sync); };
  }, []);
  return <div ref={ref} className={className} data-color={colored || undefined}>{children}</div>;
}
