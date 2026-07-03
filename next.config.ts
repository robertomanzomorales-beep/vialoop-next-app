import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/2023",
        destination: "/",
        permanent: true,
      },
      {
        source: "/2026/05/08/alerta-hackeos-sitios-web-chile-seguridad",
        destination: "/",
        permanent: true,
      },
      {
        source: "/2026/05/14/exponor-2026-guia-para-preparar-la-presencia-digital-de-tu-empresa-antes-del-evento",
        destination: "/",
        permanent: true,
      },
      {
        source: "/2026/06/17/nueva-ley-de-proteccion-de-datos-personales-como-preparar-tu-sitio-web-y-hosting",
        destination: "/",
        permanent: true,
      },
      {
        source: "/category/noticias-digitales",
        destination: "/",
        permanent: true,
      },
      {
        source: "/author/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/wp-content/:path*",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;