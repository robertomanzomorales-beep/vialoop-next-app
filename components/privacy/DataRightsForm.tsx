"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import styles from "./DataRightsForm.module.css";

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  relation: string;
  requestType: string;
  details: string;
  privacyAccepted: boolean;
  website: string;
};

type FormStatus = {
  type: "idle" | "sending" | "success" | "error";
  message: string;
  requestId?: string;
};

const INITIAL_FORM: FormData = {
  fullName: "",
  email: "",
  phone: "",
  relation: "",
  requestType: "",
  details: "",
  privacyAccepted: false,
  website: "",
};

const REQUEST_OPTIONS = [
  { value: "acceso", label: "Acceso a mis datos personales" },
  { value: "rectificacion", label: "Rectificación de mis datos" },
  { value: "supresion", label: "Supresión o eliminación de mis datos" },
  { value: "oposicion", label: "Oposición al tratamiento" },
  { value: "portabilidad", label: "Portabilidad de mis datos" },
  { value: "revocacion", label: "Revocación de mi consentimiento" },
  { value: "otro", label: "Otra solicitud relacionada con privacidad" },
] as const;

const RELATION_OPTIONS = [
  { value: "visitante", label: "Visitante del sitio web" },
  {
    value: "prospecto",
    label: "Solicité información o una cotización",
  },
  {
    value: "cliente",
    label: "Cliente o representante de una empresa cliente",
  },
  {
    value: "proveedor",
    label: "Proveedor o representante de una empresa proveedora",
  },
  { value: "otro", label: "Otra relación con Vialoop" },
] as const;

export default function DataRightsForm() {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [status, setStatus] = useState<FormStatus>({
    type: "idle",
    message: "",
  });

  const isSending = status.type === "sending";

  function updateField(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value } = event.target;
    const nextValue =
      event.target instanceof HTMLInputElement && event.target.type === "checkbox"
        ? event.target.checked
        : value;

    setFormData((current) => ({
      ...current,
      [name]: nextValue,
    }));

    if (status.type === "error") {
      setStatus({ type: "idle", message: "" });
    }
  }

  async function submitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSending) return;

    setStatus({
      type: "sending",
      message: "Enviando solicitud de forma segura…",
    });

    try {
      const response = await fetch("/api/solicitud-datos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = (await response.json()) as {
        ok?: boolean;
        message?: string;
        requestId?: string;
      };

      if (!response.ok || !result.ok) {
        throw new Error(
          result.message ||
            "No fue posible enviar la solicitud. Intente nuevamente.",
        );
      }

      setFormData(INITIAL_FORM);
      setStatus({
        type: "success",
        message:
          result.message || "La solicitud fue recibida correctamente.",
        requestId: result.requestId,
      });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Ocurrió un problema al enviar la solicitud.",
      });
    }
  }

  if (status.type === "success") {
    return (
      <section
        className={styles.successPanel}
        aria-labelledby="privacy-request-success-title"
        aria-live="polite"
      >
        <p className={styles.successEyebrow}>SOLICITUD REGISTRADA</p>

        <h2 id="privacy-request-success-title">
          Recibimos su solicitud correctamente
        </h2>

        <p className={styles.successMessage}>{status.message}</p>

        {status.requestId && (
          <div className={styles.requestReference}>
            <span>Identificador de seguimiento</span>
            <strong>{status.requestId}</strong>
          </div>
        )}

        <p className={styles.successHelp}>
          Guarde este identificador. También enviaremos una confirmación al
          correo electrónico informado.
        </p>

        <button
          type="button"
          className={styles.secondaryButton}
          onClick={() => setStatus({ type: "idle", message: "" })}
        >
          Realizar otra solicitud
        </button>
      </section>
    );
  }

  return (
    <form className={styles.form} onSubmit={submitRequest} noValidate>
      <div className={styles.formHeader}>
        <p className={styles.eyebrow}>CANAL DE PRIVACIDAD</p>
        <h2>Ingrese los antecedentes de su solicitud</h2>
        <p>
          Utilizaremos esta información únicamente para revisar, gestionar y
          responder su requerimiento relacionado con datos personales.
        </p>
      </div>

      <div className={styles.fieldsGrid}>
        <div className={styles.fieldGroup}>
          <label htmlFor="fullName">Nombre completo</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={updateField}
            autoComplete="name"
            maxLength={120}
            required
            disabled={isSending}
          />
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={updateField}
            autoComplete="email"
            inputMode="email"
            maxLength={180}
            required
            disabled={isSending}
          />
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="phone">
            Teléfono <span>Opcional</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={updateField}
            autoComplete="tel"
            inputMode="tel"
            maxLength={40}
            disabled={isSending}
          />
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="relation">Relación con Vialoop</label>
          <select
            id="relation"
            name="relation"
            value={formData.relation}
            onChange={updateField}
            required
            disabled={isSending}
          >
            <option value="" disabled>
              Seleccione una opción
            </option>
            {RELATION_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="requestType">Derecho o solicitud que desea ejercer</label>
        <select
          id="requestType"
          name="requestType"
          value={formData.requestType}
          onChange={updateField}
          required
          disabled={isSending}
        >
          <option value="" disabled>
            Seleccione una opción
          </option>
          {REQUEST_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.fieldGroup}>
        <div className={styles.labelRow}>
          <label htmlFor="details">Descripción de la solicitud</label>
          <span>{formData.details.length}/4000</span>
        </div>

        <textarea
          id="details"
          name="details"
          value={formData.details}
          onChange={updateField}
          rows={7}
          minLength={20}
          maxLength={4000}
          placeholder="Describa claramente su solicitud e indique la información necesaria para poder localizar los datos relacionados."
          required
          disabled={isSending}
        />

        <p className={styles.fieldHelp}>
          No incluya contraseñas, datos bancarios ni antecedentes sensibles. Si
          necesitamos verificar su identidad, nos comunicaremos posteriormente.
        </p>
      </div>

      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="website">Sitio web</label>
        <input
          id="website"
          name="website"
          type="text"
          value={formData.website}
          onChange={updateField}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <label className={styles.consentRow}>
        <input
          name="privacyAccepted"
          type="checkbox"
          checked={formData.privacyAccepted}
          onChange={updateField}
          required
          disabled={isSending}
        />
        <span>
          Confirmo que la información ingresada podrá ser utilizada por Vialoop
          Studio SpA exclusivamente para gestionar y responder esta solicitud.
        </span>
      </label>

      {status.type === "error" && (
        <div className={styles.errorMessage} role="alert">
          {status.message}
        </div>
      )}

      <div className={styles.submitArea}>
        <button type="submit" disabled={isSending}>
          {isSending ? "ENVIANDO SOLICITUD…" : "ENVIAR SOLICITUD"}
        </button>

        <p>
          También puede escribir directamente a{" "}
          <a href="mailto:contacto@vialoop.cl">contacto@vialoop.cl</a>.
        </p>
      </div>
    </form>
  );
}
