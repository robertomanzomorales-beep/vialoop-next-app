import Link from "next/link";
import LegalPage from "@/components/legal/LegalPage";


export const metadata = {
  title: "Política de Privacidad",
  alternates: { canonical: "/politicasprivacidad" },
  description:
    "Política de Privacidad de Vialoop.cl sobre tratamiento de datos personales, cookies, formularios, derechos de titulares, seguridad y contacto.",
};

const sections = [
  {
    title: "Introducción",
    body: [
      "En Vialoop.cl respetamos la privacidad de las personas y nos comprometemos a tratar sus datos personales de forma lícita, leal, transparente, proporcional y segura.",
      "Esta Política de Privacidad describe cómo recopilamos, usamos, almacenamos, comunicamos y protegemos la información personal de quienes visitan nuestro sitio web, solicitan cotizaciones, contratan servicios o se comunican con nosotros por medios digitales.",
    ],
  },
  {
    title: "Responsable del tratamiento",
    body: [
      "El responsable del tratamiento de los datos personales es Vialoop Studio SpA, RUT 78.455.385-K, en adelante también “Vialoop”, “nosotros” o “nuestro”.",
      "Para consultas relacionadas con privacidad, protección de datos personales o ejercicio de derechos, puedes escribir a contacto@vialoop.cl o comunicarte al +56 9 7433 0586.",
    ],
  },
  {
    title: "Alcance",
    body: [
      "Esta política aplica a visitantes del sitio web, clientes, potenciales clientes, personas que solicitan cotizaciones o soporte, representantes de empresas clientes o proveedoras y usuarios que interactúan con formularios, correos electrónicos, WhatsApp, teléfono, redes sociales u otros canales digitales habilitados por Vialoop.",
      "Esta política no regula sitios web, plataformas o servicios de terceros que puedan estar enlazados desde nuestro sitio. Recomendamos revisar las políticas de privacidad de dichos terceros antes de entregarles información personal.",
    ],
  },
  {
    title: "Datos personales que recopilamos",
    body: [
      "Podemos recopilar datos entregados directamente por el usuario, como nombre, apellidos, correo electrónico, número de teléfono o WhatsApp, empresa, cargo, área, información del proyecto, servicio solicitado, requerimiento técnico, solicitud de soporte, datos de facturación y mensajes o archivos enviados voluntariamente.",
      "También podemos recopilar datos técnicos de forma automática, como dirección IP, tipo de dispositivo, sistema operativo, navegador, páginas visitadas, fecha y hora de acceso, tiempo de permanencia, fuente de referencia, campañas, cookies, píxeles, etiquetas e identificadores técnicos.",
      "Vialoop no solicita datos personales sensibles para la navegación general del sitio ni para una cotización estándar. Si excepcionalmente el usuario entrega datos sensibles, serán tratados solo cuando exista una base de licitud válida y aplicando medidas reforzadas de confidencialidad y seguridad.",
    ],
  },
  {
    title: "Finalidades del tratamiento",
    body: [
      "Vialoop podrá tratar datos personales para responder consultas, mensajes y solicitudes de cotización; evaluar, preparar, prestar, administrar y dar soporte a servicios de diseño web, hosting, correo electrónico, mantención, desarrollo, marketing digital u otros servicios contratados.",
      "También podremos usar los datos para comunicarnos sobre proyectos, entregables, incidencias, renovaciones, cambios de servicio, soporte técnico, asuntos administrativos, relaciones comerciales, contables, tributarias y de cobranza.",
      "Además, la información puede ser utilizada para analizar el uso del sitio web, medir rendimiento de campañas, mejorar la experiencia del usuario, optimizar servicios, prevenir incidentes de seguridad, detectar fraudes, responder a usos indebidos y cumplir obligaciones legales o regulatorias.",
    ],
  },
  {
    title: "Bases de licitud",
    body: [
      "Según el contexto, Vialoop podrá tratar datos personales sobre la base del consentimiento del titular, la ejecución de medidas precontractuales o contractuales, el cumplimiento de obligaciones legales o regulatorias, el interés legítimo de Vialoop o de terceros, u otras bases permitidas por la legislación chilena aplicable.",
      "Cuando el tratamiento se base en consentimiento, el titular podrá revocarlo en cualquier momento, sin afectar la licitud del tratamiento realizado antes de dicha revocación ni los tratamientos que deban continuar por otra base legal.",
    ],
  },
  {
    title: "Cookies y tecnologías similares",
    body: [
      "Nuestro sitio puede utilizar cookies, píxeles, etiquetas, identificadores y tecnologías similares para permitir el funcionamiento del sitio, recordar preferencias, medir tráfico, analizar comportamiento de navegación y mejorar nuestros servicios.",
      "Podemos utilizar herramientas como Google Analytics, Google Tag Manager y servicios de seguridad, rendimiento, hosting, formularios, chat, CRM o email marketing necesarios para operar el sitio y responder solicitudes.",
      "La medición analítica permanece desactivada hasta que el visitante la autoriza desde el aviso o las preferencias de cookies. El usuario puede configurar su navegador para bloquear o eliminar cookies. Sin embargo, algunas cookies técnicas son necesarias para el funcionamiento del sitio y su bloqueo puede afectar la disponibilidad o calidad de ciertas funcionalidades.",
    ],
  },
  {
    title: "Destinatarios y terceros encargados",
    body: [
      "No vendemos ni alquilamos datos personales. Podemos compartir o permitir acceso a datos personales solo cuando sea necesario y bajo medidas razonables de confidencialidad, seguridad y control.",
      "Esto puede incluir proveedores de hosting, servidores, dominios, correo electrónico, almacenamiento, respaldo, soporte técnico, analítica, medición, automatización, formularios, CRM, email marketing, productividad, atención al cliente, procesadores de pago, asesores contables, tributarios, legales o administrativos.",
      "Cuando un tercero trate datos por cuenta de Vialoop, deberá utilizarlos solo conforme a nuestras instrucciones, para las finalidades contratadas y aplicando medidas de seguridad adecuadas.",
    ],
  },
  {
    title: "Transferencias internacionales",
    body: [
      "Algunos proveedores tecnológicos utilizados por Vialoop pueden encontrarse o almacenar información fuera de Chile. En esos casos, Vialoop procurará que las transferencias internacionales se realicen conforme a la legislación chilena aplicable.",
      "El uso de servicios como Google Analytics, Google Tag Manager, plataformas de hosting, correo electrónico, almacenamiento en la nube u otras herramientas digitales puede implicar tratamiento o almacenamiento internacional de datos.",
    ],
  },
  {
    title: "Seguridad de la información",
    body: [
      "Vialoop implementa medidas técnicas y organizativas razonables para proteger los datos personales contra pérdida, acceso no autorizado, uso indebido, alteración, divulgación o destrucción.",
      "Estas medidas pueden incluir control de accesos, uso de credenciales, conexiones seguras cuando sea técnicamente procedente, respaldo, continuidad operacional, confidencialidad, actualizaciones, monitoreo, revisión de configuraciones y gestión de incidentes.",
      "A pesar de estas medidas, ningún sistema conectado a Internet es completamente seguro. En caso de identificar un incidente que pueda afectar datos personales, Vialoop evaluará su alcance y adoptará medidas razonables de contención, mitigación, comunicación y registro.",
    ],
  },
  {
    title: "Conservación de los datos",
    body: [
      "Conservaremos los datos personales durante el tiempo necesario para cumplir las finalidades para las cuales fueron recopilados, mantener la relación contractual o comercial, responder solicitudes, cumplir obligaciones legales o regulatorias y ejercer o defender derechos.",
      "Cuando los datos ya no sean necesarios, Vialoop procurará eliminarlos, anonimizarlos o bloquearlos, salvo que exista una obligación legal o una razón legítima para conservarlos.",
    ],
  },
  {
    title: "Derechos de los titulares",
    body: [
      "De acuerdo con la legislación chilena aplicable, el titular puede ejercer derechos de acceso, rectificación, supresión o cancelación, oposición, revocación del consentimiento, portabilidad, bloqueo, limitación u otras medidas reconocidas por la normativa aplicable.",
      "Para ejercer estos derechos, debe escribir a contacto@vialoop.cl indicando su nombre completo, medio de contacto, derecho que desea ejercer, antecedentes que permitan identificar razonablemente los datos o la relación con Vialoop y un mecanismo de verificación de identidad cuando sea necesario.",
    ],
  },
  {
    title: "Comunicaciones comerciales",
    body: [
      "Podremos enviar comunicaciones comerciales, novedades, información de servicios o contenido relacionado con Vialoop cuando exista consentimiento, una relación comercial previa o una base legal aplicable.",
      "El usuario podrá solicitar dejar de recibir estas comunicaciones a través del mecanismo incluido en el mensaje o escribiendo a contacto@vialoop.cl.",
    ],
  },
  {
    title: "Privacidad de menores de edad",
    body: [
      "Nuestros servicios no están dirigidos a menores de edad. No recopilamos intencionalmente datos personales de menores sin autorización de su representante legal.",
      "Si tomamos conocimiento de que hemos recibido datos de un menor sin la autorización correspondiente, adoptaremos medidas razonables para eliminarlos o regularizar su tratamiento según corresponda.",
    ],
  },
  {
    title: "Confidencialidad en servicios prestados a clientes",
    body: [
      "En algunos proyectos Vialoop puede acceder a información, cuentas, credenciales, bases de datos, contenidos, correos, archivos o sistemas de clientes.",
      "Cuando ello ocurra, trataremos dicha información con confidencialidad y solo para prestar el servicio solicitado, salvo instrucción distinta del cliente u obligación legal aplicable.",
    ],
  },
  {
    title: "Cambios a esta política",
    body: [
      "Vialoop podrá actualizar esta Política de Privacidad para reflejar cambios legales, técnicos, operativos o comerciales.",
      "La versión vigente será publicada en nuestro sitio web con indicación de su fecha de última actualización. Cuando los cambios sean sustanciales, procuraremos informarlos mediante un aviso destacado o por los canales que resulten razonables.",
    ],
  },
  {
    title: "Base normativa de referencia",
    body: [
      "Esta política considera como referencia la Ley N° 19.628 sobre protección de la vida privada, la Ley N° 21.719 sobre protección y tratamiento de datos personales y la Ley N° 21.663, Marco de Ciberseguridad e Infraestructura Crítica de la Información, en lo que resulte aplicable.",
      "Este documento debe ser revisado por asesoría legal antes de su uso definitivo, especialmente si Vialoop realiza tratamientos de datos sensibles, campañas publicitarias avanzadas, perfilamiento, grandes volúmenes de datos o servicios regulados.",
    ],
  },
];

export default function PoliticasPrivacidadPage() {
  const documentSections = sections.map((section, index) => ({
    id: `privacidad-${index + 1}`,
    title: section.title,
    content: <>{section.body.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
      {index === 6 && <p><Link href="/politicadecookies">Consulta la Política de Cookies</Link> para conocer los registros utilizados y modificar tus preferencias.</p>}
      {index === 11 && <p>También puedes utilizar el <Link href="/solicitud-datos">formulario de derechos sobre tus datos</Link>.</p>}
    </>,
  }));
  return <LegalPage current="privacy" title="Política de Privacidad" updated
    description="Qué información tratamos, para qué la utilizamos y cómo puedes ejercer tus derechos sobre tus datos personales."
    navigation={[1, 3, 4, 6, 9, 10, 11, 16].map(index => documentSections[index])}
    sections={documentSections} />;
}
