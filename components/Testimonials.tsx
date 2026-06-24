"use client";

import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    name: "Roberto Herrera A",
    detail: "Constructora Cerro Nevado · Industrial",
    quote:
      "Trabajar con Vialoop ha sido una experiencia muy positiva. Cumplieron plazos, entendieron nuestras necesidades y fortalecieron nuestra imagen corporativa.",
  },
  {
    name: "Osvaldo Morales",
    detail: "GM Especialistas · Servicios técnicos",
    quote:
      "Cumplieron con los plazos, entendieron exactamente lo que necesitábamos y el resultado fue un sitio moderno, rápido y profesional.",
  },
  {
    name: "Horacio Martínez",
    detail: "Power Diesel · Servicios industriales",
    quote:
      "Nos asesoraron desde el inicio, mejoraron la presentación de nuestros servicios y dejaron todo funcionando perfecto.",
  },
  {
    name: "Vanesa Castillo Panta",
    detail: "Transporte Castillo · Transporte",
    quote:
      "Comprendieron lo que queríamos comunicar a nuestros clientes y fortalecieron nuestra presencia digital.",
  },
  {
    name: "Alejandro Huerta",
    detail: "Rohuer Ingeniería · Ingeniería",
    quote:
      "Lograron un diseño moderno, profesional y con una navegación más fluida.",
  },
  {
    name: "Georgi Petricio",
    detail: "GSP Eco Lavados Industriales · Lavado industrial",
    quote:
      "El trabajo fue realizado dentro de los plazos acordados y con una calidad que superó nuestras expectativas.",
  },
  {
    name: "Manuel General",
    detail: "Funeraria Pérez · Servicios",
    quote:
      "Estamos encantados con el resultado, un trabajo profesional y una atención amable durante todo el proceso.",
  },
  {
    name: "Omar Jaque",
    detail: "Motel Elegance · Hotelería",
    quote:
      "Lograron captar la esencia de Motel Elegance y mostrar mejor nuestras habitaciones y servicios.",
  },
  {
    name: "Arriendo de grúas horquilla",
    detail: "Google · Hace 18 horas",
    quote:
      "Muy buen trabajo, comunicación efectiva en todo momento. Conformes con nuestra pagina web.",
  },
  {
    name: "Sebastián Araya",
    detail: "Google · Hace 18 horas",
    quote:
      "Excelente servicio y comunicación al momento de ir diseñando la pagina web, recomendado 👌🏻",
  },
  {
    name: "teninson araya escobar",
    detail: "Google · Hace 24 horas",
    quote: "muy buen servicio todo profesional empresa seria",
  },
  {
    name: "Camila Fuentes Díaz",
    detail: "Google · Hace 22 semanas",
    quote:
      "Muy recomendable, cuentan con una excelente asistencia en todo el proceso. El compromiso y trabajo que ofrecen es totalmente profesional.",
  },
];

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
      <span className="text-slate-400">5.0</span>
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
    <article className="group relative flex h-[228px] w-[332px] shrink-0 flex-col overflow-hidden rounded-[26px] border border-slate-200/80 bg-white/90 p-5 shadow-[0_18px_52px_rgba(7,21,45,.065)] backdrop-blur transition-[transform,box-shadow,border-color,background-color] duration-700 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-[3px] hover:border-blue-500/20 hover:bg-white hover:shadow-[0_26px_70px_rgba(7,21,45,.11)]">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white via-white to-blue-600/[0.025] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

      <div className="absolute left-5 top-0 h-[3px] w-12 rounded-full bg-gradient-to-r from-[#07152d] via-[#2458f4] to-[#4f86ff] transition-[width] duration-700 group-hover:w-16" />

      <div className="relative z-10 mb-4 flex items-start justify-between gap-5">
        <Rating />

        <span className="select-none text-[38px] font-black leading-none text-slate-100">
          ”
        </span>
      </div>

      <p className="relative z-10 line-clamp-4 text-[13.5px] font-bold leading-[1.68] tracking-[-0.018em] text-[#07152d]">
        “{quote}”
      </p>

      <div className="relative z-10 mt-auto pt-5">
        <div className="mb-3 h-px w-full bg-gradient-to-r from-slate-200 via-slate-200 to-transparent" />

        <strong className="block text-[13.5px] font-black leading-tight text-[#07152d]">
          {name}
        </strong>

        <span className="mt-1 block text-[11.5px] font-bold leading-tight text-slate-500">
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

  const [visible, setVisible] = useState(false);
  const [count, setCount] = useState(0);

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

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;

        setVisible(true);
        observer.disconnect();

        if (reducedMotion) {
          setCount(250);
        }
      },
      {
        threshold: 0.22,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
      setCount(250);
      return;
    }

    let frame = 0;
    const duration = 1500;
    const start = performance.now();

    function animate(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setCount(Math.round(eased * 250));

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    }

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, [visible]);

  useEffect(() => {
    const updateLoopWidth = () => {
      loopWidthRef.current = testimonials.length * CARD_STEP;
    };

    updateLoopWidth();

    window.addEventListener("resize", updateLoopWidth);

    return () => window.removeEventListener("resize", updateLoopWidth);
  }, []);

  useEffect(() => {
    if (!visible) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) return;

    const speed = 0.028;

    function animate(now: number) {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = now;
      }

      const delta = now - lastTimeRef.current;
      lastTimeRef.current = now;

      if (!pausedRef.current && !manualMoveRef.current) {
        const nextOffset = normalizeOffset(offsetRef.current - delta * speed);
        offsetRef.current = nextOffset;
        applyTransform(nextOffset);
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    }

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [visible]);

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

  const reveal = visible
    ? "translate-y-0 opacity-100 blur-0"
    : "translate-y-6 opacity-0 blur-[2px]";

  return (
    <section
      ref={sectionRef}
      id="testimonios"
      aria-labelledby="testimonios-title"
      className="relative isolate flex min-h-[720px] items-center overflow-hidden bg-[#f7f9fd] px-6 py-20 text-[#07152d] md:px-10 lg:py-24"
    >
      <div className="pointer-events-none absolute inset-0 -z-30 bg-[radial-gradient(circle_at_12%_8%,rgba(36,88,244,.06),transparent_30%),radial-gradient(circle_at_92%_58%,rgba(15,23,42,.035),transparent_34%),linear-gradient(180deg,#ffffff_0%,#f7f9fd_100%)]" />

      <div className="pointer-events-none absolute inset-0 -z-20 opacity-[0.38] [background-image:linear-gradient(rgba(37,99,235,.032)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,.032)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:linear-gradient(180deg,transparent_0%,black_18%,black_82%,transparent_100%)]" />

      <div className="pointer-events-none absolute right-[-140px] top-1/2 -z-10 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-blue-600/[0.05] blur-3xl" />

      <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-8">
        <header
          className={`grid gap-6 transition-all duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] lg:grid-cols-[1fr_320px] lg:items-end ${reveal}`}
        >
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-9 bg-[#07152d]/40" />
              <span className="text-[10px] font-black uppercase tracking-[0.28em] text-slate-500">
                Testimonios
              </span>
            </div>

            <h2
              id="testimonios-title"
              className="max-w-[660px] text-[clamp(29px,3.25vw,46px)] font-black leading-[0.98] tracking-[-0.055em] text-[#07152d]"
            >
              Empresas del norte de Chile ya confiaron en Vialoop.
            </h2>

            <p className="mt-3 max-w-[610px] text-[13.5px] leading-6 text-slate-600">
              Opiniones reales de clientes que necesitaban mejorar su presencia
              digital, ordenar su imagen y comunicar mejor sus servicios.
            </p>
          </div>

          <aside className="relative overflow-hidden rounded-[26px] border border-slate-200 bg-white/88 p-5 shadow-[0_18px_48px_rgba(7,21,45,.07)] backdrop-blur">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(280px_140px_at_100%_0%,rgba(37,99,235,.09),transparent_62%)]" />

            <div className="relative z-10">
              <Rating />

              <div className="mt-5 flex items-end gap-2">
                <strong className="text-[48px] font-black leading-none tracking-[-0.07em] text-[#07152d]">
                  {count}
                </strong>

                <span className="mb-1.5 text-[25px] font-black leading-none text-blue-600">
                  +
                </span>
              </div>

              <p className="mt-3 max-w-[250px] text-[13px] font-bold leading-6 text-slate-600">
                proyectos desarrollados para empresas industriales, servicios y
                negocios del norte de Chile.
              </p>
            </div>
          </aside>
        </header>

        <div
          className={`relative transition-all delay-150 duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] ${
            visible
              ? "translate-y-0 opacity-100 blur-0"
              : "translate-y-8 opacity-0 blur-[2px]"
          }`}
        >
          <div className="mb-4 flex items-center justify-between gap-4">
            <p className="text-[12px] font-black uppercase tracking-[0.18em] text-slate-400">
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
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-[0_14px_30px_rgba(37,99,235,.22)] transition hover:-translate-y-0.5 hover:bg-blue-700"
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
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-[0_14px_30px_rgba(37,99,235,.22)] transition hover:-translate-y-0.5 hover:bg-blue-700"
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