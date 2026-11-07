import Image from "next/image";
import { moreWebProjects, recentWebProjects, type WebProject } from "@/lib/web-design-projects";
import styles from "./WebDesign.module.css";

export function BrowserPreview({ project, hero = false }: { project: WebProject; hero?: boolean }) {
  return <div className={styles.browser}>
    <div className={styles.browserBar} aria-hidden="true"><span className={styles.browserDots}><i /><i /><i /></span><span>{new URL(project.href).hostname.replace(/^www\./, "")}</span><span className={styles.secure} /></div>
    <div className={styles.previewImage}><Image src={project.image} alt={`Vista del sitio web de ${project.name}`} width={1280} height={773} sizes={hero ? "(max-width: 700px) 90vw, 650px" : "(max-width: 700px) 94vw, 580px"} loading={hero ? "eager" : "lazy"} /></div>
  </div>;
}

function Project({ project, featured = false }: { project: WebProject; featured?: boolean }) {
  return <article className={`${styles.project} ${featured ? styles.featuredProject : ""}`}>
    <a href={project.href} target="_blank" rel="noopener noreferrer" className={styles.projectVisual} aria-label={`Visitar el sitio web de ${project.name} (abre en otra pestaña)`}><BrowserPreview project={project} /></a>
    <div className={styles.projectInfo}>
      <div><p className={styles.projectType}>{project.type}</p><h3>{project.name}</h3>{featured && <p className={styles.featuredDescription}>{project.description}</p>}</div>
      <a href={project.href} target="_blank" rel="noopener noreferrer" className={styles.visit} aria-label={`Visitar ${project.name} (abre en otra pestaña)`}>Visitar sitio</a>
    </div>
  </article>;
}

export default function WebProjects() {
  return <section id="trabajos" className={`${styles.section} ${styles.workSection}`} aria-labelledby="web-projects-title">
    <div className={styles.container}>
      <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>DISEÑO QUE YA ESTÁ EN LÍNEA</p><h2 id="web-projects-title">Cada empresa, <em>su propia web.</em></h2></div><p>Una selección de nuestros últimos trabajos. Explora los sitios y conoce cómo presentamos negocios de distintos rubros.</p></div>
      <div className={styles.projectGrid}>
        {recentWebProjects.map((project, index) => <Project key={project.href} project={project} featured={index === 0} />)}
      </div>
      <details className={styles.moreProjects}>
        <summary><span>Más proyectos de Vialoop<small>{moreWebProjects.length} sitios para seguir explorando</small></span><span className={styles.plus} aria-hidden="true" /></summary>
        <div className={styles.archiveGrid}>{moreWebProjects.map(project => <Project key={project.href} project={project} />)}</div>
      </details>
    </div>
  </section>;
}
