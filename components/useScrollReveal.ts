"use client";

import { useEffect, useRef, type RefObject } from "react";

/** Reveal once; above-the-fold content and focused controls stay immediately visible. */
export default function useScrollReveal(rootRef: RefObject<HTMLElement | null>, selector = "[data-scroll-reveal]", refreshKey: string | number = 0) {
  const visited = useRef(new WeakSet<HTMLElement>());
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !("IntersectionObserver" in window) || !("animate" in Element.prototype)) return;
    const elements = root.matches(selector) ? [root] : Array.from(root.querySelectorAll<HTMLElement>(selector));
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Map<HTMLElement, Animation>();
    let observer: IntersectionObserver | undefined;

    function finish(element: HTMLElement) {
      animations.get(element)?.cancel();
      animations.delete(element);
      observer?.unobserve(element);
      visited.current.add(element);
      element.dataset.scrollState = "visible";
    }
    function clear() {
      observer?.disconnect();
      animations.forEach(animation => animation.cancel());
      animations.clear();
      elements.forEach(element => element.removeAttribute("data-scroll-state"));
    }
    function start() {
      clear();
      if (preference.matches) return;
      const mobile = window.matchMedia("(max-width: 680px)").matches;
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const element = entry.target as HTMLElement;
          observer?.unobserve(element);
          animations.get(element)?.cancel();
          element.dataset.scrollState = "entering";
          const animation = element.animate([
            { opacity: 0, transform: `translate3d(0, ${mobile ? 20 : 28}px, 0)` },
            { opacity: 1, transform: "translate3d(0, 0, 0)" },
          ], { duration: 620, delay: Math.min(120, Math.max(0, Number(element.dataset.scrollDelay) || 0)), easing: "cubic-bezier(.16,1,.3,1)", fill: "both" });
          animations.set(element, animation);
          animation.onfinish = () => finish(element);
        });
      });
      const positions = elements.map(element => element.getBoundingClientRect());
      elements.forEach((element, index) => {
        if (visited.current.has(element) || positions[index].top < window.innerHeight) { finish(element); return; }
        const waiting = element.animate([{ opacity: 0 }, { opacity: 0 }], { duration: 1, fill: "both" });
        waiting.pause();
        waiting.currentTime = 0;
        animations.set(element, waiting);
        element.dataset.scrollState = "waiting";
        observer?.observe(element);
      });
    }
    function revealFocused(event: FocusEvent) {
      if (!(event.target instanceof Node)) return;
      elements.forEach(element => { if (element.contains(event.target as Node)) finish(element); });
    }
    start();
    preference.addEventListener("change", start);
    root.addEventListener("focusin", revealFocused);
    return () => { preference.removeEventListener("change", start); root.removeEventListener("focusin", revealFocused); clear(); };
  }, [rootRef, selector, refreshKey]);
}
