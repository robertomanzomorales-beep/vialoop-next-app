"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import useScrollReveal from "./useScrollReveal";
import styles from "./Studio.module.css";
export default function Services() {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);
  return (
    <section
      id="servicios"
      ref={ref}
      className={styles.services}
      aria-labelledby="services-title"
    >
      <div className={styles.container}>
        <div className={styles.sectionHead} data-scroll-reveal>
          <div>
            <p className={styles.eyebrow}>LO QUE PODEMOS HACER JUNTOS</p>
            <h2 id="services-title">
              Diseño para destacar.
              <br />
              <em>Desarrollo para avanzar.</em>
            </h2>
          </div>
          <p>
            Conectamos lo que tu empresa muestra con las herramientas que
            necesita para trabajar mejor.
          </p>
        </div>
        <div className={styles.serviceGrid}>
          <Link
            href="/portafolio-web"
            className={`${styles.serviceCard} ${styles.webCard}`}
            data-scroll-reveal
          >
            <div className={styles.serviceCopy}>
              <span className={styles.miniLabel}>PRESENCIA DIGITAL</span>
              <h3>Web para empresas</h3>
              <p>
                Tu identidad, tus servicios y tu experiencia. Todo en un sitio
                claro, rápido y pensado para tus clientes.
              </p>
              <span className={styles.serviceLink}>Explorar sitios web</span>
            </div>
            <div className={styles.webVisual} aria-hidden="true">
              <Image
                src="/portfolio/ryf-group.webp"
                alt=""
                width={600}
                height={310}
                sizes="(min-width:800px) 400px, 90vw"
              />
              <span>Diseño adaptado a tu negocio</span>
            </div>
          </Link>
          <Link
            href="/software-a-medida"
            className={`${styles.serviceCard} ${styles.softwareCard}`}
            data-scroll-reveal
            data-scroll-delay="80"
          >
            <div className={styles.serviceCopy}>
              <span className={styles.miniLabel}>OPERACIÓN CONECTADA</span>
              <h3>Software a tu medida</h3>
              <p>
                Registros, documentos y equipos que trabajan con la misma
                información. Una herramienta para tu forma de hacer.
              </p>
              <span className={styles.serviceLink}>Conocer el desarrollo</span>
            </div>
            <div className={styles.flowVisual} aria-hidden="true">
              <span>Tu operación</span>
              <div className={styles.flowLine} />
              <div>
                <span>Clientes</span>
                <span>Documentos</span>
                <span>Seguimiento</span>
              </div>
            </div>
          </Link>
          <Link
            href="/contacto?servicio=google"
            className={`${styles.serviceCard} ${styles.smallService}`}
            data-scroll-reveal
          >
            <div className={styles.serviceCopy}>
              <span className={styles.miniLabel}>QUE TE ENCUENTREN</span>
              <h3>Google y visibilidad</h3>
              <p>
                SEO, presencia local, medición y campañas para acercar tus
                servicios a quienes los buscan.
              </p>
              <span className={styles.serviceLink}>
                Conversemos de tu alcance
              </span>
            </div>
            <div className={styles.searchVisual} aria-hidden="true">
              <span>Tu empresa en Google</span>
              <i />
              <i />
              <i />
            </div>
          </Link>
          <Link
            href="/contacto?servicio=material"
            className={`${styles.serviceCard} ${styles.smallService}`}
            data-scroll-reveal
            data-scroll-delay="80"
          >
            <div className={styles.serviceCopy}>
              <span className={styles.miniLabel}>IDENTIDAD QUE CONECTA</span>
              <h3>Material comercial</h3>
              <p>
                Identidad, brochures y presentaciones con una línea visual
                consistente y un mensaje fácil de recordar.
              </p>
              <span className={styles.serviceLink}>
                Demos forma a tu presentación
              </span>
            </div>
            <div className={styles.materialVisual} aria-hidden="true">
              <span>Tu marca.</span>
              <span>Bien presentada.</span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
