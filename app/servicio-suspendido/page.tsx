import type { Metadata } from "next";
import Image from "next/image";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Servicio temporalmente suspendido | Vialoop",
  description:
    "Información sobre el estado de un servicio digital administrado por Vialoop.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

const paymentEmailHref =
  "mailto:pagos@vialoop.cl" +
  "?subject=Consulta%20por%20servicio%20suspendido" +
  "&body=Hola%20equipo%20de%20Pagos%20Vialoop%2C%0A%0A" +
  "Necesito%20consultar%20el%20estado%20del%20servicio%20asociado%20a%20mi%20dominio.%0A%0A" +
  "Dominio%3A%20%0A" +
  "Nombre%20o%20empresa%3A%20%0A%0A" +
  "Quedo%20atento%20a%20las%20instrucciones%20para%20su%20regularizaci%C3%B3n.%0A%0A" +
  "Gracias.";

export default function ServicioSuspendidoPage() {
  return (
    <main className={styles.page}>
      <section
        className={styles.hero}
        aria-labelledby="suspended-service-title"
      >
        <div className={styles.content}>
          <span className={styles.eyebrow}>
            <span aria-hidden="true" />
            Estado del servicio
          </span>

          <h1
            id="suspended-service-title"
            className={styles.title}
          >
            <span>Este sitio se encuentra</span>
            <span>temporalmente suspendido.</span>
          </h1>

          <p className={styles.lead}>
            El servicio digital asociado a este dominio presenta una
            situación administrativa pendiente.
          </p>

          <p className={styles.description}>
            Para consultar su estado y solicitar la reactivación, el titular
            debe comunicarse directamente con el Área de Pagos de Vialoop.
          </p>

          <div className={styles.actions}>
            <a
              className={styles.primaryButton}
              href={paymentEmailHref}
            >
              <span>Contactar Área de Pagos</span>

              <Image
                className={styles.buttonArrow}
                src="/flecha-horizontal.webp"
                alt=""
                width={18}
                height={18}
                aria-hidden="true"
              />
            </a>

            <a
              className={styles.secondaryButton}
              href={paymentEmailHref}
            >
              pagos@vialoop.cl
            </a>
          </div>

          <div className={styles.notice}>
            <p>
              La reactivación se gestionará una vez regularizada la situación
              administrativa y confirmado el pago correspondiente.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}