"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Motion = "rise" | "left" | "right" | "focus";

/** A single entrance per mount; cancellation always restores the server-rendered content. */
export default function LandingReveal({ children, className = "", motion = "rise", delay = 0 }: { children: ReactNode; className?: string; motion?: Motion; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element || !("IntersectionObserver" in window) || !("animate" in Element.prototype)) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 700px)").matches;
    let animation: Animation | undefined;
    let finished = false;
    let observer: IntersectionObserver | undefined;

    function finish() {
      finished = true;
      animation?.cancel();
      element!.dataset.landingRevealState = "visible";
      observer?.disconnect();
    }
    function enter() {
      if (finished) return;
      observer?.disconnect();
      animation?.cancel();
      if (preference.matches) { finish(); return; }
      const distance = mobile ? 46 : 78;
      const transform = motion === "left" ? `translate3d(-${distance}px,24px,0)` : motion === "right" ? `translate3d(${distance}px,24px,0)` : motion === "focus" ? "translate3d(0,36px,0) scale(.95)" : `translate3d(0,${distance}px,0)`;
      element!.dataset.landingRevealState = "entering";
      animation = element!.animate([
        { opacity: 0, transform, filter: `blur(${mobile ? 2 : 4}px)` },
        { opacity: 1, transform: "translate3d(0,0,0) scale(1)", filter: "blur(0px)" },
      ], { duration: mobile ? 900 : 1150, delay: Math.min(delay, 280), easing: "cubic-bezier(.16,1,.3,1)", fill: "both" });
      animation.onfinish = finish;
    }
    function focused() { finish(); }
    function changed() { if (preference.matches) finish(); }

    if (preference.matches || element.getBoundingClientRect().bottom < 0) {
      finish();
    } else {
      element.dataset.landingRevealState = "waiting";
      animation = element.animate([{ opacity: 0 }, { opacity: 0 }], { duration: 1, fill: "both" });
      animation.pause();
      animation.currentTime = 0;
      observer = new IntersectionObserver(entries => { if (entries.some(entry => entry.isIntersecting)) enter(); }, { threshold: .08, rootMargin: "0px 0px -28px 0px" });
      observer.observe(element);
    }
    element.addEventListener("focusin", focused);
    preference.addEventListener("change", changed);
    return () => { observer?.disconnect(); animation?.cancel(); element.removeEventListener("focusin", focused); preference.removeEventListener("change", changed); delete element.dataset.landingRevealState; };
  }, [motion, delay]);
  return <div ref={ref} className={className} data-landing-reveal={motion}>{children}</div>;
}
