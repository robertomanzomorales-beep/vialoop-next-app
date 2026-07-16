"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ClientTestimonial.module.css";

const INSTAGRAM_URL =
  "https://www.instagram.com/p/C_shFzWu0sX/";

export default function ClientTestimonial() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setVisible(true);
        observer.unobserve(section);
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -80px 0px",
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${
        visible ? styles.visible : ""
      }`}
      aria-labelledby="client-testimonial-title"
    >
      <div className={styles.container}>
        <div className={styles.videoArea}>
          <div className={styles.videoWrap}>
            <video
              className={styles.video}
              src="/testimonio-cliente-vialoop.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Invitación para conocer el testimonio de un cliente de Vialoop"
            />

            <div
              className={styles.videoShade}
              aria-hidden="true"
            />
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            <span>TESTIMONIO DE CLIENTE</span>
          </div>

          <h2 id="client-testimonial-title">
            Una experiencia real de trabajo con Vialoop.
          </h2>

          <p className={styles.lead}>
            Doris, parte de nuestro equipo comercial, te invita a
            conocer el testimonio de uno de nuestros clientes y el
            resultado de su nuevo sitio web corporativo.
          </p>

          <p className={styles.secondary}>
            Revisa el reel completo y conoce cómo abordamos el
            proyecto, desde el diseño hasta su publicación.
          </p>

          <div className={styles.actions}>
            <a
              className={styles.button}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer noopener"
            >
              Ver testimonio completo
              <span aria-hidden="true">↗</span>
            </a>

            <span className={styles.platform}>
              Ver en Instagram
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}