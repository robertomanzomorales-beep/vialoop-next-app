import Link from "next/link";
import type { ReactNode } from "react";
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
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1>{title}</h1>
        <p className={styles.lead}>{description}</p>
        {updated && <p className={styles.date}>Última actualización <span aria-hidden="true">·</span> <time dateTime="2026-11-07">7 de noviembre de 2026</time></p>}
      </header>

      {current && <nav className={styles.documents} aria-label="Documentos de Vialoop">
        {documents.map(document => <Link key={document.id} href={document.href} aria-current={current === document.id ? "page" : undefined}>{document.title}</Link>)}
      </nav>}

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <nav aria-label="En esta página">
            <p>EN ESTA PÁGINA</p>
            <ul>{(navigation ?? sections).map(section => <li key={section.id}><a href={`#${section.id}`}>{section.title}</a></li>)}</ul>
          </nav>
          <Link className={styles.help} href="/contacto">¿Necesitas ayuda?<span>Conversemos.</span></Link>
        </aside>

        <div className={styles.content}>
          {overview && <div className={styles.overview}>{overview}</div>}
          {sections.map(section => <section key={section.id} id={section.id} className={styles.section} aria-labelledby={`${section.id}-title`}>
            <h2 id={`${section.id}-title`}>{section.title}</h2>
            <div className={styles.copy}>{section.content}</div>
          </section>)}
          <div className={styles.contact}>
            <p>Vialoop Studio SpA<span>Un canal directo para tus consultas.</span></p>
            <a href="mailto:contacto@vialoop.cl">contacto@vialoop.cl</a>
          </div>
        </div>
      </div>
    </div>
  </main>;
}
