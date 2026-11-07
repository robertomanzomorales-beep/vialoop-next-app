import type { Metadata } from "next";
import Link from "next/link";
import HomeAtmosphere from "@/components/HomeAtmosphere";
import ClientsLoop from "@/components/ClientsLoop";
import Testimonials from "@/components/Testimonials";
import ClientTestimonial from "@/components/ClientTestimonial";
import ContactForm from "@/components/contact/ContactForm";
import Reveal from "@/components/Reveal";
import WebProjects, { BrowserPreview } from "@/components/web-design/WebProjects";
import { recentWebProjects } from "@/lib/web-design-projects";
import styles from "@/components/web-design/WebDesign.module.css";

export const metadata: Metadata = {
  title: "Diseño web para empresas en Chile",
  description: "Diseñamos tu sitio web y te acompañamos desde la idea hasta la publicación. Dominio .cl y hosting por un año. Conoce nuestros últimos trabajos.",
  alternates: { canonical: "/diseno-web" },
  openGraph: { title: "Tu próxima web, con Vialoop", description: "Diseño web con identidad, acompañamiento y proyectos reales. Incluye dominio .cl y hosting por un año.", url: "/diseno-web", locale: "es_CL", type: "website", images: [{url:"/projects/promaq.webp",width:1280,height:773,alt:"Diseño web realizado por Vialoop para PROMAQ"}] },
};

const questions = [
  { q: "¿Qué incluye el diseño de mi sitio web?", a: "Diseñamos y desarrollamos una web adaptada a tu empresa y a dispositivos móviles. Incluimos un dominio .cl y hosting por un año. Las secciones, funciones y contenidos se acuerdan en la propuesta, para que sepas qué recibirás antes de comenzar." },
  { q: "¿Me acompañan si no sé por dónde empezar?", a: "Sí. Conversamos sobre tu empresa, tus servicios y lo que quieres comunicar. Te orientamos para ordenar la información, elegir las secciones y revisar el diseño antes de publicar." },
  { q: "¿Cómo funciona el dominio .cl y el hosting por un año?", a: "Te ayudamos a elegir un nombre .cl disponible y a poner tu sitio en línea. El dominio y el alojamiento están incluidos durante el primer año. Antes de la renovación te informamos su valor y las opciones para continuar." },
  { q: "¿Qué información tengo que entregar?", a: "Idealmente, tu logotipo, una descripción de tu empresa, servicios, datos de contacto y fotografías que tengas autorización para usar. Revisamos contigo lo que falta. Si necesitas producción de contenido o fotografía, lo evaluamos en la propuesta." },
  { q: "¿La página se verá bien en celulares?", a: "Sí. Adaptamos el diseño, la navegación y los formularios para móviles, tablets y computadores, y revisamos su funcionamiento antes de publicar." },
  { q: "¿Puedo renovar un sitio que ya tengo?", a: "Sí. Revisamos tu web actual, el dominio y los contenidos que quieres conservar. Con esa información definimos el rediseño y coordinamos la publicación." },
  { q: "¿Puedo revisar el diseño antes de publicarlo?", a: "Sí. Compartimos avances y revisamos contigo el diseño y los contenidos. Las etapas y rondas de ajustes quedan definidas en la propuesta del proyecto." },
  { q: "¿Cuánto cuesta y cuánto tarda el proyecto?", a: "Depende de las secciones, funciones y contenidos que necesite tu empresa. Cuéntanos tu idea en el formulario: te responderemos con una propuesta que detalle el alcance, valor y plazo estimado." },
];

