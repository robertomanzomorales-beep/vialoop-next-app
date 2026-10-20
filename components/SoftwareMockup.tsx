"use client";

import { useId, useState } from "react";
import styles from "./SoftwareMockup.module.css";
import type { SoftwareVariant } from "@/lib/software-projects";

type Props = { variant: SoftwareVariant };
type IconKind = "grid" | "file" | "box" | "users" | "calendar" | "chart" | "settings";
type DemoPage = { id: string; label: string; icon: IconKind; group?: string };

function Icon({ kind }: { kind: IconKind }) {
  const paths: Record<IconKind, string> = {
    grid: "M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z",
    file: "M6 3h8l4 4v14H6z M14 3v5h4 M9 12h6 M9 16h6",
    box: "M3 7l9-4 9 4v10l-9 4-9-4z M3 7l9 5 9-5 M12 12v9",
    users: "M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2 M20 21v-2a4 4 0 00-3-4 M13 3a4 4 0 010 8 M13 7a4 4 0 11-8 0 4 4 0 018 0",
    calendar: "M4 5h16v16H4z M8 3v4 M16 3v4 M4 10h16 M8 14h2 M14 14h2 M8 17h2",
    chart: "M4 3v18h17 M8 16v-4 M13 16V8 M18 16V5",
    settings: "M12 8a4 4 0 100 8 4 4 0 000-8 M9 3h6l1 3 3 1 2 5-2 5-3 1-1 3H9l-1-3-3-1-2-5 2-5 3-1z",
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[kind]} /></svg>;
}

