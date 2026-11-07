"use client";

import Link from "next/link";
import { useRef } from "react";
import RequestDemo from "./RequestDemo";
import useScrollReveal from "./useScrollReveal";
import styles from "./SystemsSection.module.css";

export default function SystemsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section ref={sectionRef} id="sistemas-para-empresas" className={styles.section} aria-labelledby="systems-title">
      <div className={styles.container}>
        <header className={styles.header}>
          <div data-scroll-reveal>
            <p className={styles.eyebrow}><span aria-hidden="true" />Software a medida</p>
            <h2 id="systems-title">Tu operación, conectada.{" "}<em>De principio a fin.</em></h2>
          </div>
          <p data-scroll-reveal data-scroll-delay="90" className={styles.description}>Registra una solicitud, cambia su estado y mira cómo se actualiza el resumen. Así puede trabajar el software de tu empresa.</p>
        </header>
        <RequestDemo />
        <div className={styles.bottom}>
          <p>Lo adaptamos a tus procesos, equipos y objetivos.</p>
          <Link href="/contacto?servicio=sistema">Conversemos de tu software</Link>
        </div>
      </div>
    </section>
  );
}
