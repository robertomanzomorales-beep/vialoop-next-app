import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/legal/LegalPage";
import styles from "@/components/legal/LegalPage.module.css";

export const metadata: Metadata = {
  title: "Hosting, correo y soporte",
  description: "Hosting, correo corporativo y soporte para acompañar la operación digital de tu empresa. Propuestas según capacidad y necesidades con Vialoop.",
  alternates: { canonical: "/hosting" },
};

export default function HostingPage() {
  return <LegalPage title="La continuidad también se diseña."
    eyebrow="VIALOOP · HOSTING Y SOPORTE"
    description="Un sitio disponible, tus correos funcionando y un equipo al que puedes recurrir. Revisamos lo que necesitas para preparar una propuesta a tu medida."
    sections={[
      { id: "hosting", title: "Espacio para tu operación", content: <><p>Evaluamos la capacidad de tu sitio y tus cuentas de correo, el dominio y las necesidades de administración. El servicio se define según el uso real de tu empresa.</p><ul><li>Hosting y correo corporativo.</li><li>Administración de dominio y renovaciones.</li><li>Revisión de capacidad y alternativas de continuidad.</li></ul></> },
      { id: "soporte", title: "Acompañamiento cuando lo necesitas", content: <><p>Podemos ayudarte con la configuración de correos, incidencias técnicas y la continuidad de tus servicios digitales. Cada atención se revisa según los antecedentes y el alcance solicitado.</p><p>Las condiciones de soporte, los tiempos de atención y los servicios incluidos se detallan en la propuesta.</p></> },
      { id: "propuesta", title: "Conversemos de tu infraestructura", content: <><p>Cuéntanos qué servicios utilizas, cuántas cuentas de correo tienes y qué necesitas mejorar. Con esa información podremos recomendar una alternativa para tu empresa.</p><Link className={styles.button} href="/contacto?servicio=hosting">Solicitar una propuesta</Link></> },
    ]} />;
}
