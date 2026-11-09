"use client";

import { useRef } from "react";
import BrandMarquee from "./BrandMarquee";
import useScrollReveal from "./useScrollReveal";
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
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section ref={sectionRef} className={styles.tools} aria-labelledby="herramientas-title">
      <div className={styles.container}>
        <header data-scroll-reveal className={styles.header}>
          <p className={styles.eyebrow}>Tecnología y herramientas</p>
          <h2 id="herramientas-title">Detrás de cada proyecto,{" "}<em>las herramientas adecuadas.</em></h2>
          <p className={styles.description}>Desarrollo, visibilidad y diseño, con herramientas elegidas según lo que tu empresa necesita.</p>
        </header>
        <div data-scroll-reveal data-scroll-delay="100">
          <BrandMarquee label="Logos de herramientas" rows={toolRows.map(row => row.map(([slug, name]) => ({
            name, src: `/technology/${slug}.svg`, width: 29, height: 29, showName: true,
          })))} />
        </div>
      </div>
    </section>
  );
}
