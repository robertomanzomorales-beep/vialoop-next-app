"use client";

import { useEffect, useRef } from "react";
import styles from "./HostingPlans.module.css";

type HostingPlan = {
  name: string;
  description: string;
  features: string[];
  transferPrice: string;
  installmentTotal: string;
  installmentValue: string;
  paymentUrl: string;
  accent?: boolean;
};

const plans: HostingPlan[] = [
  {
    name: "Hosting 1 GB",
    description:
      "Una solución práctica para sitios web básicos y correo corporativo esencial.",
    features: [
      "1 GB de espacio en disco",
      "5 cuentas de correo",
      "1 base de datos MySQL",
      "cPanel y Webmail",
      "Backup semanal y mensual",
      "SSL y antivirus incluidos",
    ],
    transferPrice: "$78.421",
    installmentTotal: "$83.573",
    installmentValue: "$27.858",
    paymentUrl:
      "https://www.flow.cl/btn.php?token=wc4f0c4be920fd2ff08f2d2327a30413667cb81c",
  },
  {
    name: "Hosting 2 GB",
    description:
      "Más capacidad para empresas que requieren correo y un sitio con mayor contenido.",
    features: [
      "2 GB de espacio en disco",
      "10 cuentas de correo",
      "2 bases de datos MySQL",
      "Transferencia ilimitada",
      "cPanel y Webmail",
      "SSL, backup y antivirus incluidos",
    ],
    transferPrice: "$89.131",
    installmentTotal: "$94.987",
    installmentValue: "$31.663",
    paymentUrl:
      "https://www.flow.cl/btn.php?token=m15092e27b0ab572e013dc6d16fd39fe75b69847",
  },
  {
    name: "Hosting 3 GB",
    description:
      "Capacidad equilibrada para sitios corporativos y equipos que usan correo a diario.",
    features: [
      "3 GB de espacio en disco",
      "15 cuentas de correo",
      "3 bases de datos MySQL",
      "Transferencia ilimitada",
      "cPanel y Webmail",
      "SSL, backup y antivirus incluidos",
    ],
    transferPrice: "$102.221",
    installmentTotal: "$108.937",
    installmentValue: "$36.313",
    paymentUrl:
      "https://www.flow.cl/btn.php?token=g130837df58a77b48c030804571c3853fdfe5f4c",
  },
  {
    name: "Hosting 8 GB",
    description:
      "Pensado para empresas que necesitan más espacio, correos sin límite y mejor rendimiento.",
    features: [
      "8 GB de espacio en disco SSD",
      "Cuentas de correo ilimitadas",
      "Bases de datos ilimitadas",
      "Optimizado para WordPress y +400 apps",
      "Licencia Elementor Pro por 1 año",
      "SSL, backup y antivirus incluidos",
    ],
    transferPrice: "$153.580",
    installmentTotal: "$163.670",
    installmentValue: "$54.557",
    paymentUrl:
      "https://www.flow.cl/btn.php?token=k45c42176bcc3ba7d82d8cf2188af177f9bf6f10",
    accent: true,
  },
  {
    name: "Hosting 12 GB",
    description:
      "Una alternativa robusta para negocios con más información, correos y contenido web.",
    features: [
      "12 GB de espacio en disco SSD",
      "Cuentas de correo ilimitadas",
      "Bases de datos ilimitadas",
      "Optimizado para WordPress y +400 apps",
      "Licencia Elementor Pro por 1 año",
      "SSL, backup y antivirus incluidos",
    ],
    transferPrice: "$189.205",
    installmentTotal: "$201.635",
    installmentValue: "$67.212",
    paymentUrl:
      "https://www.flow.cl/btn.php?token=yaba644f7a0dcefd45a6ca2a5ee8e478be8dbc51",
  },
  {
    name: "Hosting 16 GB",
    description:
      "Mayor capacidad para empresas que concentran operación, correo y contenido en línea.",
    features: [
      "16 GB de espacio en disco SSD",
      "Cuentas de correo ilimitadas",
      "Bases de datos ilimitadas",
      "Optimizado para WordPress y +400 apps",
      "Licencia Elementor Pro por 1 año",
      "SSL, backup y antivirus incluidos",
    ],
    transferPrice: "$220.871",
    installmentTotal: "$235.381",
    installmentValue: "$78.461",
    paymentUrl:
      "https://www.flow.cl/btn.php?token=v9281f484d3bdbbaefd434f06d0e3dd40964aa2d",
  },
  {
    name: "Hosting 20 GB",
    description:
      "Para empresas consolidadas que buscan espacio, estabilidad y correos sin límites.",
    features: [
      "20 GB de espacio en disco SSD",
      "Cuentas de correo ilimitadas",
      "Bases de datos ilimitadas",
      "Optimizado para WordPress y +400 apps",
      "Licencia Elementor Pro por 1 año",
      "SSL, backup y antivirus incluidos",
    ],
    transferPrice: "$256.495",
    installmentTotal: "$273.345",
    installmentValue: "$91.115",
    paymentUrl:
      "https://www.flow.cl/btn.php?token=p40a65fd221cdf20f4928bffdd076f03ff37f4aa",
  },
  {
    name: "Hosting 40 GB",
    description:
      "Alta capacidad para operaciones con mayor volumen de archivos, correo y tráfico web.",
    features: [
      "40 GB de espacio en disco SSD",
      "Cuentas de correo ilimitadas",
      "Bases de datos ilimitadas",
      "300 correos por hora",
      "Licencia Elementor Pro por 1 año",
      "SSL, backup y antivirus incluidos",
    ],
    transferPrice: "$434.617",
    installmentTotal: "$463.168",
    installmentValue: "$154.390",
    paymentUrl:
      "https://www.flow.cl/btn.php?token=v8b9d8df5cdbdfdbffd641cb98fd86673fd4f50d",
  },
  {
    name: "Hosting 60 GB",
    description:
      "Capacidad para empresas con alta demanda de almacenamiento y correos corporativos.",
    features: [
      "60 GB de espacio en disco SSD",
      "Cuentas de correo ilimitadas",
      "Bases de datos ilimitadas",
      "300 correos por hora",
      "Licencia Elementor Pro por 1 año",
      "SSL, backup y antivirus incluidos",
    ],
    transferPrice: "$565.250",
    installmentTotal: "$602.383",
    installmentValue: "$200.795",
    paymentUrl:
      "https://www.flow.cl/btn.php?token=sccfcd8b4baa417314bafecba2e72463f95b17e1",
  },
  {
    name: "Hosting 80 GB",
    description:
      "Infraestructura para operaciones que manejan un alto volumen de archivos y correos.",
    features: [
      "80 GB de espacio en disco SSD",
      "Cuentas de correo ilimitadas",
      "Bases de datos ilimitadas",
      "300 correos por hora",
      "Licencia Elementor Pro por 1 año",
      "SSL, backup y antivirus incluidos",
    ],
    transferPrice: "$673.254",
    installmentTotal: "$717.482",
    installmentValue: "$239.161",
    paymentUrl:
      "https://www.flow.cl/btn.php?token=d9bd1b03e5e509f668b520367b854696721fc6df",
  },
  {
    name: "Hosting 100 GB",
    description:
      "Nuestra alternativa de mayor capacidad para operaciones críticas y de alto volumen.",
    features: [
      "100 GB de espacio en disco SSD",
      "Cuentas de correo ilimitadas",
      "Bases de datos ilimitadas",
      "300 correos por hora",
      "Licencia Elementor Pro por 1 año",
      "SSL, backup y antivirus incluidos",
    ],
    transferPrice: "$834.401",
    installmentTotal: "$889.214",
    installmentValue: "$296.405",
    paymentUrl:
      "https://www.flow.cl/btn.php?token=nafc5d26ba343f35a6cb241b5fd94203ab594ecb",
  },
];

