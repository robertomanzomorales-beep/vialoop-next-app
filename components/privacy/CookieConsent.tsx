"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
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

function PreferencesIcon() {
  return <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" aria-hidden="true"><path d="M3 6h14M3 14h14" /><circle cx="7" cy="6" r="2" fill="currentColor" stroke="none" /><circle cx="13" cy="14" r="2" fill="currentColor" stroke="none" /></svg>;
}

export default function CookieConsent() {
  const consent = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const openSettings = useCallback(() => {
    triggerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setAnalytics(getStoredConsent()?.analytics ?? false);
    setSettingsOpen(true);
  }, []);

  useEffect(() => {
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, openSettings);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, openSettings);
  }, [openSettings]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!settingsOpen || !dialog) return;
    dialog.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
      if (dialog.open) dialog.close();
      if (triggerRef.current?.isConnected) triggerRef.current.focus({ preventScroll: true });
    };
  }, [settingsOpen]);

  function save(value: boolean) {
    if (value) acceptAnalyticsCookies(); else rejectAnalyticsCookies();
    setSettingsOpen(false);
  }

  return <>
    {consent === null && !settingsOpen && <aside data-cookie-notice aria-label="Preferencias de cookies" className={styles.notice}>
      <div className={styles.noticeCopy}>
        <p>Privacidad y cookies</p>
        <span>La analítica es opcional. Tú eliges. <Link href="/politicadecookies">Ver detalles</Link></span>
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={() => save(false)}>Solo necesarias</button>
        <button type="button" className={styles.confirm} onClick={() => save(true)}>Aceptar analítica</button>
        <button type="button" className={styles.settings} aria-label="Configurar cookies" onClick={openSettings}><PreferencesIcon /></button>
      </div>
    </aside>}
    <dialog ref={dialogRef} className={styles.dialog} aria-labelledby="cookie-preferences-title" aria-describedby="cookie-preferences-description" onClose={() => setSettingsOpen(false)} onClick={event => { if (event.target === event.currentTarget) setSettingsOpen(false); }}>
      <div className={styles.preferences}>
        <div className={styles.heading}>
          <div><p>PRIVACIDAD EN VIALOOP</p><h2 id="cookie-preferences-title">Tú eliges.</h2></div>
          <button type="button" aria-label="Cerrar preferencias" onClick={() => setSettingsOpen(false)}><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true"><path d="m5 5 10 10M15 5 5 15" /></svg></button>
        </div>
        <p id="cookie-preferences-description">Puedes cambiar tu elección en cualquier momento desde el pie de página.</p>
        <div className={styles.necessary}><div><strong>Necesarias</strong><span>Recuerdan tu elección de privacidad.</span></div><small>Siempre activas</small></div>
        <label className={styles.option}><div><strong>Analítica</strong><span>Nos ayuda a mejorar la navegación.</span></div><input type="checkbox" aria-label="Permitir cookies analíticas" checked={analytics} onChange={event => setAnalytics(event.target.checked)} /></label>
        <div className={styles.dialogActions}><button type="button" onClick={() => save(false)}>Solo necesarias</button><button type="button" className={styles.confirm} onClick={() => save(analytics)}>Guardar elección</button></div>
        <Link href="/politicadecookies" onNavigate={() => setSettingsOpen(false)}>Política de Cookies</Link>
      </div>
    </dialog>
  </>;
}
