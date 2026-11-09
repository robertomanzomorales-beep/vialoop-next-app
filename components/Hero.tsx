"use client";

import Link from "next/link";
import { useRef, type PointerEvent } from "react";
import useScrollReveal from "./useScrollReveal";
import styles from "./Hero.module.css";
import HeroTypewriter from "./HeroTypewriter";

const services = [
  { title: "Diseño web", text: "Una presencia a la altura de tu negocio.", href: "/diseno-web", icon: "web" },
  { title: "Software a medida", text: "Tu operación, más simple y conectada.", href: "/software-a-medida", icon: "software" },
  { title: "Soporte y continuidad", text: "Acompañamiento para seguir avanzando.", href: "/contacto?servicio=hosting", icon: "support" },
];

function ServiceIcon({ type }: { type: string }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {type === "web" ? <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M7 6.5h.01M10 6.5h.01M7 13h6M7 16h10" /></> : type === "software" ? <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /><path d="M14 6h3a1 1 0 0 1 1 1v3M10 18H7a1 1 0 0 1-1-1v-3M14 10l4-4M10 14l-4 4" /></> : <><path d="M5 13v-2a7 7 0 0 1 14 0v2M5 12H4a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h3v-6Zm14 0h1a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-3v-6Zm0 6v1a2 2 0 0 1-2 2h-4" /></>}
  </svg>;
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);
  function moveLight(event: PointerEvent<HTMLAnchorElement>) {
    if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--pointer-x", `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);
  }

  return (
    <section ref={sectionRef} id="inicio" aria-labelledby="hero-title" className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.intro}>
          <p data-scroll-reveal className={styles.eyebrow}><span aria-hidden="true" />Diseño, tecnología y personas</p>
          <h1 data-scroll-reveal data-scroll-delay="60" id="hero-title" aria-label="Diseño web y software a medida de tu empresa." className={styles.title}>
            <span className={styles.line}><span>Diseño web y software</span></span>{" "}
            <span className={styles.line}><HeroTypewriter /></span>
          </h1>
          <p data-scroll-reveal data-scroll-delay="120" className={styles.description}>Creamos experiencias digitales que presentan tu negocio y simplifican tu operación. Con diseño cuidado y acompañamiento cercano.</p>
          <div data-scroll-reveal data-scroll-delay="180" className={styles.actions}>
            <Link href="/contacto" className={styles.primaryButton}>Hablemos de tu proyecto</Link>
            <Link href="/#servicios" className={styles.secondaryButton}>Explorar soluciones</Link>
          </div>
        </div>

        <div className={styles.services} aria-label="Soluciones de Vialoop">
          {services.map((service, index) => (
            <Link key={service.href} href={service.href} data-scroll-reveal data-scroll-delay={160 + index * 40} className={styles.service} onPointerMove={moveLight}>
              <span className={styles.serviceIcon}><ServiceIcon type={service.icon} /></span>
              <span className={styles.serviceContent}><strong>{service.title}</strong><span>{service.text}</span></span>
              <span className={styles.serviceMark} aria-hidden="true" />
            </Link>
          ))}
        </div>
        <div data-scroll-reveal data-scroll-delay="220" className={styles.footnote}><p>Desde Calama y Antofagasta, para todo Chile.</p><span aria-hidden="true" /><p>Ideas claras. Soluciones a tu medida.</p></div>
      </div>
    </section>
  );
}
