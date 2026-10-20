import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import SoftwareMockup from "@/components/SoftwareMockup";
import { softwareProjects } from "@/lib/software-projects";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Software y sistemas a medida para empresas",
  description: "Desarrollo de software para conectar procesos, documentos y equipos de trabajo. Conoce sistemas de gestión, reservas en línea y pagos integrados con Flow.",
  alternates: { canonical: "/software-a-medida" },
  openGraph: {
    title: "Software que se adapta a tu empresa | Vialoop",
    description: "Sistemas de gestión, plataformas operativas y automatización de procesos a medida.",
    url: "/software-a-medida",
    locale: "es_CL",
    type: "website",
  },
};

const capabilities = [
  { number: "01", title: "Gestión de la operación", text: "Solicitudes, órdenes, tareas y responsables conectados en un flujo de trabajo." },
  { number: "02", title: "Documentos e historial", text: "Registros, certificados y antecedentes relacionados con cada cliente, equipo o servicio." },
  { number: "03", title: "Información para decidir", text: "Consultas, reportes y seguimiento según lo que cada área necesita revisar." },
  { number: "04", title: "Automatización a medida", text: "Menos tareas repetidas y una mejor conexión entre las herramientas de la empresa." },
];

export default function SoftwarePage() {
  return (
    <>
      <main className={styles.page}>
        <section className={styles.hero} aria-labelledby="software-title">
          <div className={styles.container}>
            <p className={styles.eyebrow}>VIALOOP <span aria-hidden="true">/</span> SOFTWARE A MEDIDA</p>
            <div className={styles.heroGrid}>
              <Reveal>
                <h1 id="software-title">La forma en que trabajas.<br /><em>Convertida en software.</em></h1>
                <p className={styles.heroLead}>Diseñamos sistemas alrededor de los procesos de tu empresa. Para conectar a las personas, ordenar la información y dar continuidad a cada tarea.</p>
                <div className={styles.actions}>
                  <Link href="/contacto?servicio=sistema" className={styles.primaryButton}>Conversemos sobre tu sistema </Link>
                  <Link href="#soluciones" className={styles.secondaryButton}>Conocer las soluciones </Link>
                </div>
              </Reveal>
              <Reveal delay={180}><div className={styles.concept} aria-hidden="true">
                <div className={styles.conceptRing} />
                <div className={styles.conceptCore}><span>HECHO A MEDIDA</span><strong>Tu operación,<br />conectada.</strong><i /></div>
                <div className={`${styles.conceptTag} ${styles.people}`}>Personas</div>
                <div className={`${styles.conceptTag} ${styles.processes}`}>Procesos</div>
                <div className={`${styles.conceptTag} ${styles.information}`}>Información</div>
                <p>Un mismo entorno de trabajo.</p>
              </div></Reveal>
            </div>
            <div className={styles.heroBottom}><span>PLATAFORMAS DE GESTIÓN</span><span>AUTOMATIZACIÓN</span><span>DESARROLLO A MEDIDA</span></div>
          </div>
        </section>

        <section id="soluciones" className={styles.solutions} aria-labelledby="solutions-title">
          <div className={styles.container}>
            <Reveal className={styles.sectionHeading}>
              <div><p className={styles.eyebrow}>SOFTWARE CON CONTEXTO</p><h2 id="solutions-title">Cada empresa tiene<br /><span>su propia lógica.</span></h2></div>
              <p>Estos proyectos muestran cómo abordamos necesidades concretas de gestión. El punto de partida es siempre el mismo: entender el trabajo de la empresa y construir alrededor de él.</p>
            </Reveal>

            <div className={styles.caseList}>
              {softwareProjects.map((project) => (
                <Reveal key={project.id}>
                  <article id={project.id} className={styles.case} aria-labelledby={`${project.id}-title`}>
                    <div className={styles.caseContent}>
                      <div className={styles.caseBrand}>
                        <Image className={project.variant !== "operations" ? styles.caseLogoGm : styles.caseLogo} src={project.logo} alt={`Logotipo de ${project.name}`} width={project.logoWidth} height={project.logoHeight} sizes={project.variant !== "operations" ? "48px" : "115px"} />
                        <div><p className={styles.caseCategory}>{project.category}</p><h3 id={`${project.id}-title`}>{project.name}</h3></div>
                      </div>
                      <p className={styles.caseTitle}>{project.title}</p>
                      <p className={styles.caseDescription}>{project.description}</p>
                      <ul className={styles.moduleList}>{project.capabilities.map((item) => <li key={item}>{item}</li>)}</ul>
                      <div className={styles.focus}><span>ENFOQUE DEL SISTEMA</span><div><p>{project.focus}</p>{project.website && <a href={project.website} className={styles.caseWebsite} target="_blank" rel="noopener noreferrer">Visitar sitio web</a>}</div></div>
                    </div>
                    <div className={styles.systemPreview}>
                      <SoftwareMockup variant={project.variant} />
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.capabilities} aria-labelledby="capabilities-title">
          <div className={styles.container}>
            <Reveal className={styles.sectionHeading}>
              <div><p className={styles.eyebrow}>QUÉ PODEMOS CONECTAR</p><h2 id="capabilities-title">Del proceso de cada día<br /><span>a una herramienta útil.</span></h2></div>
              <p>El alcance se define contigo. Podemos abordar una necesidad puntual o conectar distintas áreas en una plataforma que evolucione con tu empresa.</p>
            </Reveal>
            <div className={styles.capabilityGrid}>{capabilities.map((item) => (
              <Reveal key={item.number} delay={Number(item.number) * 60}><div className={styles.capability}><span>{item.number}</span><h3>{item.title}</h3><p>{item.text}</p></div></Reveal>
            ))}</div>
          </div>
        </section>

        <section className={styles.method} aria-labelledby="method-title">
          <div className={styles.container}>
            <Reveal>
              <p className={styles.eyebrow}>CÓMO LO ABORDAMOS</p>
              <h2 id="method-title">Primero entendemos.<br /><span>Después desarrollamos.</span></h2>
              <ol className={styles.steps}>
                <li><span>01</span><h3>Conocemos el proceso</h3><p>Revisamos cómo trabajan, qué información utilizan y dónde se producen las dificultades.</p></li>
                <li><span>02</span><h3>Definimos la solución</h3><p>Acordamos funciones, prioridades y alcance para que la propuesta responda a una necesidad concreta.</p></li>
                <li><span>03</span><h3>Desarrollamos y validamos</h3><p>Presentamos avances, revisamos el uso con el equipo y ajustamos los flujos definidos.</p></li>
              </ol>
            </Reveal>
          </div>
        </section>

        <section className={styles.contact} aria-labelledby="software-contact-title">
          <Reveal className={`${styles.container} ${styles.contactInner}`}>
            <div><p className={styles.eyebrow}>HABLEMOS DE TU OPERACIÓN</p><h2 id="software-contact-title">¿Qué proceso necesitas<br /><span>ordenar o simplificar?</span></h2><p>Cuéntanos cómo lo resuelven hoy y qué les gustaría mejorar.</p></div>
            <Link href="/contacto?servicio=sistema" className={styles.primaryButton}>Cuéntanos tu proyecto </Link>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
