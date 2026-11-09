import Image from "next/image";
import styles from "./HomeServiceMockup.module.css";

type Props = {
  variant: "web" | "software";
  desktop: string;
  desktopAlt: string;
  mobile: string;
  mobileAlt: string;
  caption: string;
};

/** CSS device frames preserve the real desktop and mobile captures. */
export default function HomeServiceMockup({
  variant, desktop, desktopAlt, mobile, mobileAlt, caption,
}: Props) {
  return (
    <figure className={`${styles.mockup} ${styles[variant]}`}>
      <div className={styles.stage}>
        <div className={styles.light} aria-hidden="true" />
        <div className={styles.devices}>
          <div className={styles.laptop}>
            <div className={styles.display}>
              <span className={styles.camera} aria-hidden="true" />
              <div className={styles.desktopScreen}>
                <Image
                  src={desktop}
                  alt={desktopAlt}
                  fill
                  sizes="(max-width: 700px) 72vw, (max-width: 1100px) 38vw, 470px"
                  className={styles.desktopImage}
                />
              </div>
            </div>
            <div className={styles.base} aria-hidden="true">
              <span />
            </div>
          </div>
          <div className={styles.phone}>
            <div className={styles.mobileScreen}>
              <Image
                src={mobile}
                alt={mobileAlt}
                fill
                sizes="(max-width: 700px) 24vw, (max-width: 1100px) 13vw, 145px"
                className={styles.mobileImage}
              />
            </div>
            <span className={styles.speaker} aria-hidden="true" />
          </div>
        </div>
        <span className={styles.ground} aria-hidden="true" />
      </div>
      <figcaption className={styles.caption}>
        <span>{caption}</span>
        <span>Escritorio y móvil</span>
      </figcaption>
    </figure>
  );
}
