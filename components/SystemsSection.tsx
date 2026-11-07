"use client";
import Link from "next/link";
import { useRef } from "react";
import useScrollReveal from "./useScrollReveal";
import ProcessDemo from "./ProcessDemo";
import styles from "./Studio.module.css";
export default function SystemsSection() {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);
  return (
    <section
      id="sistemas-para-empresas"
      ref={ref}
      className={styles.softwareSection}
      aria-labelledby="systems-title"
    >
      <div className={`${styles.container} ${styles.softwareInner}`}>
        <div className={styles.softwareCopy} data-scroll-reveal>
          <p className={styles.eyebrow}>SOFTWARE QUE SIGUE TU LÓGICA</p>
          <h2 id="systems-title">
            De tareas dispersas
            <br />
            <em>a un proceso conectado.</em>
          </h2>
          <p>
            Reservas que avanzan, documentos que se pueden seguir y equipos que
            comparten la misma información. Diseñamos herramientas alrededor de
            tu operación.
          </p>
          <p className={styles.softwarePrompt}>
            Pruébalo: elige un proceso y hazlo avanzar.
          </p>
          <div className={styles.actions}>
            <Link href="/software-a-medida" className={styles.primary}>
              Explorar el software
            </Link>
            <Link
              href="/contacto?servicio=sistema"
              className={styles.darkTextLink}
            >
              Cuéntanos qué necesitas
            </Link>
          </div>
          <div className={styles.softwarePrinciples}>
            <span>Procesos claros</span>
            <span>Información conectada</span>
            <span>Hecho a medida</span>
          </div>
        </div>
        <div data-scroll-reveal data-scroll-delay="100">
          <ProcessDemo />
        </div>
      </div>
    </section>
  );
}
