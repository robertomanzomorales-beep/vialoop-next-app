"use client";

import { useEffect, useRef, useState } from "react";
import LandingReveal from "./LandingReveal";
import styles from "./MobileWebShowcase.module.css";

const projects = [
  { name: "Grúas T&S", domain: "gruastys.cl", href: "https://gruastys.cl/", video: "/showcase/gruastys-mobile.mp4", poster: "/showcase/gruastys-mobile-poster.webp", detail: "Arriendo de grúas horquilla" },
  { name: "Elektrom", domain: "elektrom.cl", href: "https://elektrom.cl/", video: "/showcase/elektrom-mobile.mp4", poster: "/showcase/elektrom-mobile-poster.webp", detail: "Soluciones eléctricas" },
];

function MobilePreview({ project, index }: { project: typeof projects[number]; index: number }) {
  const ref = useRef<HTMLVideoElement>(null);
  const manuallyPaused = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const expandedVideo = useRef<HTMLVideoElement>(null);
  const modalOpen = useRef(false);
  const savedTime = useRef(0);
  const wasPlaying = useRef(false);
  useEffect(() => {
    const video = ref.current;
    if (!video || !("IntersectionObserver" in window)) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const sync = () => {
      if (!visible || document.hidden || preference.matches || manuallyPaused.current || modalOpen.current) video.pause();
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
  function expand() {
    const video = ref.current;
    if (!video || !dialog.current) return;
    savedTime.current = video.currentTime;
    wasPlaying.current = !video.paused;
    modalOpen.current = true;
    video.pause();
    setExpanded(true);
    dialog.current.showModal();
  }
  function closeExpanded() {
    const enlarged = expandedVideo.current;
    const video = ref.current;
    if (enlarged) {
      savedTime.current = enlarged.currentTime;
      wasPlaying.current = !enlarged.paused;
      enlarged.pause();
    }
    modalOpen.current = false;
    manuallyPaused.current = !wasPlaying.current;
    if (video) {
      video.currentTime = savedTime.current;
      if (wasPlaying.current) void video.play().catch(() => {});
    }
    setExpanded(false);
  }
  return <LandingReveal motion={index ? "right" : "rise"} delay={index ? 200 : 80} className={`${styles.preview} ${index ? styles.second : styles.first}`}>
    <div className={styles.device}>
      <div className={styles.deviceBar}><span aria-hidden="true" />{project.domain}</div>
      <div className={styles.videoArea}>
        <video ref={ref} src={project.video} poster={project.poster} muted loop playsInline preload="none" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} aria-label={`Recorrido de la versión móvil de ${project.name}`} />

      </div>
    </div>
    <div className={styles.caption}><div className={styles.captionTitle}><h3>{project.name}</h3><button type="button" className={styles.playback} onClick={toggle} aria-label={`${playing ? "Pausar" : "Reproducir"} versión móvil de ${project.name}`}><svg viewBox="0 0 20 20" fill="none" aria-hidden="true">{playing ? <path d="M7 5v10M13 5v10" stroke="currentColor" strokeWidth="1.5" /> : <path d="m7 4 9 6-9 6Z" fill="currentColor" />}</svg></button></div><p>{project.detail}</p><div className={styles.actions}><button type="button" onClick={expand}>Ampliar video</button><a href={project.href} target="_blank" rel="noopener noreferrer" aria-label={`Visitar ${project.name} en otra pestaña`}>Visitar sitio</a></div></div>
    <dialog ref={dialog} className={styles.dialog} onClose={closeExpanded} aria-label={`Recorrido ampliado de ${project.name}`}>
      <div className={styles.dialogBar}><span>{project.name}</span><button type="button" onClick={() => dialog.current?.close()}>Cerrar</button></div>
      {expanded && <video ref={expandedVideo} src={project.video} poster={project.poster} muted loop playsInline controls onLoadedMetadata={event => {
        event.currentTarget.currentTime = savedTime.current;
        if (wasPlaying.current) void event.currentTarget.play().catch(() => {});
      }} />}
    </dialog>
  </LandingReveal>;
}

export default function MobileWebShowcase() {
  const [selected, setSelected] = useState(0);
  return <section id="experiencia-movil" className={styles.section} aria-labelledby="mobile-web-title">
    <div className={`${styles.container} ${styles.layout}`}>
      <LandingReveal motion="left" className={styles.intro}>
        <p className={styles.eyebrow}>UNA BUENA EXPERIENCIA EN CADA PANTALLA</p>
        <h2 id="mobile-web-title">Tu empresa,<em>también en movimiento.</em></h2>
        <p className={styles.lead}>El celular es parte del recorrido de tus clientes. Cuidamos cómo se lee tu contenido, cómo se recorre el sitio y qué tan fácil es contactarte.</p>
        <ul className={styles.features}><li>Navegación clara y cómoda.</li><li>Contenido que se adapta a la pantalla.</li><li>Contacto siempre a mano.</li></ul>
        <p className={styles.realFootage}>Recorridos reales de sitios desarrollados por Vialoop, desde el celular.</p>
      </LandingReveal>
      <div className={styles.showcase}>
        <div className={styles.selector} role="group" aria-label="Seleccionar sitio web">
          {projects.map((project, index) => <button type="button" key={project.name} onClick={() => setSelected(index)} aria-pressed={selected === index}>{project.name}</button>)}
        </div>
        <div className={styles.phones}><MobilePreview key={projects[selected].name} project={projects[selected]} index={selected} /></div>
      </div>
    </div>
  </section>;
}
