"use client";

import useScrollReveal from "./useScrollReveal";
import { useEffect, useRef, useState } from "react";

import { testimonials } from "@/lib/testimonials";



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
  const initials = name.split(" ").filter(Boolean).slice(0, 2).map((word) => word[0]).join("");
  return (
    <article className="group relative grid h-full min-h-[390px] w-full min-w-0 overflow-hidden rounded-[24px] border border-[#8daee53b] bg-[linear-gradient(125deg,#172d49_0%,#0e1e34_58%,#0a1527_100%)] shadow-[inset_0_1px_0_#c5ddff14,0_22px_65px_#00000026] lg:grid-cols-[1fr_260px]">
      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#88b6ff] to-transparent" />
      <div className="relative flex flex-col p-7 sm:p-10 lg:p-12">
        <div className="flex items-center justify-between gap-4">
          <Rating />
          <span aria-hidden="true" className="font-serif text-[80px] leading-[.55] text-[#87b3f5]/35">“</span>
        </div>
        <blockquote className="mb-1 mt-9 text-[19px] font-medium leading-[1.6] tracking-[-0.025em] text-[#edf3fd] sm:text-[25px] lg:my-auto lg:py-10 lg:text-[28px]">{quote}</blockquote>
      </div>
      <footer className="relative flex items-center gap-4 border-t border-[#a8c5ed24] bg-[#061225]/35 p-6 sm:px-10 lg:flex-col lg:items-start lg:justify-center lg:gap-6 lg:border-l lg:border-t-0 lg:p-9">
        <span aria-hidden="true" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#9ec5ff38] bg-[linear-gradient(135deg,#2e4d75,#142944)] text-[13px] font-medium tracking-[0.06em] text-[#d5e6ff] lg:h-16 lg:w-16 lg:text-[18px]">{initials}</span>
        <div className="min-w-0">
          <strong className="block text-[14px] font-medium leading-snug text-[#edf3fd] lg:text-[17px]">{name}</strong>
          <span className="mt-1.5 block text-[12px] leading-relaxed text-[#a0b4d0] lg:mt-3 lg:text-[13px]">{detail}</span>
          <span className="mt-6 hidden h-px w-10 bg-[#77a5f0]/60 lg:block" />
        </div>
      </footer>
    </article>
  );
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const currentIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(true);
  const hoveringRef = useRef(false);
  const visibleRef = useRef(false);
  const manualUntilRef = useRef(0);

  function pauseForReading() {
    manualUntilRef.current = Date.now() + 14000;
  }

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting;
    }, { threshold: 0.35 });
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const respectPreference = () => { if (preference.matches) setPlaying(false); };
    respectPreference();
    preference.addEventListener("change", respectPreference);
    if (!playing) return () => preference.removeEventListener("change", respectPreference);
    const timer = window.setInterval(() => {
      const track = trackRef.current;
      const first = track?.firstElementChild as HTMLElement | null;
      if (!track || !first || document.hidden || preference.matches || !visibleRef.current || hoveringRef.current || Date.now() < manualUntilRef.current) return;
      const step = first.getBoundingClientRect().width + 16;
      const atLast = track.scrollWidth - track.clientWidth - track.scrollLeft < 2;
      if (atLast) {
        const fade = track.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 180, fill: "forwards" });
        fade.onfinish = () => {
          track.scrollTo({ left: 0, behavior: "instant" });
          fade.cancel();
          track.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 320, easing: "ease-out" });
        };
      } else {
        track.scrollTo({ left: (Math.round(track.scrollLeft / step) + 1) * step, behavior: "smooth" });
      }
    }, 7000);
    return () => {
      window.clearInterval(timer);
      preference.removeEventListener("change", respectPreference);
    };
  }, [playing]);

  useScrollReveal(sectionRef);

  function syncPosition() {
    const track = trackRef.current;
    const first = track?.firstElementChild as HTMLElement | null;
    if (!track || !first) return;
    const step = first.getBoundingClientRect().width + 16;
    const maximum = track.scrollWidth - track.clientWidth;
    const index = Math.min(testimonials.length - 1, Math.round(track.scrollLeft / step));
    currentIndexRef.current = index;
    setActiveIndex(index);
    setAtStart(track.scrollLeft < 2);
    setAtEnd(maximum - track.scrollLeft < 2);
    setProgress(maximum > 0 ? track.scrollLeft / maximum : 1);
  }

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new ResizeObserver(() => {
      const first = track.firstElementChild as HTMLElement | null;
      if (first) {
        track.scrollTo({ left: currentIndexRef.current * (first.getBoundingClientRect().width + 16), behavior: "instant" });
      }
      syncPosition();
    });
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  function moveCarousel(direction: "prev" | "next") {
    pauseForReading();
    const track = trackRef.current;
    const first = track?.firstElementChild as HTMLElement | null;
    if (!track || !first) return;
    const step = first.getBoundingClientRect().width + 16;
    const current = Math.round(track.scrollLeft / step);
    const target = Math.max(0, current + (direction === "next" ? 1 : -1));
    track.scrollTo({
      left: target * step,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }

  return (
    <section
      ref={sectionRef}
      id="testimonios"
      aria-labelledby="testimonios-title"
      className="relative overflow-hidden px-6 py-14 text-[#edf3fd] md:px-10 lg:py-16"
    >
      <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-8">
        <header
          data-scroll-reveal
          className="grid gap-7 lg:grid-cols-[1fr_260px] lg:items-end lg:gap-16"
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
              La voz de quienes ya confiaron en Vialoop.
            </h2>

            <p className="mt-3 max-w-[610px] text-[13.5px] leading-6 text-[#a0b1c9]">
              Diseño, tecnología y acompañamiento, contados por quienes han trabajado con nosotros.
            </p>
          </div>

          <aside className="border-t border-[#a4bce529] pt-5 lg:border-l lg:border-t-0 lg:pb-1 lg:pl-7 lg:pt-0">
            <Rating />
            <p className="mt-3 max-w-[310px] text-[12px] font-normal leading-[1.85] text-[#a0b1c9]">
              <strong className="font-medium text-[#d9e6fa]">Más de 250 proyectos</strong>{" "}
              desarrollados para empresas, comercios y servicios de distintos rubros.
            </p>
          </aside>
        </header>

        <div
          data-scroll-reveal data-scroll-delay="160"
          className="relative"
          onPointerEnter={(event) => { if (event.pointerType === "mouse") hoveringRef.current = true; }}
          onPointerLeave={() => { hoveringRef.current = false; }}
          onPointerDown={pauseForReading}
          onWheel={pauseForReading}
          onFocusCapture={(event) => { if (!(event.target as HTMLElement).closest("[data-carousel-play]")) setPlaying(false); }}
        >
          <div className="mb-4 flex items-center justify-between gap-4">
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#9bacc6]">
              Reseñas destacadas
            </p>

            <div className="flex items-center gap-2">
              <button data-carousel-play type="button" onClick={() => { manualUntilRef.current = 0; setPlaying((value) => !value); }} aria-label={playing ? "Pausar testimonios automáticos" : "Activar testimonios automáticos"} aria-pressed={playing} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#a6c3e535] bg-[#a6c3e50a] text-[#c6d9f3] transition hover:bg-[#a6c3e518] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8fbaff]">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">{playing ? <path d="M7 5h3v14H7zm7 0h3v14h-3z" /> : <path d="m8 5 11 7-11 7z" />}</svg>
              </button>
              {(["prev", "next"] as const).map((direction) => (
                <button
                  key={direction}
                  type="button"
                  onClick={() => moveCarousel(direction)}
                  disabled={direction === "prev" ? atStart : atEnd}
                  aria-controls="testimonios-carrusel"
                  aria-label={direction === "prev" ? "Ver testimonios anteriores" : "Ver más testimonios"}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#a6c3e535] bg-[#a6c3e50a] text-[#c6d9f3] transition duration-300 hover:border-[#8fbaff70] hover:bg-[#a6c3e518] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8fbaff] disabled:cursor-default disabled:opacity-30"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
                    <path d={direction === "prev" ? "M14.5 6.5 9 12l5.5 5.5" : "m9.5 6.5 5.5 5.5-5.5 5.5"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          <div
            id="testimonios-carrusel"
            ref={trackRef}
            role="region"
            aria-roledescription="carrusel"
            aria-label="Reseñas de clientes. Usa las flechas o desliza para recorrerlas"
            tabIndex={0}
            onScroll={syncPosition}
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                event.preventDefault();
                moveCarousel(event.key === "ArrowRight" ? "next" : "prev");
              }
            }}
            className="grid auto-cols-[100%] grid-flow-col items-stretch gap-4 overflow-x-auto overscroll-x-contain snap-x snap-mandatory rounded-[26px] pb-2 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8fbaff]"
          >
            {testimonials.map((item, index) => (
              <div key={item.name} role="group" aria-roledescription="diapositiva" aria-label={`${index + 1} de ${testimonials.length}`} className="min-w-0 snap-start snap-always">
                <Card name={item.name} detail={item.detail} quote={item.quote} />
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-5 text-[10px] tracking-[0.12em] text-[#93a7c4]">
            <span className="shrink-0 tabular-nums" aria-live={playing ? "off" : "polite"} aria-atomic="true">
              <span className="font-medium text-[#e2ebfb]">{String(activeIndex + 1).padStart(2, "0")}</span>
              <span className="mx-2 text-[#526783]">/</span>
              {String(testimonials.length).padStart(2, "0")}
            </span>
            <div className="h-px flex-1 overflow-hidden bg-[#a4bce522]" aria-hidden="true">
              <div className="h-full bg-[#699cff] transition-[width] duration-300 motion-reduce:transition-none" style={{ width: `${(1 / testimonials.length + progress * (1 - 1 / testimonials.length)) * 100}%` }} />
            </div>
            <span className="shrink-0 text-[10px] tracking-normal sm:hidden">Desliza para leer más</span>
          </div>
        </div>
      </div>
    </section>
  );
}
