"use client";

import type { ChangeEvent } from "react";
import { useEffect, useRef, useState } from "react";
import styles from "./Pricing.module.css";

type Plan = {
  name: string;
  price: string;
  description: string;
  features: string[];
  featured?: boolean;
  from?: boolean;
};

const WHATSAPP_NUMBER = "56974330586";

const plans: Plan[] = [
  {
    name: "Plan Emprendedor",
    price: "280.000",
    description:
      "Para empresas que necesitan una presencia digital clara, profesional y bien estructurada.",
    features: [
      "One-page hasta 6 secciones",
      "Hasta 15 imágenes optimizadas",
      "1 formulario + botón WhatsApp",
      "Diseño web profesional",
      "Optimización WebP + caché",
      "Configuración técnica para indexación web",
      "1 ronda de cambios",
    ],
  },
  {
    name: "Plan Crece",
    price: "420.000",
    description:
      "Para empresas que necesitan más estructura, contenido y puntos de contacto comercial.",
    features: [
      "Hasta 3 páginas multi-página",
      "Hasta 30 imágenes optimizadas",
      "2 formularios: contacto + cotización",
      "Diseño a medida + guía de estilo",
      "Optimización de rendimiento avanzada",
      "Configuración técnica para indexación web",
      "2 rondas de cambios",
    ],
    featured: true,
  },
  {
    name: "Plan Empresa",
    price: "790.000",
    from: true,
    description:
      "Para empresas que requieren una presencia digital robusta, escalable y de mayor nivel.",
    features: [
      "Hasta 6 páginas escala empresarial",
      "30+ imágenes optimizadas",
      "3 formularios + Calendly",
      "UX/UI avanzada + diseño premium",
      "Performance y seguridad reforzada",
      "Configuración técnica para indexación web",
      "3 rondas de cambios",
    ],
  },
];

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [formData, setFormData] = useState({
    company: "",
    name: "",
    phone: "",
    objective: "",
  });

  useEffect(() => {
    const elements =
      sectionRef.current?.querySelectorAll<HTMLElement>(
        "[data-pricing-reveal]",
      );

    if (!elements?.length) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      elements.forEach((element) => element.classList.add(styles.visible));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add(styles.visible);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -7% 0px" },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!modalOpen) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  function openModal(plan: Plan) {
    setSelectedPlan(plan);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setSelectedPlan(null);
  }

  function updateField(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  const canSend =
    selectedPlan &&
    formData.company.trim() &&
    formData.name.trim() &&
    formData.phone.trim() &&
    formData.objective.trim();

  function sendToWhatsApp() {
    if (!canSend || !selectedPlan) return;

    const priceText = `${selectedPlan.from ? "Desde " : ""}$${selectedPlan.price} + IVA`;

    const message = [
      "Hola Vialoop, quiero cotizar un proyecto web.",
      "",
      `Plan de interés: ${selectedPlan.name}`,
      `Valor: ${priceText}`,
      "",
      `Empresa: ${formData.company}`,
      `Nombre: ${formData.name}`,
      `WhatsApp: ${formData.phone}`,
      "",
      `Objetivo del proyecto: ${formData.objective}`,
    ].join("\n");

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <>
      <section ref={sectionRef} id="planes" className={styles.pricingSection}>
        <div className={styles.gridTexture} />

        <div className={styles.container}>
          <header className={styles.heading}>
            <p
              className={styles.eyebrow}
              data-pricing-reveal
              style={{ transitionDelay: "0ms" }}
            >
              PLANES VIALOOP
            </p>

            <h2
              data-pricing-reveal
              style={{ transitionDelay: "110ms" }}
            >
              Una inversión clara para
              <span> avanzar con tu empresa.</span>
            </h2>

            <p
              className={styles.headingText}
              data-pricing-reveal
              style={{ transitionDelay: "220ms" }}
            >
              Cada plan está diseñado para ordenar tu presencia digital,
              presentar mejor tus servicios y facilitar el contacto comercial.
            </p>
          </header>

          <div className={styles.cards}>
            {plans.map((plan, index) => (
              <article
                key={plan.name}
                className={`${styles.card} ${
                  plan.featured ? styles.featuredCard : ""
                }`}
                data-pricing-reveal
                style={{ transitionDelay: `${340 + index * 145}ms` }}
              >
                {plan.featured && (
                  <span className={styles.badge}>MÁS ELEGIDO</span>
                )}

                <div className={styles.cardHeader}>
                  <div>
                    <p className={styles.planKicker}>DISEÑO WEB</p>
                    <h3>{plan.name}</h3>
                  </div>

                  <span className={styles.planNumber}>0{index + 1}</span>
                </div>

                <p className={styles.description}>{plan.description}</p>

                <div className={styles.priceArea}>
                  <span>VALOR DEL PROYECTO</span>

                  <div className={styles.price}>
                    {plan.from && <em>DESDE</em>}
                    <small>$</small>
                    <strong>{plan.price}</strong>
                    <b>+ IVA</b>
                  </div>
                </div>

                <div className={styles.features}>
                  <p>INCLUYE</p>

                  <ul>
                    {plan.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => openModal(plan)}
                  className={styles.quoteButton}
                >
                  COTIZAR ESTE PLAN <span>↗</span>
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {modalOpen && selectedPlan && (
        <div className={styles.modalBackdrop} role="dialog" aria-modal="true">
          <div className={styles.modal}>
            <button
              type="button"
              className={styles.closeButton}
              onClick={closeModal}
              aria-label="Cerrar cotización"
            >
              ×
            </button>

            <p className={styles.modalEyebrow}>COTIZACIÓN PERSONALIZADA</p>
            <h2>{selectedPlan.name}</h2>

            <p className={styles.modalPrice}>
              {selectedPlan.from && "Desde "} ${selectedPlan.price}{" "}
              <span>+ IVA</span>
            </p>

            <p className={styles.modalText}>
              Completa estos datos y se abrirá WhatsApp con tu solicitud lista
              para enviar.
            </p>

            <div className={styles.form}>
              <input
                name="company"
                value={formData.company}
                onChange={updateField}
                placeholder="Nombre de tu empresa o negocio *"
              />

              <input
                name="name"
                value={formData.name}
                onChange={updateField}
                placeholder="Tu nombre *"
              />

              <input
                name="phone"
                value={formData.phone}
                onChange={updateField}
                placeholder="WhatsApp *"
              />

              <textarea
                name="objective"
                value={formData.objective}
                onChange={updateField}
                rows={4}
                placeholder="¿Qué objetivo principal tiene tu proyecto? *"
              />

              <button
                type="button"
                onClick={sendToWhatsApp}
                disabled={!canSend}
              >
                ENVIAR POR WHATSAPP <span>↗</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}