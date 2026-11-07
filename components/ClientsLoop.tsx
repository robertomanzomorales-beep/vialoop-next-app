import LandingReveal from "./web-design/LandingReveal";
import BrandMarquee from "./BrandMarquee";
import styles from "./ClientsLoop.module.css";

const clientLogos = [
  {
    src: "/logo-carrusel-afuen-v2.webp",
    width: 352, height: 240,
    name: "Afüen",
  },
  {
    src: "/logo-carrusel-chr-v2.webp",
    width: 636, height: 240,
    name: "CHR Transportes",
  },
  {
    src: "/logo-carrusel-empresas-hc-v2.webp",
    width: 177, height: 240,
    name: "Empresas HC",
  },
  {
    src: "/logo-carrusel-gran-norte-v2.webp",
    width: 195, height: 240,
    name: "Gran Norte",
  },
  {
    src: "/logo-carrusel-klp-servicios-v2.webp",
    width: 118, height: 240,
    name: "KLP Servicios",
  },
  {
    src: "/logo-carrusel-loa-rental-v2.webp",
    width: 589, height: 240,
    name: "Loa Rental",
  },
  {
    src: "/logo-carrusel-maryland-v2.webp",
    width: 225, height: 240,
    name: "Maryland",
  },
  {
    src: "/logo-carrusel-profleet-v2.webp",
    width: 502, height: 240,
    name: "ProFleet",
  },
  {
    src: "/logo-carrusel-promaq-v2.webp",
    width: 245, height: 240,
    name: "Promaq Servicios Industriales",
  },
  {
    src: "/logo-carrusel-rerchar-v2.webp",
    width: 384, height: 240,
    name: "Rerchar",
  },
  {
    src: "/logook-rio-loa-carrusel-240px.webp",
    width: 384, height: 240,
    name: "Ferretería Río Loa",
  },
  {
    src: "/logo-carrusel-rohuer-ingenieria-v2.webp",
    width: 264, height: 240,
    name: "Rohuer Ingeniería",
  },
  {
    src: "/logo-carrusel-romaa-v2.webp",
    width: 136, height: 240,
    name: "ROMAA",
  },
  {
    src: "/logo-carrusel-serven-v2.webp",
    width: 496, height: 240,
    name: "Serven Supply Chain",
  },
  {
    src: "/logo-carrusel-transportes-greducam-v2.webp",
    width: 636, height: 240,
    name: "Transportes Greducam",
  },
];

export default function ClientsLoop({ appearance = "default" }: { appearance?: "default" | "landing" }) {
  if (appearance === "landing") {
    const marks = [0, 3, 8, 5, 2, 10, 4, 11].map(index => clientLogos[index]);
    return <section id="clientes" className={`${styles.section} ${styles.landing}`} aria-labelledby="clientes-vialoop">
      <div className={styles.container}>
        <LandingReveal><h2 id="clientes-vialoop" className={styles.trustTitle}>Empresas que ya dieron el paso con Vialoop.</h2></LandingReveal>
        <LandingReveal motion="focus" delay={100}><BrandMarquee variant="clients" colored label="Logos de clientes" rows={[marks]} /></LandingReveal>
        <p className={styles.trustProof}><strong>+250 sitios web realizados.</strong> Para empresas de distintos rubros.</p>
      </div>
    </section>;
  }
  return (
    <section id="clientes" className={styles.section} aria-labelledby="clientes-vialoop">
      {/* Keep the metric server-rendered and independent of reveal animations. */}
      <div className={styles.container}>
        <div className={styles.intro}>
          <div className={styles.summaryCard}>
            <div className={styles.ratingRow}>
              <span className={styles.stars} aria-label="Calificación de cinco estrellas">★★★★★</span>
              <span className={styles.rating}>5.0</span>
            </div>
            <p className={styles.metric}>
              <strong>+250</strong>
              <span>Sitios web<br />realizados</span>
            </p>
            <p className={styles.description}>Para empresas de distintos rubros.</p>
          </div>
          <div className={styles.heading}>
            <p className={styles.eyebrow}>Relaciones que perduran</p>
            <h2 id="clientes-vialoop">Empresas que han<br className={styles.desktopBreak} /> confiado en <em>Vialoop.</em></h2>
          </div>
        </div>
        <BrandMarquee variant="clients" label="Logos de clientes" rows={[
          clientLogos.slice(0, 8),
          clientLogos.slice(8),
        ]} />
      </div>
    </section>
  );
}
