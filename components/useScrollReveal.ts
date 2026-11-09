"use client";

import { useLayoutEffect, useRef, type RefObject } from "react";

/** One restrained entrance per visit; cancellation and focus restore the original content. */
export default function useScrollReveal(rootRef: RefObject<HTMLElement | null>, selector = "[data-scroll-reveal]", refreshKey: string | number = 0) {
  const visited = useRef(new WeakSet<HTMLElement>());
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || !("IntersectionObserver" in window) || !("animate" in Element.prototype)) return;
    const elements = root.matches(selector) ? [root] : Array.from(root.querySelectorAll<HTMLElement>(selector));
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Map<HTMLElement, Animation>();
    let observer: IntersectionObserver | undefined;
    const tokens = getComputedStyle(root);
    const durationToken = tokens.getPropertyValue("--entrance-duration").trim();
    const durationValue = parseFloat(durationToken);
    // Production CSS may normalize 1050ms to 1.05s; Web Animations always expects milliseconds.
    const duration = Number.isFinite(durationValue)
      ? Math.max(0, durationValue * (durationToken.endsWith("ms") ? 1 : 1000))
      : 1050;
    const easing = tokens.getPropertyValue("--entrance-ease").trim() || "cubic-bezier(.33,0,.2,1)";
    const distance = parseFloat(tokens.getPropertyValue("--entrance-distance")) || 12;

    function state(element: HTMLElement, value?: string) {
      if (value !== "entering") delete element.dataset.initialEntrance;
      if (value) element.dataset.scrollState = value;
      else delete element.dataset.scrollState;
      if (element.hasAttribute("data-landing-reveal")) {
        if (value) element.dataset.landingRevealState = value;
        else delete element.dataset.landingRevealState;
      }
    }

    function finish(element: HTMLElement) {
      animations.get(element)?.cancel();
      animations.delete(element);
      observer?.unobserve(element);
      visited.current.add(element);
      state(element, "visible");
    }
    function clear() {
      observer?.disconnect();
      observer = undefined;
      animations.forEach(animation => animation.cancel());
      animations.clear();
      elements.forEach(element => state(element));
    }
    function enter(element: HTMLElement, initial?: Animation) {
      if (visited.current.has(element)) return;
      observer?.unobserve(element);
      animations.get(element)?.cancel();
      // Keep the first-paint CSS entrance running through hydration, without restarting it.
      if (initial) {
        if (initial.playState === "finished") { finish(element); return; }
        element.dataset.initialEntrance = "";
        state(element, "entering");
        animations.set(element, initial);
        initial.onfinish = () => finish(element);
        return;
      }
      const motion = element.dataset.scrollMotion ?? element.dataset.landingReveal ?? "rise";
      const transform = motion === "left" ? `translate3d(-${distance * .65}px,4px,0)`
        : motion === "right" ? `translate3d(${distance * .65}px,4px,0)`
        : `translate3d(0,${motion === "focus" ? distance * .5 : distance}px,0)`;
      state(element, "entering");
      const animation = element.animate([
        { opacity: 0, transform },
        { opacity: 1, transform: "translate3d(0,0,0)" },
      ], { duration, delay: Math.min(240, Math.max(0, Number(element.dataset.scrollDelay) || 0)), easing, fill: "both" });
      animations.set(element, animation);
      animation.onfinish = () => finish(element);
    }
    function start() {
      clear();
      if (preference.matches) { elements.forEach(finish); return; }
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          enter(entry.target as HTMLElement);
        });
      }, { threshold: .04, rootMargin: "0px 0px -24px 0px" });
      const positions = elements.map(element => element.getBoundingClientRect());
      const initialAnimations = elements.map(element => element.getAnimations().find(animation => "animationName" in animation && animation.animationName === "vialoop-entry"));
      elements.forEach((element, index) => {
        const position = positions[index];
        if (visited.current.has(element) || element.contains(document.activeElement)) { finish(element); return; }
        if (position.bottom > 0 && position.top < window.innerHeight - 24) { enter(element, initialAnimations[index]); return; }
        const waiting = element.animate([{ opacity: 0 }, { opacity: 0 }], { duration: 1, fill: "both" });
        waiting.pause();
        waiting.currentTime = 0;
        animations.set(element, waiting);
        state(element, "waiting");
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
