"use client";

import { useEffect, useReducer, useRef, useState, type FormEvent } from "react";
import {
  createDemoState, DEMO_LIMIT, nextRequestStatus, requestReducer,
  requestStatus, requestSummary, type RequestFilter,
} from "@/lib/demo/requests";
import styles from "./RequestDemo.module.css";

const filters: { id: RequestFilter; label: string; name: string }[] = [
  { id: "all", label: "Registradas", name: "todas las solicitudes" },
  { id: "new", label: "Nuevas", name: "solicitudes nuevas" },
  { id: "active", label: "En curso", name: "solicitudes en curso" },
  { id: "done", label: "Completadas", name: "solicitudes completadas" },
];

export default function RequestDemo() {
  const [state, dispatch] = useReducer(requestReducer, undefined, createDemoState);
  const [filter, setFilter] = useState<RequestFilter>("all");
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("Crea una solicitud o avanza una de las existentes.");
  const [formOpen, setFormOpen] = useState(false);
  const [highlightId, setHighlightId] = useState<number | null>(null);
  const [focusId, setFocusId] = useState<number | null>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const actionRefs = useRef(new Map<number, HTMLButtonElement>());
  const filterRefs = useRef(new Map<RequestFilter, HTMLButtonElement>());
  const summary = requestSummary(state.requests);
  const atCapacity = summary.total >= DEMO_LIMIT;
  const visibleRequests = state.requests.filter(request => filter === "all" || request.status === filter);

  useEffect(() => {
    if (formOpen) titleRef.current?.focus();
  }, [formOpen]);

  useEffect(() => {
    if (focusId !== null) actionRefs.current.get(focusId)?.focus();
  }, [focusId]);

  function registerRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleaned = title.trim().replace(/\s+/g, " ");
    if (atCapacity) return;
    if (cleaned.length < 3 || cleaned.length > 70) {
      setError("Escribe una solicitud de entre 3 y 70 caracteres.");
      titleRef.current?.focus();
      return;
    }
    const id = state.nextId;
    dispatch({ type: "create", title: cleaned });
    setTitle("");
    setError("");
    setFilter("all");
    setFormOpen(false);
    setHighlightId(id);
    setFocusId(id);
    setMessage(`SOL-${id} registrada. El resumen ya está actualizado.`);
  }

  function advanceRequest(id: number) {
    const request = state.requests.find(item => item.id === id);
    if (!request) return;
    if (filter !== "all") filterRefs.current.get(filter)?.focus({ preventScroll: true });
    dispatch({ type: "advance", id });
    setHighlightId(id);
    setMessage(`SOL-${id}: ${requestStatus[nextRequestStatus(request.status)].label}. El resumen ya está actualizado.`);
  }

  function resetDemo() {
    dispatch({ type: "reset" });
    setFilter("all");
    setTitle("");
    setError("");
    setHighlightId(null);
    setFocusId(null);
    setFormOpen(false);
    setMessage("Demo reiniciada. Puedes volver a probar.");
  }

  return (
    <div className={styles.app} data-testid="request-demo" aria-labelledby="demo-title">
      <div className={styles.appBar}>
        <div className={styles.appIdentity}>
          <svg className={styles.appIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>
          <h3 id="demo-title">Gestión de solicitudes</h3>
          <span className={styles.demoLabel}>Demo interactiva</span>
        </div>
        <button type="button" onClick={resetDemo} className={styles.reset}>
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 1 0-.4 5M16 3v5h-5" /></svg>
          Reiniciar demo
        </button>
      </div>

      <div className={styles.summary} role="group" aria-label="Resumen y filtros de solicitudes">
        {filters.map(item => {
          const count = item.id === "all" ? summary.total : summary[item.id];
          return <button key={item.id} type="button" className={styles.stat} aria-pressed={filter === item.id} aria-label={`Mostrar ${item.name}: ${count}`} onClick={() => setFilter(item.id)} ref={node => { if (node) filterRefs.current.set(item.id, node); else filterRefs.current.delete(item.id); }}>
            <span className={styles.statLabel}><i className={styles[`dot_${item.id}`]} aria-hidden="true" />{item.label}</span>
            <strong key={count} data-testid={`demo-count-${item.id}`}>{count}</strong>
          </button>;
        })}
      </div>
      <div className={styles.distribution} role="img" aria-label={`${summary.new} nuevas, ${summary.active} en curso y ${summary.done} completadas`}>
        {(["new", "active", "done"] as const).map(status => <span key={status} className={styles[`segment_${status}`]} style={{ width: `${summary.total ? summary[status] / summary.total * 100 : 0}%` }} />)}
      </div>

      <div className={styles.mobileFormBar}>
        <button type="button" className={styles.newToggle} aria-expanded={formOpen} aria-controls="demo-request-form" onClick={() => setFormOpen(value => !value)}>
          <span aria-hidden="true">{formOpen ? "−" : "+"}</span>{formOpen ? "Cerrar formulario" : "Nueva solicitud"}
        </button>
      </div>

      <div className={styles.workspace}>
        <aside id="demo-request-form" className={styles.formPane} data-open={formOpen || undefined}>
          <h4>Nueva solicitud</h4>
          <form onSubmit={registerRequest} noValidate>
            <label htmlFor="demo-request-title">Nombre de la solicitud</label>
            <input ref={titleRef} id="demo-request-title" name="demoRequestTitle" value={title} onChange={event => { setTitle(event.target.value); if (error) setError(""); }} placeholder="Ej.: Mantención de equipo" required minLength={3} maxLength={70} autoComplete="off" disabled={atCapacity} aria-invalid={Boolean(error)} aria-describedby={error ? "demo-request-error" : atCapacity ? "demo-request-limit" : undefined} />
            {error ? <p id="demo-request-error" className={styles.error} role="alert">{error}</p> : null}
            <button type="submit" className={styles.submit} disabled={atCapacity}>Registrar solicitud</button>
            <p className={styles.formHint} id={atCapacity ? "demo-request-limit" : undefined}>{atCapacity ? "Reinicia la demo para probar con más solicitudes." : "Aparecerá en el listado con el estado Nueva."}</p>
          </form>
        </aside>

        <div className={styles.requestsPane}>
          <div className={styles.listTitle}>
            <h4>{filter === "all" ? "Solicitudes recientes" : filter === "new" ? "Solicitudes nuevas" : filter === "active" ? "Solicitudes en curso" : "Solicitudes completadas"}</h4>
            <span>{visibleRequests.length} de {summary.total}</span>
          </div>
          <div className={styles.listHead} aria-hidden="true"><span>Solicitud</span><span>Estado</span><span>Acción</span></div>
          <ul className={styles.requestList} aria-label="Solicitudes de ejemplo">
            {visibleRequests.length ? visibleRequests.map(request => (
              <li key={request.id} className={`${styles.request} ${highlightId === request.id ? styles.highlighted : ""}`} data-request-id={request.id}>
                <div className={styles.requestName}><span>SOL-{request.id}</span><h5>{request.title}</h5></div>
                <span key={request.status} className={`${styles.status} ${styles[`status_${request.status}`]}`}><i aria-hidden="true" />{requestStatus[request.status].label}</span>
                <button type="button" className={styles.advance} onClick={() => advanceRequest(request.id)} aria-label={`${requestStatus[request.status].action} solicitud ${request.title}`} ref={node => { if (node) actionRefs.current.set(request.id, node); else actionRefs.current.delete(request.id); }}>{requestStatus[request.status].action}</button>
              </li>
            )) : <li className={styles.empty}><p>No hay solicitudes en este estado.</p><button type="button" onClick={() => setFilter("all")}>Ver todas</button></li>}
          </ul>
        </div>
      </div>

      <div className={styles.appFooter}>
        <p className={styles.feedback} role="status" aria-live="polite" aria-atomic="true"><span aria-hidden="true" />{message}</p>
        <p className={styles.sampleNote}>Datos de ejemplo</p>
      </div>
    </div>
  );
}
