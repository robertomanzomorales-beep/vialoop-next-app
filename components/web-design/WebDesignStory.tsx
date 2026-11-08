import Image from "next/image";
import LandingReveal from "./LandingReveal";
import styles from "./WebDesignStory.module.css";

const benefits = [
  { title: "Que se entienda lo que haces.", text: "Tus servicios y lo que distingue a tu empresa, presentados con un orden claro." },
  { title: "Que se sienta tu marca.", text: "Una propuesta visual que conecta tu identidad con la forma de mostrar tu negocio." },
  { title: "Que sea fácil dar el siguiente paso.", text: "Navegación simple y contacto a mano, desde el computador o el celular." },
];
const steps = [
  { title: "Lo conversamos.", text: "Conocemos tu empresa, tus servicios y a quién quieres llegar. Te orientamos con los contenidos y definimos el alcance." },
  { title: "Le damos forma.", text: "Ordenamos la información y compartimos una propuesta visual. Revisamos los avances contigo y afinamos los detalles." },
  { title: "Lo ponemos en línea.", text: "Desarrollamos, revisamos en distintas pantallas y coordinamos la publicación de tu nueva web." },
];

export default function WebDesignStory() {
  return <>
    <section id="tu-nueva-web" className={styles.section} aria-labelledby="web-value-title">
      <div className={`${styles.container} ${styles.valueGrid}`}>
        <LandingReveal motion="left">
          <p className={styles.eyebrow}>PRESENCIA DIGITAL CON INTENCIÓN</p>
          <h2 id="web-value-title">Tu próxima primera impresión.<em>A la altura de tu empresa.</em></h2>
          <p className={styles.lead}>Tu web es un espacio para contar quién eres, mostrar lo que haces y abrir nuevas conversaciones. Diseñamos cada parte para que esas tres cosas conecten.</p>
          <div className={styles.benefits}>{benefits.map(item => <div key={item.title}><span aria-hidden="true" /><div><h3>{item.title}</h3><p>{item.text}</p></div></div>)}</div>
          <a href="/diseno-web#contacto" className={styles.textLink}>Conversemos de tu nueva web</a>
        </LandingReveal>
        <LandingReveal motion="right" delay={130} className={styles.visual}>
          <div className={styles.visualLight} aria-hidden="true" />
          <figure className={styles.browser}>
            <div className={styles.browserTop} aria-hidden="true"><span><i /><i /><i /></span><span>ferreteriarioloa.cl</span><span /></div>
            <Image src="/projects/rioloa.webp" alt="Diseño web de Ferretería Río Loa realizado por Vialoop" width={1280} height={773} sizes="(max-width: 700px) 90vw, 590px" />
          </figure>
          <div className={styles.designNotes}><span>Identidad propia.</span><span>Contenido claro.</span><span>Contacto simple.</span></div>
          <p className={styles.visualCaption}>Ferretería Río Loa <span>Diseño y desarrollo · Vialoop</span></p>
        </LandingReveal>
      </div>
    </section>
    <section id="como-trabajamos" className={`${styles.section} ${styles.process}`} aria-labelledby="web-process-title">
      <div className={styles.container}>
        <LandingReveal className={styles.processIntro}><p className={styles.eyebrow}>TE ACOMPAÑAMOS EN EL PROCESO</p><h2 id="web-process-title">De una buena conversación<em>a tu sitio en línea.</em></h2><p>Avanzamos contigo, con una propuesta clara y espacio para revisar cada etapa.</p></LandingReveal>
        <LandingReveal className={styles.journey} delay={100}>
          <div className={styles.journeyLine} aria-hidden="true"><span /></div>
          <div className={styles.steps}>{steps.map(item => <article key={item.title}><span className={styles.stepPoint} aria-hidden="true" /><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
        </LandingReveal>
        <LandingReveal motion="focus" delay={100} className={styles.launch}>
          <div><p className={styles.eyebrow}>UNA BASE LISTA PARA COMENZAR</p><h3>Tu nombre. Tu espacio.<em>Tu nueva web.</em></h3><p>Te orientamos para elegir tu dominio y preparar la puesta en línea.</p></div>
          <div className={styles.launchOffer}><strong>.cl <span>+</span> hosting</strong><span>Definidos en tu propuesta</span></div>
        </LandingReveal>
      </div>
    </section>
  </>;
}
