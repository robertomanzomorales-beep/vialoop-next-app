import type { Metadata } from "next";
import DataRightsForm from "@/components/privacy/DataRightsForm";
import LegalPage from "@/components/legal/LegalPage";
import styles from "@/components/legal/LegalPage.module.css";

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
  return <LegalPage current="rights" title="Tus datos, tus decisiones."
    description="Un canal directo para presentar solicitudes relacionadas con tus datos personales y recibir una respuesta de Vialoop."
    overview={<p>Responsable: <strong>Vialoop Studio SpA</strong> · RUT 78.455.385-K. Utilizaremos los antecedentes que entregues exclusivamente para gestionar tu solicitud.</p>}
    sections={[
      { id: "derechos", title: "Qué puedes solicitar", content: <dl className={styles.definitions}>{rights.map(right => <div key={right.number}><dt>{right.title}</dt><dd>{right.text}</dd></div>)}</dl> },
      { id: "proceso", title: "Cómo lo gestionamos", content: <ol>
        <li><strong>Recepción y registro.</strong> Recibiremos tu solicitud y enviaremos un identificador de seguimiento al correo informado.</li>
        <li><strong>Revisión de antecedentes.</strong> Evaluaremos su alcance y, cuando sea necesario, te pediremos información para verificar tu identidad o localizar los datos.</li>
        <li><strong>Respuesta.</strong> Informaremos el resultado y las medidas adoptadas a través del correo indicado.</li>
      </ol> },
      { id: "solicitud", title: "Presenta tu solicitud", content: <DataRightsForm /> },
    ]} />;
}
