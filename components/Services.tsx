"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import useScrollReveal from "./useScrollReveal";
import styles from "./Services.module.css";

const services = [
  {
    title: "Diseño web",
    text: "Sitios rápidos y claros, diseñados para mostrar lo que haces y facilitar el contacto.",
    href: "/diseno-web",
    link: "Ver sitios web",
    icon: "web",
    preview: {
      src: "/projects/ryf.webp",
      width: 1280,
      height: 773,
      alt: "Sitio web desarrollado para R&F, con la presentación de sus servicios mineros e industriales",
      caption: "R&F · Sitio web",
    },
  },
  {
    title: "Software a medida",
    text: "Procesos, información y equipos conectados en una herramienta hecha para tu operación.",
    href: "/software-a-medida",
    link: "Explorar el software",
    icon: "software",
    preview: {
      src: "/software/capturas/gm-escritorio.webp",
      width: 1600,
      height: 888,
      alt: "Panel del software de GM Especialistas, con recepción de equipos, órdenes y gestión del laboratorio",
      caption: "GM Especialistas · Software a medida",
    },
  },
  {
    title: "Google y visibilidad",
    text: "SEO, presencia local y campañas para que tus clientes encuentren tus servicios.",
    href: "/contacto?servicio=google",
    link: "Mejorar mi visibilidad",
    icon: "visibility",
  },
  {
    title: "Material comercial",
    text: "Brochures y presentaciones que comunican tu propuesta con claridad y coherencia.",
    href: "/contacto?servicio=material",
    link: "Preparar mi material",
    icon: "design",
  },
];

function ServiceIcon({ type }: { type: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {type === "web" ? (
        <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M7 6.5h.01M10 6.5h.01M7 13h6M7 16h10" /></>
      ) : type === "software" ? (
        <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /><path d="M14 6h3a1 1 0 0 1 1 1v3M10 18H7a1 1 0 0 1-1-1v-3M14 10l4-4M10 14l-4 4" /></>
      ) : type === "visibility" ? (
        <><circle cx="10" cy="10" r="6" /><path d="m15 15 6 6M7 12V9m3 3V7m3 5V9" /></>
      ) : (
        <><path d="M4 5h7a3 3 0 0 1 3 3v13a4 4 0 0 0-4-3H4Zm16 0h-3a3 3 0 0 0-3 3v13a4 4 0 0 1 4-3h2ZM7 9h3M7 12h3" /></>
      )}
    </svg>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section ref={sectionRef} id="servicios" aria-labelledby="servicios-title" className={styles.servicesSection}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div data-scroll-reveal>
            <p className={styles.eyebrow}><span aria-hidden="true" />Cómo te ayudamos</p>
            <h2 id="servicios-title" className={styles.heading}>Soluciones digitales,{" "}<em>a tu medida.</em></h2>
          </div>
          <p data-scroll-reveal data-scroll-delay="90" className={styles.introText}>Diseño web, software y comunicación para conectar tu negocio con sus clientes y simplificar el trabajo diario.</p>
        </header>

        <div className={styles.cardsGrid}>
          {services.slice(0, 2).map((service, index) => (
            <article key={service.title} data-scroll-reveal data-scroll-delay={index * 70} className={styles.card}>
              <div className={styles.cardBody}>
                <div className={styles.cardTop}>
                  <span className={styles.serviceIcon}><ServiceIcon type={service.icon} /></span>
                  <h3>{service.title}</h3>
                </div>
                <p className={styles.cardText}>{service.text}</p>
                <Link href={service.href} className={styles.serviceLink}>{service.link}</Link>
              </div>
              {service.preview && (
                <figure className={styles.preview}>
                  <figcaption className={styles.previewCaption}>
                    <span className={styles.windowMarks} aria-hidden="true"><i /><i /><i /></span>
                    <span>{service.preview.caption}</span>
                  </figcaption>
                  <div className={styles.previewViewport}>
                    <Image
                      src={service.preview.src}
                      alt={service.preview.alt}
                      width={service.preview.width}
                      height={service.preview.height}
                      sizes="(max-width: 700px) calc(100vw - 80px), (max-width: 1100px) calc(50vw - 76px), 540px"
                      className={styles.previewImage}
                    />
                  </div>
                </figure>
              )}
            </article>
          ))}
        </div>
        <div className={styles.complementaryGrid}>
          {services.slice(2).map((service, index) => (
            <article key={service.title} data-scroll-reveal data-scroll-delay={index * 70} className={styles.complementary}>
              <span className={styles.serviceIcon}><ServiceIcon type={service.icon} /></span>
              <div>
                <h3>{service.title}</h3>
                <p className={styles.cardText}>{service.text}</p>
                <Link href={service.href} className={styles.serviceLink}>{service.link}</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
