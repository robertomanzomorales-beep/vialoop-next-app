"use client";
import { useEffect, useRef, type RefObject } from "react";

/** Progressive enhancement: content remains readable without JS or animation support. */
export default function useScrollReveal(
  rootRef: RefObject<HTMLElement | null>,
  selector = "[data-scroll-reveal]",
  refreshKey: string | number = 0,
) {
  const visited = useRef(new WeakSet<HTMLElement>());
  useEffect(() => {
    const root = rootRef.current;
    if (
      !root ||
      !("IntersectionObserver" in window) ||
      !("animate" in Element.prototype)
    )
      return;
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
    }
    function start() {
      clear();
      if (preference.matches) return;
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const element = entry.target as HTMLElement;
            observer?.unobserve(element);
            if (visited.current.has(element)) return;
            visited.current.add(element);
            animations.get(element)?.cancel();
            const delay = Math.min(
              180,
              Math.max(0, Number(element.dataset.scrollDelay) || 0),
            );
            const animation = element.animate(
              [
                { opacity: 0, transform: "translate3d(0,22px,0)" },
                { opacity: 1, transform: "none" },
              ],
              {
                duration: 680,
                delay,
                easing: "cubic-bezier(.22,1,.36,1)",
                fill: "both",
              },
            );
            animations.set(element, animation);
            animation.onfinish = () => {
              if (animations.get(element) === animation) {
                animations.delete(element);
                animation.cancel();
              }
            };
          });
        },
        { threshold: 0.06, rootMargin: "0px 0px -16px 0px" },
      );
      elements.forEach((element) => {
        if (visited.current.has(element)) return;
        if (element.getBoundingClientRect().top > window.innerHeight) {
          const pending = element.animate([{ opacity: 0 }, { opacity: 0 }], {
            duration: 1,
            fill: "both",
          });
          pending.pause();
          pending.currentTime = 0;
          animations.set(element, pending);
        }
        observer?.observe(element);
      });
    }
    function revealFocused(event: FocusEvent) {
      if (!(event.target instanceof Node)) return;
      const target = event.target;
      elements.forEach((element) => {
        if (element.contains(target)) {
          visited.current.add(element);
          observer?.unobserve(element);
          animations.get(element)?.cancel();
          animations.delete(element);
        }
      });
    }
    start();
    preference.addEventListener("change", start);
    root.addEventListener("focusin", revealFocused);
    return () => {
      clear();
      preference.removeEventListener("change", start);
      root.removeEventListener("focusin", revealFocused);
    };
  }, [rootRef, selector, refreshKey]);
}
