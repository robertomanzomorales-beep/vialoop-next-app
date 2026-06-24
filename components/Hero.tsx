"use client";

import { useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";

type Service = {
  id: string;
  title: string;
  description: string;
  icon: "web" | "google" | "material" | "automation";
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
    icon: "web",
  },
  {
    id: "google-visibilidad",
    title: "Google y visibilidad",
    description: "Posicionamiento local, Google Maps y campañas Ads",
    icon: "google",
  },
  {
    id: "material-comercial",
    title: "Material comercial",
    description: "Brochures, presentaciones y piezas corporativas",
    icon: "material",
  },
  {
    id: "automatizacion-flujo-trabajo",
    title: "Automatización flujo de trabajo",
    description:
      "Plataforma a medida para mejorar la trazabilidad de tu negocio",
    icon: "automation",
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
      "Configuración técnica para indexación web",
      "1 ronda de cambios",
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
      "Configuración técnica para indexación web",
      "2 rondas de cambios + capacitación 1h",
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
      "Configuración técnica para indexación web",
      "3 rondas de cambios + onboarding 2h",
    ],
  },
];

function ServiceIcon({ type }: { type: Service["icon"] }) {
  const iconClass = "h-5 w-5 text-blue-600";

  if (type === "web") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={iconClass} aria-hidden>
        <path
          d="M4 6.75A2.75 2.75 0 0 1 6.75 4h10.5A2.75 2.75 0 0 1 20 6.75v10.5A2.75 2.75 0 0 1 17.25 20H6.75A2.75 2.75 0 0 1 4 17.25V6.75Z"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M4.5 8h15"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M8 13h8M8 16h5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (type === "google") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={iconClass} aria-hidden>
        <path
          d="M12 21s6-5.35 6-11a6 6 0 1 0-12 0c0 5.65 6 11 6 11Z"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M12 12.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"
          stroke="currentColor"
          strokeWidth="1.8"
        />
      </svg>
    );
  }

  if (type === "material") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={iconClass} aria-hidden>
        <path
          d="M7 3.75h7.25L18 7.5v12.75H7V3.75Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M14 4v4h4M9.5 12h5M9.5 15h5M9.5 18h3"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className={iconClass} aria-hidden>
      <path
        d="M5 6.75A2.75 2.75 0 0 1 7.75 4h8.5A2.75 2.75 0 0 1 19 6.75v10.5A2.75 2.75 0 0 1 16.25 20h-8.5A2.75 2.75 0 0 1 5 17.25V6.75Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M8.5 8.5h3M8.5 12h7M8.5 15.5h3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M14.5 8.5h1.25M14.5 15.5h1.25"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M12.25 8.5h1.5M12.25 15.5h1.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M15.75 8.5v7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Stepper({ step }: { step: 1 | 2 | 3 }) {
  const items = ["Servicio", "Plan", "Proyecto"];

  return (
    <div className="mb-7 flex items-center">
      {items.map((label, index) => {
        const currentStep = (index + 1) as 1 | 2 | 3;
        const active = step >= currentStep;

        return (
          <div key={label} className="flex flex-1 items-center">
            <div className="flex items-center gap-2">
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[13px] font-black transition ${
                  active
                    ? "bg-blue-600 text-white"
                    : "bg-slate-200 text-slate-500"
                }`}
              >
                {currentStep}
              </span>

              <span
                className={`hidden text-[13px] font-bold sm:inline ${
                  active ? "text-[#07142b]" : "text-slate-500"
                }`}
              >
                {label}
              </span>
            </div>

            {index < items.length - 1 && (
              <span
                className={`mx-3 h-px flex-1 ${
                  step > currentStep ? "bg-blue-600/45" : "bg-slate-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

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
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;

    if (!section || !card) return;

    const canHover = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!canHover || reducedMotion) return;

    function onMove(event: MouseEvent) {
      const rect = section!.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      card!.style.transform = `
        perspective(1000px)
        translate3d(${x * 8}px, ${y * 6}px, 0)
        rotateX(${y * -2}deg)
        rotateY(${x * 3}deg)
      `;
    }

    function onLeave() {
      card!.style.transform = "";
    }

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);

    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  useEffect(() => {
    if (!modalOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeModal();
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [modalOpen]);

  const reveal = visible
    ? "translate-y-0 opacity-100"
    : "translate-y-4 opacity-0";

  const canSend =
    selectedService &&
    (selectedService.id !== "diseno-web" || selectedPlan) &&
    formData.company.trim() &&
    formData.name.trim() &&
    formData.phone.trim() &&
    formData.objective.trim();

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
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }

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

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <>
      <section
        ref={sectionRef}
        id="inicio"
        aria-label="Diseño web para empresas en Calama, Antofagasta y el norte de Chile"
        className="relative isolate flex min-h-[calc(100vh-92px)] overflow-hidden bg-[#f8fbff] text-[#07142b]"
      >
        <div className="pointer-events-none absolute inset-0 -z-30 bg-[radial-gradient(circle_at_12%_16%,rgba(37,99,235,.10),transparent_28%),radial-gradient(circle_at_88%_44%,rgba(56,189,248,.13),transparent_30%),linear-gradient(180deg,#ffffff_0%,#f8fbff_58%,#f3f7ff_100%)]" />

        <div className="pointer-events-none absolute inset-0 -z-20 opacity-[0.18] [background-image:linear-gradient(rgba(37,99,235,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,.06)_1px,transparent_1px)] [background-size:42px_42px]" />

        <div className="mx-auto grid min-h-[calc(100vh-92px)] w-[calc(100%-48px)] max-w-[1220px] grid-cols-1 items-center gap-8 pb-14 pt-4 lg:grid-cols-[minmax(0,1fr)_430px] lg:gap-12 xl:gap-14">
          <div className="max-w-[670px]">
            <div
              className={`mb-4 inline-flex items-center gap-3 transition-all duration-700 ${reveal}`}
            >
              <span className="h-px w-8 bg-blue-600/70" />
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-500">
                Diseño web para empresas
              </p>
            </div>

            <h1
              className={`max-w-[650px] text-[clamp(42px,5.1vw,70px)] font-black leading-[0.92] tracking-[-0.075em] text-[#07142b] transition-all delay-75 duration-700 ${reveal}`}
            >
              Diseño Web para Empresas en Calama y Antofagasta
              <span className="text-blue-600">.</span>
            </h1>

            <p
              className={`mt-5 max-w-[58ch] text-[15px] font-extrabold leading-7 text-slate-800 transition-all delay-150 duration-700 ${reveal}`}
            >
              Diseño web profesional para empresas industriales, mineras y de
              servicios que buscan generar confianza, mejorar su presencia
              digital y conseguir más clientes.
            </p>

            <p
              className={`mt-4 max-w-[64ch] text-[14px] leading-7 text-slate-600 transition-all delay-200 duration-700 ${reveal}`}
            >
              Creamos sitios web para empresas del norte de Chile: Calama,
              Antofagasta, Iquique, Alto Hospicio, Pozo Almonte, Tocopilla,
              Mejillones, Taltal, Sierra Gorda y San Pedro de Atacama.
            </p>

            <div
              className={`mt-6 flex flex-col gap-3 transition-all delay-300 duration-700 sm:flex-row ${reveal}`}
            >
              <a
                href="http://localhost:3000/portafolio-web"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-blue-600 px-6 text-[10px] font-black uppercase tracking-[0.18em] text-white shadow-[0_14px_32px_rgba(37,99,235,.24)] transition hover:-translate-y-0.5 hover:bg-blue-700"
              >
                Portafolio
              </a>

              <button
                type="button"
                onClick={openModal}
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-slate-950/10 bg-white px-6 text-[10px] font-black uppercase tracking-[0.18em] text-slate-950 shadow-[0_12px_28px_rgba(15,23,42,.06)] transition hover:-translate-y-0.5 hover:border-blue-600/30 hover:text-blue-600"
              >
                Quiero comenzar
              </button>
            </div>
          </div>

          <div
            className={`relative hidden justify-end transition-all delay-200 duration-700 lg:flex ${reveal}`}
          >
            <div className="absolute -right-8 top-1/2 h-[330px] w-[330px] -translate-y-1/2 rounded-full bg-sky-300/20 blur-3xl" />

            <div
              ref={cardRef}
              className="relative w-full max-w-[420px] will-change-transform"
            >
              <div className="absolute -inset-4 rounded-[34px] bg-blue-600/8 blur-2xl" />

              <div className="relative overflow-hidden rounded-[28px] border border-blue-600/15 bg-white/82 p-2 shadow-[0_28px_80px_rgba(7,20,43,.14)] backdrop-blur-xl transition duration-500 hover:-translate-y-1">
                <div className="overflow-hidden rounded-[22px] border border-slate-950/8 bg-white">
                  <div className="flex h-10 items-center gap-2 border-b border-slate-950/8 px-4">
                    <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                    <span className="h-2.5 w-2.5 rounded-full bg-sky-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />

                    <span className="ml-auto rounded-full bg-slate-100 px-2.5 py-1 text-[9px] font-black text-slate-500">
                      vialoop.cl
                    </span>
                  </div>

                  <div className="p-5">
                    <div className="mb-5 flex items-start justify-between gap-4">
                      <div>
                        <p className="mb-2 text-[9px] font-black uppercase tracking-[0.18em] text-blue-600">
                          Proyecto digital
                        </p>

                        <h2 className="max-w-[220px] text-[30px] font-black leading-[0.92] tracking-[-0.065em] text-slate-950">
                          Empresa industrial
                        </h2>
                      </div>

                      <span className="inline-flex min-h-7 items-center gap-2 rounded-full bg-emerald-50 px-2.5 text-[10px] font-black text-emerald-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Online
                      </span>
                    </div>

                    <div className="mb-3 grid grid-cols-[1fr_92px] gap-3">
                      <div className="rounded-[18px] border border-blue-600/10 bg-gradient-to-br from-blue-50 via-white to-slate-50 p-4">
                        <span className="mb-3 block h-2.5 w-[94%] rounded-full bg-slate-300/60" />
                        <span className="mb-3 block h-2.5 w-[74%] rounded-full bg-slate-300/50" />
                        <span className="block h-2.5 w-[54%] rounded-full bg-slate-300/40" />
                      </div>

                      <div className="flex flex-col justify-center rounded-[18px] bg-[#07142b] p-3 text-white">
                        <strong className="text-[28px] font-black leading-none tracking-[-0.08em]">
                          +38%
                        </strong>
                        <span className="mt-1.5 text-[9.5px] leading-tight text-white/70">
                          más interacción
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      {heroStats.map(([title, text]) => (
                        <div
                          key={title}
                          className="min-h-[68px] rounded-[16px] border border-slate-950/10 bg-white p-3 shadow-[0_10px_22px_rgba(15,23,42,.045)]"
                        >
                          <strong className="mb-1 block text-[11px] font-black text-slate-950">
                            {title}
                          </strong>

                          <span className="block text-[9px] leading-snug text-slate-500">
                            {text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pointer-events-none absolute -left-4 top-14 rounded-xl border border-blue-600/15 bg-white px-3 py-2 text-[10px] font-black text-slate-700 shadow-[0_16px_36px_rgba(15,23,42,.12)]">
                <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-blue-600" />
                Sitio rápido
              </div>

              <div className="pointer-events-none absolute -right-4 top-5 rounded-xl border border-blue-600/15 bg-white px-3 py-2 text-[10px] font-black text-slate-700 shadow-[0_16px_36px_rgba(15,23,42,.12)]">
                <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-blue-600" />
                SEO regional
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
                <p className="mb-1 flex items-center gap-2 text-[13px] font-bold text-blue-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
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
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M6.5 6.5 17.5 17.5M17.5 6.5 6.5 17.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <div className="max-h-[calc(92vh-98px)] overflow-y-auto px-6 py-5">
              <Stepper step={step} />

              {step === 1 && (
                <div>
                  <p className="mb-4 text-center text-[14px] text-slate-600">
                    Selecciona el servicio que quieres cotizar.
                  </p>

                  <div className="grid gap-3">
                    {services.map((service) => (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => selectService(service)}
                        className="group flex w-full items-center gap-4 rounded-[16px] border border-slate-200 bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-blue-600/35 hover:shadow-[0_16px_35px_rgba(37,99,235,.12)]"
                      >
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-blue-50">
                          <ServiceIcon type={service.icon} />
                        </span>

                        <span className="min-w-0 flex-1">
                          <strong className="block text-[15px] font-black text-[#07142b]">
                            {service.title}
                          </strong>
                          <span className="block text-[13px] text-slate-500">
                            {service.description}
                          </span>
                        </span>

                        <span className="text-xl text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600">
                          ›
                        </span>
                      </button>
                    ))}
                  </div>
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
                        className="group rounded-[18px] border border-slate-200 bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-blue-600/40 hover:shadow-[0_18px_40px_rgba(37,99,235,.12)]"
                      >
                        <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <strong className="block text-[16px] font-black text-[#07142b]">
                              {plan.name}
                            </strong>
                            <span className="mt-1 block text-[13px] text-slate-500">
                              {plan.description}
                            </span>
                          </div>

                          <span className="w-fit shrink-0 rounded-full bg-[#07142b] px-3 py-1.5 text-[12px] font-black text-white">
                            {plan.price}
                          </span>
                        </div>

                        <ul className="grid gap-1.5 text-[12px] text-slate-600 sm:grid-cols-2">
                          {plan.features.slice(0, 4).map((feature) => (
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
                        className="h-12 rounded-[14px] border border-slate-200 px-4 text-[14px] outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
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
                        className="h-12 rounded-[14px] border border-slate-200 px-4 text-[14px] outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
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
                        className="h-12 rounded-[14px] border border-slate-200 px-4 text-[14px] outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
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
                        className="h-12 rounded-[14px] border border-slate-200 px-4 text-[14px] outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
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
                        className="resize-none rounded-[14px] border border-slate-200 px-4 py-3 text-[14px] outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
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
                        className="h-12 rounded-[14px] border border-slate-200 px-4 text-[14px] outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
                      />
                    </label>

                    <button
                      type="button"
                      onClick={sendToWhatsApp}
                      disabled={!canSend}
                      className="mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-[14px] bg-blue-600 px-5 text-[14px] font-black text-white shadow-[0_16px_35px_rgba(37,99,235,.22)] transition hover:-translate-y-0.5 hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none disabled:hover:translate-y-0"
                    >
                      Enviar por WhatsApp
                      <span>↗</span>
                    </button>

                    <p className="text-center text-[11px] leading-relaxed text-slate-400">
                      Al enviar, se abrirá WhatsApp con el resumen de tu
                      solicitud listo para enviar a VÍA LOOP.
                    </p>
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