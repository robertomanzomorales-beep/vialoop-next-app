import type { Metadata } from "next";
import Footer from "@/components/Footer";
import DataRightsForm from "@/components/privacy/DataRightsForm";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Solicitud de derechos sobre datos personales | Vialoop",
  description:
    "Canal de Vialoop Studio SpA para solicitar acceso, rectificación, eliminación, oposición, portabilidad o revocación respecto de datos personales.",
  alternates: {
    canonical: "/solicitud-datos",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const rights = [
  {
    number: "01",
    title: "Acceso",
    text: "Consultar si tratamos datos personales asociados a usted y solicitar información sobre dicho tratamiento.",
  },
  {
    number: "02",
    title: "Rectificación",
    text: "Solicitar la corrección o actualización de datos que sean inexactos, incompletos o desactualizados.",
  },
  {
    number: "03",
    title: "Supresión",
    text: "Solicitar la eliminación de datos cuando corresponda, considerando las obligaciones legales aplicables.",
  },
  {
    number: "04",
    title: "Oposición",
    text: "Solicitar que cese un tratamiento determinado cuando existan fundamentos y resulte legalmente procedente.",
  },
  {
    number: "05",
    title: "Portabilidad",
    text: "Solicitar la entrega o transferencia de datos en los casos y condiciones contemplados por la normativa.",
  },
  {
    number: "06",
    title: "Revocación",
    text: "Retirar una autorización previamente otorgada para tratamientos basados en su consentimiento.",
  },
] as const;

export default function DataRequestPage() {
  return (
    <>
      <main className={styles.main}>
        <section className={styles.hero} aria-labelledby="page-title">
          <div className={styles.heroTexture} aria-hidden="true" />

          <div className={styles.container}>
            <p className={styles.eyebrow}>PRIVACIDAD Y DATOS PERSONALES</p>

            <h1 id="page-title">Solicitud de derechos sobre sus datos</h1>

            <p className={styles.heroLead}>
              Este canal permite presentar solicitudes relacionadas con el
              tratamiento de datos personales realizado por Vialoop Studio SpA.
            </p>

            <div className={styles.responsibleData}>
              <div>
                <span>Responsable</span>
                <strong>Vialoop Studio SpA</strong>
              </div>

              <div>
                <span>RUT</span>
                <strong>78.455.385-K</strong>
              </div>

              <div>
                <span>Canal de privacidad</span>
                <a href="mailto:contacto@vialoop.cl">contacto@vialoop.cl</a>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.introduction} aria-labelledby="rights-title">
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <div>
                <p className={styles.sectionEyebrow}>DERECHOS DEL TITULAR</p>
                <h2 id="rights-title">¿Qué puede solicitar?</h2>
              </div>

              <p>
                Seleccione la alternativa que represente mejor su requerimiento.
                Cada solicitud será revisada de acuerdo con su contexto, la
                normativa aplicable y los antecedentes disponibles.
              </p>
            </div>

            <div className={styles.rightsGrid}>
              {rights.map((right) => (
                <article key={right.number} className={styles.rightCard}>
                  <span>{right.number}</span>
                  <h3>{right.title}</h3>
                  <p>{right.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.process} aria-labelledby="process-title">
          <div className={styles.container}>
            <div className={styles.processGrid}>
              <div className={styles.processIntro}>
                <p className={styles.sectionEyebrow}>PROCESO DE ATENCIÓN</p>
                <h2 id="process-title">Cómo gestionaremos su solicitud</h2>
                <p>
                  Registraremos el requerimiento y enviaremos un identificador
                  de seguimiento al correo informado.
                </p>
              </div>

              <ol className={styles.processSteps}>
                <li>
                  <span>01</span>
                  <div>
                    <strong>Recepción y registro</strong>
                    <p>Recibiremos la solicitud mediante este canal seguro.</p>
                  </div>
                </li>

                <li>
                  <span>02</span>
                  <div>
                    <strong>Revisión de antecedentes</strong>
                    <p>
                      Evaluaremos su alcance y, si es necesario, solicitaremos
                      información adicional para verificar identidad o localizar
                      los datos.
                    </p>
                  </div>
                </li>

                <li>
                  <span>03</span>
                  <div>
                    <strong>Respuesta</strong>
                    <p>
                      Informaremos el resultado y las medidas adoptadas a través
                      del correo electrónico indicado.
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </section>

        <section className={styles.formSection} aria-label="Formulario de solicitud">
          <div className={styles.container}>
            <DataRightsForm />

            <aside className={styles.securityNotice}>
              <p>
                <strong>Protección de su información:</strong> no adjunte ni
                escriba contraseñas, claves bancarias o antecedentes sensibles
                que no hayan sido solicitados. Vialoop podrá aplicar medidas
                razonables de verificación antes de entregar, modificar o
                eliminar información.
              </p>
            </aside>
          </div>
        </section>

        <section className={styles.contactSection} aria-labelledby="contact-title">
          <div className={styles.container}>
            <div className={styles.contactGrid}>
              <div>
                <p className={styles.sectionEyebrow}>CONTACTO DE PRIVACIDAD</p>
                <h2 id="contact-title">¿Necesita orientación?</h2>
              </div>

              <div className={styles.contactDetails}>
                <div>
                  <span>Correo electrónico</span>
                  <a href="mailto:contacto@vialoop.cl">contacto@vialoop.cl</a>
                </div>

                <div>
                  <span>Teléfono y WhatsApp</span>
                  <a href="tel:+56974330586">+56 9 7433 0586</a>
                </div>

                <div>
                  <span>Atención</span>
                  <strong>Calama, Antofagasta y todo Chile</strong>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
