"use client";

import { useEffect, useRef, useState } from "react";
import LandingReveal from "./LandingReveal";
import styles from "./MobileWebShowcase.module.css";

const projects = [
  { name: "Solterra", domain: "solterra.cl", href: "https://solterra.cl/", video: "/showcase/solterra-mobile.mp4", poster: "/showcase/solterra-mobile-poster.webp", detail: "Movimiento de tierra y maquinarias" },
  { name: "PROMAQ", domain: "promaqserviciosindustriales.cl", href: "https://promaqserviciosindustriales.cl/", video: "/showcase/promaq-mobile.mp4", poster: "/showcase/promaq-mobile-poster.webp", detail: "Izaje y servicios industriales" },
];

function MobilePreview({ project, index }: { project: typeof projects[number]; index: number }) {
  const ref = useRef<HTMLVideoElement>(null);
  const manuallyPaused = useRef(false);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const video = ref.current;
    if (!video || !("IntersectionObserver" in window)) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const sync = () => {
      if (!visible || document.hidden || preference.matches || manuallyPaused.current) video.pause();
      else void video.play().catch(() => {});
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting && entry.intersectionRatio >= .35; sync(); }, { threshold: [0, .35] });
    observer.observe(video);
    document.addEventListener("visibilitychange", sync);
    preference.addEventListener("change", sync);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", sync); preference.removeEventListener("change", sync); video.pause(); };
  }, []);
  function toggle() {
    const video = ref.current;
    if (!video) return;
    manuallyPaused.current = !video.paused;
    if (video.paused) void video.play().catch(() => {}); else video.pause();
  }
  return <LandingReveal motion={index ? "right" : "rise"} delay={index ? 200 : 80} className={`${styles.preview} ${index ? styles.second : styles.first}`}>
    <div className={styles.device}>
      <div className={styles.deviceBar}><span aria-hidden="true" />{project.domain}</div>
      <div className={styles.videoArea}>
        <video ref={ref} src={project.video} poster={project.poster} muted loop playsInline preload="none" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} aria-label={`Recorrido de la versión móvil de ${project.name}`} />

      </div>
    </div>
    <div className={styles.caption}><div className={styles.captionTitle}><h3>{project.name}</h3><button type="button" className={styles.playback} onClick={toggle} aria-label={`${playing ? "Pausar" : "Reproducir"} versión móvil de ${project.name}`}><svg viewBox="0 0 20 20" fill="none" aria-hidden="true">{playing ? <path d="M7 5v10M13 5v10" stroke="currentColor" strokeWidth="1.5" /> : <path d="m7 4 9 6-9 6Z" fill="currentColor" />}</svg></button></div><p>{project.detail}</p><a href={project.href} target="_blank" rel="noopener noreferrer" aria-label={`Visitar ${project.name} en otra pestaña`}>Visitar sitio</a></div>
  </LandingReveal>;
}

export default function MobileWebShowcase() {
  return <section id="experiencia-movil" className={styles.section} aria-labelledby="mobile-web-title">
    <div className={`${styles.container} ${styles.layout}`}>
      <LandingReveal motion="left" className={styles.intro}>
        <p className={styles.eyebrow}>UNA BUENA EXPERIENCIA EN CADA PANTALLA</p>
        <h2 id="mobile-web-title">Tu empresa,<em>también en movimiento.</em></h2>
        <p className={styles.lead}>El celular es parte del recorrido de tus clientes. Cuidamos cómo se lee tu contenido, cómo se recorre el sitio y qué tan fácil es contactarte.</p>
        <ul className={styles.features}><li>Navegación clara y cómoda.</li><li>Contenido que se adapta a la pantalla.</li><li>Contacto siempre a mano.</li></ul>
        <p className={styles.realFootage}>Recorridos reales de Solterra y PROMAQ, desde el celular.</p>
      </LandingReveal>
      <div className={styles.phones}>{projects.map((project,index) => <MobilePreview key={project.name} project={project} index={index} />)}</div>
    </div>
  </section>;
}
