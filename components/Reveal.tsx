"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "./Reveal.module.css";

export default function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Content stays visible if JavaScript or IntersectionObserver is unavailable.
    if (!("IntersectionObserver" in window)) return;
    element.classList.add(styles.pending);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        element.classList.remove(styles.pending);
        observer.disconnect();
      }
    }, { threshold: 0.06, rootMargin: "0px 0px 30px 0px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className={`${styles.reveal} ${className}`}>{children}</div>;
}
