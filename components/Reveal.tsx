"use client";

import { useRef, type ReactNode } from "react";
import useScrollReveal from "./useScrollReveal";
import styles from "./Reveal.module.css";

export default function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useScrollReveal(ref);
  return <div ref={ref} data-scroll-reveal data-scroll-delay={delay} className={`${styles.reveal} ${className}`}>{children}</div>;
}
