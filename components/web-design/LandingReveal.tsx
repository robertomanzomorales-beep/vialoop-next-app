"use client";

import { useRef, type ReactNode } from "react";
import useScrollReveal from "../useScrollReveal";

type Motion = "rise" | "left" | "right" | "focus";

export default function LandingReveal({ children, className = "", motion = "rise", delay = 0 }: { children: ReactNode; className?: string; motion?: Motion; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useScrollReveal(ref, "[data-landing-reveal]", `${motion}:${delay}`);
  return <div ref={ref} className={className} data-landing-reveal={motion} data-scroll-delay={delay}>{children}</div>;
}
