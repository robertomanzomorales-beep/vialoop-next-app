import LegalPage from "@/components/legal/LegalPage";
import styles from "@/components/legal/LegalPage.module.css";

const faqs = [
  {
    question: "¿También desarrollan software y sistemas a medida?",
    answer: "Sí. Desarrollamos software de gestión, plataformas operativas y automatizaciones según los procesos de cada empresa. Primero revisamos la necesidad para definir las funciones, los plazos y la propuesta económica.",
  },
  {
    question: "¿Cómo puedo solicitar una propuesta?",
    answer: "En el formulario de contacto puede seleccionar los servicios y describir su proyecto. Recibirá un resumen de su solicitud y el área comercial revisará los antecedentes para preparar una propuesta personalizada.",
  },
  {
    question: "¿Cuánto demoran en entregar una página web?",
    answer:
      "El plazo habitual es de 10 a 15 días hábiles. El tiempo final depende del tipo de sitio, la cantidad de secciones y la rapidez en la entrega de contenidos y feedback.",
  },
  {
    question: "¿Cómo son los pagos?",
    answer:
      "Las condiciones y los hitos de pago se definen en la propuesta de cada proyecto, según su alcance y calendario.",
  },
  {
    question: "¿Qué necesito para comenzar mi sitio web?",
    answer:
      "Necesitamos tu logo, información de la empresa, servicios, textos, fotografías, datos de contacto y referencias visuales si las tienes.",
  },
  {
    question: "¿Puedo contratar hosting y dominio?",
    answer:
      "Podemos incluir hosting, dominio y correo corporativo cuando el proyecto lo requiera. La capacidad, el período y las condiciones de renovación se detallan en la propuesta.",
  },
  {
    question: "¿En qué tecnología desarrollan las páginas web?",
    answer:
      "Desarrollamos sitios web con React y Next.js, lo que permite crear páginas rápidas, personalizadas y bien estructuradas.",
  },
  {
    question: "¿Incluyen SEO en el sitio web?",
    answer:
      "Incluimos configuración técnica básica para indexación, estructura de contenido, títulos, descripciones y buenas prácticas iniciales.",
  },
  {
    question: "¿El servicio de Google Ads incluye el presupuesto publicitario?",
    answer:
      "No. La gestión de Google Ads tiene un valor independiente y el presupuesto publicitario se paga directamente a Google.",
  },
  {
    question: "¿Ustedes redactan los textos de la página web?",
    answer:
      "El contenido base debe ser entregado por el cliente. Si necesitas copywriting, podemos cotizarlo como servicio adicional.",
  },
  {
    question: "¿Qué incluye el soporte posterior al lanzamiento?",
    answer:
      "La revisión posterior, el soporte y las condiciones de continuidad se definen en la propuesta de cada proyecto. Los cambios de contenido y las funciones nuevas se evalúan según su alcance.",
  },
  {
    question: "¿Trabajan páginas web para empresas en Antofagasta?",
    answer:
      "Sí. Desarrollamos páginas web para empresas en Antofagasta que necesitan mostrar sus servicios, generar confianza y mejorar su presencia online.",
  },
  {
    question: "¿También hacen sitios web para empresas en Calama?",
    answer:
      "Sí. Diseñamos sitios web para empresas, comercios, profesionales y organizaciones de distintos rubros en Calama. También trabajamos de forma remota con clientes de todo Chile.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export const metadata = {
  title: "Preguntas frecuentes",
  alternates: { canonical: "/faq" },
  description:
    "Preguntas frecuentes sobre diseño web, desarrollo de software a medida, hosting, propuestas, pagos y plazos con Vialoop.",
};

export default function FAQPage() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }} />
    <LegalPage title="Hablemos con las cosas claras."
      eyebrow="VIALOOP · PREGUNTAS FRECUENTES"
      description="Respuestas sobre nuestros servicios y la forma de trabajar juntos. Cada proyecto comienza entendiendo lo que tu empresa necesita."
      sections={[
        { id: "preguntas", title: "Antes de comenzar", content: <>{faqs.map(faq => <details key={faq.question} className={styles.details}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</> },
      ]} />
  </>;
}
