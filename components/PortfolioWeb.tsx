"use client";

import Image from "next/image";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type CSSProperties,
} from "react";
import styles from "./PortfolioWeb.module.css";

type PortfolioCategory = "landing" | "crece" | "empresa";
type PortfolioFilter = "all" | PortfolioCategory;

type PortfolioItem = {
  name: string;
  type: string;
  plan: string;
  category: PortfolioCategory;
  description: string;
  href: string;
  image: string;
};

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

type RevealStyle = CSSProperties & {
  "--portfolio-delay": string;
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

const portfolioItems: PortfolioItem[] = [
  {
    name: "Ferretería Río Loa",
    type: "Ferretería / Construcción",
    plan: "Landing",
    category: "landing",
    description:
      "Landing corporativa para presentar productos ferreteros, soluciones para construcción y minería, marcas asociadas y canales de cotización directa.",
    href: "https://ferreteriarioloa.cl/",
    image: "/portfolio/trabajo_realizado_rio_loa_600px.webp",
  },
  {
    name: "Grúas TYS",
    type: "Grúas / Servicios",
    plan: "Landing",
    category: "landing",
    description:
      "Landing profesional para presentar servicios de grúas, operación en terreno y contacto comercial.",
    href: "https://www.gruastys.cl/",
    image: "/portfolio/gruas_tys_600x310.webp",
  },
  {
    name: "Gran Norte",
    type: "Servicios / Empresa",
    plan: "Plan Crece",
    category: "crece",
    description:
      "Sitio web para comunicar servicios, fortalecer presencia digital y facilitar el contacto con clientes.",
    href: "https://grannorte.cl/",
    image: "/portfolio/gran_norte_600x310.webp",
  },
  {
    name: "Promaq Servicios Industriales",
    type: "Transporte / Izaje",
    plan: "Plan Crece",
    category: "crece",
    description:
      "Sitio para transporte de carga, lavado técnico y grúas de alto tonelaje.",
    href: "https://promaqserviciosindustriales.cl/",
    image: "/portfolio/trabajo_realizado_03_600px.webp",
  },
  {
    name: "Loa Rental",
    type: "Industrial / Minería",
    plan: "Plan Empresa",
    category: "empresa",
    description:
      "Presencia corporativa para servicios industriales y operación en terreno.",
    href: "https://loarental.cl/",
    image: "/portfolio/trabajo_realizado_07_600px.webp",
  },
  {
    name: "Romaa",
    type: "Transporte industrial",
    plan: "Plan Empresa",
    category: "empresa",
    description:
      "Web corporativa para operación segura, trazable y orientada a gran minería.",
    href: "https://romaa.cl/",
    image: "/portfolio/trabajo_realizado_02_600px.webp",
  },
  {
    name: "Transportes CHR",
    type: "Carga / Logística",
    plan: "Landing",
    category: "landing",
    description:
      "Sitio orientado a transporte confiable para clientes industriales y mineros.",
    href: "https://transporteschr.cl/",
    image: "/portfolio/trabajo_realizado_01_600px.webp",
  },
  {
    name: "KLP Servicios",
    type: "Servicios industriales",
    plan: "Plan Empresa",
    category: "empresa",
    description:
      "Sitio técnico para comunicar capacidades, experiencia y servicios en minería.",
    href: "https://klpservicios.cl/",
    image: "/portfolio/trabajo_realizado_05_600px.webp",
  },
  {
    name: "Serven Chile",
    type: "Ferretería industrial",
    plan: "Plan Empresa",
    category: "empresa",
    description:
      "Plataforma corporativa para distribución, marcas líderes y soluciones industriales.",
    href: "https://servenchile.cl/",
    image: "/portfolio/trabajo_realizado_04_600px.webp",
  },
  {
    name: "Elektrom",
    type: "Servicios eléctricos",
    plan: "Landing",
    category: "landing",
    description:
      "Sitio web para soluciones eléctricas domiciliarias, industriales y emergencias.",
    href: "https://elektrom.cl/",
    image: "/portfolio/trabajo_realizado_elektrom_600px.webp",
  },
  {
    name: "Martin Atacama Transfers",
    type: "Transporte turístico",
    plan: "Plan Crece",
    category: "crece",
    description:
      "Sitio web para transporte turístico y traslados en rutas del desierto.",
    href: "https://transferatacamachile.cl/",
    image:
      "/portfolio/trabajo_realizado_martin_atacama_transfers_600px.webp",
  },
  {
    name: "Divinity Lux",
    type: "Ecommerce",
    plan: "Plan Empresa",
    category: "empresa",
    description:
      "Tienda online elegante para ánforas de cremación con enfoque premium.",
    href: "https://anforasdivinitylux.cl/",
    image: "/portfolio/trabajo_realizado_divinitylux_600px.webp",
  },
  {
    name: "Funeraria Pérez",
    type: "Servicios funerarios",
    plan: "Landing",
    category: "landing",
    description:
      "Presencia digital sobria, clara y cercana para atención en momentos sensibles.",
    href: "https://funerariaperez.cl/",
    image: "/portfolio/trabajo_realizado_funeraria_perez_600px.webp",
  },
  {
    name: "La Leonera Antofagasta",
    type: "Restaurant / Bar",
    plan: "Landing",
    category: "landing",
    description:
      "Sitio con identidad fuerte, enfoque local y conexión directa con clientes.",
    href: "https://laleoneraantofagasta.cl/",
    image: "/portfolio/trabajo_realizado_09_600px.webp",
  },
  {
    name: "Chelacabur",
    type: "Restaurant / Turismo",
    plan: "Landing",
    category: "landing",
    description:
      "Sitio experiencial para destacar ambiente, ubicación y propuesta gastronómica.",
    href: "https://chelacabur.cl/",
    image: "/portfolio/trabajo_realizado_06_600px.webp",
  },
  {
    name: "Power Diesel SPA",
    type: "Servicios técnicos",
    plan: "Plan Crece",
    category: "crece",
    description:
      "Sitio web para servicios especializados, mantención y soluciones técnicas.",
    href: "https://powerdieselspa.cl/",
    image: "/portfolio/mockup_sitio_web_01_600x310.webp",
  },
  {
    name: "Profleet Chile",
    type: "Flotas / Servicios",
    plan: "Plan Empresa",
    category: "empresa",
    description:
      "Web corporativa para comunicar soluciones profesionales orientadas a flotas.",
    href: "https://profleetchile.cl/",
    image: "/portfolio/mockup_sitio_web_02_600x310.webp",
  },
  {
    name: "Rohuer Ingeniería",
    type: "Ingeniería",
    plan: "Plan Crece",
    category: "crece",
    description:
      "Sitio profesional para presentar servicios técnicos, experiencia y soluciones de ingeniería.",
    href: "https://rohueringenieria.cl/",
    image: "/portfolio/mockup_sitio_web_03_600x310.webp",
  },
  {
    name: "SYM Solar Chile",
    type: "Energía solar",
    plan: "Plan Empresa",
    category: "empresa",
    description:
      "Web empresarial para soluciones solares, eficiencia energética y servicios especializados.",
    href: "https://www.symsolarchile.cl/",
    image: "/portfolio/mockup_sitio_web_04_600x310.webp",
  },
  {
    name: "Transilver",
    type: "Transporte",
    plan: "Plan Crece",
    category: "crece",
    description:
      "Sitio para empresa de transporte con foco en confianza, operación y contacto comercial.",
    href: "https://transilver.cl/",
    image: "/portfolio/mockup_sitio_web_05_600x310.webp",
  },
  {
    name: "Transportes M y V",
    type: "Transporte / Logística",
    plan: "Plan Crece",
    category: "crece",
    description:
      "Presencia web para servicios de transporte, logística y soluciones operativas.",
    href: "https://transportesmyv.cl/",
    image: "/portfolio/mockup_sitio_web_06_600x310.webp",
  },
  {
    name: "Workmetal",
    type: "Metalurgia",
    plan: "Landing",
    category: "landing",
    description:
      "Landing profesional para comunicar servicios metalmecánicos de forma clara y directa.",
    href: "https://workmetal.cl/",
    image: "/portfolio/mockup_sitio_web_07_600x310.webp",
  },
  {
    name: "Busoli",
    type: "Servicios",
    plan: "Landing",
    category: "landing",
    description:
      "Sitio tipo landing para presentar servicios, propuesta comercial y contacto rápido.",
    href: "https://busoli.cl/",
    image: "/portfolio/mockup_sitio_web_08_600x310.webp",
  },
  {
    name: "Empresas HC",
    type: "Grupo empresarial",
    plan: "Plan Empresa",
    category: "empresa",
    description:
      "Web corporativa para estructurar presencia empresarial, servicios y comunicación institucional.",
    href: "https://empresashc.cl/",
    image: "/portfolio/mockup_sitio_web_09_600x310.webp",
  },
  {
    name: "Transportes Castillo SPA",
    type: "Transporte",
    plan: "Plan Empresa",
    category: "empresa",
    description:
      "Sitio empresarial para transporte, servicios operativos y contacto comercial.",
    href: "https://transportescastillospa.cl/",
    image: "/portfolio/mockup_sitio_web_10_600x310.webp",
  },
  {
    name: "Funeraria Sagrado Corazón de Jesús",
    type: "Servicios funerarios",
    plan: "Plan Empresa",
    category: "empresa",
    description:
      "Sitio corporativo sobrio y claro para servicios funerarios y atención familiar.",
    href: "https://funerariasagradocorazondejesus.cl/",
    image:
      "/portfolio/mockup_sitio_web_lote2_01_600x310.webp",
  },
  {
    name: "GM Especialistas",
    type: "Especialistas técnicos",
    plan: "Plan Crece",
    category: "crece",
    description:
      "Sitio para presentar servicios especializados, experiencia y contacto profesional.",
    href: "https://gmespecialistas.cl/",
    image:
      "/portfolio/mockup_sitio_web_lote2_02_600x310.webp",
  },
  {
    name: "GSPECO Lavados Industriales",
    type: "Lavados industriales",
    plan: "Landing",
    category: "landing",
    description:
      "Landing enfocada en servicios industriales, claridad operativa y solicitud de contacto.",
    href: "https://gspecolavadosindustriales.cl/",
    image:
      "/portfolio/mockup_sitio_web_lote2_03_600x310.webp",
  },
  {
    name: "Hottap Chile Servicios",
    type: "Servicios",
    plan: "Landing",
    category: "landing",
    description:
      "Landing para comunicar servicios, diferenciales y contacto de manera simple.",
    href: "https://hottapchileservicios.cl/",
    image:
      "/portfolio/mockup_sitio_web_lote2_05_600x310.webp",
  },
  {
    name: "Grúas y Servicios The Marine",
    type: "Grúas / Servicios",
    plan: "Landing",
    category: "landing",
    description:
      "Sitio tipo landing para servicios de grúas, operación en terreno y contacto rápido.",
    href: "https://gruasyserviciosthemarine.cl/",
    image:
      "/portfolio/mockup_sitio_web_lote2_06_600x310.webp",
  },
  {
    name: "JLS Maquinarias",
    type: "Maquinarias",
    plan: "Landing",
    category: "landing",
    description:
      "Landing para presentar servicios de maquinaria, capacidades y solicitud comercial.",
    href: "https://jlsmaquinarias.cl/",
    image:
      "/portfolio/mockup_sitio_web_lote2_07_600x310.webp",
  },
  {
    name: "MGC Chile",
    type: "Servicios empresariales",
    plan: "Plan Crece",
    category: "crece",
    description:
      "Sitio profesional para servicios, presentación comercial y posicionamiento digital.",
    href: "https://mgcchile.cl/",
    image:
      "/portfolio/mockup_sitio_web_lote2_08_600x310.webp",
  },
  {
    name: "Motel Elegance Calama",
    type: "Hotelería",
    plan: "Plan Empresa",
    category: "empresa",
    description:
      "Sitio empresarial para presentar espacios, servicios y experiencia de reserva.",
    href: "https://motelelegancecalama.cl/",
    image:
      "/portfolio/mockup_sitio_web_lote2_09_600x310.webp",
  },
  {
    name: "Muba SPA",
    type: "Servicios",
    plan: "Plan Crece",
    category: "crece",
    description:
      "Sitio web para comunicar servicios, propuesta de valor y contacto comercial.",
    href: "https://mubaspa.cl/",
    image:
      "/portfolio/mockup_sitio_web_lote2_10_600x310.webp",
  },
  {
    name: "Maryland SpA",
    type: "Construcción / Minería",
    plan: "Plan Empresa",
    category: "empresa",
    description:
      "Sitio corporativo para presentar experiencia, servicios especializados, proyectos y capacidad operacional para la gran minería.",
    href: "https://www.marylandspa.cl/",
    image: "/mockup-maryland.webp",
  },
  {
    name: "Transyt",
    type: "Transporte",
    plan: "Landing",
    category: "landing",
    description:
      "Landing clara y directa para presentar servicios de transporte y contacto comercial.",
    href: "https://transyt.cl/",
    image:
      "/portfolio/mockup_sitio_web_lote3_03_600x310.webp",
  },
  {
    name: "Anexus",
    type: "Empresa / Servicios",
    plan: "Plan Empresa",
    category: "empresa",
    description:
      "Web corporativa para comunicar servicios, estructura empresarial y propuesta comercial.",
    href: "https://anexus.cl/",
    image:
      "/portfolio/mockup_sitio_web_lote3_04_600x310.webp",
  },
];

const revealDelay = (delay: number): RevealStyle => ({
  "--portfolio-delay": `${delay}ms`,
});

export default function PortfolioWeb() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const [activeFilter, setActiveFilter] =
    useState<PortfolioFilter>("all");

  const [modalOpen, setModalOpen] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const [selectedService, setSelectedService] =
    useState<Service | null>(null);

  const [selectedPlan, setSelectedPlan] =
    useState<Plan | null>(null);

  const [formData, setFormData] = useState({
    company: "",
    name: "",
    email: "",
    phone: "",
    objective: "",
    reference: "",
  });

  const visibleItems = useMemo(() => {
    if (activeFilter === "all") {
      return portfolioItems;
    }

    return portfolioItems.filter(
      (item) => item.category === activeFilter,
    );
  }, [activeFilter]);

  const canSend = Boolean(
    selectedService &&
      (selectedService.id !== "diseno-web" || selectedPlan) &&
      formData.company.trim() &&
      formData.name.trim() &&
      formData.phone.trim() &&
      formData.objective.trim(),
  );

  const inputClass =
    "h-12 rounded-[14px] border border-slate-200 bg-white px-4 text-[14px] text-[#07142b] outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10";

  const textareaClass =
    "resize-none rounded-[14px] border border-slate-200 bg-white px-4 py-3 text-[14px] text-[#07142b] outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10";

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const elements = Array.from(
      section.querySelectorAll<HTMLElement>(
        "[data-portfolio-reveal]",
      ),
    ).filter(
      (element) => !element.classList.contains(styles.visible),
    );

    if (!elements.length) {
      return;
    }

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
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add(styles.visible);
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -5% 0px",
      },
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [activeFilter]);

  useEffect(() => {
    if (!modalOpen) {
      return;
    }

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
        ? `Referencia: ${formData.reference}`
        : "",
    ]
      .filter(Boolean)
      .join("\n");

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        message,
      )}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <>
      <section
        ref={sectionRef}
        id="portafolio-web"
        className="relative isolate overflow-hidden bg-[#f8fbff] px-6 pb-32 pt-20 text-[#07162f] md:px-10 md:pt-24 lg:pb-40 lg:pt-28"
      >
        <div className="pointer-events-none absolute inset-0 -z-30 bg-[radial-gradient(circle_at_8%_7%,rgba(37,99,235,.08),transparent_28%),radial-gradient(circle_at_88%_10%,rgba(56,189,248,.1),transparent_32%),linear-gradient(180deg,#f8fbff_0%,#fff_34%,#fff_100%)]" />

        <div className="pointer-events-none absolute inset-0 -z-20 opacity-[0.55] [background-image:linear-gradient(rgba(15,23,42,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,.035)_1px,transparent_1px)] [background-size:84px_84px] [mask-image:linear-gradient(180deg,transparent_0%,black_16%,black_78%,transparent_100%)]" />

        <div className="mx-auto w-full max-w-[1240px]">
          <header className="mb-11 grid gap-10 lg:grid-cols-[1fr_0.78fr] lg:items-end">
            <div
              className={styles.reveal}
              data-portfolio-reveal
              style={revealDelay(0)}
            >
              <div className="mb-5 flex items-center gap-3 text-[12px] font-black uppercase leading-none tracking-[0.22em] text-[#2563eb]">
                <span className="h-[2px] w-11 rounded-full bg-gradient-to-r from-[#2563eb] to-[#38bdf8]" />
                Sitios desarrollados
              </div>

              <h1 className="max-w-[780px] text-[clamp(44px,5.5vw,82px)] font-black leading-[0.9] tracking-[-0.08em] text-[#07162f]">
                Portafolio web

                <span className="block text-[#2563eb]">
                  para empresas
                </span>
              </h1>
            </div>

            <p
              className={`${styles.reveal} max-w-[540px] text-[16px] leading-[1.78] text-[#52627a]`}
              data-portfolio-reveal
              style={revealDelay(130)}
            >
              Explora proyectos creados para distintos rubros y niveles de
              desarrollo digital. Puedes filtrar por tipo de solución para
              revisar sitios tipo landing, proyectos de crecimiento y
              desarrollos corporativos más completos.{" "}
              <strong className="font-black text-[#07162f]">
                Cada sitio fue diseñado para comunicar mejor, generar
                confianza y facilitar el contacto comercial.
              </strong>
            </p>
          </header>

          <div
            className={`${styles.reveal} mb-11 flex justify-center`}
            data-portfolio-reveal
            style={revealDelay(240)}
          >
            <div className="max-w-full overflow-x-auto rounded-full p-1">
              <div className="inline-flex min-w-max rounded-full border border-[#d1ddee] bg-white/82 p-2 shadow-[0_18px_54px_rgba(7,22,47,.08)] backdrop-blur-xl">
                {filters.map((filter) => {
                  const isActive = activeFilter === filter.value;

                  return (
                    <button
                      key={filter.value}
                      type="button"
                      onClick={() =>
                        setActiveFilter(filter.value)
                      }
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
              <div
                key={`${item.href}-${activeFilter}`}
                className={`${styles.reveal} ${styles.cardReveal}`}
                data-portfolio-reveal
                style={revealDelay((index % 4) * 90)}
              >
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.projectLink} group relative flex min-h-full flex-col overflow-hidden rounded-[26px] border border-[#e2ebf7] bg-white/95 text-inherit no-underline shadow-[0_18px_54px_rgba(7,22,47,.075)] transition duration-300 hover:-translate-y-2 hover:border-[#2563eb]/35 hover:shadow-[0_34px_90px_rgba(7,22,47,.15)]`}
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

                  <div className="relative flex min-h-[228px] flex-1 flex-col bg-[radial-gradient(circle_at_100%_0%,rgba(37,99,235,.055),transparent_32%),linear-gradient(180deg,#fff_0%,#fbfdff_100%)] px-5 pb-5 pt-6">
                    <div className="absolute left-5 top-0 h-[3px] w-[52px] rounded-full bg-gradient-to-r from-[#2563eb] to-[#38bdf8]" />

                    <span className="mb-3 text-[10.5px] font-black uppercase leading-snug tracking-[0.18em] text-slate-500">
                      {item.type}
                    </span>

                    <h3 className="mb-2 text-[21px] font-black leading-[1.12] tracking-[-0.045em] text-[#07162f]">
                      {item.name}
                    </h3>

                    <p className="text-[14px] leading-[1.58] text-slate-500">
                      {item.description}
                    </p>

                    <div className={styles.projectFooter}>
                      <span className={styles.projectFooterText}>
                        Ver proyecto
                      </span>

                      <span
                        className={styles.projectArrowBox}
                        aria-hidden="true"
                      >
                        <Image
                          src="/flecha-horizontal.webp"
                          alt=""
                          width={30}
                          height={6}
                          className={styles.projectArrow}
                        />
                      </span>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>

          <div
            className={styles.reveal}
            data-portfolio-reveal
            style={revealDelay(100)}
          >
            <section
              className={styles.cta}
              aria-labelledby="portfolio-cta-title"
            >
              <div className={styles.glow} />

              <div className={styles.ctaContent}>
                <h2 id="portfolio-cta-title">
                  ¿Tu empresa necesita una web mejor?
                </h2>

                <p>
                  Podemos desarrollar un sitio profesional según el nivel
                  que necesitas: desde una landing clara y directa hasta
                  una web corporativa más completa para presentar
                  servicios, proyectos y generar oportunidades comerciales.
                </p>

                <button type="button" onClick={openModal}>
                  <span>Hablemos de tu proyecto</span>

                  <span
                    className={styles.ctaArrowBox}
                    aria-hidden="true"
                  >
                    <Image
                      src="/flecha-horizontal.webp"
                      alt=""
                      width={30}
                      height={6}
                      className={styles.ctaArrow}
                    />
                  </span>
                </button>
              </div>
            </section>
          </div>
        </div>
      </section>

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
                      className="mt-2 inline-flex min-h-12 items-center justify-center rounded-xl bg-blue-600 px-5 text-[14px] font-black text-white shadow-[0_16px_35px_rgba(37,99,235,.22)] transition hover:-translate-y-0.5 hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none disabled:hover:translate-y-0"
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