import type { Metadata } from "next";
import Footer from "@/components/Footer";
import QuoteWizard, { type ServiceId } from "@/components/contact/QuoteWizard";

export const metadata: Metadata = {
  title: "Contacto y solicitud de propuesta",
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

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ servicio?: string }> }) {
  const { servicio } = await searchParams;
  const validServices: ServiceId[] = ["web", "sistema", "google", "material", "hosting", "otro"];
  const initialService = validServices.find((id) => id === servicio);
  return (
    <>
      <main>
        <QuoteWizard key={initialService ?? "general"} initialService={initialService} />
      </main>

      <Footer />
    </>
  );
}
