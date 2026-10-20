"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./MainMenu.module.css";

const PORTAL_URL = "https://portal-vialoop.vercel.app/";
type HomeScroll = { target: "inicio" | "servicios"; behavior: ScrollBehavior };
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
  const router = useRouter();
  const pathname = usePathname();
  const [hash, setHash] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [homeScroll, setHomeScroll] = useState<HomeScroll | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closingRef = useRef(false);
  const restoreFocus = useRef(true);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingNavigation = useRef<string | null>(null);

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
    if (pathname !== "/" || !homeScroll) return;
    let frame = 0;

    const scrollToTarget = () => {
      const target = document.getElementById(homeScroll.target);
      if (!target) return false;
      frame = requestAnimationFrame(() => {
        if (homeScroll.target === "inicio") {
          window.scrollTo({ top: 0, behavior: homeScroll.behavior });
        } else {
          target.scrollIntoView({ block: "start", behavior: homeScroll.behavior });
        }
        setHomeScroll(null);
      });
      return true;
    };

    // Wait for the home content if a route segment is still arriving.
    const observer = new MutationObserver(() => {
      if (scrollToTarget()) observer.disconnect();
    });
    if (!scrollToTarget()) observer.observe(document.body, { childList: true, subtree: true });
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [pathname, homeScroll]);

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

  function navigateTo(href: string) {
    const target = href === "/" ? "inicio" : href === "/#servicios" ? "servicios" : null;
    setHash(target === "servicios" ? "#servicios" : "");
    if (target) {
      const smooth = pathname === "/" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setHomeScroll({ target, behavior: smooth ? "smooth" : "instant" });
      // One scroll owner avoids a second jump from the router's anchor handling.
      router.push(href, { scroll: false });
    } else {
      setHomeScroll(null);
      router.push(href);
    }
  }

  function followLink(event: { preventDefault: () => void }, href: string) {
    if (dialogRef.current?.open) {
      event.preventDefault();
      pendingNavigation.current = href;
      restoreFocus.current = false;
      requestClose();
    } else if (href === "/" || href === "/#servicios") {
      event.preventDefault();
      navigateTo(href);
    } else {
      setHash("");
      setHomeScroll(null);
    }
  }

  return <>
    <header className={styles.header}>
      <div className={styles.bar}>
        <Link href="/" aria-label="Ir al inicio de Vialoop" className={styles.brand} onNavigate={event => followLink(event, "/")}><Brand /></Link>
        <nav aria-label="Navegación principal" className={styles.desktopNav}>
          {navigation.map(item => <Link key={item.href} href={item.href} onNavigate={event => followLink(event, item.href)} className={`${styles.navLink} ${isActive(item.href) ? styles.active : ""}`} aria-current={isActive(item.href) ? "page" : undefined}>{item.label}</Link>)}
        </nav>
        <div className={styles.desktopActions}><a href={PORTAL_URL} target="_blank" rel="noopener noreferrer" className={styles.portal}>Portal clientes</a><Link href="/contacto" className={styles.contact}>Conversemos</Link></div>
        <button ref={toggleRef} type="button" className={styles.toggle} aria-label="Abrir menú" aria-expanded={mobileOpen} aria-controls="mobile-navigation" onClick={() => { restoreFocus.current = true; setClosing(false); setMobileOpen(true); }}><span /><span /></button>
      </div>
    </header>
    <dialog ref={dialogRef} id="mobile-navigation" aria-label="Menú de navegación" className={styles.dialog} data-closing={closing || undefined}
      onCancel={event => { event.preventDefault(); requestClose(); }}
      onClose={() => {
        const href = pendingNavigation.current;
        pendingNavigation.current = null;
        if (href) navigateTo(href);
        else if (restoreFocus.current) toggleRef.current?.focus({ preventScroll: true });
      }}
      onAnimationEnd={event => { if (event.target === event.currentTarget && closingRef.current) finishClose(); }}
      onClick={event => { const rect = event.currentTarget.getBoundingClientRect(); if (event.target === event.currentTarget && (event.clientX < rect.left || event.clientX > rect.right)) requestClose(); }}>
      <div className={styles.mobileTop}><Link href="/" aria-label="Ir al inicio de Vialoop" onNavigate={event => followLink(event, "/")}><Brand /></Link><button type="button" autoFocus aria-label="Cerrar menú" onClick={requestClose} className={styles.close}><span /><span /></button></div>
      <div className={styles.mobileBody}><p className={styles.menuLabel}>Navegación</p><nav aria-label="Menú móvil" className={styles.mobileNav}>{navigation.map(item => <Link key={item.href} href={item.href} onNavigate={event => followLink(event, item.href)} className={isActive(item.href) ? styles.mobileActive : ""} aria-current={isActive(item.href) ? "page" : undefined}>{item.label}</Link>)}</nav><a href={PORTAL_URL} target="_blank" rel="noopener noreferrer" className={styles.mobilePortal} onClick={requestClose}>Portal de clientes</a></div>
      <div className={styles.mobileBottom}><p>Diseño web y software a medida.</p><Link href="/contacto" onNavigate={event => followLink(event, "/contacto")} className={styles.contact}>Conversemos sobre tu proyecto</Link><a href="mailto:dloayza@vialoop.cl">dloayza@vialoop.cl</a></div>
    </dialog>
  </>;
}
