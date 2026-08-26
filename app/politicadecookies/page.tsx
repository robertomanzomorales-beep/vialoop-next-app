import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import CookieSettingsButton from "@/components/privacy/CookieSettingsButton";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Política de Cookies | Vialoop",
  description:
    "Información sobre las cookies necesarias y analíticas utilizadas por Vialoop.cl, sus finalidades y las opciones de consentimiento disponibles.",
  alternates: {
    canonical: "/politicadecookies",
  },
};

const cookieRows = [
  {
    name: "vialoop_privacy_consent",
    provider: "Vialoop.cl",
    category: "Necesaria",
    purpose:
      "Conserva la elección de privacidad, la versión del consentimiento y la fecha de actualización para no solicitar la misma decisión en cada visita.",
    duration:
      "Hasta que el usuario cambie su elección, elimine los datos del navegador o Vialoop actualice la versión del consentimiento.",
  },
  {
    name: "_ga",
    provider: "Google Analytics",
    category: "Analítica opcional",
    purpose:
      "Permite distinguir visitas y generar estadísticas agregadas sobre el uso del sitio.",
    duration: "Hasta 2 años, según la configuración de Google Analytics.",
  },
  {
    name: "_ga_<identificador>",
    provider: "Google Analytics",
    category: "Analítica opcional",
    purpose:
      "Mantiene información asociada a la sesión y a la propiedad de medición utilizada por Vialoop.",
    duration: "Hasta 2 años, según la configuración de Google Analytics.",
  },
];

const sections = [
  {
    number: "01",
    title: "Qué son las cookies",
    paragraphs: [
      "Las cookies son pequeños archivos o registros que un sitio web puede almacenar en el navegador del usuario. También pueden utilizarse mecanismos de almacenamiento local con finalidades similares, como recordar una preferencia o conservar una configuración.",
      "Algunas tecnologías son indispensables para que el sitio mantenga funciones básicas. Otras permiten obtener estadísticas y solo deben activarse cuando el usuario las autoriza.",
    ],
  },
  {
    number: "02",
    title: "Cómo utiliza cookies Vialoop",
    paragraphs: [
      "Vialoop.cl utiliza un registro estrictamente necesario para conservar la elección de privacidad del visitante. Este registro no se usa para publicidad, elaboración de perfiles comerciales ni seguimiento entre distintos sitios web.",
      "Cuando el usuario acepta expresamente las cookies analíticas, el sitio puede cargar Google Tag Manager y Google Analytics para medir visitas, páginas consultadas, desplazamientos, clics y otras interacciones generales que permiten evaluar y mejorar el funcionamiento del sitio.",
    ],
  },
  {
    number: "03",
    title: "Consentimiento y control",
    paragraphs: [
      "Las cookies necesarias permanecen activas porque permiten registrar la elección del usuario y mantener funciones esenciales. Las cookies analíticas permanecen desactivadas inicialmente y no se cargan hasta que el usuario selecciona “Aceptar analítica” o las autoriza desde el panel de preferencias.",
      "Rechazar las cookies analíticas no impide navegar por Vialoop.cl, revisar sus servicios, acceder al portafolio ni utilizar los medios de contacto disponibles.",
    ],
  },
  {
    number: "04",
    title: "Google Tag Manager y Google Analytics",
    paragraphs: [
      "Google Tag Manager es la herramienta utilizada para administrar la etiqueta de medición. En la configuración aplicada por Vialoop, el contenedor y la medición de Google Analytics solo se habilitan después de recibir autorización para la categoría analítica.",
      "Google Analytics entrega estadísticas sobre el tráfico y las interacciones del sitio. Vialoop no utiliza esta medición para publicidad personalizada y mantiene denegadas las categorías asociadas a almacenamiento publicitario, datos publicitarios y personalización de anuncios.",
    ],
  },
  {
    number: "05",
    title: "Cómo cambiar o retirar la autorización",
    paragraphs: [
      "El usuario puede modificar su elección en cualquier momento mediante la opción “Configurar cookies” disponible en el pie de página. Al retirar la autorización analítica, Vialoop deja de cargar la medición y elimina del navegador las cookies analíticas que pueda identificar.",
      "También es posible eliminar cookies desde la configuración del navegador. Si se eliminan todos los datos del sitio, Vialoop solicitará nuevamente una decisión en una visita posterior.",
    ],
  },
  {
    number: "06",
    title: "Servicios externos y enlaces",
    paragraphs: [
      "El sitio puede contener enlaces hacia servicios externos, como WhatsApp, Instagram o herramientas de agenda. Estos servicios tienen sus propias políticas y pueden tratar información cuando el usuario decide visitarlos o interactuar con ellos.",
      "Google Search Console se utiliza para revisar visibilidad e indexación del sitio, pero no instala por sí misma cookies de seguimiento en el navegador de los visitantes de Vialoop.cl.",
    ],
  },
  {
    number: "07",
    title: "Actualizaciones de esta política",
    paragraphs: [
      "Vialoop puede actualizar esta política cuando cambien las tecnologías utilizadas, la configuración del sitio o las exigencias normativas aplicables. Si el cambio afecta las finalidades o categorías autorizadas, podrá solicitarse nuevamente el consentimiento.",
    ],
  },
];

