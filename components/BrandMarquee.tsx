"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./BrandMarquee.module.css";

export type BrandMark = {
  name: string;
  src: string;
  width: number;
  height: number;
  showName?: boolean;
};

export default function BrandMarquee({
  rows,
  label,
  variant = "tools",
  colored = false,
}: {
  rows: BrandMark[][];
  label: string;
  variant?: "tools" | "clients";
  colored?: boolean;
}) {
  const [paused, setPaused] = useState(false);

  return (
    <div className={`${styles.marquee} ${styles[variant]}`} data-paused={paused || undefined} data-color={colored || undefined}>
      <div className={styles.rows}>
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.row}>
            <div className={`${styles.track} ${rowIndex === 1 ? styles.reverse : ""}`}>
              {[0, 1, 2].map(copy => (
                <ul key={copy} className={styles.list} aria-label={copy === 0 ? `${label}, fila ${rowIndex + 1}` : undefined} aria-hidden={copy !== 0 || undefined}>
                  {row.map(mark => (
                    <li key={mark.src} className={styles.mark}>
                      <Image src={mark.src} alt={mark.showName || copy !== 0 ? "" : mark.name} width={mark.width} height={mark.height} sizes={variant === "clients" ? "210px" : "29px"} />
                      {mark.showName && <span>{mark.name}</span>}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button type="button" className={styles.motionControl} aria-label={`${paused ? "Reanudar" : "Pausar"} ${label.toLowerCase()}`} onClick={() => setPaused(value => !value)}>
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
          {paused ? <path d="m5 3 7 5-7 5Z" /> : <path d="M6 3v10M10 3v10" />}
        </svg>
        {paused ? "Reanudar movimiento" : "Pausar movimiento"}
      </button>
    </div>
  );
}
