import Link from "next/link";
import Reveal from "@/components/Reveal";
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

      </div>
    </section>
  );
}
