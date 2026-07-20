"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./Services.module.css";

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

const totalRevealElements = services.length + 3;

export default function Services() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const revealRefs = useRef<Array<HTMLElement | null>>([]);
  const [visibleItems, setVisibleItems] = useState<boolean[]>(
    Array(totalRevealElements).fill(false),
  );

  useEffect(() => {
    const elements = revealRefs.current.filter(
      (element): element is HTMLElement => element !== null,
    );

    if (!elements.length) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      setVisibleItems(Array(totalRevealElements).fill(true));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const itemIndex = Number(entry.target.dataset.revealIndex);

          setVisibleItems((currentItems) => {
            if (currentItems[itemIndex]) return currentItems;

            const updatedItems = [...currentItems];
            updatedItems[itemIndex] = true;

            return updatedItems;
          });

          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.22,
        rootMargin: "0px 0px -9% 0px",
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="servicios"
      aria-labelledby="servicios-title"
      className={styles.servicesSection}
    >
      <div className={styles.backgroundGrid} />

      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headerTitle}>
            <div
              ref={(element) => {
                revealRefs.current[0] = element;
              }}
              data-reveal-index="0"
              className={`${styles.reveal} ${
                visibleItems[0] ? styles.revealVisible : ""
              }`}
            >
              <div className={styles.eyebrow}>
                <span />
                <p>CÓMO TE AYUDAMOS</p>
              </div>
            </div>

            <h2
              id="servicios-title"
              ref={(element) => {
                revealRefs.current[1] = element;
              }}
              data-reveal-index="1"
              className={`${styles.heading} ${styles.reveal} ${
                visibleItems[1] ? styles.revealVisible : ""
              }`}
              style={{
                transitionDelay: visibleItems[1] ? "100ms" : "0ms",
              }}
            >
              Tu empresa ya transmite una impresión online.{" "}
              <span>La pregunta es si te ayuda o te perjudica.</span>
            </h2>
          </div>

          <p
            ref={(element) => {
              revealRefs.current[2] = element;
            }}
            data-reveal-index="2"
            className={`${styles.introText} ${styles.reveal} ${
              visibleItems[2] ? styles.revealVisible : ""
            }`}
            style={{
              transitionDelay: visibleItems[2] ? "180ms" : "0ms",
            }}
          >
            Cuando un cliente busca tu empresa, revisa tu web o recibe tu
            presentación, se forma una opinión antes de contactarte. En Vialoop
            ordenamos esa primera impresión para que tu negocio se vea{" "}
            <strong>claro, profesional y confiable.</strong>
          </p>
        </header>

        <div className={styles.cardsGrid}>
          {services.map((service, index) => {
            const revealIndex = index + 3;

            return (
              <article
                key={service.titleLines.join(" ")}
                ref={(element) => {
                  revealRefs.current[revealIndex] = element;
                }}
                data-reveal-index={revealIndex}
                className={`${styles.card} ${styles.reveal} ${
                  visibleItems[revealIndex] ? styles.revealVisible : ""
                }`}
                style={{
                  transitionDelay: visibleItems[revealIndex]
                    ? `${index * 145}ms`
                    : "0ms",
                }}
              >
                <div className={styles.cardTop}>
                  <span className={styles.cardNumber}>0{index + 1}</span>
                  <span className={styles.cardLine} />
                </div>

                <h3>
                  {service.titleLines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </h3>

                <p className={styles.cardText}>{service.text}</p>

                <div className={styles.cardFooter}>
                  <Image
                    src={service.image}
                    alt={`Herramientas utilizadas en ${service.titleLines.join(
                      " ",
                    )}`}
                    width={320}
                    height={90}
                    className={styles.serviceImage}
                    sizes="(min-width: 1280px) 250px, (min-width: 768px) 40vw, 78vw"
                    priority={index === 0}
                  />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}