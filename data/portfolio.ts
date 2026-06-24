export type PortfolioCategory = "landing" | "crece" | "empresa";

export type PortfolioItem = {
  name: string;
  type: string;
  plan: string;
  category: PortfolioCategory;
  description: string;
  href: string;
  image: string;
};

export const portfolioItems: PortfolioItem[] = [
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
    image: "/portfolio/trabajo_realizado_martin_atacama_transfers_600px.webp",
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
    image: "/portfolio/mockup_sitio_web_lote2_01_600x310.webp",
  },
  {
    name: "GM Especialistas",
    type: "Especialistas técnicos",
    plan: "Plan Crece",
    category: "crece",
    description:
      "Sitio para presentar servicios especializados, experiencia y contacto profesional.",
    href: "https://gmespecialistas.cl/",
    image: "/portfolio/mockup_sitio_web_lote2_02_600x310.webp",
  },
  {
    name: "GSPECO Lavados Industriales",
    type: "Lavados industriales",
    plan: "Landing",
    category: "landing",
    description:
      "Landing enfocada en servicios industriales, claridad operativa y solicitud de contacto.",
    href: "https://gspecolavadosindustriales.cl/",
    image: "/portfolio/mockup_sitio_web_lote2_03_600x310.webp",
  },
  {
    name: "Hospedaje Carolina",
    type: "Hospedaje",
    plan: "Landing",
    category: "landing",
    description:
      "Sitio directo para mostrar alojamiento, ubicación, servicios y canales de reserva.",
    href: "https://hospedajecarolina.cl/",
    image: "/portfolio/mockup_sitio_web_lote2_04_600x310.webp",
  },
  {
    name: "Hottap Chile Servicios",
    type: "Servicios",
    plan: "Landing",
    category: "landing",
    description:
      "Landing para comunicar servicios, diferenciales y contacto de manera simple.",
    href: "https://hottapchileservicios.cl/",
    image: "/portfolio/mockup_sitio_web_lote2_05_600x310.webp",
  },
  {
    name: "Grúas y Servicios The Marine",
    type: "Grúas / Servicios",
    plan: "Landing",
    category: "landing",
    description:
      "Sitio tipo landing para servicios de grúas, operación en terreno y contacto rápido.",
    href: "https://gruasyserviciosthemarine.cl/",
    image: "/portfolio/mockup_sitio_web_lote2_06_600x310.webp",
  },
  {
    name: "JLS Maquinarias",
    type: "Maquinarias",
    plan: "Landing",
    category: "landing",
    description:
      "Landing para presentar servicios de maquinaria, capacidades y solicitud comercial.",
    href: "https://jlsmaquinarias.cl/",
    image: "/portfolio/mockup_sitio_web_lote2_07_600x310.webp",
  },
  {
    name: "MGC Chile",
    type: "Servicios empresariales",
    plan: "Plan Crece",
    category: "crece",
    description:
      "Sitio profesional para servicios, presentación comercial y posicionamiento digital.",
    href: "https://mgcchile.cl/",
    image: "/portfolio/mockup_sitio_web_lote2_08_600x310.webp",
  },
  {
    name: "Motel Elegance Calama",
    type: "Hotelería",
    plan: "Plan Empresa",
    category: "empresa",
    description:
      "Sitio empresarial para presentar espacios, servicios y experiencia de reserva.",
    href: "https://motelelegancecalama.cl/",
    image: "/portfolio/mockup_sitio_web_lote2_09_600x310.webp",
  },
  {
    name: "Muba SPA",
    type: "Servicios",
    plan: "Plan Crece",
    category: "crece",
    description:
      "Sitio web para comunicar servicios, propuesta de valor y contacto comercial.",
    href: "https://mubaspa.cl/",
    image: "/portfolio/mockup_sitio_web_lote2_10_600x310.webp",
  },
  {
    name: "Angamos Chile",
    type: "Servicios",
    plan: "Plan Crece",
    category: "crece",
    description:
      "Sitio profesional para fortalecer presencia digital, servicios y contacto con clientes.",
    href: "https://angamoschile.cl/",
    image: "/portfolio/mockup_sitio_web_lote3_01_600x310.webp",
  },
  {
    name: "Transyt",
    type: "Transporte",
    plan: "Landing",
    category: "landing",
    description:
      "Landing clara y directa para presentar servicios de transporte y contacto comercial.",
    href: "https://transyt.cl/",
    image: "/portfolio/mockup_sitio_web_lote3_03_600x310.webp",
  },
  {
    name: "Anexus",
    type: "Empresa / Servicios",
    plan: "Plan Empresa",
    category: "empresa",
    description:
      "Web corporativa para comunicar servicios, estructura empresarial y propuesta comercial.",
    href: "https://anexus.cl/",
    image: "/portfolio/mockup_sitio_web_lote3_04_600x310.webp",
  },
];