import type { Metadata } from "next";
import Image from "next/image";
import HomeAtmosphere from "@/components/HomeAtmosphere";
import ContactForm from "@/components/contact/ContactForm";
import ConnectionStudio from "@/components/software/ConnectionStudio";
import ProjectPreview from "@/components/software/ProjectPreview";
import LandingReveal from "@/components/web-design/LandingReveal";
import { softwareProjects } from "@/lib/software-projects";
import homeStyles from "@/app/page.module.css";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Desarrollo de software a medida para empresas",
  description: "Creamos software a medida para conectar procesos, equipos y datos. Conoce nuestros proyectos de gestión y reservas en línea.",
  alternates: { canonical: "/software-a-medida" },
  openGraph: {
    title: "Software que se adapta a tu empresa | Vialoop",
    description: "Software de gestión, automatización y soluciones conectadas con la forma de trabajar de tu empresa.",
    url: "/software-a-medida",
    locale: "es_CL",
    type: "website",
  },
};

const capabilities = [
  {
    title: "Operación conectada",
    text: "Organiza servicios, tareas, responsables y avances en un espacio construido alrededor de tu trabajo.",
    icon: "operation",
  },
  {
    title: "Información a mano",
    text: "Reúne antecedentes, documentos e historial para que cada área encuentre lo que necesita.",
    icon: "information",
  },
  {
    title: "Procesos que avanzan",
    text: "Automatiza pasos repetitivos y evalúa conexiones con las herramientas que tu empresa utiliza.",
    icon: "automation",
  },
];

const questions = [
  {
    q: "¿El software se adapta a nuestra forma de trabajar?",
    a: "Sí. Partimos por conocer tus procesos, las personas que lo usarán y la información que necesitan. Con eso definimos el alcance y las funciones de la solución.",
  },
  {
    q: "¿Puedo comenzar con una necesidad puntual?",
    a: "Sí. Podemos partir con un proceso o conjunto de funciones definido y evaluar nuevas etapas según las prioridades y necesidades de tu empresa.",
  },
  {
    q: "¿Se puede conectar con otras herramientas?",
    a: "Podemos evaluar integraciones con plataformas, servicios de pago u otras herramientas, según las posibilidades técnicas, accesos y condiciones de cada proveedor.",
  },
  {
    q: "¿El software puede usarse desde el celular?",
    a: "Podemos adaptar la experiencia para computadores, tablets y celulares, según el uso y el alcance que se acuerde para el proyecto.",
  },
  {
    q: "¿Cuánto cuesta y cuánto tarda?",
    a: "Depende de los procesos, funciones e integraciones que necesites. Después de conocer tu proyecto preparamos una propuesta con su alcance, inversión y plazo estimado.",
  },
];

function CapabilityIcon({ type }: { type: string }) {
  if (type === "operation") return <svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><rect x="4.5" y="5" width="9" height="9" rx="2" /><rect x="18.5" y="18" width="9" height="9" rx="2" /><path d="M18.5 9.5h3a2 2 0 0 1 2 2V14M13.5 22.5h-3a2 2 0 0 1-2-2V18" /></svg>;
  if (type === "information") return <svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><rect x="6" y="4.5" width="20" height="23" rx="3" /><path d="M11 11h10M11 16h10M11 21h6" /></svg>;
  return <svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><circle cx="16" cy="16" r="10.5" /><path d="m13 20 7-8h-5l1-4-5 8h4l-2 4Z" /></svg>;
}

