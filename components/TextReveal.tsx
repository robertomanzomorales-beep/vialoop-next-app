import { Fragment, type CSSProperties } from "react";
import styles from "./Studio.module.css";
export default function TextReveal({
  text,
  italic = false,
}: {
  text: string;
  italic?: boolean;
}) {
  return (
    <span className={italic ? styles.italic : undefined}>
      {text.split(" ").map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span className={styles.word}>
            <span
              className={styles.wordInner}
              style={{ "--word-delay": `${index * 38}ms` } as CSSProperties}
            >
              {word}
            </span>
          </span>{" "}
        </Fragment>
      ))}
    </span>
  );
}
