"use client";

import LogoLoop, { type LogoItem } from "./LogoLoop";
import styles from "./ClientsLoop.module.css";

const clientLogos: LogoItem[] = [
  {
    src: "/logo-carrusel-afuen-v2.webp",
    alt: "Afüen",
  },
  {
    src: "/logo-carrusel-chr-v2.webp",
    alt: "CHR Transportes",
  },
  {
    src: "/logo-carrusel-empresas-hc-v2.webp",
    alt: "Empresas HC",
  },
  {
    src: "/logo-carrusel-gran-norte-v2.webp",
    alt: "Gran Norte",
  },
  {
    src: "/logo-carrusel-klp-servicios-v2.webp",
    alt: "KLP Servicios",
  },
  {
    src: "/logo-carrusel-loa-rental-v2.webp",
    alt: "Loa Rental",
  },
  {
    src: "/logo-carrusel-maryland-v2.webp",
    alt: "Maryland",
  },
  {
    src: "/logo-carrusel-profleet-v2.webp",
    alt: "ProFleet",
  },
  {
    src: "/logo-carrusel-promaq-v2.webp",
    alt: "Promaq Servicios Industriales",
  },
  {
    src: "/logo-carrusel-rerchar-v2.webp",
    alt: "Rerchar",
  },
  {
    src: "/logo-carrusel-rohuer-ingenieria-v2.webp",
    alt: "Rohuer Ingeniería",
  },
  {
    src: "/logo-carrusel-romaa-v2.webp",
    alt: "ROMAA",
  },
  {
    src: "/logo-carrusel-serven-v2.webp",
    alt: "Serven Supply Chain",
  },
  {
    src: "/logo-carrusel-transportes-greducam-v2.webp",
    alt: "Transportes Greducam",
  },
];

export default function ClientsLoop() {
  return (
    <section className={styles.section} aria-labelledby="clientes-vialoop">
      <div className={styles.container}>
        <div className={styles.summaryCard}>
          <div className={styles.ratingBlock}>
            <div className={styles.ratingRow}>
              <span
                className={styles.stars}
                aria-label="Calificación de cinco estrellas"
              >
                ★★★★★
              </span>

              <span className={styles.rating}>5.0</span>
            </div>

            <p className={styles.metric}>
              <strong>+250</strong>

              <span>
                SITIOS WEB
                <br />
                REALIZADOS
              </span>
            </p>

            <p className={styles.description}>
              Para clientes del norte de Chile
            </p>
          </div>
        </div>

        <div className={styles.heading}>
          <span className={styles.headingLine} aria-hidden="true" />

          <p id="clientes-vialoop">
            EMPRESAS QUE HAN CONFIADO EN VIALOOP
          </p>

          <span className={styles.headingLine} aria-hidden="true" />
        </div>
      </div>

      <div className={styles.carousel}>
        <LogoLoop
          logos={clientLogos}
          speed={34}
          direction="left"
          logoHeight={76}
          gap={44}
          hoverSpeed={34}
          scaleOnHover={false}
          fadeOut
          fadeOutColor="#f4f7fc"
          ariaLabel="Empresas que han confiado en Vialoop"
        />
      </div>
    </section>
  );
}