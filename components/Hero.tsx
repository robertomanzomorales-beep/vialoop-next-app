"use client";

import Link from "next/link";
import { useRef, type MouseEvent as ReactMouseEvent } from "react";
import styles from "./Hero.module.css";
import useScrollReveal from "./useScrollReveal";

const heroStats = [
  ["Sitios web", "Presencia profesional"],
  ["Software", "Gestión a tu medida"],
  ["Soporte", "Acompañamiento cercano"],
];

export default function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const mockupRef = useRef<HTMLDivElement | null>(null);
  useScrollReveal(heroRef);

  function handleMockupMove(
    event: ReactMouseEvent<HTMLDivElement>,
  ) {
    const mockup = mockupRef.current;

    if (!mockup) return;

    const rect = mockup.getBoundingClientRect();
    const pointerX = (event.clientX - rect.left) / rect.width - 0.5;
    const pointerY = (event.clientY - rect.top) / rect.height - 0.5;

    mockup.style.setProperty("--tilt-x", `${pointerY * -6}deg`);
    mockup.style.setProperty("--tilt-y", `${pointerX * 7}deg`);
    mockup.style.setProperty("--shine-x", `${50 + pointerX * 55}%`);
    mockup.style.setProperty("--shine-y", `${50 + pointerY * 55}%`);
  }

  function resetMockup() {
    const mockup = mockupRef.current;

    if (!mockup) return;

    mockup.style.setProperty("--tilt-x", "0deg");
    mockup.style.setProperty("--tilt-y", "0deg");
    mockup.style.setProperty("--shine-x", "50%");
    mockup.style.setProperty("--shine-y", "50%");
  }

  return (
      <section
        ref={heroRef}
        id="inicio"
        aria-label="Diseño web y software a medida para empresas en Chile"
        className={styles.hero}
      >
        <div className={styles.gridTexture} />
        <div className={styles.glowLeft} />
        <div className={styles.glowRight} />

        <div className={styles.container}>
          <div className={styles.layout}>
            <div className={styles.copy}>
              <h1
                data-scroll-reveal
                className={`${styles.title} ${
                  styles.visible
                }`}
              >
                Diseño web y software
                <span> a medida para tu empresa.</span>
              </h1>

              <p
                data-scroll-reveal data-scroll-delay="120"
                className={`${styles.primaryText} ${
                  styles.visible
                }`}
              >
                Creamos sitios web que presentan tu negocio y sistemas que
                simplifican tu operación. Diseño y desarrollo con un mismo enfoque:{" "}
                <em className={styles.humanAccent}>
                  entender lo que tu empresa necesita.
                </em>
              </p>

              <p
                data-scroll-reveal data-scroll-delay="120"
                className={`${styles.secondaryText} ${
                  styles.visible
                }`}
              >
                Acompañamos a empresas, negocios y profesionales en su presencia
                digital y su gestión interna. Desde Calama y Antofagasta, trabajamos
                con clientes de todo Chile.
              </p>

              <div
                data-scroll-reveal data-scroll-delay="220"
                className={`${styles.actions} ${
                  styles.visible
                }`}
              >
                <Link
                  href="/portafolio-web"
                  className={styles.primaryButton}
                >
                  DISEÑO WEB
                </Link>

                <Link href="/software-a-medida" className={styles.secondaryButton}>
                  SOFTWARE A MEDIDA
                </Link>
                <Link href="/contacto" className={styles.contactLink}>
                  Cuéntanos tu proyecto <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>

            <div
              ref={mockupRef}
              data-scroll-reveal data-scroll-delay="180"
              className={`${styles.showcase} ${
                styles.showcaseVisible
              }`}
              onMouseMove={handleMockupMove}
              onMouseLeave={resetMockup}
            >
              <div className={styles.orbit} />
              <div className={styles.lightBeam} />

              <div className={styles.mockup}>
                <div className={styles.shine} />

                <div className={styles.browserTop}>
                  <div className={styles.browserDots}>
                    <span />
                    <span />
                    <span />
                  </div>

                  <div className={styles.browserAddress}>
                    <span />
                    vialoop.cl
                  </div>
                </div>

                <div className={styles.dashboard}>
                  <div className={styles.dashboardHeader}>
                    <div>
                      <p>SOLUCIÓN DIGITAL</p>
                      <h2>Web + sistemas</h2>
                    </div>

                    <div className={styles.online}>
                      <span />
                      Activo
                    </div>
                  </div>

                  <div className={styles.dashboardMain}>
                    <div className={styles.preview}>
                      <div className={styles.previewTop}>
                        <span />
                        <span />
                      </div>

                      <div className={styles.previewLines}>
                        <span />
                        <span />
                        <span />
                      </div>

                      <div className={styles.previewBottom}>
                        <span />
                        <span />
                      </div>
                    </div>

                    <div className={styles.result}>
                      <p>RESULTADO</p>
                      <strong>ORDEN</strong>
                      <span>procesos bajo control</span>
                    </div>
                  </div>

                  <div className={styles.metrics}>
                    {heroStats.map(([title, text]) => (
                      <div key={title} className={styles.metric}>
                        <strong>{title}</strong>
                        <span>{text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className={`${styles.tag} ${styles.tagFast}`}>
                <span />
                Sitio rápido
              </div>

              <div className={`${styles.tag} ${styles.tagSeo}`}>
                <span />
                Sistema a medida
              </div>

              <div className={`${styles.tag} ${styles.tagTrust}`}>
                <span />
                Gestión centralizada
              </div>
            </div>
          </div>
        </div>
      </section>

  );
}
