"use client";

import { useState } from "react";
import styles from "./ConnectionStudio.module.css";

const examples = [
  {
    id: "operacion",
    name: "Operaciones",
    description: "Coordina servicios y responsables.",
    inputs: ["Nueva solicitud", "Equipo asignado", "Documentos"],
    outcome: "Un servicio con seguimiento",
    connected: "Cada etapa queda relacionada para que el equipo sepa qué sigue.",
    disconnected: "La información viaja entre correos, planillas y mensajes.",
  },
  {
    id: "servicios",
    name: "Servicios técnicos",
    description: "Organiza equipos y atenciones.",
    inputs: ["Recepción", "Orden de trabajo", "Certificado"],
    outcome: "El historial de cada equipo",
    connected: "El trabajo técnico y sus documentos se reúnen en un mismo flujo.",
    disconnected: "Los antecedentes se buscan en distintas carpetas y registros.",
  },
  {
    id: "reservas",
    name: "Reservas",
    description: "Conecta solicitudes y pagos.",
    inputs: ["Solicitud de viaje", "Disponibilidad", "Pago"],
    outcome: "Una reserva organizada",
    connected: "La solicitud, su confirmación y el pago pueden trabajar conectados.",
    disconnected: "La reserva requiere coordinar varios pasos por separado.",
  },
];

export default function ConnectionStudio() {
  const [selected, setSelected] = useState(0);
  const [connected, setConnected] = useState(true);
  const example = examples[selected];

  return (
    <div className={styles.studio} data-connected={connected}>
      <div className={styles.topbar}>
        <div><span className={styles.spark} aria-hidden="true" /> EXPLORADOR DE FLUJOS <span className={styles.sample}>EJEMPLO INTERACTIVO</span></div>
        <div className={styles.modes} role="group" aria-label="Ver el proceso">
          <button type="button" aria-pressed={!connected} onClick={() => setConnected(false)}>Sin conectar</button>
          <button type="button" aria-pressed={connected} onClick={() => setConnected(true)}>Con software</button>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.examples}>
          <p className={styles.label}>ELIGE UN EJEMPLO</p>
          <div className={styles.exampleList}>
            {examples.map((item, index) => (
              <button key={item.id} type="button" aria-pressed={selected === index} onClick={() => setSelected(index)}>
                <span className={styles.exampleDot} aria-hidden="true" />
                <span><strong>{item.name}</strong><small>{item.description}</small></span>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.canvas}>
          <div className={styles.canvasHead}>
            <div><p className={styles.label}>UNA FORMA DE TRABAJAR</p><h3>{example.name}</h3></div>
            <span className={styles.state}><i aria-hidden="true" />{connected ? "Flujo conectado" : "Información dispersa"}</span>
          </div>

          <div className={styles.flow} aria-label={"Ejemplo: " + example.name}>
            <div className={styles.inputs}>
              {example.inputs.map((input, index) => (
                <div className={styles.node} key={input}>
                  <span className={styles.nodeIcon} aria-hidden="true">
                    {index === 0 ? <svg viewBox="0 0 24 24" fill="none"><rect x="5" y="4" width="14" height="16" rx="2" /><path d="M8 9h8M8 13h6" /></svg> : index === 1 ? <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="3" /><path d="M6 19a6 6 0 0 1 12 0" /></svg> : <svg viewBox="0 0 24 24" fill="none"><rect x="4" y="5" width="16" height="14" rx="2" /><path d="m8 12 2.5 2.5L16 9" /></svg>}
                  </span>
                  <span>{input}</span>
                </div>
              ))}
            </div>
            <div className={styles.linkLine} aria-hidden="true"><i /></div>
            <div className={styles.hub}>
              <span className={styles.hubSymbol} aria-hidden="true"><i /><i /><i /><i /></span>
              <strong>{connected ? "Software" : "Sin conexión"}</strong>
              <small>{connected ? "a tu medida" : "entre áreas"}</small>
            </div>
            <div className={styles.linkLine} aria-hidden="true"><i /></div>
            <div className={styles.result}>
              <span>{connected ? "EL RESULTADO" : "LO QUE OCURRE"}</span>
              <strong>{connected ? example.outcome : "Trabajo por separado"}</strong>
              <small>{connected ? "Información disponible para el equipo." : "Más pasos para reunir información."}</small>
            </div>
          </div>
          <p className={styles.explanation} aria-live="polite">{connected ? example.connected : example.disconnected}</p>
        </div>
      </div>
      <div className={styles.footer}><span>Ejemplo ilustrativo</span><span>El flujo se adapta a los procesos de cada empresa.</span></div>
    </div>
  );
}
