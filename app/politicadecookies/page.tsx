import type { Metadata } from "next";
import Link from "next/link";
import CookieSettingsButton from "@/components/privacy/CookieSettingsButton";
import LegalPage from "@/components/legal/LegalPage";
import styles from "@/components/legal/LegalPage.module.css";

export const metadata: Metadata = {
  title: "Política de Cookies",
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
      "Cookie y almacenamiento local: hasta 180 días. La elección puede modificarse en cualquier momento o eliminarse desde el navegador.",
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
  const documentSections = sections.map(section => ({
    id: `cookies-${section.number}`,
    title: section.title,
    content: section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>),
  }));
  return <LegalPage current="cookies" title="Política de Cookies" updated
    description="Usamos lo necesario para recordar tu elección. La analítica se activa únicamente cuando tú lo autorizas."
    navigation={[
      { id: "cookies-01", title: "Uso de cookies" },
      { id: "cookies-03", title: "Consentimiento y control" },
      { id: "registros", title: "Registros utilizados" },
      { id: "preferencias", title: "Cambiar mi elección" },
    ]}
    overview={<p>Puedes navegar, conocer nuestros servicios y contactarnos con las cookies analíticas desactivadas.</p>}
    sections={[
      ...documentSections,
      { id: "registros", title: "Registros utilizados", content: <>
        <p>La presencia de registros analíticos depende de tu autorización y de la configuración de medición.</p>
        <table className={styles.cookieTable}>
          <caption className="sr-only">Cookies y almacenamiento local de Vialoop</caption>
          <thead><tr><th scope="col">Registro y proveedor</th><th scope="col">Finalidad</th><th scope="col">Duración</th></tr></thead>
          <tbody>{cookieRows.map(cookie => <tr key={cookie.name}>
            <td data-label="Registro"><code>{cookie.name}</code><small>{cookie.provider} · {cookie.category}</small></td>
            <td data-label="Finalidad">{cookie.purpose}</td><td data-label="Duración">{cookie.duration}</td>
          </tr>)}</tbody>
        </table>
      </> },
      { id: "preferencias", title: "Tu elección puede cambiar", content: <>
        <p>Revisa las categorías disponibles y guarda tus preferencias. También encontrarás esta opción en el pie de página.</p>
        <CookieSettingsButton className={styles.button} />
        <p><Link href="/politicasprivacidad">Más información sobre privacidad</Link></p>
      </> },
    ]} />;
}
