import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { softwareProjects } from "@/lib/software-projects";
import styles from "./SystemsSection.module.css";

export default function SystemsSection() {
  return (
    <section id="sistemas-para-empresas" className={styles.section} aria-labelledby="systems-title">
      <div className={styles.container}>
        <Reveal className={styles.intro}>
          <div>
            <p className={styles.eyebrow}><span /> SOFTWARE A MEDIDA</p>
            <h2 id="systems-title">Tu forma de trabajar.<br /><span>Un sistema que la entiende.</span></h2>
          </div>
          <div className={styles.description}>
            <p>Convertimos procesos, planillas y documentos en herramientas de gestión. Desarrollamos software alrededor de tu operación, tus equipos y la información que necesitas tener a mano.</p>
            <Link href="/software-a-medida" className={styles.textLink}>Conoce nuestro desarrollo de software <span aria-hidden="true">↗</span></Link>
          </div>
        </Reveal>
        <div className={styles.projects}>
          {softwareProjects.map((project) => (
            <Reveal key={project.id}>
              <Link href={`/software-a-medida#${project.id}`} className={styles.project}>
                <div className={`${styles.logo} ${project.id === "gm-especialistas" ? styles.gmLogo : ""}`}>
                  <Image src={project.logo} alt={project.name} width={project.logoWidth} height={project.logoHeight} sizes="150px" />
                </div>
                <div className={styles.projectCopy}>
                  <span>{project.category}</span>
                  <h3>{project.name}</h3>
                  <p>{project.id === "rerchar" ? "Gestión comercial, operación y trazabilidad de materiales." : "Equipos, órdenes de trabajo y documentación técnica."}</p>
                </div>
                <span className={styles.arrow} aria-hidden="true">↗</span>
              </Link>
            </Reveal>
          ))}
        </div>
        <p className={styles.footnote}>Distintas empresas. Distintos procesos. Desarrollo pensado para cada una.</p>
      </div>
    </section>
  );
}
