"use client";

import { useState } from "react";
import styles from "./HostingFaq.module.css";

type FaqItem = {
  question: string;
  answer: string;
};

const faqItems: FaqItem[] = [
  {
    question: "¿Qué incluye mi plan de Hosting?",
    answer:
      "El Hosting cubre el espacio contratado para mantener operativo tu sitio web, las cuentas de correo indicadas en tu plan, acceso a Webmail y cPanel, certificado SSL, antivirus, respaldos semanales y mensuales, además de la infraestructura necesaria para que tu servicio funcione correctamente.",
  },
  {
    question: "¿El Hosting incluye crear correos nuevos o configurar equipos?",
    answer:
      "No. El Hosting mantiene disponible el espacio y servicio contratado, pero la creación de correos, cambios de contraseña, configuración en Outlook, celulares u otros equipos corresponde a soporte técnico. Esto se cobra por atención, salvo que el cliente tenga contratado un Plan de Soporte activo.",
  },
  {
    question: "¿Cuánto cuesta crear, modificar o recuperar una cuenta de correo?",
    answer:
      "El servicio tiene un valor de $11.781 IVA incluido por cuenta. Incluye crear una cuenta nueva en cPanel, modificar una cuenta existente, cambiar contraseña y entregar las credenciales de acceso. No incluye configurar la cuenta en computadores o teléfonos.",
  },
  {
    question: "¿Qué pasa si mi correo no envía, no recibe o presenta un problema?",
    answer:
      "Primero se realiza un diagnóstico para identificar el origen del problema. Este servicio tiene un valor de $15.351 IVA incluido e incluye revisión mediante capturas, Webmail y pruebas básicas de envío y recepción. La atención considera hasta 30 minutos. Si se requiere configurar o reparar la cuenta en un equipo, se cotiza el soporte remoto correspondiente.",
  },
  {
    question: "¿Cuánto cuesta configurar o reparar un correo en mi computador?",
    answer:
      "El soporte remoto para 1 computador tiene un valor de $18.921 IVA incluido. Incluye conexión mediante TeamViewer para instalar, configurar o reparar una cuenta de correo en un PC. La atención considera hasta 30 minutos.",
  },
  {
    question: "¿Y si necesito configurar el correo en computador y teléfono?",
    answer:
      "El soporte remoto para computador y teléfono tiene un valor de $26.061 IVA incluido. Incluye la configuración o reparación de una cuenta en 1 computador y 1 teléfono durante la misma atención. La duración máxima es de 45 minutos.",
  },
  {
    question: "¿Qué pasa si la atención toma más tiempo del incluido?",
    answer:
      "Cuando una atención requiere más tiempo que el contemplado en el servicio o plan contratado, se puede agregar un bloque adicional de 15 minutos. Cada bloque adicional tiene un valor de $9.401 IVA incluido.",
  },
  {
    question: "¿Tienen atención urgente?",
    answer:
      "Sí. Para solicitudes urgentes fuera de la agenda normal se aplica un recargo de atención prioritaria de $18.921 IVA incluido. Este valor se suma al servicio técnico que se requiera realizar.",
  },
  {
    question: "¿Qué ocurre si tengo contratado un Plan de Soporte?",
    answer:
      "Los Planes de Soporte incluyen determinadas atenciones mensuales, tiempo de soporte remoto y gestiones de correo según el plan contratado. Por eso, antes de cobrar una atención se revisa si esta se encuentra incluida en tu plan. Las atenciones y minutos no utilizados durante el mes no son acumulables.",
  },
  {
    question: "¿Cómo pago mi renovación de Hosting o un servicio de soporte?",
    answer:
      "Puedes realizar transferencia bancaria a la cuenta de Vialoop. Después de transferir, envía el comprobante a contacto@vialoop.cl e indica el nombre de tu empresa, dominio o servicio pagado. Así podremos identificar el pago y gestionar la renovación o atención correctamente.",
  },
];

const bankDetails = [
  ["Nombre", "AGENCIA PUBLICITARIA VIALOOP SpA"],
  ["RUT", "77.103.693-7"],
  ["Banco", "Mercado Pago"],
  ["Tipo de cuenta", "Cuenta Vista"],
  ["Número de cuenta", "1074127101"],
  ["Correo", "contacto@vialoop.cl"],
];

export default function HostingFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex((currentIndex) =>
      currentIndex === index ? null : index,
    );
  };

  return (
    <section className={styles.faqSection}>
      <div className={styles.container}>
        <header className={styles.heading}>
          <p className={styles.eyebrow}>PREGUNTAS FRECUENTES</p>

          <h2>
            Todo claro.
            <span> Sin cobros inesperados.</span>
          </h2>

          <p>
            Queremos que sepas exactamente qué incluye tu Hosting, cuándo se
            requiere soporte técnico y cuáles son los valores antes de solicitar
            una atención.
          </p>
        </header>

        <div className={styles.contentGrid}>
          <div className={styles.accordion}>
            {faqItems.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <article
                  key={item.question}
                  className={`${styles.item} ${
                    isOpen ? styles.itemOpen : ""
                  }`}
                >
                  <button
                    type="button"
                    className={styles.question}
                    onClick={() => handleToggle(index)}
                    aria-expanded={isOpen}
                  >
                    <span>{item.question}</span>

                    <span className={styles.icon} aria-hidden="true">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {isOpen && (
                    <div className={styles.answer}>
                      <p>{item.answer}</p>
                    </div>
                  )}
                </article>
              );
            })}
          </div>

          <aside className={styles.paymentCard}>
            <p className={styles.paymentEyebrow}>PAGO POR TRANSFERENCIA</p>

            <h3>Datos para realizar tu pago</h3>

            <p className={styles.paymentText}>
              Antes de transferir, confirma el monto de tu renovación o
              servicio. Luego envía el comprobante a nuestro correo para
              registrar correctamente tu pago.
            </p>

            <dl className={styles.bankDetails}>
              {bankDetails.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>

            <div className={styles.paymentNote}>
              <span>i</span>

              <p>
                En el asunto de tu correo indica tu nombre, empresa, dominio o
                servicio pagado. Ejemplo: <strong>“Hosting empresa.cl”</strong>.
              </p>
            </div>

            <a
              href="mailto:contacto@vialoop.cl?subject=Comprobante%20de%20pago%20Vialoop"
              className={styles.emailButton}
            >
              ENVIAR COMPROBANTE <span>↗</span>
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}