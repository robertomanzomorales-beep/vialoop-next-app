"use client";

import { useRef } from "react";
import styles from "./ClientTestimonial.module.css";
import useScrollReveal from "./useScrollReveal";

export default function ClientTestimonial() {
  const sectionRef = useRef<HTMLElement | null>(null);
  useScrollReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${styles.visible}`}
      aria-labelledby="client-testimonial-title"
    >
      <div className={styles.gridTexture} />

      <div className={styles.container}>
        <div data-scroll-reveal data-scroll-delay="120" className={styles.videoColumn}>
          <div className={styles.videoFrame}>
            <video
              className={styles.video}
              src="/testimonio-cliente-vialoop.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-label="Video de Doris presentando el testimonio de Osvaldo González de GM Especialistas"
            />
          </div>

          <div className={styles.videoCaption}>
            <span className={styles.captionLine} />
            <span>Experiencia de cliente</span>
          </div>
        </div>

        <div className={styles.content}>
          <div data-scroll-reveal data-scroll-delay="120" className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            <span>TESTIMONIO DE CLIENTE</span>
          </div>

          <h2 data-scroll-reveal id="client-testimonial-title">
            Una experiencia real de trabajo con Vialoop.
          </h2>

          <div data-scroll-reveal data-scroll-delay="120" className={styles.testimonial}>
            <div className={styles.rating}>
              <div className={styles.stars} aria-label="Cinco estrellas">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>

              <span className={styles.score}>5.0</span>
            </div>

            <blockquote>
              <p>
                Hola, soy Osvaldo, de GM Especialistas en Calibración.
              </p>

              <p>
                Quiero compartir nuestra experiencia trabajando con Vialoop.
                Estamos muy conformes con el resultado de nuestra nueva página
                web. Desde el diseño hasta la producción audiovisual,
                incluyendo las tomas con dron y la fotografía profesional, el
                equipo logró plasmar exactamente lo que necesitábamos para
                representar a nuestra empresa.
              </p>

              <p>
                El proceso fue cercano, profesional y el resultado superó
                nuestras expectativas.
              </p>

              <p>
                Si estás pensando en renovar o crear el sitio web de tu
                empresa, te recomiendo contactar a Vialoop.
              </p>
            </blockquote>

            <footer data-scroll-reveal data-scroll-delay="120" className={styles.author}>
              <span className={styles.authorLine} />
              <div>
                <strong>Osvaldo González</strong>
                <span>GM Especialistas en Calibración</span>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </section>
  );
}