function DetailIcon({ kind }: { kind: "design" | "mobile" | "support" }) {
  return <svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><rect x="4" y="5" width="24" height="22" rx="4" stroke="currentColor" strokeWidth="1.4" />{kind === "design" ? <><path d="M4 12h24M11 12v15M16 17h7M16 22h5" stroke="currentColor" strokeWidth="1.4" /><circle cx="8" cy="8.5" r=".8" fill="currentColor" /></> : kind === "mobile" ? <><rect x="12" y="9" width="9" height="15" rx="2" stroke="currentColor" strokeWidth="1.4" /><path d="M15 21h3" stroke="currentColor" strokeWidth="1.4" /></> : <><path d="m10 16 4 4 8-8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></>}</svg>;
}

export default function WebDesignPage() {
  return <main className={styles.page}>
    <HomeAtmosphere />
    <section className={styles.hero} aria-labelledby="web-design-title">
      <div className={`${styles.container} ${styles.heroGrid}`}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}><span className={styles.statusDot} /> DISEÑO WEB · VIALOOP</p>
          <h1 id="web-design-title">Tu empresa tiene mucho que mostrar.<br /><em>Que tu web lo diga.</em></h1>
          <p className={styles.heroLead}>Diseñamos una presencia digital con identidad, clara y hecha para conectar con tus próximos clientes. Te acompañamos desde la primera idea hasta verla en línea.</p>
          <div className={styles.actions}><Link href="#contacto" className={styles.primary}>Conversemos de tu web</Link><Link href="#trabajos" className={styles.secondary}>Explorar trabajos</Link></div>
          <p className={styles.included}><span aria-hidden="true">✓</span> Dominio <strong>.cl</strong> y hosting incluidos por <strong>1 año.</strong></p>
        </div>
        <div className={styles.heroStage}>
          <div className={styles.stageGlow} aria-hidden="true" />
          <div className={styles.heroBack}><BrowserPreview project={recentWebProjects[8]} hero /></div>
          <div className={styles.heroFront}><BrowserPreview project={recentWebProjects[0]} hero /></div>
          <div className={styles.stageCaption}><span className={styles.statusDot} /><span>Proyectos reales.<br /><strong>Una identidad en cada detalle.</strong></span></div>
        </div>
      </div>
      <div className={`${styles.container} ${styles.valueStrip}`}><span>Diseño con identidad</span><span>Experiencia móvil</span><span>Acompañamiento cercano</span><span>Desde Calama, para todo Chile</span></div>
    </section>
    <WebProjects />
    <ClientsLoop />
    <section className={styles.section} aria-labelledby="web-includes-title">
      <div className={styles.container}>
        <Reveal className={styles.sectionHeading}><div><p className={styles.eyebrow}>MUCHO MÁS QUE ESTAR EN INTERNET</p><h2 id="web-includes-title">Una web con intención.<br /><em>Un proceso contigo.</em></h2></div><p>Tu sitio debe comunicar lo que haces, facilitar el contacto y sentirse propio. Nos ocupamos del diseño y de los detalles para ponerlo en marcha.</p></Reveal>
        <div className={styles.benefits}>
          {[{kind:"design" as const,title:"Diseñada alrededor de tu empresa",text:"Ordenamos tus servicios y contenidos con una identidad visual coherente y una navegación clara."},{kind:"mobile" as const,title:"Cuidada en cada pantalla",text:"Una experiencia adaptada a celulares y computadores, con contacto siempre a mano."},{kind:"support" as const,title:"Acompañamiento hasta publicar",text:"Te guiamos con los contenidos, revisamos los avances contigo y coordinamos la puesta en línea."}].map(item => <Reveal key={item.kind}><article><DetailIcon kind={item.kind} /><h3>{item.title}</h3><p>{item.text}</p></article></Reveal>)}
        </div>
        <div className={styles.launch}><div><p className={styles.eyebrow}>TODO LISTO PARA COMENZAR</p><h3>Tu dirección. Tu espacio. <em>Tu nueva web.</em></h3><p>Te ayudamos a elegir tu dominio y dejamos tu sitio publicado.</p></div><div className={styles.launchOffer}><strong>.cl <span>+</span> hosting</strong><span>Incluidos durante el primer año</span></div></div>
      </div>
    </section>
    <Testimonials />
    <ClientTestimonial />
    <section className={styles.section} aria-labelledby="web-faq-title">
      <div className={`${styles.container} ${styles.faqLayout}`}>
        <div className={styles.faqIntro}><p className={styles.eyebrow}>ANTES DE DAR EL PASO</p><h2 id="web-faq-title">Hablemos con<br /><em>las cosas claras.</em></h2><p>Estas son algunas de las preguntas que nos hacen al comenzar una web.</p><Link href="#contacto" className={styles.secondary}>Tengo otra consulta</Link></div>
        <div className={styles.faqList}>{questions.map(item => <details key={item.q} name="web-faq"><summary>{item.q}<span className={styles.plus} aria-hidden="true" /></summary><p>{item.a}</p></details>)}</div>
      </div>
    </section>
    <ContactForm embedded initialService="web" />
  </main>;
}
