"use client";
import { useRef } from "react";
import useScrollReveal from "./useScrollReveal";
import styles from "./ClientTestimonial.module.css";
export default function ClientTestimonial() {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);
  return (
    <section
      ref={ref}
      className={styles.section}
      aria-labelledby="client-testimonial-title"
    >
      <div className={styles.container}>
        <div className={styles.videoColumn} data-scroll-reveal>
          <div className={styles.videoFrame}>
            <video
              className={styles.video}
              src="/testimonio-cliente-vialoop.mp4"
              poster="/testimonio-gm-poster.webp"
              controls
              playsInline
              preload="none"
              aria-label="Video de Doris presentando el testimonio de Osvaldo González de GM Especialistas"
            />
          </div>
          <p className={styles.videoCaption}>
            Experiencia de cliente · GM Especialistas
          </p>
        </div>
        <div
          className={styles.content}
          data-scroll-reveal
          data-scroll-delay="90"
        >
          <p className={styles.eyebrow}>EL TRABAJO, EN SUS PALABRAS</p>
          <h2 id="client-testimonial-title">
            Detrás de cada proyecto,
            <br />
            <em>una relación de confianza.</em>
          </h2>
          <blockquote>
            <p>
              “Desde el diseño hasta la producción audiovisual, incluyendo las
              tomas con dron y la fotografía profesional, el equipo logró
              plasmar exactamente lo que necesitábamos para representar a
              nuestra empresa.”
            </p>
          </blockquote>
          <div className={styles.author}>
            <strong>Osvaldo González</strong>
            <span>GM Especialistas en Calibración</span>
          </div>
        </div>
      </div>
    </section>
  );
}
