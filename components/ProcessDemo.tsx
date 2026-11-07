"use client";
import { useState } from "react";
import styles from "./ProcessDemo.module.css";
const flows = [
  {
    name: "Reservas",
    title: "Traslado al aeropuerto",
    detail: "Reserva de ejemplo · 2 pasajeros",
    stages: ["Por registrar", "Pendiente de confirmar", "Reserva confirmada"],
    actions: ["Crear reserva", "Confirmar reserva", "Volver a probar"],
    events: [
      "Datos del viaje",
      "Revisión del servicio",
      "Confirmación preparada",
    ],
    labels: ["Solicitud", "Revisión", "Confirmación"],
  },
  {
    name: "Documentos",
    title: "Certificado de servicio",
    detail: "Documento de ejemplo · Revisión interna",
    stages: ["Borrador", "En revisión", "Documento validado"],
    actions: ["Enviar a revisión", "Validar documento", "Volver a probar"],
    events: [
      "Antecedentes reunidos",
      "Responsable asignado",
      "Historial actualizado",
    ],
    labels: ["Registro", "Revisión", "Validación"],
  },
  {
    name: "Operación",
    title: "Orden de trabajo",
    detail: "Servicio de ejemplo · Coordinación de equipo",
    stages: ["Por programar", "Servicio programado", "Trabajo completado"],
    actions: ["Programar servicio", "Completar trabajo", "Volver a probar"],
    events: ["Solicitud creada", "Equipo coordinado", "Cierre registrado"],
    labels: ["Solicitud", "Programación", "Cierre"],
  },
];
export default function ProcessDemo() {
  const [flowIndex, setFlowIndex] = useState(0);
  const [stage, setStage] = useState(0);
  const flow = flows[flowIndex];
  return (
    <div className={styles.demo}>
      <div className={styles.top}>
        <span className={styles.brand}>
          vialoop<span>.</span>
        </span>
        <span>DEMOSTRACIÓN INTERACTIVA</span>
      </div>
      <div className={styles.choices} aria-label="Elegir flujo de ejemplo">
        {flows.map((item, index) => (
          <button
            type="button"
            key={item.name}
            aria-pressed={flowIndex === index}
            onClick={() => {
              setFlowIndex(index);
              setStage(0);
            }}
          >
            {item.name}
          </button>
        ))}
      </div>
      <div className={styles.body}>
        <div className={styles.record}>
          <span className={styles.eyebrow}>UN PROCESO, DE PRINCIPIO A FIN</span>
          <h3>{flow.title}</h3>
          <p>{flow.detail}</p>
        </div>
        <ol className={styles.timeline} aria-label="Etapas del proceso">
          {flow.labels.map((label, index) => (
            <li
              key={label}
              data-active={stage >= index}
              aria-current={stage === index ? "step" : undefined}
            >
              <span aria-hidden="true" />
              {label}
            </li>
          ))}
        </ol>
        <div className={styles.state} aria-live="polite" aria-atomic="true">
          <span>ESTADO ACTUAL</span>
          <strong key={`${flowIndex}-${stage}`}>{flow.stages[stage]}</strong>
          <p>{flow.events[stage]}</p>
        </div>
        <button
          type="button"
          className={styles.action}
          onClick={() => setStage((current) => (current + 1) % 3)}
        >
          {flow.actions[stage]}
        </button>
      </div>
      <p className={styles.note}>
        Ejemplo ilustrativo con datos de prueba. El alcance se define para cada
        proyecto.
      </p>
    </div>
  );
}
