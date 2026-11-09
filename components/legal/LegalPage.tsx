import Link from "next/link";
import type { ReactNode } from "react";
import Reveal, { RevealGroup } from "../Reveal";
import styles from "./LegalPage.module.css";

type LegalSection = { id: string; title: string; content: ReactNode };
type LegalDocument = "terms" | "privacy" | "cookies" | "rights";

const documents = [
  { id: "terms", title: "Condiciones de servicio", href: "/politicasdeuso" },
  { id: "privacy", title: "Privacidad", href: "/politicasprivacidad" },
  { id: "cookies", title: "Cookies", href: "/politicadecookies" },
  { id: "rights", title: "Tus datos", href: "/solicitud-datos" },
];

export default function LegalPage({ current, title, description, sections, navigation, overview, updated, eyebrow = "VIALOOP · INFORMACIÓN Y CONDICIONES" }: {
  current?: LegalDocument;
  title: string;
  description: string;
  sections: LegalSection[];
  navigation?: { id: string; title: string }[];
  overview?: ReactNode;
  updated?: boolean;
  eyebrow?: string;
}) {
  return <main className={styles.page}>
    <div className={styles.container}>
      <header className={styles.header}>
        <RevealGroup>
          <p data-scroll-reveal className={styles.eyebrow}>{eyebrow}</p>
          <h1 data-scroll-reveal data-scroll-delay="60">{title}</h1>
          <p data-scroll-reveal data-scroll-delay="120" className={styles.lead}>{description}</p>
          {updated && <p data-scroll-reveal data-scroll-delay="180" className={styles.date}>Última actualización <span aria-hidden="true">·</span> <time dateTime="2026-11-07">7 de noviembre de 2026</time></p>}
        </RevealGroup>
      </header>

      {current && <Reveal delay={180}><nav className={styles.documents} aria-label="Documentos de Vialoop">
        {documents.map(document => <Link key={document.id} href={document.href} aria-current={current === document.id ? "page" : undefined}>{document.title}</Link>)}
      </nav></Reveal>}

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <Reveal delay={180}>
            <nav aria-label="En esta página">
              <p>EN ESTA PÁGINA</p>
              <ul>{(navigation ?? sections).map(section => <li key={section.id}><a href={`#${section.id}`}>{section.title}</a></li>)}</ul>
            </nav>
            <Link className={styles.help} href="/contacto">¿Necesitas ayuda?<span>Conversemos.</span></Link>
          </Reveal>
        </aside>

        <RevealGroup className={styles.content}>
          {overview && <div data-scroll-reveal className={styles.overview}>{overview}</div>}
          {sections.map(section => <section data-scroll-reveal key={section.id} id={section.id} className={styles.section} aria-labelledby={`${section.id}-title`}>
            <h2 id={`${section.id}-title`}>{section.title}</h2>
            <div className={styles.copy}>{section.content}</div>
          </section>)}
          <div data-scroll-reveal className={styles.contact}>
            <p>Vialoop Studio SpA<span>Un canal directo para tus consultas.</span></p>
            <a href="mailto:contacto@vialoop.cl">contacto@vialoop.cl</a>
          </div>
        </RevealGroup>
      </div>
    </div>
  </main>;
}
