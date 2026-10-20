import styles from "./SoftwareMockup.module.css";

type Props = { variant: "operations" | "laboratory" };

function Icon({ kind }: { kind: "grid" | "file" | "box" | "users" | "calendar" }) {
  const paths = {
    grid: "M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z",
    file: "M6 3h8l4 4v14H6z M14 3v5h4 M9 12h6 M9 16h6",
    box: "M3 7l9-4 9 4v10l-9 4-9-4z M3 7l9 5 9-5 M12 12v9",
    users: "M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2 M20 21v-2a4 4 0 00-3-4 M13 3a4 4 0 010 8 M13 7a4 4 0 11-8 0 4 4 0 018 0",
    calendar: "M4 5h16v16H4z M8 3v4 M16 3v4 M4 10h16 M8 14h2 M14 14h2 M8 17h2",
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[kind]} /></svg>;
}

export default function SoftwareMockup({ variant }: Props) {
  const lab = variant === "laboratory";
  const metrics = lab
    ? [{ label: "Equipos", value: "48", detail: "Historial centralizado" }, { label: "Órdenes", value: "12", detail: "Seguimiento técnico" }, { label: "Certificados", value: "36", detail: "Documentos vinculados" }]
    : [{ label: "Solicitudes", value: "24", detail: "En un mismo lugar" }, { label: "Servicios", value: "18", detail: "Agenda organizada" }, { label: "Documentos", value: "64", detail: "Respaldo por servicio" }];
  const rows = lab
    ? [{ code: "EQ-001", label: "Revisión técnica", state: "En revisión" }, { code: "EQ-002", label: "Registro de calibración", state: "Registrado" }, { code: "EQ-003", label: "Documentación técnica", state: "Con respaldo" }]
    : [{ code: "SV-001", label: "Coordinación de retiro", state: "Programado" }, { code: "SV-002", label: "Movimiento de material", state: "Coordinado" }, { code: "SV-003", label: "Documentación de servicio", state: "Documentado" }];

  return (
    <figure className={`${styles.figure} ${lab ? styles.laboratory : styles.operations}`} aria-label={`Vista ficticia de un sistema de ${lab ? "gestión de laboratorio" : "gestión operativa"}, con datos de ejemplo`}>
      <div className={styles.window}>
        <div className={styles.windowBar}><span className={styles.dots}><i /><i /><i /></span><span>Workspace / {lab ? "Laboratorio" : "Operación"}</span><span className={styles.windowMark}>V</span></div>
        <div className={styles.application}>
          <aside className={styles.sidebar} aria-hidden="true">
            <div className={styles.appMark}>v<span>.</span></div>
            <span className={styles.selected}><Icon kind="grid" /></span>
            <span><Icon kind="file" /></span>
            <span><Icon kind="box" /></span>
            <span><Icon kind="calendar" /></span>
            <span><Icon kind="users" /></span>
            <div className={styles.sidebarBottom}><i />VL</div>
          </aside>
          <div className={styles.workspace}>
            <div className={styles.topbar}><span>Espacio de trabajo</span><div><span className={styles.search}>Buscar <b>⌕</b></span><span className={styles.avatar}>VL</span></div></div>
            <div className={styles.content}>
              <div className={styles.heading}><div><p>{lab ? "GESTIÓN TÉCNICA" : "GESTIÓN OPERATIVA"}</p><strong>{lab ? "Resumen del laboratorio" : "Tu operación, en perspectiva"}</strong><span>{lab ? "Equipos, servicios e historial técnico." : "El trabajo del equipo en un solo lugar."}</span></div><span className={styles.period}>Este mes <i>⌄</i></span></div>
              <div className={styles.metrics}>{metrics.map((item) => <div key={item.label}><span>{item.label}</span><strong>{item.value}</strong><small>{item.detail}</small></div>)}</div>
              <div className={styles.middle}>
                <div className={styles.chart}><div className={styles.blockTitle}><strong>{lab ? "Actividad técnica" : "Servicios registrados"}</strong><span>Últimos meses</span></div><div className={styles.bars} aria-hidden="true">{[37,62,48,78,61,91].map((height,i)=><div key={i}><span style={{height:`${height}%`}} /><small>{["May","Jun","Jul","Ago","Sep","Oct"][i]}</small></div>)}</div></div>
                <div className={styles.progressCard}><strong>{lab ? "Flujo del laboratorio" : "Organización de servicios"}</strong><div className={styles.ring}><span>{lab ? "Técnica" : "Gestión"}<b>{lab ? "+" : "↗"}</b></span></div><p><i />{lab ? "Registros vinculados" : "Información conectada"}</p></div>
              </div>
              <div className={styles.table}><div className={styles.tableHeading}><strong>{lab ? "Seguimiento de equipos" : "Últimos movimientos"}</strong><span>Ver actividad ↗</span></div><div className={styles.tableLabels}><span>REFERENCIA</span><span>{lab ? "TRABAJO TÉCNICO" : "SERVICIO"}</span><span>SEGUIMIENTO</span></div>{rows.map((row,i)=><div key={row.code} className={styles.row}><span><i>{String(i+1).padStart(2,"0")}</i>{row.code}</span><span>{row.label}</span><span className={styles.status}>{row.state}</span></div>)}</div>
            </div>
          </div>
        </div>
      </div>
      <figcaption><span />Interfaz ilustrativa · Datos de ejemplo</figcaption>
    </figure>
  );
}
