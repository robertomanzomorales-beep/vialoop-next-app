import { hasAnalyticsConsent } from "../privacy/consent";

const services = new Set(["web", "sistema", "google", "material", "hosting", "otro"]);

function record(event: string, parameters: Record<string, string>): boolean {
  if (typeof window === "undefined") return false;
  try {
    if (!hasAnalyticsConsent()) return false;
    if (!Array.isArray(window.dataLayer)) window.dataLayer = [];
    window.dataLayer.push({ ...parameters, event, page_path: window.location.pathname });
    return true;
  } catch {
    // A blocked analytics script must never interrupt a contact or a successful submission.
    return false;
  }
}

export function trackContactLead(formId: "home_contact" | "contact_page", service = "otro") {
  return record("generate_lead", {
    contact_method: "form",
    form_id: formId,
    service: services.has(service) ? service : "otro",
  });
}

export function trackWhatsAppClick(location: "floating" | "contact_form") {
  return record("whatsapp_click", {
    contact_method: "whatsapp",
    link_location: location,
  });
}
