"use client";

import Image from "next/image";
import type { ChangeEvent } from "react";
import { useEffect, useRef, useState } from "react";
import styles from "./Pricing.module.css";

type Plan = {
  name: string;
  category: string;
  price: string;
  description: string;
  features: string[];
  note?: string;
  featured?: boolean;
  from?: boolean;
};

const WHATSAPP_NUMBER = "56974330586";

const plans: Plan[] = [
  {
    name: "Plan Emprende",
    category: "LANDING PAGE",
    price: "280.000",
    description:
      "Una landing page de una sola página para presentar tu empresa, destacar una oferta principal y generar contactos.",
    features: [
      "Landing page de una sola página",
      "Contenido organizado en hasta 6 secciones",
      "Hasta 15 imágenes optimizadas",
      "Formulario de contacto + botón WhatsApp",
      "Diseño profesional adaptable a móviles",
      "SEO técnico inicial + optimización de velocidad",
      "Publicación + 1 ronda de cambios",
    ],
  },
  {
    name: "Plan Crece",
    category: "SITIO WEB EMPRESARIAL",
    price: "390.000",
    description:
      "Un sitio web empresarial con mayor contenido y navegación para presentar servicios, experiencia y respaldo comercial.",
    features: [
      "Sitio web empresarial con navegación completa",
      "Contenido ampliado para empresa y servicios",
      "Hasta 30 imágenes optimizadas",
      "2 formularios: contacto + cotización",
      "Diseño personalizado + línea visual",
      "SEO técnico y local + medición básica",
      "Publicación + 2 rondas de cambios",
    ],
    featured: true,
  },
  {
    name: "Plan Empresa",
    category: "SITIO WEB CORPORATIVO",
    price: "620.000",
    from: true,
    description:
      "Una solución corporativa avanzada para empresas con múltiples servicios, áreas, públicos o requerimientos de integración.",
    features: [
      "Arquitectura corporativa para múltiples áreas",
      "Contenido avanzado y hasta 50 imágenes optimizadas",
      "Formularios personalizados + agendamiento",
      "UX/UI avanzada + diseño de mayor profundidad",
      "Gestión de contenido e integraciones según alcance",
      "Rendimiento, seguridad y SEO avanzados",
      "Capacitación + 3 rondas de cambios",
    ],
  },
  {
    name: "Plan E-commerce",
    category: "TIENDA ONLINE",
    price: "790.000",
    from: true,
    description:
      "Una tienda online personalizada y autoadministrable para vender productos, gestionar pedidos y recibir pagos.",
    features: [
      "Tienda online desarrollada en Next.js + React",
      "Panel para productos, stock, pedidos y clientes",
      "Carrito de compra + integración inicial con Flow",
      "Carga inicial de hasta 20 productos",
      "Hasta 40 imágenes de productos optimizadas",
      "Configuración básica de despacho o retiro",
      "SEO técnico, capacitación + 2 rondas de cambios",
    ],
    note:
      "La infraestructura administrada y las comisiones del medio de pago se contratan por separado.",
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
      elements.forEach((element) => {
        element.classList.add(styles.visible);
      });

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
      {
        threshold: 0.2,
        rootMargin: "0px 0px -7% 0px",
      },
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!modalOpen) return;

    const previousOverflow = document.body.style.overflow;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeModal();
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
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

  const canSend = Boolean(
    selectedPlan &&
      formData.company.trim() &&
      formData.name.trim() &&
      formData.phone.trim() &&
      formData.objective.trim(),
  );

  function sendToWhatsApp() {
    if (!canSend || !selectedPlan) return;

    const priceText = `${selectedPlan.from ? "Desde " : ""}$${
      selectedPlan.price
    } + IVA`;

    const message = [
      "Hola Vialoop, quiero cotizar una solución digital.",
      "",
      `Plan de interés: ${selectedPlan.name}`,
      `Valor publicado: ${priceText}`,
      "",
      `Empresa: ${formData.company.trim()}`,
      `Nombre: ${formData.name.trim()}`,
      `WhatsApp: ${formData.phone.trim()}`,
      "",
      `Objetivo del proyecto: ${formData.objective.trim()}`,
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
        <div className={styles.gridTexture} aria-hidden="true" />

        <div className={styles.container}>
          <header className={styles.heading}>
            <p
              className={styles.eyebrow}
              data-pricing-reveal
              style={{ transitionDelay: "0ms" }}
            >
              PLANES VIALOOP
            </p>

            <h2 data-pricing-reveal style={{ transitionDelay: "110ms" }}>
              Una solución clara para
              <span> cada etapa de tu empresa.</span>
            </h2>

            <p
              className={styles.headingText}
              data-pricing-reveal
              style={{ transitionDelay: "220ms" }}
            >
              Desde una landing page para comenzar hasta un sitio corporativo o
              una tienda online. Elige la solución que mejor responde a tus
              objetivos.
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
                    <p className={styles.planKicker}>{plan.category}</p>
                    <h3>{plan.name}</h3>
                  </div>

                  <span className={styles.planNumber}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
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

                {plan.note && <p className={styles.planNote}>{plan.note}</p>}

                <button
                  type="button"
                  onClick={() => openModal(plan)}
                  className={styles.quoteButton}
                  aria-label={`Cotizar ${plan.name}`}
                >
                  COTIZAR ESTE PLAN

                  <Image
                    src="/flecha-horizontal.webp"
                    alt=""
                    width={22}
                    height={22}
                    className={styles.buttonArrow}
                  />
                </button>
              </article>
            ))}
          </div>

          <p
            className={styles.pricingNote}
            data-pricing-reveal
            style={{ transitionDelay: "920ms" }}
          >
            Los valores “desde” se determinan después de revisar el volumen de
            contenido, las funcionalidades y las integraciones del proyecto.
            Hosting, licencias, aplicaciones y servicios externos no están
            incluidos, salvo que la cotización indique lo contrario.
          </p>
        </div>
      </section>

      {modalOpen && selectedPlan && (
        <div
          className={styles.modalBackdrop}
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
        >
          <div
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="pricing-modal-title"
          >
            <button
              type="button"
              className={styles.closeButton}
              onClick={closeModal}
              aria-label="Cerrar cotización"
            >
              ×
            </button>

            <p className={styles.modalEyebrow}>COTIZACIÓN PERSONALIZADA</p>

            <h2 id="pricing-modal-title">{selectedPlan.name}</h2>

            <p className={styles.modalPrice}>
              {selectedPlan.from && "Desde "}${selectedPlan.price}{" "}
              <span>+ IVA</span>
            </p>

            <p className={styles.modalText}>
              Completa los siguientes datos y se abrirá WhatsApp con tu
              solicitud preparada para enviar.
            </p>

            <div className={styles.form}>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={updateField}
                placeholder="Nombre de tu empresa o negocio *"
                aria-label="Nombre de tu empresa o negocio"
                autoComplete="organization"
              />

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={updateField}
                placeholder="Tu nombre *"
                aria-label="Tu nombre"
                autoComplete="name"
              />

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={updateField}
                placeholder="WhatsApp *"
                aria-label="Número de WhatsApp"
                autoComplete="tel"
              />

              <textarea
                name="objective"
                value={formData.objective}
                onChange={updateField}
                rows={4}
                placeholder="Cuéntanos qué necesita tu empresa *"
                aria-label="Objetivo o necesidad del proyecto"
              />

              <button
                type="button"
                onClick={sendToWhatsApp}
                disabled={!canSend}
              >
                ENVIAR POR WHATSAPP

                <Image
                  src="/flecha-horizontal.webp"
                  alt=""
                  width={20}
                  height={20}
                  className={styles.modalArrow}
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}