import BrandMarquee, { type BrandMark } from "@/components/BrandMarquee";
import LandingReveal from "@/components/web-design/LandingReveal";
import styles from "./IntegrationsSection.module.css";

const rows: BrandMark[][] = [
  [
    { name: "WhatsApp Business", src: "/integrations/whatsapp.svg", width: 1487, height: 346 },
    { name: "SII", src: "/integrations/sii.svg", width: 3000, height: 1103 },
    { name: "OpenAI", src: "/integrations/openai.svg", width: 292, height: 78 },
    { name: "Flow", src: "/integrations/flow.svg", width: 120, height: 52 },
  ],
  [
    { name: "Google Maps", src: "/integrations/google-maps.png", width: 128, height: 128, showName: true },
    { name: "Google Workspace", src: "/integrations/google-workspace.svg", width: 24, height: 24, showName: true },
    { name: "Google Analytics", src: "/technology/googleanalytics.svg", width: 24, height: 24, showName: true },
    { name: "HubSpot", src: "/integrations/hubspot.svg", width: 319, height: 91 },
  ],
];

export default function IntegrationsSection() {
  return <section id="integraciones" className={styles.section} aria-labelledby="integrations-title">
    <div className={styles.container}>
      <LandingReveal className={styles.header}>
        <p className={styles.eyebrow}>INTEGRACIONES A MEDIDA</p>
        <h2 id="integrations-title">Tu software, conectado<br /><em>con lo que ya usas.</em></h2>
        <p className={styles.lead}>Mensajería, facturación electrónica, inteligencia artificial, pagos y datos. Podemos desarrollar las conexiones que tu empresa necesita para trabajar en un mismo flujo.</p>
      </LandingReveal>

      <LandingReveal motion="focus"><BrandMarquee variant="integrations" colored label="Logos de integraciones" rows={rows} /></LandingReveal>

      <LandingReveal className={styles.footer}>
        <p>También evaluamos conexiones con ERP, CRM, correo y planillas. Para documentos tributarios, trabajamos mediante un proveedor de facturación compatible con SII. El alcance y los accesos se definen en cada proyecto.</p>
        <a href="/software-a-medida#contacto">Conversemos sobre tus integraciones</a>
      </LandingReveal>
      <p className={styles.brandNote}>Las marcas mostradas pertenecen a sus respectivos titulares.</p>
    </div>
  </section>;
}
