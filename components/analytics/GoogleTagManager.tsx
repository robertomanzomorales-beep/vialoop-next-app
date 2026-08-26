"use client";

import { useEffect } from "react";
import {
  CONSENT_UPDATED_EVENT,
  getStoredConsent,
  removeGoogleAnalyticsCookies,
  type ConsentPreferences,
} from "@/lib/privacy/consent";

const GTM_CONTAINER_ID = "GTM-KDW825JQ";
const GTM_SCRIPT_ID = "vialoop-google-tag-manager";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function initializeDataLayer() {
  window.dataLayer = window.dataLayer || [];

  if (!window.gtag) {
    window.gtag = (...args: unknown[]) => {
      window.dataLayer.push(args);
    };
  }
}

function setDefaultConsent() {
  initializeDataLayer();

  window.gtag?.("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    personalization_storage: "denied",
    functionality_storage: "granted",
    security_storage: "granted",
    wait_for_update: 500,
  });
}

function updateGoogleConsent(analyticsGranted: boolean) {
  initializeDataLayer();

  window.gtag?.("consent", "update", {
    analytics_storage: analyticsGranted
      ? "granted"
      : "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    personalization_storage: "denied",
    functionality_storage: "granted",
    security_storage: "granted",
  });

  document.documentElement.dataset.analyticsConsent =
    analyticsGranted ? "granted" : "denied";
}

function loadGoogleTagManager() {
  if (document.getElementById(GTM_SCRIPT_ID)) {
    return;
  }

  initializeDataLayer();

  window.dataLayer.push({
    "gtm.start": Date.now(),
    event: "gtm.js",
  });

  const script = document.createElement("script");

  script.id = GTM_SCRIPT_ID;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_CONTAINER_ID}`;

  document.head.appendChild(script);
}

function applyConsent(preferences: ConsentPreferences | null) {
  const analyticsGranted =
    preferences?.analytics === true;

  updateGoogleConsent(analyticsGranted);

  if (analyticsGranted) {
    loadGoogleTagManager();
    return;
  }

  removeGoogleAnalyticsCookies();

  /*
   * Si Google Tag Manager ya estaba cargado y el visitante
   * revoca su autorización, recargamos el sitio. De esta forma,
   * GTM deja de estar presente en la siguiente carga.
   */
  const existingGtmScript =
    document.getElementById(GTM_SCRIPT_ID);

  if (existingGtmScript) {
    window.setTimeout(() => {
      window.location.reload();
    }, 100);
  }
}

export default function GoogleTagManager() {
  useEffect(() => {
    /*
     * El consentimiento comienza denegado.
     * Google Tag Manager no se carga hasta que la persona
     * autorice expresamente las cookies analíticas.
     */
    setDefaultConsent();
    applyConsent(getStoredConsent());

    function handleConsentUpdate(event: Event) {
      const consentEvent =
        event as CustomEvent<ConsentPreferences>;

      applyConsent(
        consentEvent.detail ?? getStoredConsent(),
      );
    }

    window.addEventListener(
      CONSENT_UPDATED_EVENT,
      handleConsentUpdate,
    );

    return () => {
      window.removeEventListener(
        CONSENT_UPDATED_EVENT,
        handleConsentUpdate,
      );
    };
  }, []);

  return null;
}