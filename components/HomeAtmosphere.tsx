import styles from "./HomeAtmosphere.module.css";

export default function HomeAtmosphere() {
  return (
    <div className={styles.atmosphere} aria-hidden="true">
      <div className={styles.wash} />
      <div className={styles.far} data-parallax-layer="far" />
      <div className={styles.near} data-parallax-layer="near" />
    </div>
  );
}
