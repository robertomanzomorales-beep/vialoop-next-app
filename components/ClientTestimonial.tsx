"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./ClientTestimonial.module.css";
import useScrollReveal from "./useScrollReveal";

export default function ClientTestimonial() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [started, setStarted] = useState(false);
  useScrollReveal(sectionRef);

  useEffect(() => {
    const video = videoRef.current;
    const frame = frameRef.current;
    if (!video || !frame || !("IntersectionObserver" in window)) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let startTimer: ReturnType<typeof setTimeout> | undefined;

    function syncPlayback() {
      clearTimeout(startTimer);
      if (!visible || document.hidden || preference.matches || userPaused.current) {
        if (!video!.paused) video!.pause();
      } else if (video!.paused) {
        startTimer = setTimeout(() => {
          void video!.play().catch(() => { /* Manual playback remains available. */ });
        }, 160);
      }
    }

    const observer = new IntersectionObserver(([entry]) => {
      // Different entry/exit thresholds prevent scroll and mobile toolbar jitter from toggling playback.
      if (!entry.isIntersecting || entry.intersectionRatio <= .08) visible = false;
      else if (entry.intersectionRatio >= .45) visible = true;
      syncPlayback();
    }, { threshold: [0, .08, .45] });
    observer.observe(frame);

    // Prepare the clip shortly before arrival, without downloading it on the initial Home screen.
    const preparation = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      if (!preference.matches && video.preload === "none" && video.readyState === 0 && video.paused) {
        video.preload = "auto";
        video.load();
      }
      preparation.disconnect();
    }, { rootMargin: "240px 0px", threshold: 0 });
    preparation.observe(frame);
    document.addEventListener("visibilitychange", syncPlayback);
    preference.addEventListener("change", syncPlayback);
    return () => {
      observer.disconnect();
      preparation.disconnect();
      clearTimeout(startTimer);
      document.removeEventListener("visibilitychange", syncPlayback);
      preference.removeEventListener("change", syncPlayback);
      video.pause();
    };
  }, []);

  function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      userPaused.current = false;
      void video.play().catch(() => {});
    } else {
      userPaused.current = true;
      video.pause();
    }
  }

  function toggleSound() {
    const video = videoRef.current;
    if (!video) return;
    const listen = video.muted;
    video.muted = !listen;
    setMuted(video.muted);
    if (listen) {
      video.currentTime = 0;
      userPaused.current = false;
      void video.play().catch(() => {});
    }
  }

  return (
    <section ref={sectionRef} id="experiencia-clientes" className={styles.section} aria-labelledby="client-testimonial-title">
      <div className={styles.container}>
        <header data-scroll-reveal className={styles.intro}>
          <p className={styles.eyebrow}><span aria-hidden="true" />Experiencia de cliente</p>
          <h2 id="client-testimonial-title">Así se vive <em>trabajar con Vialoop.</em></h2>
          <p className={styles.description}>Diseño web, fotografía y producción audiovisual para GM Especialistas en Calibración.</p>
        </header>

        <div data-scroll-reveal data-scroll-delay="90" className={styles.quoteColumn}>
          <div className={styles.rating} aria-label="Calificación de cinco estrellas"><span aria-hidden="true">★★★★★</span><span>5.0</span></div>
          <blockquote className={styles.quote}>
            <p>“El proceso fue <em>cercano, profesional</em> y el resultado superó nuestras expectativas.”</p>
          </blockquote>
          <div className={styles.author}>
            <span className={styles.authorMark} aria-hidden="true">GM</span>
            <div><strong>Osvaldo</strong><span>GM Especialistas en Calibración</span></div>
          </div>
          <a href="#contacto" className={styles.contactLink}>Conversemos de tu proyecto</a>
          <details className={styles.transcript}>
            <summary>Leer testimonio completo<span aria-hidden="true">+</span></summary>
            <div>
              <p>Hola, soy Osvaldo, de GM Especialistas en Calibración.</p>
              <p>Quiero compartir nuestra experiencia trabajando con Vialoop. Estamos muy conformes con el resultado de nuestra nueva página web. Desde el diseño hasta la producción audiovisual, incluyendo las tomas con dron y la fotografía profesional, el equipo logró plasmar exactamente lo que necesitábamos para representar a nuestra empresa.</p>
              <p>El proceso fue cercano, profesional y el resultado superó nuestras expectativas.</p>
              <p>Si estás pensando en renovar o crear el sitio web de tu empresa, te recomiendo contactar a Vialoop.</p>
            </div>
          </details>
        </div>

        <div className={styles.videoColumn}>
          <div className={styles.videoAura} aria-hidden="true" />
          <div ref={frameRef} className={styles.videoFrame} data-video-started={started || undefined}>
            <video ref={videoRef} className={styles.video} src="/testimonio-cliente-vialoop.mp4" width={720} height={1280} poster="/osvaldo-testimonio-poster.webp" muted={muted} loop playsInline preload="none" onPlay={() => setPlaying(true)} onPlaying={() => setStarted(true)} onPause={() => setPlaying(false)} onVolumeChange={(event) => setMuted(event.currentTarget.muted)} aria-label="Testimonio de Osvaldo, de GM Especialistas en Calibración" />
            <Image src="/osvaldo-testimonio-poster.webp" alt="" aria-hidden="true" fill unoptimized sizes="(max-width: 700px) 244px, 286px" className={styles.videoPoster} />
            <div className={styles.videoShade} aria-hidden="true" />
            <button type="button" className={styles.soundControl} onClick={toggleSound} aria-pressed={!muted} aria-label={muted ? "Escuchar testimonio de Osvaldo" : "Silenciar testimonio de Osvaldo"}>
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M9 4 5 7H2v6h3l4 3V4Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                {muted ? <path d="m13 7 5 6m0-6-5 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /> : <path d="M12 6.5a5 5 0 0 1 0 7M15 3.5a9 9 0 0 1 0 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />}
              </svg>
              <span>{muted ? "Escuchar testimonio" : "Silenciar audio"}</span>
            </button>
            <div className={styles.videoSignature}><span>Osvaldo</span><span>GM Especialistas</span></div>
            <button type="button" className={styles.playback} onClick={togglePlayback} aria-label={playing ? "Pausar video de Osvaldo" : "Reproducir video de Osvaldo"}>
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">{playing ? <path d="M7 5v10M13 5v10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /> : <path d="m7 4 9 6-9 6Z" fill="currentColor" />}</svg>
            </button>
          </div>
          <p className={styles.videoCaption}><span aria-hidden="true" />Personas detrás de cada proyecto.</p>
        </div>
      </div>
    </section>
  );
}
