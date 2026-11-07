"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import useScrollReveal from "./useScrollReveal";
import styles from "./Studio.module.css";
const projects = [
  {
    name: "RyF Group",
    type: "Minería y servicios industriales",
    description: "Una presentación corporativa a la altura de su operación.",
    image: "/portfolio/ryf-group.webp",
    href: "https://ryfgroup.cl/",
  },
  {
    name: "Transportes San Andrés",
    type: "Transporte de pasajeros",
    description: "Servicios, cobertura y contacto en una experiencia clara.",
    image: "/portfolio/transportes-san-andres.webp",
    href: "https://www.transportesanandres.cl/",
  },
  {
    name: "Martín Atacama Transfers",
    type: "Reservas y pagos en línea",
    description: "Un recorrido conectado desde la reserva hasta el pago.",
    image: "/portfolio/trabajo_realizado_martin_atacama_transfers_600px.webp",
    href: "https://transferatacamachile.cl/",
  },
];
export default function FeaturedProjects() {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);
  return (
    <section
      ref={ref}
      className={styles.projects}
      aria-labelledby="projects-title"
    >
      <div className={styles.container}>
        <div className={styles.sectionHead} data-scroll-reveal>
          <div>
            <p className={styles.eyebrow}>TRABAJO CON CONTEXTO</p>
            <h2 id="projects-title">
              Cada proyecto,
              <br />
              <em>una forma de hacer.</em>
            </h2>
          </div>
          <Link href="/portafolio-web" className={styles.lightTextLink}>
            Ver el portafolio completo
          </Link>
        </div>
        <div className={styles.projectGrid}>
          {projects.map((project, index) => (
            <a
              key={project.name}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.case}
              data-scroll-reveal
              data-scroll-delay={index * 70}
            >
              <div className={styles.caseImage}>
                <Image
                  src={project.image}
                  alt={`Diseño web de ${project.name}`}
                  fill
                  sizes="(min-width:1000px) 380px,(min-width:650px) 45vw,90vw"
                />
                <span>Explorar proyecto</span>
              </div>
              <p className={styles.caseType}>{project.type}</p>
              <h3>{project.name}</h3>
              <p className={styles.caseDescription}>{project.description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