export default function SoftwarePage() {
  return <main className={homeStyles.home + " " + styles.page}>
    <HomeAtmosphere />
    <section className={styles.hero} aria-labelledby="software-title">
      <div className={styles.container}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}><span className={styles.statusDot} /> SOFTWARE A MEDIDA · VIALOOP</p>
          <h1 id="software-title">Tu forma de trabajar.<br /><em>Convertida en software.</em></h1>
          <p className={styles.heroLead}>Diseñamos software para conectar tus procesos, tu información y a las personas de tu empresa. Una solución construida para lo que realmente necesitas.</p>
          <div className={styles.actions}>
            <a href="/software-a-medida#contacto" className={styles.primary}>Conversemos de tu software</a>
            <a href="/software-a-medida#soluciones" className={styles.secondary}>Conoce nuestros proyectos</a>
          </div>
          <p className={styles.heroNote}>Desde la primera conversación hasta una herramienta hecha para tu empresa.</p>
        </div>
        <div className={styles.heroStrip} aria-label="Áreas de desarrollo">
          <span>Gestión de procesos</span><span>Automatización</span><span>Reservas y pagos</span><span>Integraciones</span>
        </div>
      </div>
    </section>

    <section className={styles.softwareClients} aria-labelledby="software-clients-title">
      <div className={styles.container}>
        <LandingReveal className={styles.clientsInner}>
          <div className={styles.clientsIntro}><p>CONFIARON EN VIALOOP</p><h2 id="software-clients-title">Empresas con su propia forma de trabajar.</h2></div>
          <div className={styles.clientLogos}>
            {softwareProjects.map(project => <a key={project.id} href={`#${project.id}`} className={styles.clientLogo} aria-label={`Conocer el software de ${project.name}`}>
              <Image src={project.logo} alt={project.name} width={project.logoWidth} height={project.logoHeight} />
            </a>)}
          </div>
        </LandingReveal>
      </div>
    </section>

    <section id="como-ayudamos" className={styles.section} aria-labelledby="capabilities-title">
      <div className={styles.container}>
        <LandingReveal className={styles.sectionHeading}>
          <div><p className={styles.eyebrow}>SOFTWARE PENSADO PARA TU EMPRESA</p><h2 id="capabilities-title">Tu operación tiene su propia lógica.<br /><em>Tu software también.</em></h2></div>
          <p>Cada empresa trabaja distinto. Por eso comenzamos entendiendo lo que haces, para construir una herramienta que acompañe a tu equipo y evolucione contigo.</p>
        </LandingReveal>
        <div className={styles.capabilities}>
          {capabilities.map((item, index) => <LandingReveal key={item.title} delay={index * 80}>
            <article className={styles.capability}><CapabilityIcon type={item.icon} /><h3>{item.title}</h3><p>{item.text}</p></article>
          </LandingReveal>)}
        </div>
      </div>
    </section>

    <section id="soluciones" className={styles.section + " " + styles.projectsSection} aria-labelledby="projects-title">
      <div className={styles.container}>
        <LandingReveal className={styles.sectionHeading}>
          <div><p className={styles.eyebrow}>PROYECTOS A MEDIDA</p><h2 id="projects-title">Distintas necesidades.<br /><em>Soluciones propias.</em></h2></div>
          <p>Desde la gestión de servicios hasta las reservas en línea, cada proyecto nace de una forma particular de trabajar.</p>
        </LandingReveal>
        <p className={styles.swipeHint}>Desliza para conocer los proyectos</p>
        <p className={styles.previewNote}>Vistas ilustrativas con datos de ejemplo.</p>
        <div className={styles.caseGrid} aria-label="Proyectos de software">
          {softwareProjects.map((project, index) => <LandingReveal key={project.id} delay={index * 80} className={styles.caseWrap}>
            <article id={project.id} className={styles.case} aria-labelledby={project.id + "-title"}>
              <ProjectPreview variant={project.variant} />
              <div className={styles.caseBody}>
                <p className={styles.caseCategory}>{project.category}</p>
                <h3 id={project.id + "-title"}>{project.name}</h3>
                <p className={styles.caseTitle}>{project.title}</p>
                <p className={styles.caseText}>{project.focus}</p>
                <ul className={styles.tags}>{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
              </div>
              <details className={styles.caseDetails}>
                <summary>Conocer el proyecto <span className={styles.plus} aria-hidden="true" /></summary>
                <div><p>{project.description}</p><ul>{project.capabilities.map(capability => <li key={capability}>{capability}</li>)}</ul>
                  {project.website && <a href={project.website} target="_blank" rel="noopener noreferrer">Visitar sitio web</a>}
                </div>
              </details>
            </article>
          </LandingReveal>)}
        </div>
      </div>
    </section>

    <section className={styles.section + " " + styles.ownSection} aria-labelledby="own-software-title">
      <div className={styles.container + " " + styles.ownLayout}>
        <LandingReveal className={styles.ownCopy}>
          <p className={styles.eyebrow}>HECHO Y UTILIZADO POR VIALOOP</p>
          <h2 id="own-software-title">También trabajamos con<br /><em>nuestro propio software.</em></h2>
          <p>Desarrollamos una herramienta para organizar nuestra gestión, hacer seguimiento a proyectos y atender las solicitudes de nuestros clientes.</p>
          <p>Conocemos de cerca el valor de tener la información y el trabajo del equipo conectados en un mismo lugar.</p>
          <div className={styles.ownTags}><span>Clientes y proyectos</span><span>Seguimiento</span><span>Soporte</span></div>
        </LandingReveal>
        <LandingReveal motion="focus" delay={100} className={styles.ownVisual}><ProjectPreview variant="vialoop" /><p>Vista ilustrativa con datos de ejemplo.</p></LandingReveal>
      </div>
    </section>

    <section id="explora" className={styles.section + " " + styles.exploreSection} aria-labelledby="explore-title">
      <div className={styles.container}>
        <LandingReveal className={styles.sectionHeading}>
          <div><p className={styles.eyebrow}>UNA IDEA EN MOVIMIENTO</p><h2 id="explore-title">Mira cómo podría<br /><em>conectarse tu trabajo.</em></h2></div>
          <p>Elige un proceso y explora cómo una herramienta a medida puede relacionar la información que tu equipo utiliza cada día.</p>
        </LandingReveal>
        <LandingReveal motion="focus" delay={100}><ConnectionStudio /></LandingReveal>
      </div>
    </section>

    <section className={styles.section + " " + styles.methodSection} aria-labelledby="method-title">
      <div className={styles.container}>
        <LandingReveal className={styles.sectionHeading}>
          <div><p className={styles.eyebrow}>UN PROCESO CLARO</p><h2 id="method-title">Primero escuchamos.<br /><em>Después construimos.</em></h2></div>
          <p>Te acompañamos para transformar una necesidad concreta en una solución útil para tu empresa y tu equipo.</p>
        </LandingReveal>
        <div className={styles.steps}>
          <LandingReveal><article><span className={styles.stepMark} aria-hidden="true" /><h3>Conocemos tu trabajo</h3><p>Conversamos sobre los procesos, las personas y los desafíos que quieres resolver.</p></article></LandingReveal>
          <LandingReveal delay={80}><article><span className={styles.stepMark} aria-hidden="true" /><h3>Definimos una solución</h3><p>Ordenamos funciones y prioridades para preparar una propuesta con un alcance claro.</p></article></LandingReveal>
          <LandingReveal delay={160}><article><span className={styles.stepMark} aria-hidden="true" /><h3>Desarrollamos contigo</h3><p>Compartimos avances y revisamos el funcionamiento de acuerdo con las etapas definidas.</p></article></LandingReveal>
        </div>
      </div>
    </section>

    <section className={styles.section} aria-labelledby="faq-title">
      <div className={styles.container + " " + styles.faqLayout}>
        <LandingReveal className={styles.faqIntro}><p className={styles.eyebrow}>ANTES DE COMENZAR</p><h2 id="faq-title">Hablemos con<br /><em>las cosas claras.</em></h2><p>Algunas preguntas para dar el primer paso hacia tu software.</p><a href="/software-a-medida#contacto" className={styles.secondary}>Tengo otra consulta</a></LandingReveal>
        <LandingReveal motion="right" delay={100} className={styles.faqList}>{questions.map(item => <details key={item.q} name="software-faq"><summary>{item.q}<span className={styles.plus} aria-hidden="true" /></summary><p>{item.a}</p></details>)}</LandingReveal>
      </div>
    </section>

    <LandingReveal><ContactForm embedded initialService="sistema" /></LandingReveal>
  </main>;
}
