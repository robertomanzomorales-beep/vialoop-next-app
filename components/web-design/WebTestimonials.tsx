import { testimonials } from "@/lib/testimonials";
import LandingReveal from "./LandingReveal";
import styles from "./WebTestimonials.module.css";

export default function WebTestimonials() {
  const [featured, ...others] = [testimonials[0], testimonials[2], testimonials[3]];
  return <section id="testimonios-web" className={styles.section} aria-labelledby="web-stories-title">
    <div className={styles.container}>
      <LandingReveal className={styles.heading}><p>EXPERIENCIAS REALES</p><h2 id="web-stories-title">Una buena web se nota.<em>Una buena experiencia, también.</em></h2></LandingReveal>
      <div className={styles.stories}>
        <LandingReveal motion="left" className={styles.featured}>
          <article><span className={styles.stars} aria-label="Calificación de cinco estrellas">★★★★★</span><blockquote>“{featured.quote}”</blockquote><footer><strong>{featured.name}</strong><span>{featured.detail}</span></footer></article>
        </LandingReveal>
        <div className={styles.otherStories}>{others.map((item,index) => <LandingReveal key={item.name} delay={index * 100 + 100} motion="right"><article><blockquote>“{item.quote}”</blockquote><footer><strong>{item.name}</strong><span>{item.detail}</span></footer></article></LandingReveal>)}</div>
      </div>
    </div>
  </section>;
}
