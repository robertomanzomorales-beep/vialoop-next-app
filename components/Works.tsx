"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { ChangeEvent } from "react";

type Service = {
  id: string;
  title: string;
  description: string;
  icon: "web" | "google" | "material" | "automation";
};

type Plan = {
  name: string;
  price: string;
  featured: boolean;
  bullets: string[];
};

const WHATSAPP_NUMBER = "56974330586";

const plans: Plan[] = [
  {
    name: "Plan Emprendedor",
    price: "280.000",
    featured: false,
    bullets: [
      "One-page hasta 6 secciones",
      "Hasta 15 imágenes optimizadas",
      "1 formulario + botón WhatsApp",
      "Diseño básico",
      "Optimización WebP + caché",
      "Configuración técnica para indexación web",
      "1 ronda de cambios",
    ],
  },
  {
    name: "Plan Crece",
    price: "420.000",
    featured: true,
    bullets: [
      "Hasta 3 páginas multi-página",
      "Hasta 30 imágenes optimizadas",
      "2 formularios contacto + cotización",
      "Diseño a medida + guía de estilo",
      "Optimización de rendimiento avanzada",
      "Configuración técnica para indexación web",
      "2 rondas de cambios + capacitación 1h",
    ],
  },
  {
    name: "Plan Empresa",
    price: "790.000",
    featured: false,
    bullets: [
      "Hasta 6 páginas escala empresarial",
      "30+ imágenes optimizadas",
      "3 formularios + Calendly",
      "UX/UI avanzada + diseño premium",
      "Performance y seguridad reforzada",
      "Configuración técnica para indexación web",
      "3 rondas de cambios + onboarding 2h",
    ],
  },
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

const modalPlans = plans.map((plan) => ({
  id: plan.name.toLowerCase().replace(/\s+/g, "-"),
  name: plan.name,
  price: `$${plan.price} + IVA`,
  description:
    plan.name === "Plan Emprendedor"
      ? "Ideal para iniciar con presencia web profesional."
      : plan.name === "Plan Crece"
        ? "Para empresas que necesitan más estructura y conversión."
        : "Para empresas que necesitan una web robusta y escalable.",
  features: plan.bullets,
}));

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

function PlanCard({
  name,
  price,
  bullets,
  featured,
}: {
  name: string;
  price: string;
  bullets: string[];
  featured: boolean;
}) {
  return (
    <article
      className={[
        "group relative flex h-[468px] flex-col overflow-hidden rounded-[28px] border px-7 py-7 backdrop-blur-xl transition-[transform,box-shadow,border-color,background-color,filter] duration-700 ease-[cubic-bezier(.22,1,.36,1)] will-change-transform",
        featured
          ? "border-[#42c7ff]/34 bg-white/[0.09] shadow-[0_28px_82px_rgba(47,128,255,.16)]"
          : "border-white/10 bg-white/[0.055] shadow-[0_24px_70px_rgba(0,0,0,.22)]",
        "hover:-translate-y-1 hover:border-white/[0.18] hover:bg-white/[0.068] hover:shadow-[0_32px_90px_rgba(0,0,0,.30)]",
      ].join(" ")}
    >
      <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-[linear-gradient(180deg,rgba(255,255,255,.045),transparent_42%,rgba(255,255,255,.018))] opacity-70 transition-opacity duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:opacity-100" />

      <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-[radial-gradient(520px_250px_at_50%_-12%,rgba(66,199,255,.10),transparent_66%)] opacity-0 transition-opacity duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:opacity-100" />

      <div className="pointer-events-none absolute -right-28 -top-32 h-64 w-64 rounded-full bg-[#42c7ff]/[0.07] opacity-0 blur-3xl transition-opacity duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:opacity-100" />

      <div className="pointer-events-none absolute inset-x-7 top-0 h-[2px] rounded-full bg-gradient-to-r from-transparent via-[#42c7ff]/70 to-transparent opacity-55 transition-opacity duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:opacity-90" />

      {featured && (
        <div className="absolute right-6 top-6 rounded-full border border-[#42c7ff]/20 bg-[#42c7ff]/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-[#bfefff] shadow-[0_10px_24px_rgba(66,199,255,.08)] transition-[border-color,background-color,box-shadow] duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:border-[#42c7ff]/28 group-hover:bg-[#42c7ff]/[0.13] group-hover:shadow-[0_14px_30px_rgba(66,199,255,.10)]">
          Más elegido
        </div>
      )}

      <header className="relative z-10 mb-4">
        <span className="inline-flex rounded-[10px] border border-white/10 bg-white/[0.08] px-3.5 py-2 text-[11px] font-black uppercase tracking-[0.14em] text-white shadow-[0_10px_24px_rgba(0,0,0,.16)] transition-[border-color,background-color,color,box-shadow] duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:border-white/[0.14] group-hover:bg-white/[0.095] group-hover:shadow-[0_12px_26px_rgba(0,0,0,.18)]">
          {name}
        </span>
      </header>

      <div className="relative z-10 mb-5 flex items-baseline gap-1.5 transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-[-1px]">
        <span className="text-[15px] font-black text-white/84">$</span>

        <strong className="text-[36px] font-black leading-none tracking-[-0.04em] text-white">
          {price}
        </strong>

        <span className="text-[11px] font-black uppercase tracking-[0.08em] text-slate-300/55">
          + IVA
        </span>
      </div>

      <ul className="relative z-10">
        {bullets.map((bullet) => (
          <li
            key={bullet}
            className="border-b border-white/[0.075] py-[7px] text-[13px] font-semibold leading-5 text-slate-300/78 transition-colors duration-500 ease-out last:border-b-0 group-hover:text-slate-200/92"
          >
            {bullet}
          </li>
        ))}
      </ul>
    </article>
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

function PricingModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<
    (typeof modalPlans)[number] | null
  >(null);

  const [formData, setFormData] = useState({
    company: "",
    name: "",
    email: "",
    phone: "",
    objective: "",
    reference: "",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") handleClose();
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const canSend =
    selectedService &&
    (selectedService.id !== "diseno-web" || selectedPlan) &&
    formData.company.trim() &&
    formData.name.trim() &&
    formData.phone.trim() &&
    formData.objective.trim();

  const inputClass =
    "h-12 rounded-[14px] border border-slate-200 bg-white px-4 text-[14px] text-[#07142b] outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10";

  const textareaClass =
    "resize-none rounded-[14px] border border-slate-200 bg-white px-4 py-3 text-[14px] text-[#07142b] outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10";

  function handleClose() {
    onClose();
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

  function selectPlan(plan: (typeof modalPlans)[number]) {
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
      "Hola VÍA LOOP, quiero cotizar un proyecto.",
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

  if (!open || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-slate-950/60 px-4 py-6 backdrop-blur-sm"
      style={{ zIndex: 2147483647 }}
      role="dialog"
      aria-modal="true"
      aria-label="Cotización personalizada"
    >
      <div
        className="relative max-h-[92vh] w-full max-w-[620px] overflow-hidden rounded-[24px] bg-white shadow-[0_30px_90px_rgba(2,6,23,.35)]"
        style={{ zIndex: 2147483647 }}
      >
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
            onClick={handleClose}
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
                {modalPlans.map((plan) => (
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
                  selectedService?.id === "diseno-web" ? setStep(2) : setStep(1)
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
                    <span className="font-medium text-slate-400">opcional</span>
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
                  className="mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-[14px] bg-blue-600 px-5 text-[14px] font-black text-white shadow-[0_16px_35px_rgba(37,99,235,.22)] transition hover:-translate-y-0.5 hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none disabled:hover:translate-y-0"
                >
                  Enviar por WhatsApp
                  <span>↗</span>
                </button>

                <p className="text-center text-[11px] leading-relaxed text-slate-400">
                  Al enviar, se abrirá WhatsApp con el resumen de tu solicitud
                  listo para enviar a VÍA LOOP.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function Pricing() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section
        id="planes"
        aria-labelledby="pricing-title"
        className="relative isolate flex min-h-[880px] items-center overflow-hidden bg-[#050b15] px-6 py-20 text-white md:px-10 lg:py-24"
      >
        <div className="pointer-events-none absolute inset-0 -z-30 bg-[radial-gradient(860px_420px_at_14%_0%,rgba(47,128,255,.20),transparent_64%),radial-gradient(740px_360px_at_88%_14%,rgba(66,199,255,.10),transparent_62%),linear-gradient(180deg,#050b15_0%,#07152d_58%,#050b15_100%)]" />

        <div className="pointer-events-none absolute inset-0 -z-20 opacity-[0.14] [background-image:linear-gradient(rgba(255,255,255,.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.055)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(180deg,transparent_0%,black_22%,black_86%,transparent_100%)]" />

        <div className="mx-auto w-full max-w-[1240px]">
          <header className="mx-auto mb-10 max-w-[900px] text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-gradient-to-r from-[#42c7ff] to-[#2f80ff]" />
              <span className="text-[10px] font-black uppercase tracking-[0.26em] text-[#42c7ff]">
                Planes Vialoop
              </span>
              <span className="h-px w-10 bg-gradient-to-l from-[#42c7ff] to-[#2f80ff]" />
            </div>

            <h2
              id="pricing-title"
              className="text-[clamp(31px,3.7vw,48px)] font-black leading-[1.02] tracking-[-0.055em] text-white"
            >
              Planes flexibles{" "}
              <span className="bg-gradient-to-r from-[#42c7ff] to-[#2f80ff] bg-clip-text text-transparent">
                para cada tipo de empresa
              </span>
            </h2>
          </header>

          <div className="grid gap-6 lg:grid-cols-3">
            {plans.map((plan) => (
              <PlanCard
                key={plan.name}
                name={plan.name}
                price={plan.price}
                bullets={plan.bullets}
                featured={plan.featured}
              />
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-blue-600 px-7 text-[10px] font-black uppercase tracking-[0.18em] text-white shadow-[0_14px_32px_rgba(37,99,235,.28)] transition hover:-translate-y-0.5 hover:bg-blue-700"
            >
              Quiero cotizar mi proyecto
            </button>
          </div>
        </div>
      </section>

      <PricingModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}