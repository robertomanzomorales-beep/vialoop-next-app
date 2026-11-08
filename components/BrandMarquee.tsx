import Image from "next/image";
import MotionRegion from "./MotionRegion";
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
  variant?: "tools" | "clients" | "integrations";
  colored?: boolean;
}) {
  return (
    <MotionRegion className={`${styles.marquee} ${styles[variant]}`} colored={colored}>
      <div className={styles.rows}>
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.row}>
            <div className={`${styles.track} ${rowIndex === 1 ? styles.reverse : ""}`}>
              {[0, 1, 2].map(copy => (
                <ul key={copy} className={styles.list} aria-label={copy === 0 ? `${label}, fila ${rowIndex + 1}` : undefined} aria-hidden={copy !== 0 || undefined}>
                  {row.map(mark => (
                    <li key={mark.src} className={styles.mark} data-brand={mark.name}>
                      <Image src={mark.src} alt={mark.showName || copy !== 0 ? "" : mark.name} width={mark.width} height={mark.height} sizes={variant === "integrations" ? mark.showName ? "36px" : "190px" : variant === "clients" ? "210px" : "29px"} />
                      {mark.showName && <span>{mark.name}</span>}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        ))}
      </div>
    </MotionRegion>
  );
}
