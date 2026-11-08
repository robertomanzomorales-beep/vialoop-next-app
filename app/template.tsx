import type { ReactNode } from "react";
import styles from "./template.module.css";

export default function PageTemplate({ children }: { children: ReactNode }) {
  return <div id="main-content" tabIndex={-1} className={`${styles.page} main-content`}>{children}</div>;
}
