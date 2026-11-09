"use client";

import { useRef, type ReactNode } from "react";
import useScrollReveal from "./useScrollReveal";
import styles from "./Reveal.module.css";

export function RevealGroup({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useScrollReveal(ref);
  return <div ref={ref} data-reveal-group="" className={`${styles.reveal} ${className}`}>{children}</div>;
}

export default function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useScrollReveal(ref);
  return <div ref={ref} data-scroll-reveal data-scroll-delay={delay} className={`${styles.reveal} ${className}`}>{children}</div>;
}
