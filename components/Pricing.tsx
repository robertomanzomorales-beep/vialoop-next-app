import Image from "next/image";

const works = [
  {
    name: "KLP Servicios",
    type: "Servicios industriales",
    description:
      "Sitio técnico para comunicar capacidades, experiencia y servicios en minería.",
    href: "https://klpservicios.cl/",
    image: "/trabajo_realizado_05_600px.webp",
    alt: "Sitio web KLP Servicios",
  },
  {
    name: "Promaq Servicios Industriales",
    type: "Transporte / Izaje",
    description:
      "Sitio para transporte de carga, lavado técnico y grúas de alto tonelaje.",
    href: "https://promaqserviciosindustriales.cl/",
    image: "/trabajo_realizado_03_600px.webp",
    alt: "Sitio web Promaq Servicios Industriales",
  },
  {
    name: "Martin Atacama Transfers",
    type: "Transporte turístico",
    description:
      "Sitio web para transporte turístico y traslados en rutas del desierto.",
    href: "https://transferatacamachile.cl/",
    image: "/trabajo_realizado_martin_atacama_transfers_600px.webp",
    alt: "Sitio web Martin Atacama Transfers",
  },
  {
    name: "Elektrom",
    type: "Servicios eléctricos",
    description:
      "Sitio web para soluciones eléctricas domiciliarias, industriales y emergencias.",
    href: "https://elektrom.cl/",
    image: "/trabajo_realizado_elektrom_600px.webp",
    alt: "Sitio web Elektrom",
  },
];

export default function Works() {
  return (
    <section
      id="trabajos-realizados"
      aria-labelledby="works-title"
      className="relative isolate overflow-hidden bg-[#f8fbff] px-5 py-20 text-[#07162f] sm:px-6 md:px-10 lg:py-24"
    >
      <div className="pointer-events-none absolute inset-0 -z-30 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_58%,#f3f7ff_100%)]" />

      <div className="pointer-events-none absolute left-0 top-0 -z-20 h-[360px] w-[360px] rounded-full bg-blue-100/45 blur-3xl" />
      <div className="pointer-events-none absolute right-[-120px] top-[120px] -z-20 h-[340px] w-[340px] rounded-full bg-sky-100/55 blur-3xl" />

      <div className="mx-auto w-full max-w-[1200px]">
        <header className="mb-10 grid gap-6 md:mb-12 lg:grid-cols-[1fr_420px] lg:items-end">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-9 bg-blue-600/70" />
              <span className="text-[10px] font-black uppercase tracking-[0.26em] text-blue-700">
                Portafolio Vialoop
              </span>
            </div>

            <h2
              id="works-title"
              className="max-w-[720px] text-[clamp(32px,5.6vw,54px)] font-black leading-[0.96] tracking-[-0.065em] text-[#07162f]"
            >
              Sitios web diseñados para{" "}
              <span className="text-blue-700">generar confianza</span>
            </h2>
          </div>

          <p className="max-w-[520px] text-[14px] leading-7 text-slate-600 lg:max-w-[420px]">
            Proyectos desarrollados para empresas industriales, servicios y
            negocios del norte de Chile. Cada sitio fue creado para{" "}
            <strong className="font-black text-[#07162f]">
              mostrar mejor lo que hace la empresa, ordenar su información y
              facilitar el contacto comercial.
            </strong>
          </p>
        </header>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {works.map((work) => (
            <a
              key={work.name}
              href={work.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Ver proyecto ${work.name}`}
              className="group relative flex min-h-[390px] flex-col overflow-hidden rounded-[26px] border border-slate-200/80 bg-white shadow-[0_18px_54px_rgba(7,22,47,.075)] transition-[transform,box-shadow,border-color] duration-500 ease-out hover:-translate-y-[4px] hover:border-blue-500/30 hover:shadow-[0_28px_72px_rgba(7,22,47,.13)] sm:min-h-[400px] lg:min-h-[382px]"
            >
              <div className="relative h-[190px] overflow-hidden bg-slate-100 sm:h-[178px] lg:h-[160px]">
                <Image
                  src={work.image}
                  alt={work.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#07162f]/18 via-[#07162f]/4 to-transparent" />
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <span className="mb-2 block text-[9px] font-black uppercase leading-4 tracking-[0.17em] text-slate-500">
                      {work.type}
                    </span>

                    <h3 className="max-w-[210px] text-[21px] font-black leading-[1.02] tracking-[-0.05em] text-[#07162f]">
                      {work.name}
                    </h3>
                  </div>

                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-slate-200 bg-slate-50 text-[14px] text-blue-700 transition-all duration-500 group-hover:border-blue-600/25 group-hover:bg-blue-700 group-hover:text-white">
                    ↗
                  </span>
                </div>

                <p className="text-[13px] leading-6 text-slate-600">
                  {work.description}
                </p>

                <div className="mt-auto flex items-center justify-between pt-6">
                  <span className="text-[12px] font-black uppercase tracking-[0.12em] text-blue-700">
                    Ver proyecto
                  </span>

                  <span className="h-px w-10 bg-blue-700/35 transition-[width] duration-500 group-hover:w-16" />
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href="/portafolio-web/"
            className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-[#07162f]/10 bg-[#07162f] px-6 text-[10px] font-black uppercase tracking-[0.16em] text-white shadow-[0_18px_44px_rgba(7,22,47,.18)] transition-all duration-500 hover:-translate-y-[2px] hover:bg-blue-700 hover:shadow-[0_24px_58px_rgba(37,99,235,.22)]"
          >
            Explorar más sitios web
            <span className="grid h-6 w-6 place-items-center rounded-full border border-white/20 bg-white/10 transition-transform duration-500 group-hover:translate-x-0.5">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}