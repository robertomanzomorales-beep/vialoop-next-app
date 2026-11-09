import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import MainMenu from "@/components/MainMenu";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import GoogleTagManager from "@/components/analytics/GoogleTagManager";
import CookieConsent from "@/components/privacy/CookieConsent";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vialoop.cl"),

  title: {
    default: "Diseño web y software a medida | Vialoop",
    template: "%s | Vialoop",
  },

  description:
    "Diseño de sitios web y desarrollo de software a medida para empresas, negocios y profesionales. Desde Calama y Antofagasta, trabajamos con todo Chile.",

  twitter: { card: "summary_large_image" },

  icons: {
    icon: "/vialoop-logo-original-optimizado-e1780251299821.webp",
    shortcut:
      "/vialoop-logo-original-optimizado-e1780251299821.webp",
    apple:
      "/vialoop-logo-original-optimizado-e1780251299821.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a className="skip-link" href="#main-content">Saltar al contenido</a>
        <MainMenu />

        {children}

        <Footer />

        <FloatingWhatsApp />

        <GoogleTagManager />

        <CookieConsent />
      </body>
    </html>
  );
}
