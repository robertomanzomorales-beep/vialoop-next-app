"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import styles from "./Hero.module.css";

const heroStats = [
  ["Sitios web", "Presencia profesional"],
  ["Software", "Gestión a tu medida"],
  ["Soporte", "Acompañamiento cercano"],
];

export default function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const mockupRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = heroRef.current;

    if (!hero) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;

        setVisible(true);
        observer.unobserve(entry.target);
      },
      {
        threshold: 0.18,
      },
    );

    observer.observe(hero);

    return () => observer.disconnect();
  }, []);

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
                className={`${styles.title} ${
                  visible ? styles.visible : ""
                }`}
              >
                Diseño web y software
                <span> a medida para tu empresa.</span>
              </h1>

              <p
                className={`${styles.primaryText} ${
                  visible ? styles.visible : ""
                }`}
              >
                Creamos sitios web que presentan tu negocio y sistemas que
                simplifican tu operación. Diseño y desarrollo con un mismo enfoque:{" "}
                <em className={styles.humanAccent}>
                  entender lo que tu empresa necesita.
                </em>
              </p>

              <p
                className={`${styles.secondaryText} ${
                  visible ? styles.visible : ""
                }`}
              >
                Acompañamos a empresas, negocios y profesionales en su presencia
                digital y su gestión interna. Desde Calama y Antofagasta, trabajamos
                con clientes de todo Chile.
              </p>

              <div
                className={`${styles.actions} ${
                  visible ? styles.visible : ""
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
              className={`${styles.showcase} ${
                visible ? styles.showcaseVisible : ""
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
