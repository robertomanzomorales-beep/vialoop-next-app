import type { Metadata } from "next";
import HomeAtmosphere from "@/components/HomeAtmosphere";
import ClientsLoop from "@/components/ClientsLoop";
import ContactForm from "@/components/contact/ContactForm";
import LandingReveal from "@/components/web-design/LandingReveal";
import WebDesignStory from "@/components/web-design/WebDesignStory";
import WebTestimonials from "@/components/web-design/WebTestimonials";
import MobileWebShowcase from "@/components/web-design/MobileWebShowcase";
import WebProjects from "@/components/web-design/WebProjects";
import styles from "@/components/web-design/WebDesign.module.css";
import homeStyles from "@/app/page.module.css";

export const metadata: Metadata = {
  title: "Diseño web para empresas en Chile",
  description: "Diseñamos tu sitio web y te acompañamos desde la idea hasta la publicación. Propuestas a medida y proyectos reales. Conoce nuestros últimos trabajos.",
  alternates: { canonical: "/diseno-web" },
  openGraph: { title: "Tu próxima web, con Vialoop", description: "Diseño web con identidad, acompañamiento y proyectos reales. Alcance y publicación definidos para cada proyecto.", url: "/diseno-web", locale: "es_CL", type: "website", images: [{url:"/projects/promaq.webp",width:1280,height:773,alt:"Diseño web realizado por Vialoop para PROMAQ"}] },
};

const questions = [
  { q: "¿Qué incluye el diseño de mi sitio web?", a: "Diseñamos y desarrollamos una web adaptada a tu empresa y a dispositivos móviles. Las secciones, funciones, contenidos y servicios de publicación se acuerdan en la propuesta, para que sepas qué recibirás antes de comenzar." },
  { q: "¿Me acompañan si no sé por dónde empezar?", a: "Sí. Conversamos sobre tu empresa, tus servicios y lo que quieres comunicar. Te orientamos para ordenar la información, elegir las secciones y revisar el diseño antes de publicar." },
  { q: "¿Pueden ayudarme con el dominio y el hosting?", a: "Te ayudamos a elegir un nombre .cl disponible y a poner tu sitio en línea. La contratación, la capacidad de alojamiento y las condiciones de renovación se especifican en tu propuesta." },
  { q: "¿Qué información tengo que entregar?", a: "Idealmente, tu logotipo, una descripción de tu empresa, servicios, datos de contacto y fotografías que tengas autorización para usar. Revisamos contigo lo que falta. Si necesitas producción de contenido o fotografía, lo evaluamos en la propuesta." },
  { q: "¿La página se verá bien en celulares?", a: "Sí. Adaptamos el diseño, la navegación y los formularios para móviles, tablets y computadores, y revisamos su funcionamiento antes de publicar." },
  { q: "¿Puedo renovar un sitio que ya tengo?", a: "Sí. Revisamos tu web actual, el dominio y los contenidos que quieres conservar. Con esa información definimos el rediseño y coordinamos la publicación." },
  { q: "¿Puedo revisar el diseño antes de publicarlo?", a: "Sí. Compartimos avances y revisamos contigo el diseño y los contenidos. Las etapas y rondas de ajustes quedan definidas en la propuesta del proyecto." },
  { q: "¿Cuánto cuesta y cuánto tarda el proyecto?", a: "Depende de las secciones, funciones y contenidos que necesite tu empresa. Cuéntanos tu idea en el formulario: te responderemos con una propuesta que detalle el alcance, valor y plazo estimado." },
];

export default function WebDesignPage() {
  return <main className={`${homeStyles.home} ${styles.page}`}>
    <HomeAtmosphere />
    <section className={styles.hero} aria-labelledby="web-design-title">
      <div className={styles.container}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}><span className={styles.statusDot} /> DISEÑO WEB · VIALOOP</p>
          <h1 id="web-design-title">Tu empresa tiene mucho que mostrar.<br /><em>Que tu web lo diga.</em></h1>
          <p className={styles.heroLead}>Diseñamos una presencia digital con identidad, clara y hecha para conectar con tus próximos clientes. Te acompañamos desde la primera idea hasta verla en línea.</p>
          <div className={styles.actions}><a href="/diseno-web#contacto" className={styles.primary}>Conversemos de tu web</a><a href="/diseno-web#tu-nueva-web" className={styles.secondary}>Conoce la experiencia</a></div>
          <p className={styles.included}>Dominio, hosting y publicación según las necesidades de tu proyecto.</p>
        </div>
      </div>
    </section>
    <ClientsLoop appearance="landing" />
    <WebDesignStory />
    <WebProjects />
    <WebTestimonials />
    <MobileWebShowcase />
    <section className={styles.section} aria-labelledby="web-faq-title">
      <div className={`${styles.container} ${styles.faqLayout}`}>
        <LandingReveal className={styles.faqIntro}><p className={styles.eyebrow}>ANTES DE DAR EL PASO</p><h2 id="web-faq-title">Hablemos con<br /><em>las cosas claras.</em></h2><p>Estas son algunas de las preguntas que nos hacen al comenzar una web.</p><a href="/diseno-web#contacto" className={styles.secondary}>Tengo otra consulta</a></LandingReveal>
        <LandingReveal motion="right" delay={120} className={styles.faqList}>{questions.map(item => <details key={item.q} name="web-faq"><summary>{item.q}<span className={styles.plus} aria-hidden="true" /></summary><p>{item.a}</p></details>)}</LandingReveal>
      </div>
    </section>
    <LandingReveal><ContactForm embedded initialService="web" /></LandingReveal>
  </main>;
}
