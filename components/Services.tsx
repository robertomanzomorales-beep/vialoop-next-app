"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Service = {
  titleLines: string[];
  text: string;
  image: string;
};

const services: Service[] = [
  {
    titleLines: ["Web para", "empresas"],
    text: "Diseñamos sitios web claros, rápidos y bien estructurados con React y tecnologías modernas. Ordenamos tus servicios, reforzamos la confianza y dejamos el camino simple para que el cliente cotice, llame o escriba.",
    image: "/web-para-empresas.webp",
  },
  {
    titleLines: ["Automatización", "de procesos"],
    text: "Desarrollamos plataformas a medida para ordenar registros, tareas y flujos internos. Integramos bases de datos, paneles y herramientas que reducen trabajo manual sin hacer más compleja la operación.",
    image: "/automatizacion-flujo-de-trabajo.webp",
  },
  {
    titleLines: ["Google y", "visibilidad"],
    text: "Mejoramos cómo aparece tu empresa en Google, Maps y resultados de búsqueda. Trabajamos estructura SEO, presencia local, medición y campañas para que tus servicios sean más fáciles de encontrar.",
    image: "/google-y-visibilidad.webp",
  },
  {
    titleLines: ["Material", "comercial"],
    text: "Creamos brochures, presentaciones y piezas corporativas para reuniones, licitaciones y ventas. Cuidamos que el material se vea consistente, profesional y fácil de entender para tus clientes.",
    image: "/web-para-empresas-recortado.webp",
  },
];

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function Services() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);

  const [headerVisible, setHeaderVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;

    if (!section || !cards) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
      setHeaderVisible(true);
      setCardsVisible(true);
      return;
    }

    const headerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setHeaderVisible(true);
          headerObserver.disconnect();
        }
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -6% 0px",
      }
    );

    const cardsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setCardsVisible(true);
          cardsObserver.disconnect();
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    headerObserver.observe(section);
    cardsObserver.observe(cards);

    return () => {
      headerObserver.disconnect();
      cardsObserver.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="servicios"
      aria-labelledby="servicios-title"
      className="relative isolate scroll-mt-[104px] overflow-hidden bg-[#030814] px-6 py-16 text-white md:px-10 md:py-20 lg:py-20"
    >
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(180deg,#030814_0%,#071426_48%,#030814_100%)]" />

      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03] [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(180deg,transparent_0%,black_22%,black_78%,transparent_100%)]" />

      <div className="mx-auto w-full max-w-[1340px]">
        <header
          className={cx(
            "mb-9 grid gap-7 transition-opacity duration-700 ease-out lg:mb-10 lg:grid-cols-[minmax(0,1fr)_500px] lg:items-end",
            headerVisible ? "opacity-100" : "opacity-0"
          )}
        >
          <div>
            <div className="mb-4 flex items-center gap-4">
              <span className="h-px w-9 bg-white/35" />
              <span className="text-[10px] font-black uppercase tracking-[0.28em] text-white/55">
                Cómo te ayudamos
              </span>
            </div>

            <h2
              id="servicios-title"
              className="max-w-[860px] text-[clamp(32px,3.55vw,56px)] font-black leading-[1.03] tracking-[-0.058em] text-white [text-wrap:balance]"
            >
              Tu empresa ya transmite una impresión online.{" "}
              <span className="text-white/62">
                La pregunta es si te ayuda o te perjudica.
              </span>
            </h2>
          </div>

          <p className="max-w-[500px] border-l border-white/10 pl-6 text-[14px] font-medium leading-7 text-white/60">
            Cuando un cliente busca tu empresa, revisa tu web o recibe tu
            presentación, se forma una opinión antes de contactarte. En Vía Loop
            ordenamos esa primera impresión para que tu negocio se vea{" "}
            <strong className="font-black text-white">
              claro, profesional y confiable.
            </strong>
          </p>
        </header>

        <div ref={cardsRef} className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => (
            <article
              key={service.titleLines.join(" ")}
              className={cx(
                "group flex min-h-[302px] flex-col rounded-[24px] border border-white/[0.095] bg-white/[0.035] px-6 py-6 transition-[background-color,border-color,box-shadow,opacity] duration-300 ease-out hover:border-white/[0.18] hover:bg-white/[0.052] hover:shadow-[0_22px_54px_rgba(0,0,0,.24)]",
                cardsVisible ? "opacity-100" : "opacity-0"
              )}
              style={{
                transitionDelay: cardsVisible ? `${index * 70}ms` : "0ms",
              }}
            >
              <h3 className="text-[22px] font-black leading-[1.02] tracking-[-0.05em] text-white md:text-[23px]">
                {service.titleLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h3>

              <p className="mt-5 text-[13.5px] font-medium leading-[1.72] text-white/58">
                {service.text}
              </p>

              <div className="mt-auto border-t border-white/[0.075] pt-5">
                <Image
                  src={service.image}
                  alt={`Herramientas utilizadas en ${service.titleLines.join(
                    " "
                  )}`}
                  width={320}
                  height={90}
                  className="h-auto max-h-[34px] w-auto max-w-full object-contain opacity-72 saturate-90 transition duration-300 group-hover:opacity-95 group-hover:saturate-100"
                  sizes="(min-width: 1280px) 230px, (min-width: 768px) 40vw, 78vw"
                  priority={index === 0}
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
