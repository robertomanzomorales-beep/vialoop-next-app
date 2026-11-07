import type { Metadata } from "next";
import Footer from "@/components/Footer";
import ContactForm, { type ContactService } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contacto y solicitud de propuesta",
  description: "Cuéntanos tu proyecto de diseño web, software a medida o servicios digitales. Contacta a Vialoop Studio SpA.",
  alternates: { canonical: "/contacto" },
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ servicio?: string }> }) {
  const { servicio } = await searchParams;
  const services: ContactService[] = ["web", "sistema", "google", "material", "hosting", "otro"];
  const initialService = services.find(item => item === servicio);
  return <><main><ContactForm initialService={initialService} /></main><Footer /></>;
}
