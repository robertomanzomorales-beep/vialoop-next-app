"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  OPEN_COOKIE_SETTINGS_EVENT,
  acceptAnalyticsCookies,
  getStoredConsent,
  rejectAnalyticsCookies,
} from "@/lib/privacy/consent";
import styles from "./CookieConsent.module.css";

type ConsentView =
  | "hidden"
  | "banner"
  | "preferences";

const FOCUSABLE_ELEMENTS = [
  "button:not([disabled])",
  "a[href]",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

export default function CookieConsent() {
  const dialogRef = useRef<HTMLDivElement>(null);

  const [view, setView] =
    useState<ConsentView>("hidden");

  const [analyticsEnabled, setAnalyticsEnabled] =
    useState(false);

  const [hasExistingConsent, setHasExistingConsent] =
    useState(false);

  useEffect(() => {
    const storedConsent = getStoredConsent();

    if (storedConsent) {
      setAnalyticsEnabled(storedConsent.analytics);
      setHasExistingConsent(true);
      setView("hidden");
    } else {
      setAnalyticsEnabled(false);
      setHasExistingConsent(false);
      setView("banner");
    }

    function handleOpenSettings() {
      const currentConsent = getStoredConsent();

      setAnalyticsEnabled(
        currentConsent?.analytics ?? false,
      );

      setHasExistingConsent(Boolean(currentConsent));
      setView("preferences");
    }

    window.addEventListener(
      OPEN_COOKIE_SETTINGS_EVENT,
      handleOpenSettings,
    );

    return () => {
      window.removeEventListener(
        OPEN_COOKIE_SETTINGS_EVENT,
        handleOpenSettings,
      );
    };
  }, []);

  useEffect(() => {
    if (view === "hidden") {
      return;
    }

    const previousActiveElement =
      document.activeElement as HTMLElement | null;

    const previousBodyOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const dialog = dialogRef.current;

    const focusableElements = dialog
      ? Array.from(
          dialog.querySelectorAll<HTMLElement>(
            FOCUSABLE_ELEMENTS,
          ),
        )
      : [];

    window.requestAnimationFrame(() => {
      dialog?.focus();
    });

    function handleKeyboard(event: KeyboardEvent) {
      if (
        event.key === "Escape" &&
        view === "preferences"
      ) {
        event.preventDefault();

        setView(
          hasExistingConsent
            ? "hidden"
            : "banner",
        );

        return;
      }

      if (
        event.key !== "Tab" ||
        focusableElements.length === 0
      ) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement =
        focusableElements[focusableElements.length - 1];

      if (
        event.shiftKey &&
        document.activeElement === firstElement
      ) {
        event.preventDefault();
        lastElement.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === lastElement
      ) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    document.addEventListener(
      "keydown",
      handleKeyboard,
    );

    return () => {
      document.body.style.overflow =
        previousBodyOverflow;

      document.removeEventListener(
        "keydown",
        handleKeyboard,
      );

      previousActiveElement?.focus();
    };
  }, [view, hasExistingConsent]);

  function closePreferences() {
    setView(
      hasExistingConsent ? "hidden" : "banner",
    );
  }

  function acceptAnalytics() {
    acceptAnalyticsCookies();

    setAnalyticsEnabled(true);
    setHasExistingConsent(true);
    setView("hidden");
  }

  function rejectAnalytics() {
    rejectAnalyticsCookies();

    setAnalyticsEnabled(false);
    setHasExistingConsent(true);
    setView("hidden");
  }

  function savePreferences() {
    if (analyticsEnabled) {
      acceptAnalyticsCookies();
    } else {
      rejectAnalyticsCookies();
    }

    setHasExistingConsent(true);
    setView("hidden");
  }

  function openPreferences() {
    const currentConsent = getStoredConsent();

    setAnalyticsEnabled(
      currentConsent?.analytics ?? false,
    );

    setHasExistingConsent(Boolean(currentConsent));
    setView("preferences");
  }

  if (view === "hidden") {
    return null;
  }

  return (
    <div className={styles.backdrop}>
      {view === "banner" && (
        <section
          ref={dialogRef}
          className={styles.banner}
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-banner-title"
          aria-describedby="cookie-banner-description"
          tabIndex={-1}
        >
          <div className={styles.bannerInner}>
            <div className={styles.bannerInformation}>
              <p className={styles.eyebrow}>
                PRIVACIDAD
              </p>

              <h2
                id="cookie-banner-title"
                className={styles.bannerTitle}
              >
                Preferencias de privacidad
              </h2>

              <p
                id="cookie-banner-description"
                className={styles.bannerText}
              >
                Utilizamos cookies necesarias para el
                funcionamiento del sitio. Si lo autorizas,
                Google Analytics nos permitirá medir visitas
                e interacciones para mejorar nuestros
                servicios digitales.
              </p>

              <p className={styles.bannerClarification}>
                No utilizamos esta información para
                publicidad personalizada. Puedes modificar
                tu decisión en cualquier momento.
              </p>

              <div className={styles.policyLinks}>
                <Link
                  href="/politicadecookies"
                  className={styles.policyLink}
                >
                  Política de cookies
                </Link>

                <Link
                  href="/politicasprivacidad"
                  className={styles.policyLink}
                >
                  Política de privacidad
                </Link>
              </div>
            </div>

            <div className={styles.bannerDecision}>
              <p className={styles.decisionTitle}>
                Gestiona tu consentimiento
              </p>

              <div className={styles.mainDecisions}>
                <button
                  type="button"
                  onClick={rejectAnalytics}
                  className={`${styles.button} ${styles.rejectButton}`}
                >
                  Rechazar analítica
                </button>

                <button
                  type="button"
                  onClick={acceptAnalytics}
                  className={`${styles.button} ${styles.acceptButton}`}
                >
                  Aceptar analítica
                </button>
              </div>

              <button
                type="button"
                onClick={openPreferences}
                className={`${styles.button} ${styles.settingsButton}`}
              >
                Configurar preferencias
              </button>

              <p className={styles.decisionNote}>
                Las cookies necesarias permanecen activas.
              </p>
            </div>
          </div>
        </section>
      )}

      {view === "preferences" && (
        <section
          ref={dialogRef}
          className={styles.preferencesPanel}
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-settings-title"
          aria-describedby="cookie-settings-description"
          tabIndex={-1}
        >
          <div className={styles.preferencesInner}>
            <header className={styles.preferencesHeader}>
              <div>
                <p className={styles.eyebrow}>
                  CONFIGURACIÓN
                </p>

                <h2
                  id="cookie-settings-title"
                  className={styles.preferencesTitle}
                >
                  Preferencias de cookies
                </h2>
              </div>

              <button
                type="button"
                onClick={closePreferences}
                className={styles.closeButton}
                aria-label="Cerrar preferencias"
              >
                Cerrar
              </button>
            </header>

            <p
              id="cookie-settings-description"
              className={styles.preferencesIntroduction}
            >
              Selecciona las categorías que deseas
              autorizar. Las cookies necesarias no pueden
              desactivarse porque permiten guardar tu
              elección y mantener las funciones esenciales.
            </p>

            <div className={styles.categoryList}>
              <section className={styles.category}>
                <div className={styles.categoryInformation}>
                  <div className={styles.categoryHeading}>
                    <h3 className={styles.categoryTitle}>
                      Cookies necesarias
                    </h3>

                    <span className={styles.categoryLabel}>
                      Siempre activas
                    </span>
                  </div>

                  <p className={styles.categoryText}>
                    Permiten almacenar tu preferencia de
                    privacidad y utilizar las funciones
                    básicas del sitio.
                  </p>
                </div>

                <span
                  className={styles.requiredStatus}
                  aria-label="Cookies necesarias siempre activas"
                >
                  Siempre activas
                </span>
              </section>

              <section className={styles.category}>
                <div className={styles.categoryInformation}>
                  <div className={styles.categoryHeading}>
                    <h3 className={styles.categoryTitle}>
                      Cookies analíticas
                    </h3>

                    <span className={styles.categoryLabel}>
                      Opcionales
                    </span>
                  </div>

                  <p className={styles.categoryText}>
                    Google Analytics permite medir visitas,
                    páginas consultadas, desplazamientos y
                    clics. Solo se carga cuando otorgas tu
                    autorización.
                  </p>
                </div>

                <button
                  type="button"
                  role="switch"
                  aria-checked={analyticsEnabled}
                  aria-label="Autorizar cookies analíticas"
                  onClick={() =>
                    setAnalyticsEnabled(
                      (currentValue) =>
                        !currentValue,
                    )
                  }
                  className={`${styles.switch} ${
                    analyticsEnabled
                      ? styles.switchActive
                      : ""
                  }`}
                >
                  <span className={styles.switchThumb} />
                </button>
              </section>
            </div>

            <div className={styles.preferencesFooter}>
              <p className={styles.preferencesLegal}>
                Puedes retirar tu autorización cuando lo
                desees mediante “Configurar cookies” en el
                pie de página. Consulta la{" "}
                <Link
                  href="/politicadecookies"
                  className={styles.policyLink}
                >
                  Política de cookies
                </Link>
                .
              </p>

              <div className={styles.preferencesActions}>
                <button
                  type="button"
                  onClick={rejectAnalytics}
                  className={`${styles.button} ${styles.rejectButton}`}
                >
                  Rechazar analítica
                </button>

                <button
                  type="button"
                  onClick={savePreferences}
                  className={`${styles.button} ${styles.acceptButton}`}
                >
                  Guardar preferencias
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
