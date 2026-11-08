"use client";

import useScrollReveal from "./useScrollReveal";
import { useEffect, useRef, useState } from "react";

import { testimonials } from "@/lib/testimonials";


const CARD_WIDTH = 332;
const CARD_GAP = 16;
const CARD_STEP = CARD_WIDTH + CARD_GAP;

function Rating() {
  return (
    <div
      className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em] text-[#b88700]"
      aria-label="5 estrellas"
    >
      <span className="text-[13px] leading-none tracking-[0.08em] text-[#f4b400]">
        ★★★★★
      </span>
      <span className="text-[#9bacc6]">5.0</span>
    </div>
  );
}

function Card({
  name,
  detail,
  quote,
}: {
  name: string;
  detail: string;
  quote: string;
}) {
  return (
    <article className="group relative flex h-[228px] w-[332px] shrink-0 flex-col overflow-hidden rounded-[26px] border border-[#a4bce524] bg-[#112039]/55 p-5 shadow-[0_18px_52px_rgba(7,21,45,.065)] backdrop-blur transition-[transform,box-shadow,border-color,background-color] duration-700 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-[3px] hover:border-[#8fbaff57] hover:bg-[#142b44]/75 hover:shadow-[0_26px_70px_rgba(7,21,45,.11)]">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-400/[0.025] via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

      <div className="absolute left-5 top-0 h-[3px] w-12 rounded-full bg-gradient-to-r from-[#07152d] via-[#2458f4] to-[#4f86ff] transition-[width] duration-700 group-hover:w-16" />

      <div className="relative z-10 mb-4 flex items-start justify-between gap-5">
        <Rating />

        <span className="select-none text-[38px] font-black leading-none text-[#7b9ac344]">
          ”
        </span>
      </div>

      <p className="relative z-10 line-clamp-4 text-[13.5px] font-normal leading-[1.68] tracking-[-0.018em] text-[#e2ebfb]">
        “{quote}”
      </p>

      <div className="relative z-10 mt-auto pt-5">
        <div className="mb-3 h-px w-full bg-gradient-to-r from-[#9db8e32b] via-[#9db8e314] to-transparent" />

        <strong className="block text-[13.5px] font-medium leading-tight text-[#e2ebfb]">
          {name}
        </strong>

        <span className="mt-1 block text-[11.5px] font-normal leading-tight text-[#93a7c4]">
          {detail}
        </span>
      </div>
    </article>
  );
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const animationFrameRef = useRef<number | null>(null);
  const manualFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const loopWidthRef = useRef(testimonials.length * CARD_STEP);
  const pausedRef = useRef(false);
  const manualMoveRef = useRef(false);

  useScrollReveal(sectionRef);
  const [visible, setVisible] = useState(false);

  function applyTransform(value: number) {
    const track = trackRef.current;
    if (!track) return;

    track.style.transform = `translate3d(${value}px, 0, 0)`;
  }

  function normalizeOffset(value: number) {
    const loopWidth = loopWidthRef.current;

    if (!loopWidth) return value;

    if (value <= -loopWidth) {
      return value + loopWidth;
    }

    if (value > 0) {
      return value - loopWidth;
    }

    return value;
  }

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const speed = 0.028;
    function animate(now: number) {
      const delta = lastTimeRef.current === null ? 0 : Math.min(now - lastTimeRef.current, 50);
      lastTimeRef.current = now;
      if (!pausedRef.current && !manualMoveRef.current) {
        offsetRef.current = normalizeOffset(offsetRef.current - delta * speed);
        applyTransform(offsetRef.current);
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    }
    function sync() {
      if (animationFrameRef.current !== null) cancelAnimationFrame(animationFrameRef.current);
      lastTimeRef.current = null;
      if (!document.hidden && !preference.matches) animationFrameRef.current = requestAnimationFrame(animate);
    }
    sync();
    document.addEventListener("visibilitychange", sync);
    preference.addEventListener("change", sync);
    return () => {
      if (animationFrameRef.current !== null) cancelAnimationFrame(animationFrameRef.current);
      lastTimeRef.current = null;
      document.removeEventListener("visibilitychange", sync);
      preference.removeEventListener("change", sync);
    };
  }, [visible]);

  useEffect(() => () => {
    if (manualFrameRef.current !== null) cancelAnimationFrame(manualFrameRef.current);
  }, []);

  function moveCarousel(direction: "prev" | "next") {
    if (manualFrameRef.current) {
      cancelAnimationFrame(manualFrameRef.current);
    }

    const from = offsetRef.current;
    const distance = direction === "next" ? -CARD_STEP : CARD_STEP;
    const to = from + distance;
    const duration = 420;
    const start = performance.now();

    manualMoveRef.current = true;

    function animate(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const nextOffset = normalizeOffset(from + distance * eased);

      offsetRef.current = nextOffset;
      applyTransform(nextOffset);

      if (progress < 1) {
        manualFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      offsetRef.current = normalizeOffset(to);
      applyTransform(offsetRef.current);
      manualMoveRef.current = false;
      lastTimeRef.current = performance.now();
    }

    manualFrameRef.current = requestAnimationFrame(animate);
  }

  return (
    <section
      ref={sectionRef}
      id="testimonios"
      aria-labelledby="testimonios-title"
      className="relative flex min-h-[660px] items-center overflow-hidden px-6 py-20 text-[#edf3fd] md:px-10 lg:py-24"
    >
      <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-8">
        <header
          data-scroll-reveal
          className="grid gap-6 lg:grid-cols-[1fr_320px] lg:items-end"
        >
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-9 bg-[#8fb1e7]/60" />
              <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#93a7c4]">
                Testimonios
              </span>
            </div>

            <h2
              id="testimonios-title"
              className="max-w-[660px] text-[length:var(--font-section-title)] font-semibold leading-[1.2] tracking-[-0.03em] text-[#e2ebfb]"
            >
              Empresas del norte de Chile ya confiaron en Vialoop.
            </h2>

            <p className="mt-3 max-w-[610px] text-[13.5px] leading-6 text-[#a0b1c9]">
              Opiniones reales de clientes que necesitaban mejorar su presencia
              digital, ordenar su imagen y comunicar mejor sus servicios.
            </p>
          </div>

          <aside className="relative overflow-hidden rounded-[26px] border border-[#a4bce529] bg-[#102039]/50 p-5 shadow-[0_18px_48px_rgba(7,21,45,.07)] backdrop-blur">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(280px_140px_at_100%_0%,rgba(37,99,235,.09),transparent_62%)]" />

            <div className="relative z-10">
              <Rating />

              <div className="mt-5 flex items-end gap-2">
                <strong className="text-[44px] font-semibold leading-none tracking-[-0.07em] text-[#e2ebfb]">
                  250
                </strong>

                <span className="mb-1.5 text-[25px] font-black leading-none text-blue-600">
                  +
                </span>
              </div>

              <p className="mt-3 max-w-[250px] text-[13px] font-normal leading-6 text-[#a0b1c9]">
                proyectos desarrollados para empresas, comercios y
                servicios de distintos rubros.
              </p>
            </div>
          </aside>
        </header>

        <div
          data-scroll-reveal data-scroll-delay="160"
          className="relative"
        >
          <div className="mb-4 flex items-center justify-between gap-4">
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#9bacc6]">
              Reseñas destacadas
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => moveCarousel("prev")}
                onMouseEnter={() => {
                  pausedRef.current = true;
                }}
                onMouseLeave={() => {
                  pausedRef.current = false;
                  lastTimeRef.current = performance.now();
                }}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#a6c3e535] bg-[#a6c3e50a] text-[#c6d9f3] transition hover:bg-[#a6c3e518]"
                aria-label="Ver testimonios anteriores"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M14.5 6.5 9 12l5.5 5.5"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <button
                type="button"
                onClick={() => moveCarousel("next")}
                onMouseEnter={() => {
                  pausedRef.current = true;
                }}
                onMouseLeave={() => {
                  pausedRef.current = false;
                  lastTimeRef.current = performance.now();
                }}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#a6c3e535] bg-[#a6c3e50a] text-[#c6d9f3] transition hover:bg-[#a6c3e518]"
                aria-label="Ver más testimonios"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="m9.5 6.5 5.5 5.5-5.5 5.5"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div
            onMouseEnter={() => {
              pausedRef.current = true;
            }}
            onMouseLeave={() => {
              pausedRef.current = false;
              lastTimeRef.current = performance.now();
            }}
            className="relative w-full overflow-hidden py-3 [mask-image:linear-gradient(90deg,transparent_0%,black_7%,black_93%,transparent_100%)]"
            aria-label="Slider de testimonios"
          >
            <div
              ref={trackRef}
              className="flex w-max gap-4 will-change-transform"
              style={{
                transform: "translate3d(0, 0, 0)",
                backfaceVisibility: "hidden",
              }}
            >
              {[...testimonials, ...testimonials, ...testimonials].map(
                (item, index) => (
                  <Card
                    key={`${item.name}-${index}`}
                    name={item.name}
                    detail={item.detail}
                    quote={item.quote}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}