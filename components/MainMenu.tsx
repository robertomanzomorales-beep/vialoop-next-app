"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const PORTAL_URL = "https://portal-vialoop.vercel.app/";
const navigation = [
  { href: "/", label: "Inicio" },
  { href: "/#servicios", label: "Servicios" },
  { href: "/software-a-medida", label: "Software a medida" },
  { href: "/portafolio-web", label: "Portafolio web" },
  { href: "/faq", label: "FAQ" },
];

export default function MainMenu() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (mobileOpen) {
      dialog.showModal();
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previousOverflow;
        dialog.close();
      };
    }
    dialog.close();
  }, [mobileOpen]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1280px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setMobileOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  const linkClass = "rounded-full px-3 py-2 text-[10px] font-bold uppercase tracking-[0.1em] text-white/75 transition hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

  return (
    <>
      <header className="sticky top-0 z-[110] h-[92px] bg-[#041022] text-white shadow-[0_12px_34px_rgba(2,6,23,.2)]">
        <div className="mx-auto flex h-full w-full max-w-[1320px] items-center justify-between gap-6 px-5 md:px-8">
          <Link href="/" aria-label="Ir al inicio de Vialoop" className="flex shrink-0 items-center">
            <Image
              src="/via loop - Diseño Web y Marketing Digital.webp"
              alt="Vialoop"
              width={360}
              height={72}
              preload
              className="h-[38px] w-auto max-w-[190px] object-contain"
            />
          </Link>

          <nav aria-label="Navegación principal" className="hidden items-center gap-1 xl:flex">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={linkClass}
                aria-current={item.href === pathname ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
            <a href={PORTAL_URL} target="_blank" rel="noopener noreferrer" className={`${linkClass} ml-2 border border-white/20`}>
              Portal Vialoop <span aria-hidden="true">↗</span>
            </a>
          </nav>

          <Link href="/contacto" className="hidden min-h-[44px] shrink-0 items-center rounded-full bg-white px-5 text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#07162f] transition hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white xl:inline-flex">
            Conversemos
          </Link>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setMobileOpen(true)}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 xl:hidden"
            aria-label="Abrir menú"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </header>

      <dialog
        ref={dialogRef}
        id="mobile-navigation"
        aria-label="Menú de navegación"
        onCancel={() => setMobileOpen(false)}
        onClose={() => toggleRef.current?.focus()}
        className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none border-0 bg-[#041022] p-6 text-white backdrop:bg-[#041022]"
      >
        <div className="mx-auto flex h-full max-w-[640px] flex-col">
          <div className="flex min-h-[60px] items-center justify-between gap-5">
            <span className="text-[12px] font-bold tracking-[0.2em]">VIALOOP</span>
            <button type="button" onClick={() => setMobileOpen(false)} aria-label="Cerrar menú" className="h-12 w-12 rounded-full border border-white/20 text-2xl">×</button>
          </div>
          <nav aria-label="Menú móvil" className="mt-6 grid overflow-y-auto">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                aria-current={item.href === pathname ? "page" : undefined}
                className="flex min-h-[62px] items-center border-b border-white/15 text-[18px] font-semibold tracking-[-0.02em] transition hover:text-blue-300"
              >
                {item.label}
              </Link>
            ))}
            <a href={PORTAL_URL} target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)} className="flex min-h-[62px] items-center text-[15px] text-white/65">Portal Vialoop ↗</a>
          </nav>
          <div className="mt-auto pt-8 pb-6">
            <Link href="/contacto" onClick={() => setMobileOpen(false)} className="flex min-h-[52px] items-center justify-center rounded-full bg-white text-[12px] font-bold uppercase tracking-[0.1em] text-[#07162f]">Conversemos sobre tu proyecto</Link>
            <p className="mt-5 text-center text-xs text-white/55">Diseño web y software a medida.</p>
          </div>
        </div>
      </dialog>
    </>
  );
}