const domainPlan: HostingPlan = {
  name: "Renovación Dominio .CL",
  description:
    "Renovación anual de tu dominio .CL para mantener tu dirección web activa.",
  features: [
    "Vigencia por 1 año",
    "Registro de dominio .CL",
    "No incluye hosting",
    "No incluye cuentas de correo",
    "No incluye soporte técnico",
  ],
  transferPrice: "$26.061",
  installmentTotal: "$27.773",
  installmentValue: "$9.258",
  paymentUrl:
    "https://www.flow.cl/btn.php?token=w2c0195308ccc96af5cd09b1529df4dd602944ee",
};

function PlanCard({
  plan,
  index,
}: {
  plan: HostingPlan;
  index: number;
}) {
  return (
    <article
      className={`${styles.card} ${plan.accent ? styles.accentCard : ""}`}
      data-reveal
      style={{
        transitionDelay: `${Math.min((index % 3) * 90, 180)}ms`,
      }}
    >
      {plan.accent && <span className={styles.badge}>MÁS ELEGIDO</span>}

      <p className={styles.cardEyebrow}>PLAN ANUAL</p>

      <h2>{plan.name}</h2>

      <p className={styles.description}>{plan.description}</p>

      <ul className={styles.features}>
        {plan.features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>

      <div className={styles.pricing}>
        <div>
          <span>Transferencia</span>
          <strong>{plan.transferPrice}</strong>
          <small>IVA incluido · anual</small>
        </div>

        <div className={styles.installments}>
          <span>Hasta 3 cuotas</span>
          <strong>3 × {plan.installmentValue}</strong>
          <small>Total {plan.installmentTotal}</small>
        </div>
      </div>

      <a
        className={styles.paymentButton}
        href={plan.paymentUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={`Pagar ${plan.name} hasta en 3 cuotas`}
      >
        PAGAR HASTA EN 3 CUOTAS <span aria-hidden="true">↗</span>
      </a>
    </article>
  );
}

export default function HostingPlans() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const elements =
      sectionRef.current?.querySelectorAll<HTMLElement>("[data-reveal]");

    if (!elements?.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -58px",
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.hostingSection}>
      <div className={styles.glowOne} aria-hidden="true" />
      <div className={styles.glowTwo} aria-hidden="true" />

      <div className={styles.container}>
        <header className={styles.hero} data-reveal>
          <p className={styles.eyebrow}>HOSTING Y CORREO CORPORATIVO</p>

          <h1>
            Tu operación online,
            <span> segura y siempre disponible.</span>
          </h1>

          <p className={styles.heroText}>
            Planes anuales para mantener tu sitio web y correos corporativos
            operativos, con capacidad para acompañar el crecimiento de tu
            empresa.
          </p>
        </header>

        <div className={styles.notice} data-reveal>
          <span className={styles.noticeMark}>i</span>

          <p>
            El hosting cubre el espacio contratado y la operatividad de la
            infraestructura. La creación de correos, configuración de equipos
            y soporte remoto se cotizan por separado.
          </p>
        </div>

        <div className={styles.grid}>
          {plans.map((plan, index) => (
            <PlanCard key={plan.name} plan={plan} index={index} />
          ))}
        </div>

        <div className={styles.domainWrap}>
          <p className={styles.domainLabel} data-reveal>
            RENOVACIÓN DE DOMINIO
          </p>

          <PlanCard plan={domainPlan} index={0} />
        </div>
      </div>
    </section>
  );
}