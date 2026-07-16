"use client";

import LogoLoop, { type LogoItem } from "./LogoLoop";
import styles from "./ClientsLoop.module.css";

const clientLogos: LogoItem[] = [
  {
    src: "/afuen.webp",
    alt: "Afüen",
  },
  {
    src: "/chr.webp",
    alt: "CHR Transportes",
  },
  {
    src: "/empresas-hc.webp",
    alt: "Empresas HC",
  },
  {
    src: "/gran-norte.webp",
    alt: "Gran Norte",
  },
  {
    src: "/klp-servicios.webp",
    alt: "KLP Servicios",
  },
  {
    src: "/loa-rental.webp",
    alt: "Loa Rental",
  },
  {
    src: "/maryland.webp",
    alt: "Maryland",
  },
  {
    src: "/profleet.webp",
    alt: "ProFleet",
  },
  {
    src: "/promaq.webp",
    alt: "Promaq Servicios Industriales",
  },
  {
    src: "/rerchar.webp",
    alt: "Rerchar",
  },
  {
    src: "/rohuer-ingenieria.webp",
    alt: "Rohuer Ingeniería",
  },
  {
    src: "/romaa.webp",
    alt: "ROMAA",
  },
  {
    src: "/serven.webp",
    alt: "Serven Supply Chain",
  },
  {
    src: "/transportes-greducam.webp",
    alt: "Transportes Greducam",
  },
];

export default function ClientsLoop() {
  return (
    <section
      className={styles.section}
      aria-labelledby="clientes-vialoop"
    >
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
          <span
            className={styles.headingLine}
            aria-hidden="true"
          />

          <p id="clientes-vialoop">
            EMPRESAS QUE HAN CONFIADO EN VIALOOP
          </p>

          <span
            className={styles.headingLine}
            aria-hidden="true"
          />
        </div>
      </div>

      <div className={styles.carousel}>
        <LogoLoop
          logos={clientLogos}
          speed={34}
          direction="left"
          logoHeight={82}
          gap={18}
          hoverSpeed={8}
          scaleOnHover
          fadeOut
          fadeOutColor="#f4f7fc"
          ariaLabel="Empresas que han confiado en Vialoop"
        />
      </div>
    </section>
  );
}