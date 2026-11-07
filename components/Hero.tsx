"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import TextReveal from "./TextReveal";
import styles from "./Studio.module.css";
const projects = [
  {
    name: "RyF Group",
    category: "Servicios mineros e industriales",
    image: "/portfolio/ryf-group.webp",
    href: "https://ryfgroup.cl/",
  },
  {
    name: "San Andrés",
    category: "Transporte de pasajeros",
    image: "/portfolio/transportes-san-andres.webp",
    href: "https://www.transportesanandres.cl/",
  },
  {
    name: "Transfer Atacama",
    category: "Reservas y pagos en línea",
    image: "/portfolio/trabajo_realizado_martin_atacama_transfers_600px.webp",
    href: "https://transferatacamachile.cl/",
  },
];
export default function Hero() {
  const [active, setActive] = useState(0);
  const project = projects[active];
  return (
    <section id="inicio" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.heroMesh} aria-hidden="true" />
      <div className={`${styles.container} ${styles.heroInner}`}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>ESTUDIO DIGITAL · CALAMA, CHILE</p>
          <h1 id="hero-title">
            <TextReveal text="Diseño web y software" />
            <br />
            <TextReveal text="a medida para tu empresa." italic />
          </h1>
          <p className={styles.heroLead}>
            Una presencia digital que te represente. Un software que haga más
            simple tu operación. Diseño y desarrollo, con la misma atención al
            detalle.
          </p>
          <div className={styles.actions}>
            <Link href="/portafolio-web" className={styles.primary}>
              Conoce nuestro trabajo
            </Link>
            <Link href="/software-a-medida" className={styles.secondary}>
              Software a medida
            </Link>
          </div>
          <Link href="/contacto" className={styles.textLink}>
            Conversemos de tu próximo proyecto
          </Link>
          <div className={styles.heroSignature}>
            <span>Desde el norte.</span>
            <span>Para empresas de todo Chile.</span>
          </div>
        </div>
        <div
          className={styles.heroVisual}
          aria-label="Proyectos web desarrollados por Vialoop"
        >
          <div className={styles.projectTop}>
            <span>DISEÑO QUE SE PUEDE EXPLORAR</span>
            <span className={styles.projectDot} aria-hidden="true" />
          </div>
          <a
            className={styles.heroImage}
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visitar ${project.name}`}
          >
            <Image
              key={project.image}
              src={project.image}
              alt={`Sitio web de ${project.name} desarrollado por Vialoop`}
              fill
              sizes="(min-width:1100px) 520px, 80vw"
              loading="lazy"
              className={styles.projectScreenshot}
            />
          </a>
          <div className={styles.heroProjectDetail} aria-live="polite">
            <strong>{project.name}</strong>
            <span>{project.category}</span>
          </div>
          <div className={styles.projectChoices} aria-label="Elegir proyecto">
            {projects.map((item, index) => (
              <button
                type="button"
                key={item.name}
                aria-pressed={active === index}
                onClick={() => setActive(index)}
              >
                {item.name}
              </button>
            ))}
          </div>
          <span className={styles.heroVisualNote}>
            Ideas distintas. La misma dedicación.
          </span>
        </div>
      </div>
    </section>
  );
}
