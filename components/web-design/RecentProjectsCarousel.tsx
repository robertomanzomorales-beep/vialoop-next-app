"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";
import styles from "./RecentProjectsCarousel.module.css";

type Position = { index: number; end: boolean; progress: number };
type Drag = { pointer: number; x: number; scroll: number; moved: boolean };

export default function RecentProjectsCarousel({ children, names }: { children: ReactNode[]; names: string[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const dragRef = useRef<Drag | null>(null);
  const suppressClick = useRef(false);
  const targetIndexRef = useRef<number | null>(null);
  const frameRef = useRef(0);
  const [position, setPosition] = useState<Position>({ index: 0, end: false, progress: 0 });

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const slides = Array.from(track.children) as HTMLElement[];
    const step = slides[1] ? slides[1].offsetLeft - slides[0].offsetLeft : track.clientWidth;
    const max = Math.max(0, track.scrollWidth - track.clientWidth);
    const target = targetIndexRef.current === null ? null : slides[targetIndexRef.current];
    if (target && Math.abs(track.scrollLeft - Math.min(max, target.offsetLeft - slides[0].offsetLeft)) < 2) targetIndexRef.current = null;
    const next = {
      index: Math.min(names.length - 1, Math.max(0, Math.round(track.scrollLeft / Math.max(1, step)))),
      end: track.scrollLeft >= max - 2,
      progress: max ? Math.max(0, Math.min(100, Math.round(track.scrollLeft / max * 100))) : 100,
    };
    setPosition(previous => previous.index === next.index && previous.end === next.end && previous.progress === next.progress ? previous : next);
  }, [names.length]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () => {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(measure);
    };
    const observer = new ResizeObserver(update);
    observer.observe(track);
    track.addEventListener("scroll", update, { passive: true });
    update();
    return () => { observer.disconnect(); track.removeEventListener("scroll", update); cancelAnimationFrame(frameRef.current); };
  }, [measure]);

  function goTo(index: number) {
    const track = trackRef.current;
    if (!track) return;
    const slides = Array.from(track.children) as HTMLElement[];
    const step = slides[1] ? slides[1].offsetLeft - slides[0].offsetLeft : track.clientWidth;
    const lastStart = Math.ceil((track.scrollWidth - track.clientWidth) / Math.max(1, step));
    const target = Math.min(slides.length - 1, lastStart, Math.max(0, index));
    const slide = slides[target];
    if (!slide) return;
    targetIndexRef.current = target;
    const left = slide.offsetLeft - slides[0].offsetLeft;
    track.scrollTo({ left, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  function move(direction: number) {
    const track = trackRef.current;
    if (!track) return;
    const slides = Array.from(track.children) as HTMLElement[];
    const step = slides[1] ? slides[1].offsetLeft - slides[0].offsetLeft : track.clientWidth;
    const current = targetIndexRef.current ?? Math.round(track.scrollLeft / Math.max(1, step));
    goTo(current + direction);
  }

  function pointerDown(event: PointerEvent<HTMLUListElement>) {
    targetIndexRef.current = null;
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    suppressClick.current = false;
    dragRef.current = { pointer: event.pointerId, x: event.clientX, scroll: event.currentTarget.scrollLeft, moved: false };
  }

  function pointerMove(event: PointerEvent<HTMLUListElement>) {
    const drag = dragRef.current;
    if (!drag || drag.pointer !== event.pointerId) return;
    const delta = event.clientX - drag.x;
    if (!drag.moved && Math.abs(delta) < 6) return;
    if (!drag.moved) {
      drag.moved = true;
      event.currentTarget.setPointerCapture(event.pointerId);
      event.currentTarget.dataset.dragging = "true";
    }
    event.preventDefault();
    event.currentTarget.scrollLeft = drag.scroll - delta;
  }

  function endDrag(event: PointerEvent<HTMLUListElement>) {
    const drag = dragRef.current;
    if (!drag || drag.pointer !== event.pointerId) return;
    dragRef.current = null;
    delete event.currentTarget.dataset.dragging;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    if (!drag.moved) return;
    suppressClick.current = true;
    const slides = Array.from(event.currentTarget.children) as HTMLElement[];
    const step = slides[1] ? slides[1].offsetLeft - slides[0].offsetLeft : event.currentTarget.clientWidth;
    goTo(Math.round(event.currentTarget.scrollLeft / Math.max(1, step)));
  }

  function keyboard(event: KeyboardEvent<HTMLUListElement>) {
    if (event.target !== event.currentTarget) return;
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    if (event.key === "Home" || event.key === "End") goTo(event.key === "Home" ? 0 : names.length - 1);
    else move(event.key === "ArrowRight" ? 1 : -1);
  }

  return <div className={styles.carousel} role="region" aria-roledescription="carrusel" aria-label="Últimos trabajos de diseño web">
    <div className={styles.toolbar}><p><span className={styles.desktopHint}>Arrastra o usa los controles</span><span className={styles.touchHint}>Desliza para explorar</span></p><div className={styles.buttons}><button type="button" aria-label="Ver proyectos anteriores" aria-controls="recent-web-projects" disabled={position.progress <= 0} onClick={() => move(-1)}>Anterior</button><button type="button" aria-label="Ver proyectos siguientes" aria-controls="recent-web-projects" disabled={position.end} onClick={() => move(1)}>Siguiente</button></div></div>
    <ul id="recent-web-projects" ref={trackRef} className={styles.track} tabIndex={0} aria-label="Proyectos recientes; usa las flechas del teclado para recorrerlos" onKeyDown={keyboard} onWheel={() => { targetIndexRef.current = null; }} onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={endDrag} onPointerCancel={endDrag} onLostPointerCapture={endDrag} onDragStart={event => event.preventDefault()} onClickCapture={event => { if (suppressClick.current) { event.preventDefault(); event.stopPropagation(); suppressClick.current = false; } }}>
      {children.map((child, index) => <li key={names[index]} className={styles.slide} aria-label={`${names[index]}, proyecto ${index + 1} de ${names.length}`}>{child}</li>)}
    </ul>
    <div className={styles.carouselFooter}><div className={styles.progress} role="progressbar" aria-label="Avance del carrusel" aria-valuemin={0} aria-valuemax={100} aria-valuenow={position.progress}><span style={{ "--progress": `${position.progress}%` } as CSSProperties} /></div><span>{names.length} proyectos recientes</span></div>
  </div>;
}
