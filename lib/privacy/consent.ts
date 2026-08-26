export const CONSENT_VERSION = "2026-08-25";

export const CONSENT_STORAGE_KEY = "vialoop_privacy_consent";
export const CONSENT_COOKIE_NAME = "vialoop_privacy_consent";

export const CONSENT_UPDATED_EVENT = "vialoop:consent-updated";
export const OPEN_COOKIE_SETTINGS_EVENT =
  "vialoop:open-cookie-settings";

const CONSENT_DURATION_DAYS = 180;
const CONSENT_MAX_AGE_SECONDS =
  CONSENT_DURATION_DAYS * 24 * 60 * 60;

export type ConsentPreferences = {
  version: string;
  necessary: true;
  analytics: boolean;
  updatedAt: string;
};

function isBrowser() {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

function isValidConsent(
  value: unknown,
): value is ConsentPreferences {
  if (!value || typeof value !== "object") {
    return false;
  }

  const consent = value as Partial<ConsentPreferences>;

  return (
    consent.version === CONSENT_VERSION &&
    consent.necessary === true &&
    typeof consent.analytics === "boolean" &&
    typeof consent.updatedAt === "string" &&
    !Number.isNaN(Date.parse(consent.updatedAt))
  );
}

function parseConsent(
  value: string | null,
): ConsentPreferences | null {
  if (!value) {
    return null;
  }

  try {
    const parsedValue = JSON.parse(value);

    return isValidConsent(parsedValue) ? parsedValue : null;
  } catch {
    return null;
  }
}

function getConsentCookie() {
  if (!isBrowser()) {
    return null;
  }

  const cookiePrefix = `${CONSENT_COOKIE_NAME}=`;

  const cookie = document.cookie
    .split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith(cookiePrefix));

  if (!cookie) {
    return null;
  }

  try {
    return decodeURIComponent(cookie.slice(cookiePrefix.length));
  } catch {
    return null;
  }
}

function saveConsentCookie(consent: ConsentPreferences) {
  if (!isBrowser()) {
    return;
  }

  const secureAttribute =
    window.location.protocol === "https:" ? "; Secure" : "";

  const encodedConsent = encodeURIComponent(
    JSON.stringify(consent),
  );

  document.cookie = [
    `${CONSENT_COOKIE_NAME}=${encodedConsent}`,
    "Path=/",
    `Max-Age=${CONSENT_MAX_AGE_SECONDS}`,
    "SameSite=Lax",
    secureAttribute,
  ]
    .filter(Boolean)
    .join("; ");
}

export function createConsentPreferences(
  analytics: boolean,
): ConsentPreferences {
  return {
    version: CONSENT_VERSION,
    necessary: true,
    analytics,
    updatedAt: new Date().toISOString(),
  };
}

export function getStoredConsent(): ConsentPreferences | null {
  if (!isBrowser()) {
    return null;
  }

  try {
    const localConsent = parseConsent(
      window.localStorage.getItem(CONSENT_STORAGE_KEY),
    );

    if (localConsent) {
      return localConsent;
    }
  } catch {
    // El almacenamiento local puede estar bloqueado por el navegador.
  }

  return parseConsent(getConsentCookie());
}

export function saveConsent(
  consent: ConsentPreferences,
): void {
  if (!isBrowser()) {
    return;
  }

  try {
    window.localStorage.setItem(
      CONSENT_STORAGE_KEY,
      JSON.stringify(consent),
    );
  } catch {
    // La cookie mantiene la preferencia si localStorage no está disponible.
  }

  saveConsentCookie(consent);

  window.dispatchEvent(
    new CustomEvent<ConsentPreferences>(
      CONSENT_UPDATED_EVENT,
      {
        detail: consent,
      },
    ),
  );
}

export function acceptAnalyticsCookies() {
  const consent = createConsentPreferences(true);

  saveConsent(consent);

  return consent;
}

export function rejectAnalyticsCookies() {
  const consent = createConsentPreferences(false);

  saveConsent(consent);
  removeGoogleAnalyticsCookies();

  return consent;
}

export function hasAnalyticsConsent() {
  return getStoredConsent()?.analytics === true;
}

function expireCookie(name: string, domain?: string) {
  if (!isBrowser()) {
    return;
  }

  const domainAttribute = domain
    ? `; Domain=${domain}`
    : "";

  document.cookie = [
    `${name}=`,
    "Path=/",
    "Max-Age=0",
    "Expires=Thu, 01 Jan 1970 00:00:00 GMT",
    "SameSite=Lax",
    domainAttribute,
  ]
    .filter(Boolean)
    .join("; ");
}

export function removeGoogleAnalyticsCookies() {
  if (!isBrowser()) {
    return;
  }

  const analyticsCookieNames = document.cookie
    .split(";")
    .map((cookie) => cookie.trim().split("=")[0])
    .filter(
      (cookieName) =>
        cookieName === "_ga" ||
        cookieName === "_gid" ||
        cookieName === "_gat" ||
        cookieName.startsWith("_ga_") ||
        cookieName.startsWith("_gat_"),
    );

  const hostname = window.location.hostname;

  const domains = new Set<string | undefined>([
    undefined,
    hostname,
    `.${hostname}`,
  ]);

  if (
    hostname === "vialoop.cl" ||
    hostname.endsWith(".vialoop.cl")
  ) {
    domains.add("vialoop.cl");
    domains.add(".vialoop.cl");
  }

  analyticsCookieNames.forEach((cookieName) => {
    domains.forEach((domain) => {
      expireCookie(cookieName, domain);
    });
  });
}

export function openCookieSettings() {
  if (!isBrowser()) {
    return;
  }

  window.dispatchEvent(
    new CustomEvent(OPEN_COOKIE_SETTINGS_EVENT),
  );
}

export function clearStoredConsent() {
  if (!isBrowser()) {
    return;
  }

  try {
    window.localStorage.removeItem(CONSENT_STORAGE_KEY);
  } catch {
    // Continuamos eliminando la cookie disponible.
  }

  expireCookie(CONSENT_COOKIE_NAME);
  expireCookie(CONSENT_COOKIE_NAME, "vialoop.cl");
  expireCookie(CONSENT_COOKIE_NAME, ".vialoop.cl");

  removeGoogleAnalyticsCookies();
}