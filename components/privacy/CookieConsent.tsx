"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

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

type VisibleConsentView =
  | "banner"
  | "preferences";

type TransitionPhase =
  | "idle"
  | "out"
  | "in";

const CONTENT_OUT_DURATION = 135;
const PANEL_MORPH_DURATION = 460;

export default function CookieConsent() {
  const dialogRef =
    useRef<HTMLElement>(null);

  const contentRef =
    useRef<HTMLDivElement>(null);

  const previousActiveElementRef =
    useRef<HTMLElement | null>(null);

  const wasVisibleRef =
    useRef(false);

  const switchingRef =
    useRef(false);

  const switchTimerRef =
    useRef<number | null>(null);

  const finishTimerRef =
    useRef<number | null>(null);

  const [view, setView] =
    useState<ConsentView>("hidden");

  const [
    targetView,
    setTargetView,
  ] =
    useState<VisibleConsentView | null>(
      null,
    );

  const [
    transitionPhase,
    setTransitionPhase,
  ] =
    useState<TransitionPhase>("idle");

  const [
    panelHeight,
    setPanelHeight,
  ] =
    useState<number | null>(null);

  const [
    analyticsEnabled,
    setAnalyticsEnabled,
  ] =
    useState(false);

  const [
    hasExistingConsent,
    setHasExistingConsent,
  ] =
    useState(false);

  const clearTransitionTimers =
    useCallback(() => {
      if (
        switchTimerRef.current !== null
      ) {
        window.clearTimeout(
          switchTimerRef.current,
        );

        switchTimerRef.current = null;
      }

      if (
        finishTimerRef.current !== null
      ) {
        window.clearTimeout(
          finishTimerRef.current,
        );

        finishTimerRef.current = null;
      }
    }, []);

  const measurePanelHeight =
    useCallback(() => {
      const panel =
        dialogRef.current;

      const content =
        contentRef.current;

      if (!panel || !content) {
        return null;
      }

      const contentHeight =
        Math.ceil(
          content.scrollHeight,
        ) + 2;

      const computedStyle =
        window.getComputedStyle(
          panel,
        );

      const parsedMaxHeight =
        Number.parseFloat(
          computedStyle.maxHeight,
        );

      if (
        Number.isFinite(
          parsedMaxHeight,
        )
      ) {
        return Math.min(
          contentHeight,
          parsedMaxHeight,
        );
      }

      return contentHeight;
    }, []);

  const resetTransition =
    useCallback(() => {
      clearTransitionTimers();

      switchingRef.current = false;

      setTargetView(null);
      setTransitionPhase("idle");
      setPanelHeight(null);
    }, [clearTransitionTimers]);

  const changeView =
    useCallback(
      (
        nextView:
          VisibleConsentView,
      ) => {
        if (
          view === "hidden" ||
          view === nextView ||
          switchingRef.current
        ) {
          return;
        }

        clearTransitionTimers();

        switchingRef.current =
          true;

        /*
         * 1. Congelamos exactamente
         * la altura actual.
         */
        const currentHeight =
          dialogRef.current
            ?.getBoundingClientRect()
            .height;

        if (currentHeight) {
          setPanelHeight(
            Math.ceil(
              currentHeight,
            ),
          );
        }

        /*
         * 2. Indicamos hacia dónde
         * vamos, pero todavía no
         * cambiamos el contenido.
         */
        setTargetView(nextView);

        /*
         * 3. Desvanecemos solamente
         * el contenido.
         */
        setTransitionPhase("out");

        switchTimerRef.current =
          window.setTimeout(() => {
            /*
             * 4. Cambiamos el contenido
             * mientras permanece invisible.
             */
            setView(nextView);

            /*
             * Esperamos dos frames:
             * React pinta la nueva vista
             * y el navegador calcula
             * correctamente su altura.
             */
            window.requestAnimationFrame(
              () => {
                window.requestAnimationFrame(
                  () => {
                    const nextHeight =
                      measurePanelHeight();

                    /*
                     * 5. El mismo panel
                     * empieza a cambiar
                     * suavemente de altura.
                     */
                    if (
                      nextHeight !==
                      null
                    ) {
                      setPanelHeight(
                        nextHeight,
                      );
                    }

                    /*
                     * 6. Aparece el nuevo
                     * contenido mientras
                     * el panel termina de
                     * transformarse.
                     */
                    setTransitionPhase(
                      "in",
                    );

                    finishTimerRef.current =
                      window.setTimeout(
                        () => {
                          const finalHeight =
                            measurePanelHeight();

                          if (
                            finalHeight !==
                            null
                          ) {
                            setPanelHeight(
                              finalHeight,
                            );
                          }

                          switchingRef.current =
                            false;

                          setTargetView(
                            null,
                          );

                          setTransitionPhase(
                            "idle",
                          );
                        },
                        PANEL_MORPH_DURATION,
                      );
                  },
                );
              },
            );
          }, CONTENT_OUT_DURATION);
      },
      [
        view,
        clearTransitionTimers,
        measurePanelHeight,
      ],
    );

  useEffect(() => {
    const storedConsent =
      getStoredConsent();

    if (storedConsent) {
      setAnalyticsEnabled(
        storedConsent.analytics,
      );

      setHasExistingConsent(
        true,
      );

      setView("hidden");
    } else {
      setAnalyticsEnabled(
        false,
      );

      setHasExistingConsent(
        false,
      );

      setView("banner");
    }

    function handleOpenSettings() {
      clearTransitionTimers();

      switchingRef.current =
        false;

      const currentConsent =
        getStoredConsent();

      setAnalyticsEnabled(
        currentConsent?.analytics ??
          false,
      );

      setHasExistingConsent(
        Boolean(currentConsent),
      );

      setTargetView(null);

      setTransitionPhase(
        "idle",
      );

      setPanelHeight(null);

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

      clearTransitionTimers();
    };
  }, [
    clearTransitionTimers,
  ]);

  /*
   * Medimos antes de que el navegador
   * pinte la vista.
   *
   * Esto evita el pequeño ajuste visual
   * posterior al montaje.
   */
  useLayoutEffect(() => {
    if (
      view === "hidden" ||
      switchingRef.current
    ) {
      return;
    }

    const measuredHeight =
      measurePanelHeight();

    if (
      measuredHeight !== null
    ) {
      setPanelHeight(
        measuredHeight,
      );
    }
  }, [
    view,
    measurePanelHeight,
  ]);

  /*
   * Si cambia tipografía, viewport,
   * wrapping del texto, etc.,
   * mantenemos la altura sincronizada.
   */
  useEffect(() => {
    if (
      view === "hidden"
    ) {
      return;
    }

    const content =
      contentRef.current;

    if (
      !content ||
      typeof ResizeObserver ===
        "undefined"
    ) {
      return;
    }

    const observer =
      new ResizeObserver(() => {
        if (
          switchingRef.current
        ) {
          return;
        }

        const measuredHeight =
          measurePanelHeight();

        if (
          measuredHeight !== null
        ) {
          setPanelHeight(
            measuredHeight,
          );
        }
      });

    observer.observe(content);

    return () => {
      observer.disconnect();
    };
  }, [
    view,
    measurePanelHeight,
  ]);

  useEffect(() => {
    const isVisible =
      view !== "hidden";

    if (
      isVisible &&
      !wasVisibleRef.current
    ) {
      previousActiveElementRef.current =
        document.activeElement as
          | HTMLElement
          | null;
    }

    if (isVisible) {
      window.requestAnimationFrame(
        () => {
          dialogRef.current?.focus({
            preventScroll: true,
          });
        },
      );
    }

    if (
      !isVisible &&
      wasVisibleRef.current
    ) {
      previousActiveElementRef.current?.focus(
        {
          preventScroll: true,
        },
      );
    }

    wasVisibleRef.current =
      isVisible;
  }, [view]);

  useEffect(() => {
    if (
      view !== "preferences"
    ) {
      return;
    }

    function handleKeyboard(
      event: KeyboardEvent,
    ) {
      if (
        event.key !== "Escape"
      ) {
        return;
      }

      event.preventDefault();

      if (
        hasExistingConsent
      ) {
        resetTransition();

        setView("hidden");

        return;
      }

      changeView("banner");
    }

    document.addEventListener(
      "keydown",
      handleKeyboard,
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyboard,
      );
    };
  }, [
    view,
    hasExistingConsent,
    changeView,
    resetTransition,
  ]);

  function closePreferences() {
    if (
      hasExistingConsent
    ) {
      resetTransition();

      setView("hidden");

      return;
    }

    changeView("banner");
  }

  function acceptAnalytics() {
    acceptAnalyticsCookies();

    resetTransition();

    setAnalyticsEnabled(true);

    setHasExistingConsent(true);

    setView("hidden");
  }

  function rejectAnalytics() {
    rejectAnalyticsCookies();

    resetTransition();

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

    resetTransition();

    setHasExistingConsent(true);

    setView("hidden");
  }

  function openPreferences() {
    const currentConsent =
      getStoredConsent();

    setAnalyticsEnabled(
      currentConsent?.analytics ??
        false,
    );

    setHasExistingConsent(
      Boolean(currentConsent),
    );

    changeView(
      "preferences",
    );
  }

  if (
    view === "hidden"
  ) {
    return null;
  }

  const panelView =
    targetView ??
    (view === "preferences"
      ? "preferences"
      : "banner");

  const isPreferencesPanel =
    panelView ===
    "preferences";

  const isPreferencesContent =
    view ===
    "preferences";

  const isSwitching =
    targetView !== null;

  const transitionClass =
    transitionPhase === "out"
      ? styles.contentOut
      : transitionPhase === "in"
        ? styles.contentIn
        : styles.contentIdle;

  return (
    <div
      className={
        styles.backdrop
      }
    >
      <aside
        ref={dialogRef}
        className={`${styles.panel} ${
          isPreferencesPanel
            ? styles.panelPreferences
            : styles.panelBanner
        } ${
          isSwitching
            ? styles.panelSwitching
            : ""
        }`}
        role="dialog"
        aria-modal="false"
        aria-labelledby={
          isPreferencesContent
            ? "cookie-settings-title"
            : "cookie-banner-title"
        }
        aria-describedby={
          isPreferencesContent
            ? "cookie-settings-description"
            : "cookie-banner-description"
        }
        aria-busy={
          isSwitching
        }
        tabIndex={-1}
        style={
          panelHeight !== null
            ? {
                height:
                  `${panelHeight}px`,
              }
            : undefined
        }
      >
        <div
          className={
            styles.panelAccent
          }
          aria-hidden="true"
        />

        <div
          ref={contentRef}
          className={`${styles.viewTransition} ${transitionClass}`}
        >
          {!isPreferencesContent ? (
            <>
              <div
                className={
                  styles.bannerContent
                }
              >
                <header
                  className={
                    styles.bannerHeader
                  }
                >
                  <p
                    className={
                      styles.eyebrow
                    }
                  >
                    PRIVACIDAD
                  </p>

                  <h2
                    id="cookie-banner-title"
                    className={
                      styles.title
                    }
                  >
                    Preferencias de
                    privacidad
                  </h2>

                  <p
                    id="cookie-banner-description"
                    className={
                      styles.introduction
                    }
                  >
                    Utilizamos cookies
                    necesarias para el
                    funcionamiento del
                    sitio. Si lo
                    autorizas, Google
                    Analytics nos
                    permitirá medir
                    visitas e
                    interacciones para
                    mejorar nuestros
                    servicios digitales.
                  </p>
                </header>

                <p
                  className={
                    styles.clarification
                  }
                >
                  No utilizamos esta
                  información para
                  publicidad
                  personalizada. Puedes
                  modificar tu decisión
                  en cualquier momento.
                </p>

                <div
                  className={
                    styles.policyLinks
                  }
                >
                  <Link
                    href="/politicadecookies"
                    className={
                      styles.policyLink
                    }
                  >
                    Política de cookies
                  </Link>

                  <Link
                    href="/politicasprivacidad"
                    className={
                      styles.policyLink
                    }
                  >
                    Política de
                    privacidad
                  </Link>
                </div>
              </div>

              <div
                className={
                  styles.decisionArea
                }
              >
                <div
                  className={
                    styles.decisionTop
                  }
                >
                  <p
                    className={
                      styles.decisionEyebrow
                    }
                  >
                    CONTROL DE
                    CONSENTIMIENTO
                  </p>

                  <p
                    className={
                      styles.decisionText
                    }
                  >
                    Elige cómo deseas
                    utilizar este sitio.
                  </p>
                </div>

                <div
                  className={
                    styles.mainDecisions
                  }
                >
                  <button
                    type="button"
                    onClick={
                      rejectAnalytics
                    }
                    className={`${styles.button} ${styles.rejectButton}`}
                  >
                    Rechazar analítica
                  </button>

                  <button
                    type="button"
                    onClick={
                      acceptAnalytics
                    }
                    className={`${styles.button} ${styles.acceptButton}`}
                  >
                    Aceptar analítica
                  </button>
                </div>

                <button
                  type="button"
                  onClick={
                    openPreferences
                  }
                  className={`${styles.button} ${styles.settingsButton}`}
                >
                  Configurar
                  preferencias
                </button>

                <p
                  className={
                    styles.decisionNote
                  }
                >
                  Las cookies necesarias
                  permanecen activas.
                </p>
              </div>
            </>
          ) : (
            <div
              className={
                styles.preferencesContent
              }
            >
              <header
                className={
                  styles.preferencesHeader
                }
              >
                <div
                  className={
                    styles.preferencesHeading
                  }
                >
                  <p
                    className={
                      styles.eyebrow
                    }
                  >
                    CONFIGURACIÓN
                  </p>

                  <h2
                    id="cookie-settings-title"
                    className={
                      styles.title
                    }
                  >
                    Preferencias de
                    cookies
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={
                    closePreferences
                  }
                  className={
                    styles.closeButton
                  }
                  aria-label="Cerrar preferencias"
                >
                  Cerrar
                </button>
              </header>

              <p
                id="cookie-settings-description"
                className={
                  styles.preferencesIntroduction
                }
              >
                Selecciona las categorías
                que deseas autorizar. Las
                cookies necesarias no
                pueden desactivarse porque
                permiten guardar tu
                elección y mantener las
                funciones esenciales.
              </p>

              <div
                className={
                  styles.categoryList
                }
              >
                <section
                  className={
                    styles.category
                  }
                >
                  <div
                    className={
                      styles.categoryInformation
                    }
                  >
                    <div
                      className={
                        styles.categoryHeading
                      }
                    >
                      <h3
                        className={
                          styles.categoryTitle
                        }
                      >
                        Cookies necesarias
                      </h3>

                      <span
                        className={
                          styles.categoryLabel
                        }
                      >
                        Esenciales
                      </span>
                    </div>

                    <p
                      className={
                        styles.categoryText
                      }
                    >
                      Permiten almacenar
                      tu preferencia de
                      privacidad y utilizar
                      las funciones básicas
                      del sitio.
                    </p>
                  </div>

                  <span
                    className={
                      styles.requiredStatus
                    }
                    aria-label="Cookies necesarias siempre activas"
                  >
                    Siempre activas
                  </span>
                </section>

                <section
                  className={
                    styles.category
                  }
                >
                  <div
                    className={
                      styles.categoryInformation
                    }
                  >
                    <div
                      className={
                        styles.categoryHeading
                      }
                    >
                      <h3
                        className={
                          styles.categoryTitle
                        }
                      >
                        Cookies analíticas
                      </h3>

                      <span
                        className={
                          styles.categoryLabel
                        }
                      >
                        Opcionales
                      </span>
                    </div>

                    <p
                      className={
                        styles.categoryText
                      }
                    >
                      Google Analytics
                      permite medir visitas,
                      páginas consultadas,
                      desplazamientos y
                      clics. Solo se carga
                      cuando otorgas tu
                      autorización.
                    </p>
                  </div>

                  <button
                    type="button"
                    role="switch"
                    aria-checked={
                      analyticsEnabled
                    }
                    aria-label="Autorizar cookies analíticas"
                    onClick={() =>
                      setAnalyticsEnabled(
                        (
                          currentValue,
                        ) =>
                          !currentValue,
                      )
                    }
                    className={`${styles.switch} ${
                      analyticsEnabled
                        ? styles.switchActive
                        : ""
                    }`}
                  >
                    <span
                      className={
                        styles.switchThumb
                      }
                    />
                  </button>
                </section>
              </div>

              <div
                className={
                  styles.preferencesFooter
                }
              >
                <p
                  className={
                    styles.preferencesLegal
                  }
                >
                  Puedes retirar tu
                  autorización cuando lo
                  desees mediante
                  “Configurar cookies” en
                  el pie de página.
                  Consulta la{" "}
                  <Link
                    href="/politicadecookies"
                    className={
                      styles.policyLink
                    }
                  >
                    Política de cookies
                  </Link>
                  .
                </p>

                <div
                  className={
                    styles.preferencesActions
                  }
                >
                  <button
                    type="button"
                    onClick={
                      rejectAnalytics
                    }
                    className={`${styles.button} ${styles.rejectLightButton}`}
                  >
                    Rechazar analítica
                  </button>

                  <button
                    type="button"
                    onClick={
                      savePreferences
                    }
                    className={`${styles.button} ${styles.acceptButton}`}
                  >
                    Guardar
                    preferencias
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}