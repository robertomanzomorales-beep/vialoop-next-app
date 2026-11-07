"use client";
import { useRef } from "react";
import useScrollReveal from "./useScrollReveal";
import styles from "./Testimonials.module.css";
const testimonials = [
  {
    name: "Roberto Herrera A",
    detail: "Constructora Cerro Nevado · Industrial",
    quote:
      "Trabajar con Vialoop ha sido una experiencia muy positiva. Cumplieron plazos, entendieron nuestras necesidades y fortalecieron nuestra imagen corporativa.",
  },
  {
    name: "Osvaldo Morales",
    detail: "GM Especialistas · Servicios técnicos",
    quote:
      "Cumplieron con los plazos, entendieron exactamente lo que necesitábamos y el resultado fue un sitio moderno, rápido y profesional.",
  },
  {
    name: "Horacio Martínez",
    detail: "Power Diesel · Servicios industriales",
    quote:
      "Nos asesoraron desde el inicio, mejoraron la presentación de nuestros servicios y dejaron todo funcionando perfecto.",
  },
  {
    name: "Vanesa Castillo Panta",
    detail: "Transporte Castillo · Transporte",
    quote:
      "Comprendieron lo que queríamos comunicar a nuestros clientes y fortalecieron nuestra presencia digital.",
  },
  {
    name: "Alejandro Huerta",
    detail: "Rohuer Ingeniería · Ingeniería",
    quote:
      "Lograron un diseño moderno, profesional y con una navegación más fluida.",
  },
  {
    name: "Georgi Petricio",
    detail: "GSP Eco Lavados Industriales · Lavado industrial",
    quote:
      "El trabajo fue realizado dentro de los plazos acordados y con una calidad que superó nuestras expectativas.",
  },
  {
    name: "Manuel General",
    detail: "Funeraria Pérez · Servicios",
    quote:
      "Estamos encantados con el resultado, un trabajo profesional y una atención amable durante todo el proceso.",
  },
  {
    name: "Omar Jaque",
    detail: "Motel Elegance · Hotelería",
    quote:
      "Lograron captar la esencia de Motel Elegance y mostrar mejor nuestras habitaciones y servicios.",
  },
  {
    name: "Arriendo de grúas horquilla",
    detail: "Google",
    quote:
      "Muy buen trabajo, comunicación efectiva en todo momento. Conformes con nuestra pagina web.",
  },
  {
    name: "Sebastián Araya",
    detail: "Google",
    quote:
      "Excelente servicio y comunicación al momento de ir diseñando la pagina web, recomendado 👌🏻",
  },
  {
    name: "teninson araya escobar",
    detail: "Google",
    quote: "muy buen servicio todo profesional empresa seria",
  },
  {
    name: "Camila Fuentes Díaz",
    detail: "Google",
    quote:
      "Muy recomendable, cuentan con una excelente asistencia en todo el proceso. El compromiso y trabajo que ofrecen es totalmente profesional.",
  },
];
export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  useScrollReveal(ref);
  function move(direction: number) {
    const el = track.current;
    if (!el) return;
    const card = el.firstElementChild;
    const distance = card ? card.getBoundingClientRect().width + 22 : 350;
    el.scrollBy({
      left: direction * distance,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }
  return (
    <section
      ref={ref}
      className={styles.section}
      aria-labelledby="testimonials-title"
    >
      <div className={styles.container}>
        <div className={styles.heading} data-scroll-reveal>
          <div>
            <p className={styles.eyebrow}>CLIENTES QUE NOS ACOMPAÑAN</p>
            <h2 id="testimonials-title">
              La confianza se construye.
              <br />
              <em>Proyecto a proyecto.</em>
            </h2>
          </div>
          <div className={styles.controls}>
            <button
              type="button"
              onClick={() => move(-1)}
              aria-label="Ver testimonios anteriores"
            >
              Anterior
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              aria-label="Ver más testimonios"
            >
              Siguiente
            </button>
          </div>
        </div>
        <div
          ref={track}
          className={styles.viewport}
          aria-label="Opiniones de clientes"
          data-scroll-reveal
        >
          {testimonials.map((item) => (
            <article key={item.name} className={styles.card}>
              <div className={styles.rating} aria-label="Cinco estrellas">
                ★★★★★ <span>5.0</span>
              </div>
              <blockquote>
                <p>“{item.quote}”</p>
              </blockquote>
              <footer>
                <strong>{item.name}</strong>
                <span>{item.detail}</span>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
