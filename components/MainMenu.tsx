"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./MainMenu.module.css";

const PORTAL_URL = "https://portal-vialoop.vercel.app/";
const navigation = [
  { href: "/", label: "Inicio" },
  { href: "/#servicios", label: "Servicios" },
  { href: "/software-a-medida", label: "Software a medida" },
  { href: "/portafolio-web", label: "Portafolio web" },
  { href: "/faq", label: "Preguntas frecuentes" },
];

function Brand() {
  return <Image src="/via loop - Diseño Web y Marketing Digital.webp" alt="Vialoop" width={360} height={72} loading="eager" className={styles.logo} />;
}

export default function MainMenu() {
  const pathname = usePathname();
  const [hash, setHash] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closingRef = useRef(false);
  const restoreFocus = useRef(true);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const finishClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closingRef.current = false;
    setClosing(false);
    setMobileOpen(false);
  }, []);

  const requestClose = useCallback(() => {
    if (!dialogRef.current?.open || closingRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finishClose();
      return;
    }
    closingRef.current = true;
    setClosing(true);
    // A fallback also completes closing if an animation is interrupted.
    closeTimer.current = setTimeout(finishClose, 320);
  }, [finishClose]);

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash);
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [pathname]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!mobileOpen || !dialog) return;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
      document.body.style.overflow = previousOverflow;
      dialog.close();
    };
  }, [mobileOpen]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1100px)");
    const onResize = () => { if (desktop.matches) finishClose(); };
    desktop.addEventListener("change", onResize);
    return () => desktop.removeEventListener("change", onResize);
  }, [finishClose]);

  function isActive(href: string) {
    if (href === "/#servicios") return pathname === "/" && hash === "#servicios";
    if (href === "/") return pathname === "/" && hash !== "#servicios";
    return pathname === href;
  }

  function followLink(href: string) {
    setHash(href.includes("#") ? "#servicios" : "");
    restoreFocus.current = false;
    requestClose();
  }

  return <>
    <header className={styles.header}>
      <div className={styles.bar}>
        <Link href="/" aria-label="Ir al inicio de Vialoop" className={styles.brand} onClick={() => setHash("")}><Brand /></Link>
        <nav aria-label="Navegación principal" className={styles.desktopNav}>
          {navigation.map(item => <Link key={item.href} href={item.href} onClick={() => setHash(item.href.includes("#") ? "#servicios" : "")} className={`${styles.navLink} ${isActive(item.href) ? styles.active : ""}`} aria-current={isActive(item.href) ? "page" : undefined}>{item.label}</Link>)}
        </nav>
        <div className={styles.desktopActions}><a href={PORTAL_URL} target="_blank" rel="noopener noreferrer" className={styles.portal}>Portal clientes</a><Link href="/contacto" className={styles.contact}>Conversemos</Link></div>
        <button ref={toggleRef} type="button" className={styles.toggle} aria-label="Abrir menú" aria-expanded={mobileOpen} aria-controls="mobile-navigation" onClick={() => { restoreFocus.current = true; setClosing(false); setMobileOpen(true); }}><span /><span /></button>
      </div>
    </header>
    <dialog ref={dialogRef} id="mobile-navigation" aria-label="Menú de navegación" className={styles.dialog} data-closing={closing || undefined}
      onCancel={event => { event.preventDefault(); requestClose(); }}
      onClose={() => { if (restoreFocus.current) toggleRef.current?.focus({ preventScroll: true }); }}
      onAnimationEnd={event => { if (event.target === event.currentTarget && closingRef.current) finishClose(); }}
      onClick={event => { const rect = event.currentTarget.getBoundingClientRect(); if (event.target === event.currentTarget && (event.clientX < rect.left || event.clientX > rect.right)) requestClose(); }}>
      <div className={styles.mobileTop}><Link href="/" aria-label="Ir al inicio de Vialoop" onClick={() => followLink("/")}><Brand /></Link><button type="button" autoFocus aria-label="Cerrar menú" onClick={requestClose} className={styles.close}><span /><span /></button></div>
      <div className={styles.mobileBody}><p className={styles.menuLabel}>Navegación</p><nav aria-label="Menú móvil" className={styles.mobileNav}>{navigation.map(item => <Link key={item.href} href={item.href} onClick={() => followLink(item.href)} className={isActive(item.href) ? styles.mobileActive : ""} aria-current={isActive(item.href) ? "page" : undefined}>{item.label}</Link>)}</nav><a href={PORTAL_URL} target="_blank" rel="noopener noreferrer" className={styles.mobilePortal} onClick={requestClose}>Portal de clientes</a></div>
      <div className={styles.mobileBottom}><p>Diseño web y software a medida.</p><Link href="/contacto" onClick={() => followLink("/contacto")} className={styles.contact}>Conversemos sobre tu proyecto</Link><a href="mailto:dloayza@vialoop.cl">dloayza@vialoop.cl</a></div>
    </dialog>
  </>;
}
