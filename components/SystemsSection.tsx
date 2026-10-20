"use client";

import Link from "next/link";
import { useRef, type CSSProperties } from "react";
import styles from "./SystemsSection.module.css";
import useScrollReveal from "./useScrollReveal";

type RevealStyle = CSSProperties & {
  "--system-delay": string;
};

const revealDelay = (delay: number): RevealStyle => ({
  "--system-delay": `${delay}ms`,
});

export default function SystemsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useScrollReveal(sectionRef, "[data-system-reveal]");

  return (
    <section
      ref={sectionRef}
      id="sistemas-para-empresas"
      className={styles.systemsSection}
      aria-labelledby="systems-title"
    >
      <div className={styles.backgroundGrid} />
      <div className={styles.backgroundGlow} />

      <div className={styles.container}>
        <div className={styles.shell}>
          <div className={styles.copy}>
            <div
              className={`${styles.eyebrow} ${styles.reveal} ${styles.visible}`}
              data-system-reveal
            data-scroll-delay="120"
              style={revealDelay(0)}
            >
              <span />
              <p>SISTEMAS PARA EMPRESAS</p>
            </div>

            <h2
              id="systems-title"
              className={`${styles.title} ${styles.reveal} ${styles.visible}`}
              data-system-reveal
            data-scroll-delay="120"
              style={revealDelay(100)}
            >
              Cuando el proceso ya no cabe en una planilla,
              <span> construimos el sistema.</span>
            </h2>

            <div
              className={`${styles.contentGroup} ${styles.reveal} ${styles.visible}`}
              data-system-reveal
            data-scroll-delay="120"
              style={revealDelay(210)}
            >
              <p className={styles.description}>
                Desarrollamos plataformas para centralizar información,
                controlar documentos, asignar responsables y seguir cada
                etapa de la operación. Un sistema{" "}
                <em>
                  hecho para la forma en que realmente trabaja tu empresa
                </em>
                , sin módulos innecesarios ni procesos genéricos.
              </p>

              <div className={styles.actionArea}>
                <Link
                  href="/contacto?servicio=sistema"
                  className={styles.primaryButton}
                >
                  CONVERSEMOS SOBRE TU SISTEMA
                </Link>

                <p>
                  Revisamos el proceso antes de proponer una solución.
                </p>
              </div>
            </div>
          </div>

          <div
            className={`${styles.visual} ${styles.reveal} ${styles.visible}`}
            data-system-reveal
            data-scroll-delay="120"
            style={revealDelay(170)}
            aria-hidden="true"
          >
            <div className={styles.visualGlow} />

            <div className={styles.codeWindow}>
              <div className={styles.windowHeader}>
                <div className={styles.windowDots}>
                  <span />
                  <span />
                  <span />
                </div>

                <div className={styles.windowTitle}>
                  sistema-empresa.ts
                </div>

                <div className={styles.windowStatus}>
                  <span />
                  Activo
                </div>
              </div>

              <div className={styles.codeBody}>
                <div className={styles.codeLine}>
                  <span className={styles.lineNumber}>01</span>
                  <code>
                    <span className={styles.keyword}>const</span>{" "}
                    <span className={styles.variable}>sistema</span>{" "}
                    <span className={styles.operator}>=</span>{" "}
                    <span className={styles.keyword}>await</span>{" "}
                    <span className={styles.function}>vialoop.crear</span>
                    {"({"}
                  </code>
                </div>

                <div className={`${styles.codeLine} ${styles.indent}`}>
                  <span className={styles.lineNumber}>02</span>
                  <code>
                    <span className={styles.property}>problema</span>
                    <span className={styles.operator}>:</span>{" "}
                    <span className={styles.string}>
                      &quot;procesos dispersos&quot;
                    </span>
                    ,
                  </code>
                </div>

                <div className={`${styles.codeLine} ${styles.indent}`}>
                  <span className={styles.lineNumber}>03</span>
                  <code>
                    <span className={styles.property}>información</span>
                    <span className={styles.operator}>:</span>{" "}
                    <span className={styles.string}>
                      &quot;centralizada&quot;
                    </span>
                    ,
                  </code>
                </div>

                <div className={`${styles.codeLine} ${styles.indent}`}>
                  <span className={styles.lineNumber}>04</span>
                  <code>
                    <span className={styles.property}>control</span>
                    <span className={styles.operator}>:</span> [
                  </code>
                </div>

                <div
                  className={`${styles.codeLine} ${styles.doubleIndent}`}
                >
                  <span className={styles.lineNumber}>05</span>
                  <code>
                    <span className={styles.string}>
                      &quot;usuarios&quot;
                    </span>
                    ,{" "}
                    <span className={styles.string}>
                      &quot;documentos&quot;
                    </span>
                    ,
                  </code>
                </div>

                <div
                  className={`${styles.codeLine} ${styles.doubleIndent}`}
                >
                  <span className={styles.lineNumber}>06</span>
                  <code>
                    <span className={styles.string}>
                      &quot;estados&quot;
                    </span>
                    ,{" "}
                    <span className={styles.string}>
                      &quot;responsables&quot;
                    </span>
                  </code>
                </div>

                <div className={`${styles.codeLine} ${styles.indent}`}>
                  <span className={styles.lineNumber}>07</span>
                  <code>],</code>
                </div>

                <div className={`${styles.codeLine} ${styles.indent}`}>
                  <span className={styles.lineNumber}>08</span>
                  <code>
                    <span className={styles.property}>resultado</span>
                    <span className={styles.operator}>:</span>{" "}
                    <span className={styles.string}>
                      &quot;operación clara&quot;
                    </span>
                  </code>
                </div>

                <div className={styles.codeLine}>
                  <span className={styles.lineNumber}>09</span>
                  <code>{"});"}</code>
                </div>

                <div className={styles.codeComment}>
                  <span className={styles.lineNumber}>10</span>
                  <code>
                    {"// Menos tareas repetidas. Más control del proceso."}
                  </code>
                </div>
              </div>

              <div className={styles.systemStatus}>
                <div>
                  <span className={styles.statusPulse} />
                  <p>Proceso centralizado</p>
                </div>

                <strong>Listo para crecer</strong>
              </div>
            </div>

            <div className={`${styles.floatingCard} ${styles.cardUsers}`}>
              <span>USUARIOS</span>
              <strong>Roles definidos</strong>
            </div>

            <div
              className={`${styles.floatingCard} ${styles.cardTraceability}`}
            >
              <span>TRAZABILIDAD</span>
              <strong>Cada etapa registrada</strong>
            </div>

            <div className={`${styles.floatingCard} ${styles.cardReports}`}>
              <span>REPORTES</span>
              <strong>Información disponible</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
