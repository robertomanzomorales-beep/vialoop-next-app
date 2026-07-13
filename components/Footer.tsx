import Image from "next/image";
import Link from "next/link";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <path
        fill="currentColor"
        d="M12.04 2C6.55 2 2.08 6.43 2.08 11.88c0 1.92.56 3.72 1.53 5.24L2 22l5.03-1.57a10.1 10.1 0 0 0 5.01 1.32c5.49 0 9.96-4.43 9.96-9.87S17.53 2 12.04 2Zm0 18.08a8.42 8.42 0 0 1-4.3-1.18l-.31-.18-2.98.93.96-2.86-.2-.32a8.07 8.07 0 0 1-1.46-4.59c0-4.52 3.72-8.2 8.29-8.2s8.29 3.68 8.29 8.2-3.72 8.2-8.29 8.2Zm4.55-6.13c-.25-.12-1.48-.72-1.71-.8-.23-.09-.4-.12-.57.12-.17.25-.65.8-.8.96-.15.16-.3.18-.55.06-.25-.12-1.05-.38-2-1.22-.74-.65-1.24-1.46-1.39-1.71-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.42.08-.16.04-.31-.02-.43-.06-.12-.57-1.36-.78-1.86-.2-.48-.41-.42-.57-.43h-.49c-.17 0-.43.06-.66.31-.23.25-.87.84-.87 2.04 0 1.2.89 2.37 1.01 2.53.12.16 1.75 2.65 4.25 3.72.59.25 1.05.4 1.41.51.59.19 1.13.16 1.56.1.48-.07 1.48-.6 1.69-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.16-.48-.28Z"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <path
        fill="currentColor"
        d="M7.8 2h8.4A5.81 5.81 0 0 1 22 7.8v8.4a5.81 5.81 0 0 1-5.8 5.8H7.8A5.81 5.81 0 0 1 2 16.2V7.8A5.81 5.81 0 0 1 7.8 2Zm0 2A3.8 3.8 0 0 0 4 7.8v8.4A3.8 3.8 0 0 0 7.8 20h8.4a3.8 3.8 0 0 0 3.8-3.8V7.8A3.8 3.8 0 0 0 16.2 4H7.8Zm8.95 2.2a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1ZM12 7.2a4.8 4.8 0 1 1 0 9.6 4.8 4.8 0 0 1 0-9.6Zm0 2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6Z"
      />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <path
        fill="currentColor"
        d="M21.58 7.19a2.75 2.75 0 0 0-1.94-1.95C17.93 4.78 12 4.78 12 4.78s-5.93 0-7.64.46a2.75 2.75 0 0 0-1.94 1.95A28.59 28.59 0 0 0 2 12a28.59 28.59 0 0 0 .42 4.81 2.75 2.75 0 0 0 1.94 1.95c1.71.46 7.64.46 7.64.46s5.93 0 7.64-.46a2.75 2.75 0 0 0 1.94-1.95A28.59 28.59 0 0 0 22 12a28.59 28.59 0 0 0-.42-4.81ZM10 15.3V8.7l5.75 3.3L10 15.3Z"
      />
    </svg>
  );
}

const socialLinks = [
  {
    href: "https://wa.link/fgn52s",
    label: "WhatsApp",
    icon: <WhatsAppIcon />,
  },
  {
    href: "https://www.instagram.com/vialoop.cl/",
    label: "Instagram",
    icon: <InstagramIcon />,
  },
  {
    href: "https://www.youtube.com/@vialoop9352",
    label: "YouTube",
    icon: <YoutubeIcon />,
  },
];

export default function Footer() {
  return (
    <footer
      id="footer"
      role="contentinfo"
      aria-label="Pie de página Vialoop"
      className="relative isolate overflow-hidden bg-[#050b15] px-6 py-12 text-white md:px-10 lg:py-14"
    >
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(180deg,#050b15_0%,#071225_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-white/10" />

      <div className="mx-auto grid w-full max-w-[1180px] gap-10 lg:grid-cols-[1.25fr_.85fr_.55fr] lg:gap-12">
        <div>
          <Image
            src="/cropped-logo-vialoop-OPT-e1780252734427.webp"
            alt="Vialoop"
            width={104}
            height={104}
            className="mb-5 h-auto w-[96px] opacity-95"
          />

          <p className="max-w-[500px] text-[15px] font-medium leading-7 text-white/68">
            Ayudamos a empresas industriales, servicios y negocios del norte de
            Chile a mejorar su presencia digital y verse más profesionales
            online.
          </p>

          <p className="mt-3 max-w-[460px] text-[14px] leading-7 text-white/48">
            Diseño web en Calama y Antofagasta, con atención remota para todo
            Chile.
          </p>
        </div>

        <div>
          <p className="mb-5 text-[11px] font-black uppercase tracking-[0.22em] text-white/58">
            Contacto
          </p>

          <ul className="grid gap-4">
            <li className="border-b border-white/[0.07] pb-4">
              <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.18em] text-white/38">
                Email
              </span>

              <a
                href="mailto:contacto@vialoop.cl"
                className="text-[14px] font-semibold text-white/82 transition-colors hover:text-white"
              >
                contacto@vialoop.cl
              </a>
            </li>

            <li className="border-b border-white/[0.07] pb-4">
              <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.18em] text-white/38">
                Teléfono
              </span>

              <a
                href="tel:+56974330586"
                className="text-[14px] font-semibold text-white/82 transition-colors hover:text-white"
              >
                +56 9 7433 0586
              </a>
            </li>
          </ul>

          <div className="mt-6">
            <a
              href="https://calendly.com/contacto-vialoop/diseno-web"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[40px] items-center justify-center rounded-full border border-white/10 bg-white/[0.035] px-4 text-[11px] font-black uppercase tracking-[0.12em] text-white/70 transition-colors hover:border-white/18 hover:bg-white/[0.065] hover:text-white"
            >
              Agendar revisión
            </a>
          </div>
        </div>

        <div>
          <p className="mb-5 text-[11px] font-black uppercase tracking-[0.22em] text-white/58">
            Conectemos
          </p>

          <div className="mb-7 flex gap-3">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.035] text-white/70 transition-colors hover:border-white/18 hover:bg-white/[0.065] hover:text-white"
              >
                {item.icon}
              </a>
            ))}
          </div>

          <a
            href="#"
            aria-label="Volver al inicio de la página"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2 text-[11px] font-black uppercase tracking-[0.12em] text-white/52 transition-colors hover:border-white/18 hover:bg-white/[0.06] hover:text-white"
          >
            Volver arriba
            <span className="text-[13px]">↑</span>
          </a>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-[1180px] flex-col gap-3 border-t border-white/10 pt-5 text-[12px] leading-6 text-white/45 md:flex-row md:items-center md:justify-between">
        <p>© 2026 Vialoop Studio SpA · Diseño web en Calama y Antofagasta.</p>

        <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
          <Link
            href="/politicasdeuso"
            className="w-fit text-white/62 transition-colors hover:text-white"
          >
            Políticas de Uso
          </Link>

          <Link
            href="/politicasprivacidad"
            className="w-fit text-white/62 transition-colors hover:text-white"
          >
            Política de Privacidad
          </Link>

          <p className="text-white/40">
            Diseñado y potenciado por{" "}
            <span className="font-semibold text-white/62">Vialoop</span>
          </p>
        </div>
      </div>
    </footer>
  );
}