"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./ServiceTools.module.css";

const toolRows = [
  [
    ["react", "React"],
    ["nextdotjs", "Next.js"],
    ["typescript", "TypeScript"],
    ["tailwindcss", "Tailwind CSS"],
    ["supabase", "Supabase"],
    ["postgresql", "PostgreSQL"],
    ["vercel", "Vercel"],
    ["github", "GitHub"],
  ],
  [
    ["googleanalytics", "Google Analytics"],
    ["googleads", "Google Ads"],
    ["googlemybusiness", "Google Business"],
    ["adobeillustrator", "Illustrator"],
    ["adobephotoshop", "Photoshop"],
    ["canva", "Canva"],
  ],
];

export default function ServiceTools() {
  const [paused, setPaused] = useState(false);

  return (
    <section className={styles.tools} aria-labelledby="herramientas-title" data-paused={paused || undefined}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Tecnología y herramientas</p>
        <h3 id="herramientas-title">Detrás de cada proyecto,{" "}<em>las herramientas adecuadas.</em></h3>
        <p className={styles.description}>Desarrollo, visibilidad y diseño, con herramientas elegidas según lo que tu empresa necesita.</p>
      </header>
      <div className={styles.marquees}>
        {toolRows.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.row}>
            <div className={`${styles.track} ${rowIndex === 1 ? styles.reverse : ""}`}>
              {[0, 1, 2].map(copy => (
                <ul key={copy} className={styles.toolList} aria-label={copy === 0 ? (rowIndex === 0 ? "Herramientas de desarrollo" : "Herramientas de visibilidad y diseño") : undefined} aria-hidden={copy !== 0 || undefined}>
                  {row.map(([slug, name]) => (
                    <li key={slug} className={styles.tool}>
                      <Image src={`/technology/${slug}.svg`} alt="" width={29} height={29} />
                      <span>{name}</span>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button type="button" className={styles.motionControl} onClick={() => setPaused(value => !value)}>
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">{paused ? <path d="m5 3 7 5-7 5Z" /> : <path d="M6 3v10M10 3v10" />}</svg>
        {paused ? "Reanudar movimiento" : "Pausar movimiento"}
      </button>
    </section>
  );
}
