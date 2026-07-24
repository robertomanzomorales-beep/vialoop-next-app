"use client";

import Image from "next/image";
import Link from "next/link";
import {
  type ChangeEvent,
  type MouseEvent,
  useEffect,
  useMemo,
  useState,
} from "react";

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
const HEADER_HEIGHT = 92;

const services: Service[] = [
  {
    id: "diseno-web",
    title: "Diseño Web",
    description: "Sitios profesionales para empresas",
  },
  {
    id: "sistemas-a-medida",
    title: "Sistemas a medida",
    description:
      "Plataformas para ordenar procesos, documentos, clientes y operaciones",
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

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function MainMenu() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const [selectedService, setSelectedService] =
    useState<Service | null>(null);

  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const [formData, setFormData] = useState({
    company: "",
    name: "",
    email: "",
    phone: "",
    objective: "",
    reference: "",
  });

  const canSend = useMemo(() => {
    return Boolean(
      selectedService &&
        (selectedService.id !== "diseno-web" || selectedPlan) &&
        formData.company.trim() &&
        formData.name.trim() &&
        formData.phone.trim() &&
        formData.objective.trim(),
    );
  }, [formData, selectedPlan, selectedService]);

  useEffect(() => {
    if (!modalOpen && !mobileOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") {
        return;
      }

      setMobileOpen(false);
      closeModal();
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [modalOpen, mobileOpen]);

  function scrollToSection(
    event: MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) {
    event.preventDefault();
    setMobileOpen(false);

    const target = document.getElementById(sectionId);

    if (!target) {
      window.location.href = `/#${sectionId}`;
      return;
    }

    const targetTop =
      target.getBoundingClientRect().top +
      window.scrollY -
      HEADER_HEIGHT;

    window.history.pushState(null, "", `/#${sectionId}`);

    window.scrollTo({
      top: Math.max(targetTop, 0),
      behavior: "smooth",
    });
  }

  function openModal() {
    setMobileOpen(false);
    setModalOpen(true);
    setStep(1);
    setSelectedService(null);
    setSelectedPlan(null);
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

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function sendToWhatsApp() {
    if (!canSend) {
      return;
    }

    const message = [
      "Hola VÍA LOOP, quiero comenzar un proyecto.",
      "",
      `Servicio: ${selectedService?.title ?? "No seleccionado"}`,
      selectedPlan
        ? `Plan: ${selectedPlan.name} - ${selectedPlan.price}`
        : "",
      "",
      `Empresa: ${formData.company}`,
      `Nombre: ${formData.name}`,
      formData.email ? `Email: ${formData.email}` : "",
      `WhatsApp: ${formData.phone}`,
      "",
      `Objetivo del proyecto: ${formData.objective}`,
      formData.reference
        ? `Web o referencia: ${formData.reference}`
        : "",
    ]
      .filter(Boolean)
      .join("\n");

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message,
    )}`;

    window.open(url, "_blank", "noopener,noreferrer");
  }

  const desktopLinkClass =
    "rounded-full px-4 py-2 text-[11px] font-black uppercase tracking-[0.15em] text-white/66 transition-colors duration-200 hover:bg-white/[0.075] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35";

  const mobileLinkClass =
    "group flex min-h-[64px] items-center justify-between border-b border-white/10 text-[15px] font-black uppercase tracking-[0.16em] text-white/78 transition-colors hover:text-white";

  const inputClass =
    "h-12 rounded-[14px] border border-slate-200 bg-white px-4 text-[14px] text-[#07142b] outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10";

  const textareaClass =
    "resize-none rounded-[14px] border border-slate-200 bg-white px-4 py-3 text-[14px] text-[#07142b] outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10";

  return (
    <>
      <header className="sticky top-0 z-[110] h-[92px] bg-[#041022] text-white shadow-[0_12px_34px_rgba(2,6,23,.2)]">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#071a38_0%,#041022_100%)]" />

        <div className="relative mx-auto flex h-full w-full max-w-[1240px] items-center justify-between px-5 md:px-8">
          <Link
            href="/"
            aria-label="Ir al inicio de Vía Loop"
            className="flex h-full items-center"
            onClick={() => setMobileOpen(false)}
          >
            <Image
              src="/via loop - Diseño Web y Marketing Digital.webp"
              alt="Vía Loop - Diseño Web y Marketing Digital"
              width={360}
              height={72}
              priority
              className="h-[38px] w-auto object-contain"
            />
          </Link>

          <nav
            aria-label="Navegación principal"
            className="hidden items-center gap-1 lg:flex"
          >
            <Link href="/" className={desktopLinkClass}>
              Inicio
            </Link>

            <Link
              href="/#servicios"
              onClick={(event) => scrollToSection(event, "servicios")}
              className={desktopLinkClass}
            >
              Servicios
            </Link>

            <Link
              href="/#planes"
              onClick={(event) => scrollToSection(event, "planes")}
              className={desktopLinkClass}
            >
              Planes
            </Link>

            <Link
              href="/portafolio-web"
              className={desktopLinkClass}
            >
              Portafolio
            </Link>

            <Link href="/faq" className={desktopLinkClass}>
              FAQ
            </Link>
          </nav>

          <button
            type="button"
            onClick={openModal}
            className="hidden min-h-[46px] items-center justify-center rounded-full bg-white px-7 text-[11px] font-black uppercase tracking-[0.14em] text-[#07162f] shadow-[0_14px_34px_rgba(255,255,255,.1)] transition-colors duration-200 hover:bg-white/88 lg:inline-flex"
          >
            Solicitar cotización
          </button>

          <button
            type="button"
            onClick={() => {
              setMobileOpen((current) => !current);
            }}
            className="group relative inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/14 bg-white/[0.075] text-white shadow-[0_14px_30px_rgba(0,0,0,.18)] transition-colors hover:bg-white/[0.12] lg:hidden"
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileOpen}
          >
            <span
              className={cx(
                "absolute h-[2px] w-5 rounded-full bg-white transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)]",
                mobileOpen
                  ? "translate-y-0 rotate-45"
                  : "-translate-y-[4px] rotate-0",
              )}
            />

            <span
              className={cx(
                "absolute h-[2px] w-5 rounded-full bg-white transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)]",
                mobileOpen
                  ? "translate-y-0 -rotate-45"
                  : "translate-y-[4px] rotate-0",
              )}
            />
          </button>
        </div>
      </header>

      <div
        className={cx(
          "fixed inset-0 z-[105] overflow-hidden bg-[#030814] text-white transition-[opacity,transform] duration-500 ease-[cubic-bezier(.22,1,.36,1)] lg:hidden",
          mobileOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-full opacity-0",
        )}
        aria-hidden={!mobileOpen}
      >
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#07162f_0%,#030814_100%)]" />

        <div
          className={cx(
            "relative flex min-h-dvh flex-col px-6 pb-7 pt-[108px] transition duration-500 ease-[cubic-bezier(.22,1,.36,1)]",
            mobileOpen
              ? "translate-y-0 opacity-100 delay-150"
              : "-translate-y-4 opacity-0",
          )}
        >
          <nav aria-label="Menú móvil" className="grid">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className={mobileLinkClass}
            >
              Inicio

              <span className="text-[17px] text-white/40 transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>

            <Link
              href="/#servicios"
              onClick={(event) =>
                scrollToSection(event, "servicios")
              }
              className={mobileLinkClass}
            >
              Servicios

              <span className="text-[17px] text-white/40 transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>

            <Link
              href="/#planes"
              onClick={(event) =>
                scrollToSection(event, "planes")
              }
              className={mobileLinkClass}
            >
              Planes

              <span className="text-[17px] text-white/40 transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>

            <Link
              href="/portafolio-web"
              onClick={() => setMobileOpen(false)}
              className={mobileLinkClass}
            >
              Portafolio

              <span className="text-[17px] text-white/40 transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>

            <Link
              href="/faq"
              onClick={() => setMobileOpen(false)}
              className={mobileLinkClass}
            >
              FAQ

              <span className="text-[17px] text-white/40 transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </nav>

          <div className="mt-auto pt-8">
            <button
              type="button"
              onClick={openModal}
              className="flex min-h-[56px] w-full items-center justify-center rounded-full bg-white px-6 text-[12px] font-black uppercase tracking-[0.15em] text-[#07162f] shadow-[0_18px_44px_rgba(255,255,255,.1)] transition-colors hover:bg-white/88"
            >
              Solicitar cotización
            </button>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div
          className="fixed inset-0 z-[300] flex items-center justify-center bg-slate-950/60 px-4 py-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Cotización personalizada"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
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
                      item <= step
                        ? "bg-blue-600"
                        : "bg-slate-200"
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

                      <span className="text-xl text-blue-600">
                        ›
                      </span>
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
                            <li
                              key={feature}
                              className="flex gap-2"
                            >
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
                    onClick={() => {
                      if (
                        selectedService?.id === "diseno-web"
                      ) {
                        setStep(2);
                        return;
                      }

                      setStep(1);
                    }}
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
                        placeholder="Ej: captar clientes, ordenar procesos, controlar documentos..."
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
                      Enviar por WhatsApp
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