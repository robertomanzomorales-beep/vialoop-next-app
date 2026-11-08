import type { SoftwareVariant } from "@/lib/software-projects";
import styles from "./ProjectPreview.module.css";

type PreviewKind = SoftwareVariant | "vialoop";

const menus: Record<PreviewKind, string[]> = {
  operations: ["Panel de empresa", "Cotizaciones", "Servicios", "Control de guías", "Materiales"],
  laboratory: ["Resumen", "Recepciones", "Equipos", "Registros técnicos", "Certificados"],
  reservations: ["Reservas", "Mensajes", "Configuración"],
  vialoop: ["Dashboard", "Seguimiento", "Cotizaciones", "Clientes", "Proyectos", "Solicitudes"],
};

const content: Record<PreviewKind, { brand: string; subtitle: string; eyebrow: string; title: string; description: string; action: string; stats: [string, string][] }> = {
  operations: { brand: "RERCHAR", subtitle: "Plataforma operativa", eyebrow: "PANEL DE CONTROL", title: "Panel de empresa", description: "Una vista de tu operación", action: "Nueva cotización", stats: [["Cotizaciones", "8"], ["Servicios", "12"], ["Materiales", "6"]] },
  laboratory: { brand: "GM Especialistas", subtitle: "Gestión de empresa", eyebrow: "ESPACIO DE TRABAJO", title: "Tu espacio de trabajo", description: "Todo listo para continuar.", action: "Nueva recepción", stats: [["En curso", "4"], ["Equipos", "128"], ["Certificados", "24"]] },
  reservations: { brand: "MARTÍN", subtitle: "ATACAMA TRANSFERS", eyebrow: "ESPACIO DE TRABAJO / RESERVAS", title: "Solicitudes de reserva", description: "Gestiona los traslados solicitados.", action: "Ver reservas", stats: [["Solicitudes", "14"], ["Por revisar", "4"], ["Confirmadas", "9"]] },
  vialoop: { brand: "Vialoop", subtitle: "Gestión integral", eyebrow: "SOPORTE Y OPERACIÓN", title: "Solicitudes", description: "Clientes, proyectos y soporte en un solo lugar.", action: "Nueva solicitud", stats: [["Solicitudes", "24"], ["En seguimiento", "6"], ["Completadas", "18"]] },
};

function WindowContent({ kind }: { kind: PreviewKind }) {
  const item = content[kind];
  return <div className={styles.screen}>
    <aside className={styles.sidebar}>
      <div className={styles.brand}><span className={styles.brandIcon}>{kind === "laboratory" ? "GM" : kind === "operations" ? "R" : kind === "vialoop" ? "V" : "M"}</span><span><b>{item.brand}</b><small>{item.subtitle}</small></span></div>
      <div className={styles.menuHeading}>MENÚ PRINCIPAL</div>
      <div className={styles.menu}>{menus[kind].map((label, i) => <div className={i === (kind === "vialoop" ? 5 : 0) ? styles.menuActive : ""} key={label}><span className={styles.menuIcon} />{label}</div>)}</div>
      <div className={styles.sidebarFoot}>Espacio de trabajo</div>
    </aside>
    <div className={styles.screenMain}>
      <div className={styles.screenTop}><span>{kind === "vialoop" ? "Gestión integral" : "Resumen"}</span><span className={styles.topRight}>⌕ &nbsp;&nbsp; <i /> &nbsp; Administrador</span></div>
      <div className={styles.content}>
        <div className={styles.heading}><div><span>{item.eyebrow}</span><strong>{item.title}</strong><p>{item.description}</p></div><span className={styles.action}>{item.action}</span></div>
        <div className={styles.metrics}>{item.stats.map(([label, value]) => <div className={styles.metric} key={label}><span>{label}</span><b>{value}</b><i /></div>)}</div>
        {kind === "reservations" ? <div className={styles.reservationLayout}>
          <div className={styles.panel}><b>Reservas recibidas</b><div className={styles.search}>⌕ &nbsp; Buscar reserva</div><div className={styles.reservation}><span>Traslado al aeropuerto<small>Servicio programado</small></span><em>Confirmada</em></div><div className={styles.reservation}><span>Traslado privado<small>Solicitud recibida</small></span><em>Pendiente</em></div></div>
          <div className={styles.panel}><b>Detalle de solicitud</b><div className={styles.detailTitle}>Reserva de traslado</div><div className={styles.fakeLines}><i /><i /><i /></div><div className={styles.detailStatus}>Información del servicio</div></div>
        </div> : <div className={styles.dashboardLayout}>
          <div className={styles.panel}><b>{kind === "operations" ? "Servicios registrados" : kind === "laboratory" ? "En el laboratorio" : "Actividad reciente"}</b><p>{kind === "operations" ? "Seguimiento de la operación" : kind === "laboratory" ? "Recepciones y próximos servicios" : "Resumen del trabajo del equipo"}</p>
            {kind === "laboratory" ? <div className={styles.taskList}><div><i />Recepción de equipos<span>En revisión</span></div><div><i />Servicio de calibración<span>En proceso</span></div></div> : <div className={styles.chart}><span /><span /><span /><span /><span /><span /><span /></div>}
          </div>
          <div className={styles.panel}><b>{kind === "operations" ? "Estado de servicios" : kind === "laboratory" ? "Acciones rápidas" : "Solicitudes"}</b><p>Seguimiento general</p><div className={styles.miniRows}><div><i />{kind === "operations" ? "En curso" : "En seguimiento"}<span /></div><div><i />{kind === "laboratory" ? "Nuevo servicio" : "Completadas"}<span /></div><div><i />{kind === "operations" ? "Por revisar" : "Por revisar"}<span /></div></div></div>
        </div>}
      </div>
    </div>
  </div>;
}

export default function ProjectPreview({ variant }: { variant: PreviewKind }) {
  return <div className={`${styles.stage} ${styles[variant]}`} aria-hidden="true">
    <div className={styles.glow} />
    <div className={styles.window}>
      <div className={styles.windowBar}><span className={styles.windowDots}><i /><i /><i /></span><span>Vista de gestión</span><span className={styles.windowBarEnd}>•••</span></div>
      <WindowContent kind={variant} />
    </div>
    {variant === "vialoop" && <div className={styles.phone}><div className={styles.phoneBar}><span>V</span><b>Vialoop</b><i>☰</i></div><div className={styles.phoneBody}><small>SOPORTE Y OPERACIÓN</small><strong>Solicitudes</strong><p>Tu trabajo, en un solo lugar.</p><div><span>En seguimiento</span><b>6</b></div><div><span>Completadas</span><b>18</b></div></div></div>}
  </div>;
}
