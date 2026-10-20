"use client";

import { useEffect, useRef, type RefObject } from "react";

/** Cancelling an animation restores visible content, including on route changes. */
export default function useScrollReveal(
  rootRef: RefObject<HTMLElement | null>,
  selector = "[data-scroll-reveal]",
  refreshKey: string | number = 0,
) {
  const visited = useRef(new WeakSet<HTMLElement>());

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !("IntersectionObserver" in window) || !("animate" in Element.prototype)) return;
    const elements = root.matches(selector)
      ? [root]
      : Array.from(root.querySelectorAll<HTMLElement>(selector));
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Map<HTMLElement, Animation>();
    let observer: IntersectionObserver | undefined;

    function clear() {
      observer?.disconnect();
      animations.forEach((animation) => animation.cancel());
      animations.clear();
      elements.forEach((element) => element.removeAttribute("data-scroll-state"));
    }

    function prepare(element: HTMLElement) {
      animations.get(element)?.cancel();
      // Keep the observation box still while waiting outside the viewport.
      const animation = element.animate([{ opacity: 0 }, { opacity: 0 }], { duration: 1, fill: "both" });
      animation.pause();
      animation.currentTime = 0;
      animations.set(element, animation);
      element.dataset.scrollState = "waiting";
    }

    function enter(element: HTMLElement) {
      animations.get(element)?.cancel();
      const distance = window.matchMedia("(max-width: 680px)").matches ? 26 : 40;
      const delay = Math.min(180, Math.max(0, Number(element.dataset.scrollDelay) || 0));
      const animation = element.animate([
        { opacity: 0, transform: `translate3d(0, ${distance}px, 0)` },
        { opacity: 1, transform: "translate3d(0, 0, 0)" },
      ], { duration: 950, delay, easing: "cubic-bezier(.25,.46,.35,1)", fill: "both" });
      element.dataset.scrollState = "entering";
      visited.current.add(element);
      animation.onfinish = () => {
        if (animations.get(element) !== animation) return;
        animations.delete(element);
        animation.cancel();
        element.dataset.scrollState = "visible";
        const rect = element.getBoundingClientRect();
        if (rect.bottom <= 0 || rect.top >= window.innerHeight) prepare(element);
      };
      animations.set(element, animation);
    }

    function start() {
      clear();
      if (preference.matches) return;
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            if (element.dataset.scrollState === "waiting") enter(element);
          } else if (element.dataset.scrollState !== "entering") {
            prepare(element);
          }
        });
      }, { threshold: 0 });
      const positions = elements.map((element) => element.getBoundingClientRect());
      elements.forEach((element, index) => {
        element.dataset.scrollReveal = "";
        const rect = positions[index];
        if (!visited.current.has(element) || rect.bottom <= 0 || rect.top >= window.innerHeight) prepare(element);
        observer?.observe(element);
      });
    }

    function revealFocused(event: FocusEvent) {
      const target = event.target;
      if (!(target instanceof Node)) return;
      elements.forEach((element) => {
        if (!element.contains(target)) return;
        animations.get(element)?.cancel();
        animations.delete(element);
        element.dataset.scrollState = "visible";
      });
    }

    start();
    preference.addEventListener("change", start);
    root.addEventListener("focusin", revealFocused);
    return () => {
      preference.removeEventListener("change", start);
      root.removeEventListener("focusin", revealFocused);
      clear();
    };
  }, [rootRef, selector, refreshKey]);
}
