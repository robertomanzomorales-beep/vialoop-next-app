"use client";

import type { ChangeEvent, MouseEvent as ReactMouseEvent } from "react";
import { useEffect, useRef, useState } from "react";
import styles from "./Hero.module.css";

type Service = {
  id: string;
  title: string;
  description: string;
};

type Plan = {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
};

const WHATSAPP_NUMBER = "56974330586";

const heroStats = [
  ["SEO", "Calama · Antofagasta"],
  ["Leads", "WhatsApp + formulario"],
  ["Confianza", "Imagen profesional"],
];

const services: Service[] = [
  {
    id: "diseno-web",
    title: "Diseño Web",
    description: "Sitios profesionales para empresas",
  },
  {
    id: "google-visibilidad",
    title: "Google y visibilidad",
    description: "Posicionamiento local, Google Maps y campañas Ads",
  },
  {
    id: "material-comercial",
    title: "Material comercial",
    description: "Brochures, presentaciones y piezas corporativas",
  },
  {
    id: "automatizacion-flujo-trabajo",
    title: "Automatización flujo de trabajo",
    description:
      "Plataforma a medida para mejorar la trazabilidad de tu negocio",
  },
];

const webPlans: Plan[] = [
  {
    id: "emprendedor",
    name: "Plan Emprendedor",
    price: "$280.000 + IVA",
    description: "Ideal para iniciar con presencia web profesional.",
    features: [
      "One-page hasta 6 secciones",
      "1 formulario + botón WhatsApp",
      "Diseño básico profesional",
      "Optimización WebP + caché",
    ],
  },
  {
    id: "crece",
    name: "Plan Crece",
    price: "$420.000 + IVA",
    description: "Para empresas que necesitan más estructura y conversión.",
    features: [
      "Hasta 3 páginas",
      "2 formularios: contacto + cotización",
      "Diseño a medida + guía de estilo",
      "Optimización de rendimiento avanzada",
    ],
  },
  {
    id: "empresa",
    name: "Plan Empresa",
    price: "$790.000 + IVA",
    description: "Para empresas que necesitan una web robusta y escalable.",
    features: [
      "Hasta 6 páginas",
      "3 formularios + Calendly",
      "UX/UI avanzada + diseño premium",
      "Performance y seguridad reforzada",
    ],
  },
];

