"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { acceptAnalyticsCookies, rejectAnalyticsCookies, getStoredConsent, CONSENT_UPDATED_EVENT, OPEN_COOKIE_SETTINGS_EVENT } from "@/lib/privacy/consent";
import styles from "./CookieConsent.module.css";

function subscribe(onChange: () => void) {
  window.addEventListener(CONSENT_UPDATED_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CONSENT_UPDATED_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}
function snapshot() { return getStoredConsent()?.analytics ?? null; }
function serverSnapshot() { return undefined; }

export default function CookieConsent() {
  const consent = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  function openSettings() {
    setAnalytics(getStoredConsent()?.analytics ?? false);
    setSettingsOpen(true);
  }

  useEffect(() => {
    const open = () => openSettings();
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, open);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, open);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!settingsOpen || !dialog) return;
    dialog.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = overflow; if (dialog.open) dialog.close(); };
  }, [settingsOpen]);

  function save(value: boolean) {
    if (value) acceptAnalyticsCookies(); else rejectAnalyticsCookies();
    setSettingsOpen(false);
  }

  return <>
    {consent === null && !settingsOpen && <aside aria-label="Preferencias de cookies" className={styles.notice}>
      <div className={styles.noticeCopy}><p>Tu privacidad, a tu manera.</p><span>Usamos cookies necesarias. La analítica es opcional.</span></div>
      <div className={styles.actions}><button type="button" onClick={() => save(false)}>Solo necesarias</button><button type="button" onClick={() => save(true)}>Aceptar analítica</button><button type="button" className={styles.settings} onClick={openSettings}>Ajustes</button></div>
    </aside>}
    <dialog ref={dialogRef} className={styles.dialog} aria-labelledby="cookie-preferences-title" onClose={() => setSettingsOpen(false)} onClick={event => { if (event.target === event.currentTarget) setSettingsOpen(false); }}>
      <div className={styles.preferences}>
        <div className={styles.heading}><h2 id="cookie-preferences-title">Preferencias de cookies</h2><button type="button" aria-label="Cerrar preferencias" onClick={() => setSettingsOpen(false)}>×</button></div>
        <p>Tú decides si nos permites medir cómo se usa el sitio. Puedes cambiar esta elección desde el footer.</p>
        <div className={styles.necessary}><div><strong>Necesarias</strong><span>Guardan tu elección de privacidad.</span></div><small>Siempre activas</small></div>
        <label className={styles.option}><div><strong>Analítica</strong><span>Nos ayuda a entender y mejorar la navegación.</span></div><input type="checkbox" checked={analytics} onChange={event => setAnalytics(event.target.checked)} /></label>
        <div className={styles.dialogActions}><button type="button" onClick={() => save(false)}>Solo necesarias</button><button type="button" onClick={() => save(analytics)}>Guardar elección</button></div>
        <Link href="/politicadecookies" onNavigate={() => setSettingsOpen(false)}>Política de cookies</Link>
      </div>
    </dialog>
  </>;
}
