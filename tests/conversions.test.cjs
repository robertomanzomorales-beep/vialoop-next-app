const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");

const project = path.resolve(__dirname, "..");
function load(file, environment, dependencies = {}) {
  const module = { exports: {} };
  const source = ts.transpileModule(fs.readFileSync(path.join(project, file), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  vm.runInNewContext(source, {
    ...environment,
    module,
    exports: module.exports,
    require(name) {
      if (name in dependencies) return dependencies[name];
      throw new Error(`Unexpected dependency: ${name}`);
    },
  });
  return module.exports;
}

function setup() {
  const storage = new Map();
  const window = {
    location: { pathname: "/contacto", search: "?email=private@example.test&utm_source=instagram" },
    localStorage: { getItem: key => storage.get(key) ?? null },
  };
  const environment = { window, document: { cookie: "" } };
  const consent = load("lib/privacy/consent.ts", environment);
  const tracker = load("lib/analytics/conversions.ts", environment, { "../privacy/consent": consent });
  return { window, storage, environment, consent, tracker };
}

test("server rendering does not emit analytics", () => {
  const tracker = load("lib/analytics/conversions.ts", {}, {
    "../privacy/consent": { hasAnalyticsConsent() { throw new Error("must not read browser consent"); } },
  });
  assert.equal(tracker.trackContactLead("home_contact"), false);
});

test("no choice, rejection, and expired choices never queue contact events", () => {
  const { window, storage, consent, tracker } = setup();
  for (const preference of [null, consent.createConsentPreferences(false), {
    ...consent.createConsentPreferences(true), updatedAt: "2020-01-01T00:00:00.000Z",
  }]) {
    if (preference) storage.set(consent.CONSENT_STORAGE_KEY, JSON.stringify(preference));
    else storage.clear();
    assert.equal(tracker.trackContactLead("home_contact", "web"), false);
    assert.equal(tracker.trackWhatsAppClick("floating"), false);
    assert.equal(window.dataLayer, undefined);
  }
});

test("accepted analytics records distinct channels without contact details or URL queries", () => {
  const { window, storage, consent, tracker } = setup();
  storage.set(consent.CONSENT_STORAGE_KEY, JSON.stringify(consent.createConsentPreferences(true)));
  assert.equal(tracker.trackContactLead("home_contact", "web"), true);
  assert.equal(tracker.trackWhatsAppClick("contact_form"), true);
  assert.deepEqual(JSON.parse(JSON.stringify(window.dataLayer)), [
    { contact_method: "form", form_id: "home_contact", service: "web", event: "generate_lead", page_path: "/contacto" },
    { contact_method: "whatsapp", link_location: "contact_form", event: "whatsapp_click", page_path: "/contacto" },
  ]);
  assert.doesNotMatch(JSON.stringify(window.dataLayer), /private|email|utm_source/);
  tracker.trackContactLead("contact_page", "private@example.test");
  assert.equal(window.dataLayer[2].service, "otro");
});

test("revoking consent stops new measurements without replaying previous actions", () => {
  const { window, storage, consent, tracker } = setup();
  storage.set(consent.CONSENT_STORAGE_KEY, JSON.stringify(consent.createConsentPreferences(true)));
  tracker.trackWhatsAppClick("floating");
  storage.set(consent.CONSENT_STORAGE_KEY, JSON.stringify(consent.createConsentPreferences(false)));
  assert.equal(tracker.trackContactLead("home_contact"), false);
  assert.equal(tracker.trackWhatsAppClick("contact_form"), false);
  assert.equal(window.dataLayer.length, 1);
});

test("cookie fallback works when local storage is unavailable", () => {
  const { window, environment, consent, tracker } = setup();
  window.localStorage.getItem = () => { throw new Error("storage blocked"); };
  environment.document.cookie = `${consent.CONSENT_COOKIE_NAME}=${encodeURIComponent(JSON.stringify(consent.createConsentPreferences(true)))}`;
  assert.equal(tracker.trackWhatsAppClick("floating"), true);
});

test("an analytics failure never breaks a successful contact", () => {
  const { window, storage, consent, tracker } = setup();
  storage.set(consent.CONSENT_STORAGE_KEY, JSON.stringify(consent.createConsentPreferences(true)));
  window.dataLayer = [];
  window.dataLayer.push = () => { throw new Error("analytics blocked"); };
  assert.equal(tracker.trackContactLead("home_contact"), false);
});

test("WhatsApp opens the business number with a readable prepared message", () => {
  const { WHATSAPP_CONTACT_URL } = load("lib/contact/whatsapp.ts", {});
  const destination = new URL(WHATSAPP_CONTACT_URL);
  assert.equal(destination.origin, "https://wa.me");
  assert.equal(destination.pathname, "/56974330586");
  assert.equal(destination.searchParams.get("text"), "Hola, vengo del sitio de Vialoop y quiero conversar sobre un proyecto para mi empresa.");
});

test("GTM applies standard consent commands and synchronizes approval and revocation across tabs", () => {
  const { window, environment, storage, consent } = setup();
  const listeners = new Map();
  const scripts = [];
  let cleanup;
  let reloadScheduled = false;
  window.location.hostname = "vialoop.cl";
  window.addEventListener = (name, callback) => listeners.set(name, callback);
  window.removeEventListener = name => listeners.delete(name);
  window.setTimeout = () => { reloadScheduled = true; };
  Object.assign(environment.document, {
    documentElement: { dataset: {} },
    getElementById: id => scripts.find(script => script.id === id),
    createElement: () => ({}),
    head: { appendChild: script => scripts.push(script) },
    addEventListener() {}, removeEventListener() {},
  });
  const component = load("components/analytics/GoogleTagManager.tsx", environment, {
    react: { useEffect: callback => { cleanup = callback(); } },
    "@/lib/privacy/consent": consent,
    "@/lib/analytics/conversions": { trackWhatsAppClick() {} },
  });
  component.default();
  assert.equal(window.dataLayer[0][0], "consent");
  assert.equal(window.dataLayer[0][1], "default");
  assert.equal(window.dataLayer[0][2].analytics_storage, "denied");
  assert.equal(Array.isArray(window.dataLayer[0]), false);
  assert.equal(scripts.length, 0);
  storage.set(consent.CONSENT_STORAGE_KEY, JSON.stringify(consent.createConsentPreferences(true)));
  listeners.get("storage")({ key: consent.CONSENT_STORAGE_KEY });
  const accept = listeners.get(consent.CONSENT_UPDATED_EVENT);
  accept({ detail: consent.createConsentPreferences(true) });
  accept({ detail: consent.createConsentPreferences(true) });
  assert.equal(environment.document.documentElement.dataset.analyticsConsent, "granted");
  assert.equal(scripts.length, 1);
  assert.equal(scripts[0].src, "https://www.googletagmanager.com/gtm.js?id=GTM-KDW825JQ");
  storage.set(consent.CONSENT_STORAGE_KEY, JSON.stringify(consent.createConsentPreferences(false)));
  listeners.get("storage")({ key: consent.CONSENT_STORAGE_KEY });
  assert.equal(environment.document.documentElement.dataset.analyticsConsent, "denied");
  assert.equal(reloadScheduled, true);
  cleanup();
  assert.equal(listeners.has("storage"), false);
});
