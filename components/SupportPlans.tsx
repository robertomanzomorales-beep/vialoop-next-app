"use client";

import { useEffect, useRef } from "react";
import styles from "./SupportPlans.module.css";

type SupportPlan = {
  name: string;
  recommendedFor: string;
  monthlyPrice: string;
  yearlyPrice: string;
  yearlySaving: string;
  responseTime: string;
  includes: string[];
  excludes: string[];
  accent?: boolean;
};

const supportPlans: SupportPlan[] = [
  {
    name: "Esencial",
    recommendedFor:
      "Clientes con pocas cuentas de correo y consultas ocasionales.",
    monthlyPrice: "$23.681",
    yearlyPrice: "$260.610",
    yearlySaving: "$19.800",
    responseTime: "Respuesta en hasta 1 día hábil.",
    includes: [
      "1 atención mensual",
      "Soporte remoto de hasta 30 minutos",
      "O 1 creación, cambio o revisión de correo",
      "Acompañamiento remoto según la necesidad",
    ],
    excludes: [
      "Atenciones no acumulables",
      "No incluye visitas a terreno",
      "No incluye migraciones ni desarrollo web",
    ],
  },
  {
    name: "Empresa",
    recommendedFor:
      "Empresas con varios equipos administrativos y mayor dependencia del correo.",
    monthlyPrice: "$47.481",
    yearlyPrice: "$522.410",
    yearlySaving: "$39.800",
    responseTime: "Respuesta en hasta 12 horas hábiles.",
    includes: [
      "Hasta 45 minutos mensuales de soporte remoto",
      "2 gestiones de correo al mes",
      "Configuración y reparación de cuentas",
      "Atención para equipos administrativos",
    ],
    excludes: [
      "Atenciones no acumulables",
      "No incluye visitas a terreno",
      "No incluye migraciones masivas ni proyectos web",
    ],
    accent: true,
  },
  {
    name: "Prioritario",
    recommendedFor:
      "Operaciones con varios dispositivos o necesidad de atención preferente.",
    monthlyPrice: "$83.181",
    yearlyPrice: "$915.110",
    yearlySaving: "$69.800",
    responseTime: "Respuesta objetivo de 4 horas hábiles.",
    includes: [
      "Hasta 90 minutos mensuales de soporte remoto",
      "4 gestiones de correo al mes",
      "Atención prioritaria para incidencias",
      "Soporte para varios dispositivos y usuarios",
    ],
    excludes: [
      "Atenciones no acumulables",
      "No incluye visitas a terreno",
      "No incluye desarrollo web ni migraciones masivas",
    ],
  },
];

const whatsappNumber = "56974330586";

export default function SupportPlans() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const elements =
      sectionRef.current?.querySelectorAll<HTMLElement>(
        "[data-support-reveal]",
      );

    if (!elements?.length) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      elements.forEach((element) => element.classList.add(styles.visible));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add(styles.visible);
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -7% 0px",
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.supportSection}>
      <div className={styles.container}>
        <header className={styles.heading}>
          <p
            className={styles.eyebrow}
            data-support-reveal
            style={{ transitionDelay: "0ms" }}
          >
            SOPORTE TÉCNICO RECURRENTE
          </p>

          <h2
            data-support-reveal
            style={{ transitionDelay: "110ms" }}
          >
            Soporte cuando lo necesitas.
            <span> Sin resolver todo a última hora.</span>
          </h2>

          <p
            className={styles.headingText}
            data-support-reveal
            style={{ transitionDelay: "220ms" }}
          >
            Planes mensuales para empresas que necesitan mantener sus correos,
            equipos y configuraciones bajo control durante todo el año.
          </p>
        </header>

        <div className={styles.cards}>
          {supportPlans.map((plan, index) => {
            const whatsappMessage = encodeURIComponent(
              `Hola, me interesa conocer el Plan de Soporte ${plan.name} de Vialoop.`,
            );

            return (
              <article
                key={plan.name}
                className={`${styles.card} ${
                  plan.accent ? styles.accentCard : ""
                }`}
                data-support-reveal
                style={{
                  transitionDelay: `${300 + index * 145}ms`,
                }}
              >
                {plan.accent && (
                  <span className={styles.badge}>MÁS ELEGIDO</span>
                )}

                <div className={styles.cardHeader}>
                  <div>
                    <p className={styles.cardEyebrow}>PLAN DE SOPORTE</p>
                    <h3>{plan.name}</h3>
                  </div>

                  <span className={styles.planNumber}>0{index + 1}</span>
                </div>

                <p className={styles.recommendedFor}>
                  {plan.recommendedFor}
                </p>

                <div className={styles.pricing}>
                  <div className={styles.monthlyPrice}>
                    <span>PLAN MENSUAL</span>
                    <strong>{plan.monthlyPrice}</strong>
                    <small>IVA incluido</small>
                  </div>

                  <div className={styles.yearlyPrice}>
                    <div className={styles.yearlyTop}>
                      <span>PLAN ANUAL</span>
                      <em>AHORRAS {plan.yearlySaving}</em>
                    </div>

                    <strong>{plan.yearlyPrice}</strong>
                    <small>IVA incluido · pago anual</small>
                  </div>
                </div>

                <div className={styles.response}>
                  <span>TIEMPO DE RESPUESTA</span>
                  <strong>{plan.responseTime}</strong>
                </div>

                <div className={styles.listBlock}>
                  <p>INCLUYE CADA MES</p>

                  <ul className={styles.includedList}>
                    {plan.includes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className={styles.listBlock}>
                  <p>CONDICIONES DEL PLAN</p>

                  <ul className={styles.excludedList}>
                    {plan.excludes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <a
                  href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.whatsappButton}
                >
                  SOLICITAR ESTE PLAN <span>↗</span>
                </a>
              </article>
            );
          })}
        </div>

        <p
          className={styles.bottomNote}
          data-support-reveal
          style={{ transitionDelay: "180ms" }}
        >
          ¿Necesitas una atención puntual? También contamos con servicios por
          evento para creación de correos, diagnóstico, soporte remoto y
          configuración de equipos.
        </p>
      </div>
    </section>
  );
}