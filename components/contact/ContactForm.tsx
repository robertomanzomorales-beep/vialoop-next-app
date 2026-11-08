"use client";
import Link from "next/link";
import { useId, useState, type FormEvent } from "react";
import ContactIcon from "./ContactIcon";
import styles from "./ContactForm.module.css";
export type ContactService =
  | "web"
  | "sistema"
  | "google"
  | "material"
  | "hosting"
  | "otro";
const serviceNames: Record<ContactService, string> = {
  web: "Diseño web",
  sistema: "Software a medida",
  google: "Google y visibilidad",
  material: "Material comercial",
  hosting: "Hosting y correos",
  otro: "Otra consulta",
};
type Result = {
  status: "idle" | "sending" | "success" | "error";
  message: string;
  requestId?: string;
  confirmationSent?: boolean;
};
export default function ContactForm({
  embedded = false,
  initialService,
}: {
  embedded?: boolean;
  initialService?: ContactService;
}) {
  const id = useId();
  const [result, setResult] = useState<Result>({ status: "idle", message: "" });
  const Heading = embedded ? "h2" : "h1";
  const FormHeading = embedded ? "h3" : "h2";
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (result.status === "sending") return;
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const values = new FormData(form);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25000);
    setResult({ status: "sending", message: "" });
    try {
      const response = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: values.get("fullName"),
          email: values.get("email"),
          company: values.get("company"),
          phone: values.get("phone"),
          message: values.get("message"),
          privacyAccepted: values.get("privacyAccepted") === "on",
          website: values.get("website"),
          service: initialService ?? "otro",
        }),
        signal: controller.signal,
      });
      const data = await response.json();
      if (!response.ok || !data.ok)
        throw new Error(
          data.message ||
            "No fue posible enviar tu consulta. Intenta nuevamente.",
        );
      setResult({
        status: "success",
        message: data.message,
        requestId: data.requestId,
        confirmationSent: data.confirmationSent,
      });
    } catch (error) {
      setResult({
        status: "error",
        message:
          error instanceof Error && error.name !== "AbortError"
            ? error.message
            : "El envío está tardando más de lo esperado. Escríbenos a dloayza@vialoop.cl si no recibiste la confirmación.",
      });
    } finally {
      clearTimeout(timeout);
    }
  }
  return (
    <section
      id={embedded ? "contacto" : "contacto-vialoop"}
      className={`${styles.section} ${embedded ? styles.embedded : ""}`}
      aria-labelledby={`${id}-title`}
    >
      <div className={styles.container}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>HABLEMOS DE TU PROYECTO</p>
          <Heading id={`${id}-title`}>
            Conversemos de tu proyecto.
          </Heading>
          <p>
            Cuéntanos qué necesitas. Te ayudamos a darle forma y definir cómo
            avanzar.
          </p>
          <div className={styles.direct}>
            <a href="mailto:dloayza@vialoop.cl">
              <ContactIcon name="mail" />
              <span><small>Correo electrónico</small><strong>dloayza@vialoop.cl</strong></span>
            </a>
            <a href="tel:+56974330586">
              <ContactIcon name="phone" />
              <span><small>Conversemos</small><strong>+56 9 7433 0586</strong></span>
            </a>
            <p className={styles.location}>
              <ContactIcon name="pin" /><span>Desde Calama, para todo Chile.</span>
            </p>
          </div>
        </div>
        <div className={styles.formColumn}>
          {result.status === "success" ? (
            <div className={styles.success} role="status" aria-live="polite">
              <span className={styles.successMark} aria-hidden="true">
                <ContactIcon name="check" />
              </span>
              <h2>Gracias por escribirnos.</h2>
              <p>{result.message}</p>
              {result.requestId && (
                <p className={styles.reference}>
                  Referencia: {result.requestId}
                </p>
              )}
              <p>
                Doris, del área comercial, revisará tu consulta para conversar
                contigo sobre el siguiente paso.
              </p>
              <button
                type="button"
                onClick={() => setResult({ status: "idle", message: "" })}
              >
                Enviar otra consulta
              </button>
            </div>
          ) : (
            <form
              onSubmit={submit}
              aria-label="Contacto con Vialoop"
              aria-busy={result.status === "sending"}
            >
              <div className={styles.formHeading}>
                <FormHeading>Escríbenos</FormHeading>
                <p>Solo necesitamos lo esencial para empezar.</p>
                {initialService && (
                  <span className={styles.context}>
                    <ContactIcon name="briefcase" />
                    {serviceNames[initialService]}
                  </span>
                )}
              </div>
              <div className={styles.fields}>
                <label htmlFor={`${id}-name`}>
                  <span className={styles.fieldLabel}>Tu nombre *</span>
                  <span className={styles.control}>
                    <ContactIcon name="user" />
                    <input
                      id={`${id}-name`}
                      name="fullName"
                      autoComplete="name"
                      placeholder="Nombre y apellido"
                      minLength={2}
                      maxLength={120}
                      required
                    />
                  </span>
                </label>
                <label htmlFor={`${id}-email`}>
                  <span className={styles.fieldLabel}>Correo electrónico *</span>
                  <span className={styles.control}>
                    <ContactIcon name="mail" />
                    <input
                      id={`${id}-email`}
                      type="email"
                      name="email"
                      autoComplete="email"
                      placeholder="nombre@empresa.cl"
                      maxLength={180}
                      required
                    />
                  </span>
                </label>
                <label htmlFor={`${id}-company`}>
                  <span className={styles.fieldLabel}>
                    Empresa <small>Opcional</small>
                  </span>
                  <span className={styles.control}>
                    <ContactIcon name="building" />
                    <input
                      id={`${id}-company`}
                      name="company"
                      autoComplete="organization"
                      placeholder="Nombre de tu empresa"
                      maxLength={120}
                    />
                  </span>
                </label>
                <label htmlFor={`${id}-phone`}>
                  <span className={styles.fieldLabel}>
                    Teléfono <small>Opcional</small>
                  </span>
                  <span className={styles.control}>
                    <ContactIcon name="phone" />
                    <input
                      id={`${id}-phone`}
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      placeholder="+56 9"
                      maxLength={40}
                    />
                  </span>
                </label>
                <label htmlFor={`${id}-message`} className={styles.full}>
                  <span className={styles.fieldLabel}>¿Qué te gustaría hacer? *</span>
                  <span className={styles.control}>
                    <ContactIcon name="message" />
                    <textarea
                      id={`${id}-message`}
                      name="message"
                      placeholder="Una web, un software o una idea que quieras conversar…"
                      rows={4}
                      minLength={10}
                      maxLength={2000}
                      required
                    />
                  </span>
                </label>
              </div>
              <label className={styles.honeypot} aria-hidden="true">
                Sitio web
                <input name="website" tabIndex={-1} autoComplete="off" />
              </label>
              <label className={styles.consent}>
                <input type="checkbox" name="privacyAccepted" required />
                <span>
                  He leído la{" "}
                  <Link
                    href="/politicasprivacidad"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Política de Privacidad
                  </Link>{" "}
                  y autorizo el uso de mis datos para responder esta consulta y
                  enviarme su confirmación.
                </span>
              </label>
              {result.status === "error" && (
                <p role="alert" className={styles.error}>
                  <ContactIcon name="alert" />
                  <span>{result.message}</span>
                </p>
              )}
              <div className={styles.submitRow}>
                <button type="submit" disabled={result.status === "sending"}>
                  <ContactIcon
                    name={result.status === "sending" ? "loader" : "mail"}
                    className={result.status === "sending" ? styles.spinner : undefined}
                  />
                  {result.status === "sending"
                    ? "Enviando consulta…"
                    : "Enviar consulta"}
                </button>
                <span>
                  Tu consulta llega al área comercial.
                  <br />
                  Te enviamos una confirmación al correo.
                </span>
              </div>
              <p className={styles.required}>* Campos obligatorios.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
