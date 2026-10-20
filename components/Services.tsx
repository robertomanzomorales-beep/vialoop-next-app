"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import styles from "./Services.module.css";
import useScrollReveal from "./useScrollReveal";

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

export default function Services() {
  const sectionRef = useRef<HTMLElement | null>(null);
  useScrollReveal(sectionRef);

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
              data-scroll-reveal
              className={`${styles.reveal} ${
                styles.revealVisible
              }`}
            >
              <div className={styles.eyebrow}>
                <span />
                <p>CÓMO TE AYUDAMOS</p>
              </div>
            </div>

            <h2
              id="servicios-title"
              data-scroll-reveal
              className={`${styles.heading} ${styles.reveal} ${
                styles.revealVisible
              }`}
              style={{
                transitionDelay: "0ms",
              }}
            >
              Presencia digital y gestión.{" "}
              <span>Soluciones que acompañan a tu empresa.</span>
            </h2>
          </div>

          <p
            data-scroll-reveal
            className={`${styles.introText} ${styles.reveal} ${
              styles.revealVisible
            }`}
            style={{
              transitionDelay: "0ms",
            }}
          >
            Una web para presentar lo que haces. Un sistema para organizar cómo
            lo haces. Combinamos diseño y desarrollo para acompañar tanto tu{" "}
            <strong>presencia comercial como tu operación diaria.</strong>
          </p>
        </header>

        <div className={styles.cardsGrid}>
          {services.map((service, index) => {
            return (
              <article
                key={service.titleLines.join(" ")}
                data-scroll-reveal data-scroll-delay={index * 90}
                className={`${styles.card} ${styles.reveal} ${
                  styles.revealVisible
                }`}
                style={{
                  transitionDelay: "0ms",
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