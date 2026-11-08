import Image from "next/image";
import type { SoftwareVariant } from "@/lib/software-projects";
import styles from "./ProjectPreview.module.css";

type PreviewKind = SoftwareVariant | "vialoop";

const screenshots: Record<PreviewKind, { name: string; desktop: string; mobile: string }> = {
  operations: { name: "RERCHAR", desktop: "/software/capturas/rerchar-escritorio.webp", mobile: "/software/capturas/rerchar-movil.webp" },
  laboratory: { name: "GM Especialistas", desktop: "/software/capturas/gm-escritorio.webp", mobile: "/software/capturas/gm-movil.webp" },
  reservations: { name: "Martín Atacama Transfers", desktop: "/software/capturas/martin-escritorio.webp", mobile: "/software/capturas/martin-movil.webp" },
  vialoop: { name: "Vialoop", desktop: "/software/capturas/vialoop-escritorio.webp", mobile: "/software/capturas/vialoop-movil.webp" },
};

export default function ProjectPreview({ variant }: { variant: PreviewKind }) {
  const screenshot = screenshots[variant];

  return <div className={`${styles.stage} ${styles[variant]}`}>
    <div className={styles.halo} aria-hidden="true" />
    <div className={styles.devices}>
      <div className={styles.laptop}>
        <div className={styles.laptopFrame}>
          <span className={styles.camera} aria-hidden="true" />
          <div className={styles.laptopScreen}>
            <Image src={screenshot.desktop} alt={`Software de ${screenshot.name} en computador`} fill sizes="(max-width: 700px) 76vw, (max-width: 1100px) 30vw, 430px" />
          </div>
        </div>
        <div className={styles.laptopBase} aria-hidden="true" />
      </div>
      <div className={styles.phone}>
        <div className={styles.phoneScreen}>
          <Image src={screenshot.mobile} alt={`Software de ${screenshot.name} en celular`} fill sizes="(max-width: 700px) 22vw, 130px" />
        </div>
        <span className={styles.phoneNotch} aria-hidden="true" />
      </div>
    </div>
  </div>;
}
