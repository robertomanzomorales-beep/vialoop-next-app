"use client";

import Image from "next/image";
import styles from "./PortfolioCta.module.css";

type PortfolioCtaProps = {
  onOpenModal: () => void;
};

export default function PortfolioCta({
  onOpenModal,
}: PortfolioCtaProps) {
  return (
    <section
      className={styles.cta}
      data-portfolio-reveal
      aria-labelledby="portfolio-cta-title"
    >
      <div className={styles.glow} />

      <div className={styles.content}>
        <h2 id="portfolio-cta-title">
          ¿Tu empresa necesita una web mejor?
        </h2>

        <p>
          Podemos desarrollar un sitio profesional según el nivel que
          necesitas: desde una landing clara y directa hasta una web
          corporativa más completa para presentar servicios, proyectos y
          generar oportunidades comerciales.
        </p>

        <button type="button" onClick={onOpenModal}>
          <span>Hablemos de tu proyecto</span>

          <span className={styles.arrowBox} aria-hidden="true">
            <Image
              src="/flecha-horizontal.webp"
              alt=""
              width={30}
              height={6}
              className={styles.arrow}
            />
          </span>
        </button>
      </div>
    </section>
  );
}