export default function PoliticaDeCookiesPage() {
  return (
    <>
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.shell}>
            <p className={styles.eyebrow}>PRIVACIDAD Y CONTROL</p>
            <h1>Política de Cookies</h1>
            <p className={styles.heroText}>
              Información clara sobre las tecnologías utilizadas por
              Vialoop.cl, sus finalidades y las decisiones disponibles para
              cada visitante.
            </p>
            <p className={styles.updated}>
              Última actualización: <strong>26 de agosto de 2026</strong>
            </p>
          </div>
        </section>

        <section className={styles.summarySection}>
          <div className={`${styles.shell} ${styles.summaryGrid}`}>
            <div>
              <p className={styles.sectionLabel}>CONFIGURACIÓN ACTUAL</p>
              <h2>Medición solo con autorización</h2>
            </div>

            <div className={styles.summaryText}>
              <p>
                Vialoop utiliza cookies necesarias para conservar la elección
                de privacidad. Google Analytics permanece desactivado hasta
                que el visitante autoriza expresamente la medición.
              </p>

              <div className={styles.statusList}>
                <div className={styles.statusItem}>
                  <span>Necesarias</span>
                  <strong>Siempre activas</strong>
                </div>
                <div className={styles.statusItem}>
                  <span>Analíticas</span>
                  <strong>Requieren autorización</strong>
                </div>
                <div className={styles.statusItem}>
                  <span>Publicidad</span>
                  <strong>No utilizada</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.contentSection}>
          <div className={styles.shell}>
            <div className={styles.sectionHeading}>
              <p className={styles.sectionLabel}>INFORMACIÓN DETALLADA</p>
              <h2>Uso de cookies y tecnologías similares</h2>
            </div>

            <article className={styles.sectionList}>
              {sections.map((section) => (
                <section className={styles.contentItem} key={section.number}>
                  <div className={styles.itemHeading}>
                    <span>{section.number}</span>
                    <h3>{section.title}</h3>
                  </div>

                  <div className={styles.itemBody}>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}
            </article>
          </div>
        </section>

        <section className={styles.tableSection}>
          <div className={styles.shell}>
            <div className={styles.sectionHeading}>
              <p className={styles.sectionLabel}>REGISTROS UTILIZADOS</p>
              <h2>Detalle de cookies</h2>
              <p>
                La presencia de cookies analíticas depende de la autorización
                otorgada y de la configuración vigente de Google Analytics.
              </p>
            </div>

            <div className={styles.tableWrapper}>
              <table className={styles.cookieTable}>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Proveedor</th>
                    <th>Categoría</th>
                    <th>Finalidad</th>
                    <th>Duración</th>
                  </tr>
                </thead>
                <tbody>
                  {cookieRows.map((cookie) => (
                    <tr key={cookie.name}>
                      <td data-label="Nombre">
                        <code>{cookie.name}</code>
                      </td>
                      <td data-label="Proveedor">{cookie.provider}</td>
                      <td data-label="Categoría">{cookie.category}</td>
                      <td data-label="Finalidad">{cookie.purpose}</td>
                      <td data-label="Duración">{cookie.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className={styles.controlSection}>
          <div className={`${styles.shell} ${styles.controlGrid}`}>
            <div>
              <p className={styles.sectionLabel}>TU DECISIÓN</p>
              <h2>Revisa o modifica tus preferencias</h2>
              <p>
                La autorización puede cambiarse en cualquier momento. Esta
                acción no afecta la navegación ni el acceso a los servicios
                publicados por Vialoop.
              </p>
            </div>

            <div className={styles.controlActions}>
              <CookieSettingsButton />
              <Link href="/politicasprivacidad" className={styles.textLink}>
                Consultar Política de Privacidad
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.contactSection}>
          <div className={`${styles.shell} ${styles.contactGrid}`}>
            <div>
              <p className={styles.sectionLabel}>RESPONSABLE</p>
              <h2>Vialoop Studio SpA</h2>
              <p>RUT 78.455.385-K</p>
              <p>Providencia, Región Metropolitana, Chile</p>
            </div>

            <div className={styles.contactDetails}>
              <div>
                <span>Consultas de privacidad</span>
                <a href="mailto:contacto@vialoop.cl">contacto@vialoop.cl</a>
              </div>
              <div>
                <span>Teléfono / WhatsApp</span>
                <a href="tel:+56974330586">+56 9 7433 0586</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
