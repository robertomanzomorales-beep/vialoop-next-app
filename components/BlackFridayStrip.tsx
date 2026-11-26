"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import styles from "./BlackFridayStrip.module.css";

// The campaign ends at midnight after November 30 in continental Chile.
const campaignEnd = Date.parse("2026-12-01T00:00:00-03:00");
const getVisibility = () => Date.now() < campaignEnd;
const getServerVisibility = () => true;

function subscribeToCampaign(notify: () => void) {
  let timer: number;
  const schedule = () => {
    timer = window.setTimeout(() => {
      notify();
      if (getVisibility()) schedule();
    }, Math.min(Math.max(0, campaignEnd - Date.now()), 2_147_483_647));
  };
  schedule();
  document.addEventListener("visibilitychange", notify);
  return () => {
    window.clearTimeout(timer);
    document.removeEventListener("visibilitychange", notify);
  };
}

function Message() {
  return <span className={styles.sequence}>
    <strong className={styles.event}>Black Friday</strong>
    <span className={styles.services}>Web + software a medida</span>
    <span className={styles.separator} />
  </span>;
}

export default function BlackFridayStrip() {
  const visible = useSyncExternalStore(subscribeToCampaign, getVisibility, getServerVisibility);
  const [paused, setPaused] = useState(false);
  if (!visible) return null;

  return <aside className={styles.strip} aria-label="Black Friday en Vialoop" data-paused={paused || undefined}>
    <div className={styles.inner}>
      <p className={styles.accessible}>Black Friday en Vialoop: del viernes 27 de noviembre de 2026 a las 00:00 al lunes 30 de noviembre a las 23:59, hora de Chile. Diseño web y software a medida. Conversemos de tu próximo proyecto.</p>
      <div className={styles.viewport} aria-hidden="true">
        <div className={styles.track}>
          <div className={styles.group}><Message /><Message /></div>
          <div className={styles.group}><Message /><Message /></div>
        </div>
      </div>
      <div className={styles.actions}>
        <span className={styles.period} aria-hidden="true">27–30 <span>noviembre</span></span>
        <Link href="/contacto" className={styles.contact} aria-label="Consultar por Black Friday en Vialoop">Cotizar mi proyecto</Link>
        <button className={styles.motionButton} type="button" aria-label={paused ? "Reanudar texto de Black Friday" : "Pausar texto de Black Friday"} onClick={() => setPaused(value => !value)} title={paused ? "Reanudar movimiento" : "Pausar movimiento"}>
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">{paused ? <path d="m7 5 8 5-8 5V5Z" fill="currentColor" /> : <path d="M7 5v10m6-10v10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />}</svg>
        </button>
      </div>
    </div>
  </aside>;
}
