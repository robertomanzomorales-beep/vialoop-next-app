"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { ChangeEvent } from "react";
import { portfolioItems, type PortfolioCategory } from "@/data/portfolio";

type PortfolioFilter = "all" | PortfolioCategory;

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

const filters: { label: string; value: PortfolioFilter }[] = [
  { label: "Todos", value: "all" },
  { label: "Landing", value: "landing" },
  { label: "Plan Crece", value: "crece" },
  { label: "Plan Empresa", value: "empresa" },
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

export default function PortfolioWeb() {
  const [activeFilter, setActiveFilter] = useState<PortfolioFilter>("all");

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

  const visibleItems = useMemo(() => {
    if (activeFilter === "all") return portfolioItems;
    return portfolioItems.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

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
        id="portafolio-web"
        className="relative isolate overflow-hidden bg-[#f8fbff] px-6 pb-32 pt-20 text-[#07162f] md:px-10 md:pt-24 lg:pb-40 lg:pt-28"
      >
        <div className="pointer-events-none absolute inset-0 -z-30 bg-[radial-gradient(circle_at_8%_7%,rgba(37,99,235,.08),transparent_28%),radial-gradient(circle_at_88%_10%,rgba(56,189,248,.1),transparent_32%),linear-gradient(180deg,#f8fbff_0%,#fff_34%,#fff_100%)]" />

        <div className="pointer-events-none absolute inset-0 -z-20 opacity-[0.55] [background-image:linear-gradient(rgba(15,23,42,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,.035)_1px,transparent_1px)] [background-size:84px_84px] [mask-image:linear-gradient(180deg,transparent_0%,black_16%,black_78%,transparent_100%)]" />

        <div className="mx-auto w-full max-w-[1240px]">
          <header className="mb-11 grid gap-10 lg:grid-cols-[1fr_0.78fr] lg:items-end">
            <div>
              <div className="mb-5 flex items-center gap-3 text-[12px] font-black uppercase leading-none tracking-[0.22em] text-[#2563eb]">
                <span className="h-[2px] w-11 rounded-full bg-gradient-to-r from-[#2563eb] to-[#38bdf8]" />
                Sitios desarrollados
              </div>

              <h1 className="max-w-[780px] text-[clamp(44px,5.5vw,82px)] font-black leading-[0.9] tracking-[-0.08em] text-[#07162f]">
                Portafolio web
                <span className="block text-[#2563eb]">para empresas</span>
              </h1>
            </div>

            <p className="max-w-[540px] text-[16px] leading-[1.78] text-[#52627a]">
              Explora proyectos creados para distintos rubros y niveles de
              desarrollo digital. Puedes filtrar por tipo de solución para
              revisar sitios tipo landing, proyectos de crecimiento y desarrollos
              corporativos más completos.{" "}
              <strong className="font-black text-[#07162f]">
                Cada sitio fue diseñado para comunicar mejor, generar confianza y
                facilitar el contacto comercial.
              </strong>
            </p>
          </header>

          <div className="mb-11 flex justify-center">
            <div className="max-w-full overflow-x-auto rounded-full p-1">
              <div className="inline-flex min-w-max rounded-full border border-[#d1ddee] bg-white/82 p-2 shadow-[0_18px_54px_rgba(7,22,47,.08)] backdrop-blur-xl">
                {filters.map((filter) => {
                  const isActive = activeFilter === filter.value;

                  return (
                    <button
                      key={filter.value}
                      type="button"
                      onClick={() => setActiveFilter(filter.value)}
                      className={`min-h-[42px] rounded-full px-5 text-[12px] font-black uppercase tracking-[0.055em] transition ${
                        isActive
                          ? "bg-gradient-to-br from-[#07162f] to-[#174ea6] text-white shadow-[0_12px_28px_rgba(37,99,235,.28)]"
                          : "text-[#53657f] hover:bg-[#f1f6ff] hover:text-[#07162f]"
                      }`}
                    >
                      {filter.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visibleItems.map((item, index) => (
              <a
                key={`${item.href}-${activeFilter}`}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex min-h-full animate-[portfolioCardIn_.55s_ease-out_both] flex-col overflow-hidden rounded-[26px] border border-[#e2ebf7] bg-white/95 text-inherit no-underline shadow-[0_18px_54px_rgba(7,22,47,.075)] transition duration-300 hover:-translate-y-2 hover:border-[#2563eb]/35 hover:shadow-[0_34px_90px_rgba(7,22,47,.15)]"
                style={{
                  animationDelay: `${Math.min(index, 11) * 35}ms`,
                }}
              >
                <figure className="relative aspect-[600/310] w-full overflow-hidden border-b border-[#e4ebf5] bg-[#eef3fb]">
                  <span className="absolute left-4 top-4 z-10 inline-flex min-h-[30px] items-center rounded-full border border-white/25 bg-[#07162f]/75 px-3 text-[10.5px] font-black uppercase tracking-[0.08em] text-white backdrop-blur-md">
                    {item.plan}
                  </span>

                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    priority={index < 4 && activeFilter === "all"}
                    className="object-cover object-top transition duration-700 group-hover:scale-[1.055]"
                    sizes="(min-width: 1280px) 290px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                </figure>

                <div className="relative flex min-h-[228px] flex-1 flex-col bg-[radial-gradient(circle_at_100%_0%,rgba(37,99,235,.055),transparent_32%),linear-gradient(180deg,#fff_0%,#fbfdff_100%)] px-5 pb-6 pt-6">
                  <div className="absolute left-5 top-0 h-[3px] w-[52px] rounded-full bg-gradient-to-r from-[#2563eb] to-[#38bdf8]" />

                  <div className="mb-3 flex items-center justify-between gap-4">
                    <span className="text-[10.5px] font-black uppercase leading-snug tracking-[0.18em] text-slate-500">
                      {item.type}
                    </span>

                    <span className="grid h-9 w-9 min-w-9 place-items-center rounded-full border border-[#dce8ff] bg-[#f1f6ff] text-[#2563eb] transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:bg-[#2563eb] group-hover:text-white">
                      ↗
                    </span>
                  </div>

                  <h3 className="mb-2 text-[21px] font-black leading-[1.12] tracking-[-0.045em] text-[#07162f]">
                    {item.name}
                  </h3>

                  <p className="text-[14px] leading-[1.58] text-slate-500">
                    {item.description}
                  </p>

                  <span className="mt-auto pt-5 text-[13px] font-black text-[#2563eb] transition group-hover:translate-x-1 group-hover:text-[#0f4fd8]">
                    Ver proyecto →
                  </span>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-16 rounded-[34px] bg-[radial-gradient(circle_at_15%_20%,rgba(56,189,248,.18),transparent_30%),linear-gradient(135deg,#07162f_0%,#0b2447_100%)] px-6 py-12 text-center text-white shadow-[0_26px_80px_rgba(7,22,47,.16)]">
            <h2 className="mb-3 text-[clamp(30px,3.4vw,48px)] font-black leading-none tracking-[-0.06em]">
              ¿Tu empresa necesita una web mejor?
            </h2>

            <p className="mx-auto mb-6 max-w-[680px] text-[15.5px] leading-[1.7] text-white/75">
              Podemos desarrollar un sitio profesional según el nivel que
              necesitas: desde una landing clara y directa hasta una web
              corporativa más completa para presentar servicios, proyectos y
              generar oportunidades comerciales.
            </p>

            <button
              type="button"
              onClick={openModal}
              className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-full bg-white px-7 text-[14px] font-black tracking-[0.04em] text-[#07162f] shadow-[0_18px_44px_rgba(0,0,0,.18)] transition hover:-translate-y-1 hover:bg-[#2563eb] hover:text-white hover:shadow-[0_24px_60px_rgba(37,99,235,.34)]"
            >
              Hablemos de tu proyecto
              <span>→</span>
            </button>
          </div>
        </div>

        <style jsx>{`
          @keyframes portfolioCardIn {
            from {
              opacity: 0;
              transform: translateY(18px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
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
                ×
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