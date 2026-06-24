import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import MainMenu from "@/components/MainMenu";
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
  title: "Vialoop.cl",
  description: "Diseño web para empresas de Calama y Antofagasta.",
  icons: {
    icon: "/vialoop-logo-original-optimizado-e1780251299821.webp",
    shortcut: "/vialoop-logo-original-optimizado-e1780251299821.webp",
    apple: "/vialoop-logo-original-optimizado-e1780251299821.webp",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <MainMenu />
        {children}
      </body>
    </html>
  );
}