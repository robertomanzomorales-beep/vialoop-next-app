"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import useScrollReveal from "./useScrollReveal";
import styles from "./SystemsSection.module.css";

const challenges = [
  { label: "Planillas que no dan abasto", icon: "sheets", color: "#80b9ef" },
  { label: "Datos en distintos lugares", icon: "sources", color: "#7fc5d2" },
  { label: "Tareas manuales repetidas", icon: "repeat", color: "#92bad8" },
  { label: "Equipos desconectados", icon: "people", color: "#adbce4" },
  { label: "Seguimientos por mensajes", icon: "messages", color: "#c2bca6" },
  { label: "Decisiones sin datos claros", icon: "insights", color: "#d5b785" },
];

function ChallengeIcon({ type }: { type: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {type === "sheets" && <><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M4 9h16M4 15h16M10 9v12M15 9v12" /><path className={styles.iconAccent} d="M8 6h8" /></>}
      {type === "sources" && <><rect x="2.5" y="4" width="7" height="7" rx="1.5" /><rect x="14.5" y="13" width="7" height="7" rx="1.5" /><path d="M14.5 7h3a1 1 0 0 1 1 1v2M9.5 17h-3a1 1 0 0 1-1-1v-2" /><path className={styles.iconAccent} d="m15 4 2 3-2 3M9 14l-2 3 2 3" /></>}
      {type === "repeat" && <><path d="M19 9a7 7 0 0 0-12-3L4 9M5 15a7 7 0 0 0 12 3l3-3M4 4v5h5M20 20v-5h-5" /><path className={styles.iconAccent} d="m10 12 1.5 1.5L15 10" /></>}
      {type === "people" && <><circle cx="8" cy="7" r="3" /><path d="M2.5 19v-2a5.5 5.5 0 0 1 11 0v2M16 4.5a3 3 0 0 1 0 5.5M17 13a5 5 0 0 1 4.5 5v1" /><path className={styles.iconAccent} d="M10.5 20h7" /></>}
      {type === "messages" && <><path d="M14 15H7l-4 3V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4M7 7h8M7 11h4" /><path className={styles.iconAccent} d="M18 13v7M14.5 16.5h7" /></>}
      {type === "insights" && <><path d="M4 3v17h17M8 15v2M13 10v7M18 6v11" /><path className={styles.iconAccent} d="m7 10 5-5 3 2 5-4" /></>}
    </svg>
  );
}

function Connections({ mobile = false }: { mobile?: boolean }) {
  if (mobile) {
    return (
      <svg className={styles.mobileConnections} viewBox="0 0 500 80" preserveAspectRatio="none" fill="none" aria-hidden="true">
        <path className={styles.mobileWire} d="M125 0C125 40 250 18 250 54M375 0C375 40 250 18 250 54M250 54V80" />
        <path className={styles.mobileSignal} d="M125 0C125 40 250 18 250 54M375 0C375 40 250 18 250 54M250 54V80" />
        <circle className={styles.hubHalo} cx="250" cy="54" r="13" />
        <circle className={styles.hubCore} cx="250" cy="54" r="3.5" />
      </svg>
    );
  }

  return (
    <svg className={styles.connections} viewBox="0 0 300 396" preserveAspectRatio="none" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="vialoop-flow-outlet" x1="230" y1="198" x2="300" y2="198" gradientUnits="userSpaceOnUse">
          <stop stopColor="#a9d9ec" />
          <stop offset="1" stopColor="#d5b785" />
        </linearGradient>
      </defs>
      {challenges.map((challenge, index) => {
        const y = 28 + index * 68;
        const path = `M0 ${y} C128 ${y} 138 198 232 198`;
        return (
          <g key={challenge.icon} className={styles.channel} data-channel={index} style={{ "--channel-color": challenge.color, "--signal-delay": `${index * -.73}s` } as CSSProperties}>
            <path className={styles.wire} d={path} />
            <path className={styles.signal} d={path} pathLength="100" />
          </g>
        );
      })}
      <path className={styles.outlet} d="M232 198H300" />
      <path className={styles.outletSignal} d="M232 198H300" />
      <circle className={styles.hubHalo} cx="232" cy="198" r="16" />
      <circle className={styles.hubRing} cx="232" cy="198" r="9" />
      <circle className={styles.hubCore} cx="232" cy="198" r="3.5" />
    </svg>
  );
}

export default function SystemsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const diagramRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);
  useScrollReveal(sectionRef);

  useEffect(() => {
    const diagram = diagramRef.current;
    if (!diagram || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: .12 });
    observer.observe(diagram);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="sistemas-para-empresas" className={styles.section} aria-labelledby="systems-title">
      <div className={styles.container}>
        <header data-scroll-reveal className={styles.header}>
          <p className={styles.eyebrow}><span aria-hidden="true" />Software a medida</p>
          <h2 id="systems-title">¿Tu empresa necesita <em>trabajar más conectada?</em></h2>
        </header>

        <div ref={diagramRef} className={styles.flow} data-running={inView && !paused || undefined}>
          <ul className={styles.challenges} aria-label="Desafíos que podemos ayudarte a resolver">
            {challenges.map((challenge, index) => (
              <li key={challenge.icon} data-scroll-reveal data-scroll-delay={index * 30} className={styles.challenge} style={{ "--channel-color": challenge.color } as CSSProperties}>
                <span className={styles.icon}><ChallengeIcon type={challenge.icon} /></span>
                <span>{challenge.label}</span>
                <span className={styles.port} aria-hidden="true" />
              </li>
            ))}
          </ul>

          <Connections />
          <Connections mobile />

          <div data-scroll-reveal data-scroll-delay="150" className={styles.solutionWrap}>
            <article className={styles.solution} aria-labelledby="software-solution-title">
              <p className={styles.solutionEyebrow}>Todo en un mismo flujo</p>
              <h3 id="software-solution-title">Un software.<br /><em>Tu operación conectada.</em></h3>
              <p className={styles.solutionText}>Unimos la información y simplificamos tus procesos con software hecho para tu empresa.</p>
              <Link href="/contacto?servicio=sistema" className={styles.cta}>Conversemos de tu software</Link>
              <span className={styles.solutionNote}>A tu medida. Con acompañamiento cercano.</span>
            </article>
          </div>
        </div>

        <div className={styles.motionRow}>
          <button type="button" className={styles.motionControl} onClick={() => setPaused(value => !value)}>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">{paused ? <path d="m5 3 7 5-7 5Z" /> : <path d="M6 3v10M10 3v10" />}</svg>
            {paused ? "Reanudar animación" : "Pausar animación"}
          </button>
        </div>

        <div data-scroll-reveal className={styles.integrationsTeaser}>
          <p><strong>Tu software también puede conectarse.</strong><span>WhatsApp, facturación compatible con SII, inteligencia artificial y pagos en línea.</span></p>
          <Link href="/software-a-medida#integraciones">Explorar integraciones</Link>
        </div>
      </div>
    </section>
  );
}