export default function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const mockupRef = useRef<HTMLDivElement | null>(null);

  const [visible, setVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const [formData, setFormData] = useState({
    company: "",
    name: "",
    email: "",
    phone: "",
    objective: "",
    reference: "",
  });

  useEffect(() => {
    const hero = heroRef.current;

    if (!hero) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.18,
      },
    );

    observer.observe(hero);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!modalOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeModal();
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [modalOpen]);

  function handleMockupMove(event: ReactMouseEvent<HTMLDivElement>) {
    const mockup = mockupRef.current;

    if (!mockup) return;

    const rect = mockup.getBoundingClientRect();
    const pointerX = (event.clientX - rect.left) / rect.width - 0.5;
    const pointerY = (event.clientY - rect.top) / rect.height - 0.5;

    mockup.style.setProperty("--tilt-x", `${pointerY * -6}deg`);
    mockup.style.setProperty("--tilt-y", `${pointerX * 7}deg`);
    mockup.style.setProperty("--shine-x", `${50 + pointerX * 55}%`);
    mockup.style.setProperty("--shine-y", `${50 + pointerY * 55}%`);
  }

  function resetMockup() {
    const mockup = mockupRef.current;

    if (!mockup) return;

    mockup.style.setProperty("--tilt-x", "0deg");
    mockup.style.setProperty("--tilt-y", "0deg");
    mockup.style.setProperty("--shine-x", "50%");
    mockup.style.setProperty("--shine-y", "50%");
  }

  function openModal() {
    setModalOpen(true);
    setStep(1);
  }

  function closeModal() {
    setModalOpen(false);
    setStep(1);
    setSelectedService(null);
    setSelectedPlan(null);
  }

  function selectService(service: Service) {
    setSelectedService(service);
    setSelectedPlan(null);

    if (service.id === "diseno-web") {
      setStep(2);
      return;
    }

    setStep(3);
  }

  function selectPlan(plan: Plan) {
    setSelectedPlan(plan);
    setStep(3);
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
    selectedService &&
    (selectedService.id !== "diseno-web" || selectedPlan) &&
    formData.company.trim() &&
    formData.name.trim() &&
    formData.phone.trim() &&
    formData.objective.trim();

  function sendToWhatsApp() {
    if (!canSend) return;

    const message = [
      "Hola VÍA LOOP, quiero comenzar un proyecto.",
      "",
      `Servicio: ${selectedService?.title ?? "No seleccionado"}`,
      selectedPlan ? `Plan: ${selectedPlan.name} - ${selectedPlan.price}` : "",
      "",
      `Empresa: ${formData.company}`,
      `Nombre: ${formData.name}`,
      formData.email ? `Email: ${formData.email}` : "",
      `WhatsApp: ${formData.phone}`,
      "",
      `Objetivo del proyecto: ${formData.objective}`,
      formData.reference ? `Referencia: ${formData.reference}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  const inputClass =
    "h-12 rounded-xl border border-slate-200 bg-white px-4 text-[14px] text-[#07142b] outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10";

  const textareaClass =
    "resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-[14px] text-[#07142b] outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10";

  return (
    <>
      <section
        ref={heroRef}
        id="inicio"
        aria-label="Diseño web para empresas en Calama, Antofagasta y el norte de Chile"
        className={styles.hero}
      >
        <div className={styles.gridTexture} />
        <div className={styles.glowLeft} />
        <div className={styles.glowRight} />

        <div className={styles.container}>
          <div className={styles.layout}>
            <div className={styles.copy}>
              <div
                className={`${styles.kicker} ${
                  visible ? styles.visible : ""
                }`}
              >
                <span />
                <p>DISEÑO WEB PARA EMPRESAS</p>
              </div>

              <h1
                className={`${styles.title} ${
                  visible ? styles.visible : ""
                }`}
              >
                Diseño Web para Empresas en Calama y Antofagasta
                <span>.</span>
              </h1>

              <p
                className={`${styles.primaryText} ${
                  visible ? styles.visible : ""
                }`}
              >
                Diseño web profesional para empresas industriales, mineras y de
                servicios que buscan generar confianza, mejorar su presencia
                digital y conseguir más clientes.
              </p>

              <p
                className={`${styles.secondaryText} ${
                  visible ? styles.visible : ""
                }`}
              >
                Creamos sitios web para empresas del norte de Chile: Calama,
                Antofagasta, Iquique, Alto Hospicio, Pozo Almonte, Tocopilla,
                Mejillones, Taltal, Sierra Gorda y San Pedro de Atacama.
              </p>

              <div
                className={`${styles.actions} ${
                  visible ? styles.visible : ""
                }`}
              >
                <a href="/portafolio-web" className={styles.primaryButton}>
                  PORTAFOLIO <span>↗</span>
                </a>

                <button
                  type="button"
                  onClick={openModal}
                  className={styles.secondaryButton}
                >
                  QUIERO COMENZAR
                </button>
              </div>
            </div>

            <div
              ref={mockupRef}
              className={`${styles.showcase} ${
                visible ? styles.showcaseVisible : ""
              }`}
              onMouseMove={handleMockupMove}
              onMouseLeave={resetMockup}
            >
              <div className={styles.orbit} />
              <div className={styles.lightBeam} />

              <div className={styles.mockup}>
                <div className={styles.shine} />

                <div className={styles.browserTop}>
                  <div className={styles.browserDots}>
                    <span />
                    <span />
                    <span />
                  </div>

                  <div className={styles.browserAddress}>
                    <span />
                    vialoop.cl
                  </div>
                </div>

                <div className={styles.dashboard}>
                  <div className={styles.dashboardHeader}>
                    <div>
                      <p>PROYECTO DIGITAL</p>
                      <h2>Empresa industrial</h2>
                    </div>

                    <div className={styles.online}>
                      <span />
                      Online
                    </div>
                  </div>

                  <div className={styles.dashboardMain}>
                    <div className={styles.preview}>
                      <div className={styles.previewTop}>
                        <span />
                        <span />
                      </div>

                      <div className={styles.previewLines}>
                        <span />
                        <span />
                        <span />
                      </div>

                      <div className={styles.previewBottom}>
                        <span />
                        <span />
                      </div>
                    </div>

                    <div className={styles.result}>
                      <p>RESULTADO</p>
                      <strong>+38%</strong>
                      <span>más interacción</span>
                    </div>
                  </div>

                  <div className={styles.metrics}>
                    {heroStats.map(([title, text]) => (
                      <div key={title} className={styles.metric}>
                        <strong>{title}</strong>
                        <span>{text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className={`${styles.tag} ${styles.tagFast}`}>
                <span />
                Sitio rápido
              </div>

              <div className={`${styles.tag} ${styles.tagSeo}`}>
                <span />
                SEO regional
              </div>

              <div className={`${styles.tag} ${styles.tagTrust}`}>
                <span />
                Imagen profesional
              </div>
            </div>
          </div>
        </div>
      </section>

      {modalOpen && (
        <div
          className="fixed inset-0 z-[300] flex items-center justify-center bg-slate-950/60 px-4 py-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Cotización personalizada"
        >
          <div className="relative max-h-[92vh] w-full max-w-[620px] overflow-hidden rounded-[24px] bg-white shadow-[0_30px_90px_rgba(2,6,23,.35)]">
            <div className="flex items-start justify-between gap-5 border-b border-slate-950/8 px-6 py-5">
              <div>
                <p className="mb-1 text-[13px] font-bold text-blue-600">
                  Cotización personalizada
                </p>

                <h2 className="text-[24px] font-black leading-tight tracking-[-0.04em] text-[#07142b]">
                  {step === 1 && "¿Qué necesitas?"}
                  {step === 2 && "Elige tu plan web"}
                  {step === 3 &&
                    (selectedPlan?.name ??
                      selectedService?.title ??
                      "Cuéntanos de tu proyecto")}
                </h2>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-950"
                aria-label="Cerrar formulario"
              >
                ✕
              </button>
            </div>

            <div className="max-h-[calc(92vh-98px)] overflow-y-auto px-6 py-5">
              <div className="mb-6 flex gap-2">
                {[1, 2, 3].map((item) => (
                  <span
                    key={item}
                    className={`h-1 flex-1 rounded-full ${
                      item <= step ? "bg-blue-600" : "bg-slate-200"
                    }`}
                  />
                ))}
              </div>

              {step === 1 && (
                <div className="grid gap-3">
                  {services.map((service) => (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => selectService(service)}
                      className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:border-blue-600/40 hover:shadow-[0_14px_30px_rgba(37,99,235,.1)]"
                    >
                      <span>
                        <strong className="block text-[15px] font-black text-[#07142b]">
                          {service.title}
                        </strong>
                        <span className="mt-1 block text-[13px] text-slate-500">
                          {service.description}
                        </span>
                      </span>

                      <span className="text-xl text-blue-600">›</span>
                    </button>
                  ))}
                </div>
              )}

              {step === 2 && (
                <div>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="mb-4 text-[13px] font-bold text-slate-500 transition hover:text-blue-600"
                  >
                    ‹ Volver a servicios
                  </button>

                  <div className="grid gap-3">
                    {webPlans.map((plan) => (
                      <button
                        key={plan.id}
                        type="button"
                        onClick={() => selectPlan(plan)}
                        className="rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:border-blue-600/40 hover:shadow-[0_14px_30px_rgba(37,99,235,.1)]"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <strong className="block text-[16px] font-black text-[#07142b]">
                              {plan.name}
                            </strong>
                            <span className="mt-1 block text-[13px] text-slate-500">
                              {plan.description}
                            </span>
                          </div>

                          <span className="shrink-0 rounded-full bg-[#07142b] px-3 py-1.5 text-[11px] font-black text-white">
                            {plan.price}
                          </span>
                        </div>

                        <ul className="mt-4 grid gap-1.5 text-[12px] text-slate-600 sm:grid-cols-2">
                          {plan.features.map((feature) => (
                            <li key={feature} className="flex gap-2">
                              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <button
                    type="button"
                    onClick={() =>
                      selectedService?.id === "diseno-web"
                        ? setStep(2)
                        : setStep(1)
                    }
                    className="mb-4 text-[13px] font-bold text-slate-500 transition hover:text-blue-600"
                  >
                    ‹ Volver
                  </button>

                  <div className="grid gap-4">
                    <label className="grid gap-1.5">
                      <span className="text-[13px] font-bold text-[#07142b]">
                        Nombre de tu empresa/negocio *
                      </span>
                      <input
                        name="company"
                        value={formData.company}
                        onChange={updateField}
                        placeholder="Mi Empresa SPA"
                        className={inputClass}
                      />
                    </label>

                    <label className="grid gap-1.5">
                      <span className="text-[13px] font-bold text-[#07142b]">
                        Tu nombre *
                      </span>
                      <input
                        name="name"
                        value={formData.name}
                        onChange={updateField}
                        placeholder="Juan Pérez"
                        className={inputClass}
                      />
                    </label>

                    <label className="grid gap-1.5">
                      <span className="text-[13px] font-bold text-[#07142b]">
                        Email
                      </span>
                      <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={updateField}
                        placeholder="juan@empresa.cl"
                        className={inputClass}
                      />
                    </label>

                    <label className="grid gap-1.5">
                      <span className="text-[13px] font-bold text-[#07142b]">
                        WhatsApp *
                      </span>
                      <input
                        name="phone"
                        value={formData.phone}
                        onChange={updateField}
                        placeholder="+56 9 1234 5678"
                        className={inputClass}
                      />
                    </label>

                    <label className="grid gap-1.5">
                      <span className="text-[13px] font-bold text-[#07142b]">
                        ¿Qué objetivo principal tiene tu proyecto? *
                      </span>
                      <textarea
                        name="objective"
                        value={formData.objective}
                        onChange={updateField}
                        placeholder="Ej: generar leads, mostrar mi portafolio, vender servicios..."
                        rows={3}
                        className={textareaClass}
                      />
                    </label>

                    <label className="grid gap-1.5">
                      <span className="text-[13px] font-bold text-[#07142b]">
                        Web o referencia{" "}
                        <span className="font-medium text-slate-400">
                          opcional
                        </span>
                      </span>
                      <input
                        name="reference"
                        value={formData.reference}
                        onChange={updateField}
                        placeholder="https://miempresa.cl o una web de referencia"
                        className={inputClass}
                      />
                    </label>

                    <button
                      type="button"
                      onClick={sendToWhatsApp}
                      disabled={!canSend}
                      className="mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-[14px] font-black text-white shadow-[0_16px_35px_rgba(37,99,235,.22)] transition hover:-translate-y-0.5 hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none disabled:hover:translate-y-0"
                    >
                      Enviar por WhatsApp <span>↗</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}