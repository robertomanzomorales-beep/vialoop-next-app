import type { Metadata } from "next";
import Footer from "@/components/Footer";
import QuoteWizard from "@/components/contact/QuoteWizard";

export const metadata: Metadata = {
  title: "Contacto y cotizador de proyectos",
  description:
    "Cotice sitios web, sistemas a medida, servicios de Google y material comercial con Vialoop Studio SpA.",
  alternates: {
    canonical: "/contacto",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactPage() {
  return (
    <>
      <main>
        <QuoteWizard />
      </main>

      <Footer />
    </>
  );
}