export default function SoftwareMockup({ variant }: Props) {
  const lab = variant === "laboratory";
  const booking = variant === "reservations";
  const [active, setActive] = useState("overview");
  const panelId = useId();
  const gradientId = useId();
  const pages: DemoPage[] = [
    { id: "overview", label: "Vista general", icon: "grid", group: "ESPACIO DE TRABAJO" },
    { id: "orders", label: booking ? "Reservas" : lab ? "Órdenes de trabajo" : "Solicitudes", icon: "file", group: "OPERACIÓN" },
    { id: "agenda", label: booking ? "Agenda de traslados" : "Agenda de servicios", icon: "calendar" },
    { id: "inventory", label: booking ? "Trayectos" : lab ? "Equipos" : "Materiales", icon: "box" },
    { id: "documents", label: booking ? "Pagos con Flow" : lab ? "Certificados" : "Guías y documentos", icon: "file", group: "INFORMACIÓN" },
    { id: "history", label: "Historial", icon: "calendar" },
    { id: "reports", label: "Reportes", icon: "chart" },
    { id: "clients", label: booking ? "Pasajeros" : "Clientes", icon: "users", group: "ADMINISTRACIÓN" },
    { id: "team", label: "Equipo y permisos", icon: "users" },
    { id: "settings", label: "Configuración", icon: "settings" },
  ];
  const currentPage = pages.find((page) => page.id === active) ?? pages[0];
  const overview = active === "overview" || active === "reports";
  const metrics = booking
    ? [{ label: "Reservas recibidas", value: "24", detail: "Solicitudes centralizadas", icon: "file" as const }, { label: "Traslados coordinados", value: "18", detail: "Rutas y horarios organizados", icon: "calendar" as const }, { label: "Pagos con Flow", value: "12", detail: "Seguimiento por reserva", icon: "file" as const }]
    : lab
    ? [{ label: "Equipos registrados", value: "48", detail: "Historial técnico conectado", icon: "box" as const }, { label: "Órdenes de trabajo", value: "12", detail: "Un flujo para cada servicio", icon: "file" as const }, { label: "Certificados", value: "36", detail: "Documentación organizada", icon: "file" as const }]
    : [{ label: "Solicitudes", value: "24", detail: "La operación en un solo lugar", icon: "file" as const }, { label: "Servicios coordinados", value: "18", detail: "Agenda y responsables", icon: "calendar" as const }, { label: "Documentos", value: "64", detail: "Respaldo por cada servicio", icon: "file" as const }];
  const defaultRows = booking
    ? ["Aeropuerto · San Pedro de Atacama", "Calama · Aeropuerto El Loa", "San Pedro de Atacama · Calama", "Traslado privado de ejemplo", "Servicio para empresa", "Ruta de ejemplo"]
    : lab
    ? ["Revisión de equipo", "Registro de calibración", "Verificación técnica", "Documentación de servicio", "Recepción de instrumento", "Historial del equipo"]
    : ["Coordinación de retiro", "Movimiento de material", "Registro de recepción", "Documentación de servicio", "Organización de despacho", "Control de materiales"];
  const rowSets: Record<string, string[]> = {
    documents: lab ? ["Certificado de ejemplo 01", "Certificado de ejemplo 02", "Registro técnico 03", "Respaldo de servicio 04"] : ["Guía de ejemplo 01", "Documento de retiro 02", "Registro de traslado 03", "Respaldo de servicio 04"],
    inventory: lab ? ["Instrumento de ejemplo 01", "Equipo de medición 02", "Instrumento de ejemplo 03", "Equipo de medición 04"] : ["Material de ejemplo 01", "Material de ejemplo 02", "Material de ejemplo 03", "Material de ejemplo 04"],
    clients: ["Empresa de ejemplo 01", "Empresa de ejemplo 02", "Empresa de ejemplo 03", "Empresa de ejemplo 04"],
    team: ["Coordinación", "Operación", "Administración", "Supervisión"],
    settings: ["Datos del espacio de trabajo", "Notificaciones del equipo", "Documentos y formatos", "Preferencias de visualización"],
  };
  if (booking) {
    rowSets.documents = ["Pago de reserva · Ejemplo 01", "Pago de reserva · Ejemplo 02", "Pago de reserva · Ejemplo 03", "Pago de reserva · Ejemplo 04"];
    rowSets.clients = ["Pasajero de ejemplo 01", "Pasajero de ejemplo 02", "Pasajero de ejemplo 03", "Pasajero de ejemplo 04"];
    rowSets.inventory = ["Aeropuerto · San Pedro de Atacama", "Calama · Aeropuerto El Loa", "Calama · San Pedro de Atacama", "Traslado regional de ejemplo"];
  }
  const rows = rowSets[active] ?? defaultRows;
  const states = booking ? ["Solicitado", "Confirmado", "Pago recibido"] : lab ? ["Registrado", "En revisión", "Con respaldo"] : ["Programado", "Coordinado", "Documentado"];

  return (
    <figure className={`${styles.figure} ${booking ? styles.reservations : lab ? styles.laboratory : ""}`} aria-label={`Demostración ficticia de un sistema de ${booking ? "reservas y pagos con Flow" : lab ? "laboratorio" : "gestión operativa"}`}>
      <div className={styles.window}>
        <div className={styles.windowBar} aria-hidden="true"><span className={styles.dots}><i /><i /><i /></span><span><Icon kind="box" /> vialoop / workspace</span><span className={styles.demoBadge}>VISTA ILUSTRATIVA</span></div>
        <div className={styles.viewport} tabIndex={0} role="region" aria-label="Panel de ejemplo. Desplazamiento horizontal disponible en pantallas pequeñas.">
          <div className={styles.application}>
            <aside className={styles.sidebar}>
              <div className={styles.brand}><span className={styles.appMark}>v.</span><div><strong>Workspace</strong><small>{booking ? "Reservas y pagos" : lab ? "Gestión técnica" : "Gestión operativa"}</small></div><span className={styles.workspaceArrow}>⌄</span></div>
              <nav className={styles.menu} aria-label={`Menú de demostración ${booking ? "de reservas" : lab ? "técnica" : "operativa"}`} tabIndex={0}>
                {pages.map((page) => <div key={page.id}>{page.group && <p className={styles.menuGroup}>{page.group}</p>}<button type="button" aria-pressed={active === page.id} aria-controls={panelId} className={active === page.id ? styles.selected : ""} onClick={() => setActive(page.id)}><Icon kind={page.icon} /><span>{page.label}</span>{page.id === "orders" && <small>{lab ? "12" : "24"}</small>}</button></div>)}
              </nav>
              <div className={styles.sidebarBottom}><span>VL</span><div><strong>Equipo Vialoop</strong><small>Espacio de ejemplo</small></div><i /></div>
            </aside>
            <div className={styles.workspace}>
              <div className={styles.topbar}><span><Icon kind="grid" /> Espacio de trabajo <b>/</b><strong>{currentPage.label}</strong></span><div><span className={styles.search}>⌕ <span>Buscar en el espacio</span><kbd>⌘ K</kbd></span><span className={styles.avatar}>VL</span></div></div>
              <div id={panelId} className={styles.content} key={active}>
                <div className={styles.heading}><div><p>{booking ? "TRASLADOS / RESERVAS EN LÍNEA" : lab ? "LABORATORIO / GESTIÓN TÉCNICA" : "OPERACIÓN / GESTIÓN CENTRALIZADA"}</p><h4>{active === "overview" ? (booking ? "Reservas y coordinación de traslados" : lab ? "Resumen del laboratorio" : "Tu operación, en perspectiva") : currentPage.label}</h4><span>{overview ? "Una vista clara del trabajo, los registros y el equipo." : "Explora la organización del sistema con información de ejemplo."}</span></div><span className={styles.period}><Icon kind="calendar" />Este mes <i>⌄</i></span></div>
                <div className={styles.metrics}>{metrics.map((item) => <div key={item.label}><div><span>{item.label}</span><Icon kind={item.icon} /></div><strong>{item.value}</strong><small><i />{item.detail}</small></div>)}</div>
                {booking && (overview || active === "documents") ? <div className={styles.bookingGrid}>
                  <div className={styles.bookingForm}>
                    <div className={styles.blockTitle}><strong>Solicitud de traslado</strong><span>Ejemplo de reserva desde el sitio web</span></div>
                    <div className={styles.bookingFields}><div><span>Origen</span><strong>Aeropuerto El Loa</strong></div><div><span>Destino</span><strong>San Pedro de Atacama</strong></div><div><span>Fecha</span><strong>24 / 10 / 2026</strong></div><div><span>Horario</span><strong>10:00</strong></div></div>
                    <div className={styles.bookingSteps}><span>Solicitud</span><span>Revisión</span><span>Confirmación</span></div>
                  </div>
                  <div className={styles.flowCard}><div><span>Pago del servicio</span><strong className={styles.flowWord}>Flow</strong></div><h5>El pago, vinculado a la reserva.</h5><p>Seguimiento del pago y confirmación para el pasajero y la administración.</p><span className={styles.flowState}><i />Información de ejemplo</span>{overview && <button type="button" onClick={() => setActive("documents")}>Ver ejemplo de pago</button>}</div>
                </div> : overview ? <div className={styles.middle}>
                  <div className={styles.chart}><div className={styles.blockTitle}><div><strong>{lab ? "Actividad técnica" : "Actividad de la operación"}</strong><span>Distribución ilustrativa de los registros</span></div><span className={styles.chartLegend}><i />{lab ? "Servicios" : "Movimientos"}</span></div><div className={styles.chartPlot}><div className={styles.axis}><span>60</span><span>40</span><span>20</span><span>0</span></div><div className={styles.plot}><svg viewBox="0 0 600 130" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="currentColor" stopOpacity=".23"/><stop offset="100%" stopColor="currentColor" stopOpacity="0"/></linearGradient></defs><path d="M0 105 C40 105 45 63 95 72 S155 110 205 68 S270 58 310 46 S370 83 410 47 S475 58 510 25 S565 37 600 9 V130 H0Z" fill={`url(#${gradientId})`} /><path d="M0 105 C40 105 45 63 95 72 S155 110 205 68 S270 58 310 46 S370 83 410 47 S475 58 510 25 S565 37 600 9" fill="none" stroke="currentColor" strokeWidth="3" vectorEffect="non-scaling-stroke"/></svg><div className={styles.months}>{["May", "Jun", "Jul", "Ago", "Sep", "Oct"].map(month => <span key={month}>{month}</span>)}</div></div></div></div>
                  <div className={styles.progressCard}><strong>{lab ? "Flujo del laboratorio" : "Servicios conectados"}</strong><div className={styles.ring}><span><b>{lab ? "48" : "24"}</b>registros</span></div><div className={styles.ringLegend}><span><i />{lab ? "Gestión técnica" : "Operación"}</span><span><i />Documentación</span></div></div>
                </div> : active === "agenda" ? <div className={styles.agenda}><div className={styles.blockTitle}><strong>Agenda de ejemplo</strong><span>Semana ilustrativa</span></div><div className={styles.week}>{["Lun", "Mar", "Mié", "Jue", "Vie"].map((day, i) => <div key={day}><span>{day}<b>{19 + i}</b></span><p><small>{`${9 + i}:00`}</small>{booking ? "Traslado programado" : lab ? "Revisión técnica" : "Coordinación de servicio"}</p>{i % 2 === 0 && <p className={styles.secondaryEvent}><small>15:00</small>Documentación</p>}</div>)}</div></div> : null}
                <div className={styles.table}><div className={styles.tableHeading}><div><strong>{overview ? (booking ? "Últimas reservas" : lab ? "Últimos registros técnicos" : "Últimos movimientos") : `Registros · ${currentPage.label}`}</strong><span>Información ficticia para presentar la interfaz</span></div><span className={styles.tableCount}>{overview ? "3" : rows.length} registros</span></div><div className={styles.tableLabels}><span>REFERENCIA</span><span>{lab ? "REGISTRO TÉCNICO" : "DESCRIPCIÓN"}</span><span>RESPONSABLE</span><span>SEGUIMIENTO</span></div>{rows.slice(0, overview ? 3 : 6).map((label, index) => <div key={label} className={styles.row}><span><i><Icon kind="file" /></i>{booking ? "RS" : lab ? "EQ" : "OP"}-{String(index + 1).padStart(3, "0")}</span><strong>{label}</strong><span className={styles.assignee}><b>{["OP", "AD", "TC"][index % 3]}</b>Equipo</span><span className={styles.status}><i />{states[index % 3]}</span></div>)}</div>
              </div>
              <div className={styles.appFooter}><span><i /> Entorno de demostración</span><span>Diseño y desarrollo · Vialoop</span></div>
            </div>
          </div>
        </div>
      </div>
      <figcaption><span><i />Interfaz ilustrativa · Datos de ejemplo</span><span className={styles.mobileHint}>Desliza para explorar</span><span className={styles.desktopHint}>Explora el menú del panel</span></figcaption>
    </figure>
  );
}
