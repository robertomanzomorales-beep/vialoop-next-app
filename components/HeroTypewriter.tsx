"use client";

import { useEffect, useRef } from "react";
import styles from "./Hero.module.css";

const phrases = [
  "a medida de tu empresa.",
  "pensado para tu equipo.",
  "conectado a tu operación.",
];

export default function HeroTypewriter() {
  const rootRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const text = textRef.current;
    if (!root || !text || !("IntersectionObserver" in window)) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: ReturnType<typeof setTimeout> | undefined;
    let visible = false;
    let index = 0;
    let length = Array.from(phrases[0]).length;
    let deleting = true;

    function stop() {
      clearTimeout(timer);
      root!.removeAttribute("data-typing-active");
    }

    function tick() {
      if (!visible || document.hidden || preference.matches) return;
      const letters = Array.from(phrases[index]);
      length += deleting ? -1 : 1;
      text!.textContent = letters.slice(0, length).join("");
      let delay = deleting ? 29 : 58;

      if (length === 0) {
        index = (index + 1) % phrases.length;
        deleting = false;
        delay = 280;
      } else if (length === letters.length && !deleting) {
        deleting = true;
        delay = 2500;
      }
      timer = setTimeout(tick, delay);
    }

    function sync() {
      stop();
      if (preference.matches) {
        index = 0;
        length = Array.from(phrases[0]).length;
        deleting = true;
        text!.textContent = phrases[0];
        return;
      }
      if (visible && !document.hidden) {
        root!.dataset.typingActive = "true";
        timer = setTimeout(tick, length === Array.from(phrases[index]).length ? 2500 : 100);
      }
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    }, { threshold: .2 });
    observer.observe(root);
    document.addEventListener("visibilitychange", sync);
    preference.addEventListener("change", sync);
    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      preference.removeEventListener("change", sync);
    };
  }, []);

  return (
    <em ref={rootRef} className={styles.typingLine} aria-hidden="true">
      <span className={styles.typingSizer} aria-hidden="true">conectado a tu operación.<span className={styles.cursorSpace} /></span>
      <span className={styles.typedPhrase} aria-hidden="true"><span ref={textRef} data-hero-typed>{phrases[0]}</span><span className={styles.typingCursor} /></span>
    </em>
  );
}
