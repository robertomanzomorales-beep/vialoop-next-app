"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./MainMenu.module.css";

const PORTAL_URL = "https://portal-vialoop.vercel.app/";
type HomeScroll = { target: "inicio" | "servicios"; behavior: ScrollBehavior };
const navigation = [
  { href: "/", label: "Inicio" },
  { href: "/#servicios", label: "Servicios" },
  { href: "/diseno-web", label: "Diseño web" },
  { href: "/software-a-medida", label: "Software" },
  { href: "/contacto", label: "Contacto" },
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
    closeTimer.current = setTimeout(finishClose, 420);
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
        const href = homeScroll.target === "servicios" ? "/#servicios" : "/";
        // Normalize after a route commit, including cached home entries with an old hash.
        window.history.replaceState(null, "", href);
        setHash(homeScroll.target === "servicios" ? "#servicios" : "");
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
      // Same-page anchors need no route transition; the scroll effect owns positioning.
      if (pathname === "/") {
        const current = window.location.pathname + window.location.search + window.location.hash;
        if (current !== href) window.history.pushState(null, "", href);
      } else {
        router.push("/", { scroll: false });
      }
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
          {navigation.map(item => <Link key={item.href} href={item.href} onNavigate={event => followLink(event, item.href)} className={`${styles.navLink} ${isActive(item.href) ? styles.active : ""}`} aria-current={isActive(item.href) ? item.href.includes("#") ? "location" : "page" : undefined}>{item.label}</Link>)}
          <a href={PORTAL_URL} target="_blank" rel="noopener noreferrer" className={styles.portal}>Portal Vialoop</a>
        </nav>
        <button ref={toggleRef} type="button" className={styles.toggle} aria-label="Abrir menú" aria-expanded={mobileOpen} aria-controls="mobile-navigation" onClick={() => { restoreFocus.current = true; setClosing(false); setMobileOpen(true); }}><span className={styles.toggleLabel} aria-hidden="true">Menú</span><span className={styles.toggleGlyph} aria-hidden="true"><i /><i /></span></button>
      </div>
    </header>
    <dialog ref={dialogRef} id="mobile-navigation" aria-label="Menú de navegación" className={styles.dialog} data-closing={closing || undefined}
      onCancel={event => { event.preventDefault(); requestClose(); }}
      onAnimationEnd={event => { if (event.target === event.currentTarget && closingRef.current) finishClose(); }}
      onClose={() => {
        const href = pendingNavigation.current;
        pendingNavigation.current = null;
        if (href) navigateTo(href);
        else if (restoreFocus.current) toggleRef.current?.focus({ preventScroll: true });
      }}>
      <div className={styles.mobileTop}><Link href="/" aria-label="Ir al inicio de Vialoop" onNavigate={event => followLink(event, "/")}><Brand /></Link><button type="button" autoFocus aria-label="Cerrar menú" onClick={requestClose} className={styles.close}><span aria-hidden="true">Cerrar</span><span className={styles.closeGlyph} aria-hidden="true"><i /><i /></span></button></div>
      <div className={styles.mobilePanel}>
        <p className={styles.menuEyebrow}>VIALOOP <span aria-hidden="true" /> DISEÑO Y TECNOLOGÍA</p>
        <nav aria-label="Menú móvil" className={styles.mobileNav}>
          {navigation.map((item, index) => <Link key={item.href} href={item.href} onNavigate={event => followLink(event, item.href)} className={isActive(item.href) ? styles.mobileActive : ""} style={{ "--link-index": index } as CSSProperties} aria-current={isActive(item.href) ? item.href.includes("#") ? "location" : "page" : undefined}><span className={styles.linkMask}><span className={styles.linkText}>{item.label}</span></span><span className={styles.currentMark} aria-hidden="true" /></Link>)}
        </nav>
        <a href={PORTAL_URL} target="_blank" rel="noopener noreferrer" className={styles.mobilePortal} onClick={requestClose}><span>Portal Vialoop</span><small>Acceso para clientes</small></a>
        <div className={styles.mobileBottom}><p>Conversemos de lo que viene.</p><a href="mailto:dloayza@vialoop.cl">dloayza@vialoop.cl</a><span>Desde Calama, para todo Chile.</span></div>
      </div>
    </dialog>
  </>;
}
