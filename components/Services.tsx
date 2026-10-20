"use client";

import Image from "next/image";
import Link from "next/link";
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
    text: "Diseñamos sitios web para empresas, negocios y profesionales. Damos forma a tus servicios y tu identidad con una experiencia clara, rápida y adaptable a cada pantalla.",
    image: "/web-para-empresas.webp",
  },
  {
    titleLines: ["Software", "a medida"],
    text: "Desarrollamos sistemas para conectar procesos, registros y equipos de trabajo. Organizamos la gestión de tu empresa en herramientas adaptadas a su operación.",
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

    const mobileViewport = window.matchMedia(
      "(max-width: 680px)",
    ).matches;

    const mobileRevealMargin = Math.max(
      180,
      Math.round(window.innerHeight * 0.32),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const target = entry.target as HTMLElement;
          const itemIndex = Number(target.dataset.revealIndex);

          if (Number.isNaN(itemIndex)) {
            observer.unobserve(target);
            return;
          }

          setVisibleItems((currentItems) => {
            if (currentItems[itemIndex]) {
              return currentItems;
            }

            const updatedItems = [...currentItems];
            updatedItems[itemIndex] = true;

            return updatedItems;
          });

          observer.unobserve(target);
        });
      },
      mobileViewport
        ? {
            threshold: 0.01,
            rootMargin: `0px 0px ${mobileRevealMargin}px 0px`,
          }
        : {
            threshold: 0.22,
            rootMargin: "0px 0px -9% 0px",
          },
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
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
              Presencia digital y gestión.{" "}
              <span>Soluciones que acompañan a tu empresa.</span>
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
            Una web para presentar lo que haces. Un sistema para organizar cómo
            lo haces. Combinamos diseño y desarrollo para acompañar tanto tu{" "}
            <strong>presencia comercial como tu operación diaria.</strong>
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

                {index < 2 && <Link className={styles.serviceLink} href={index === 0 ? "/portafolio-web" : "/software-a-medida"}>{index === 0 ? "Ver sitios web" : "Conocer el software"} <span aria-hidden="true">↗</span></Link>}
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