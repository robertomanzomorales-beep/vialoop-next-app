import type { Metadata } from "next";
import Footer from "@/components/Footer";
import ContactForm, {
  type ContactService,
} from "@/components/contact/ContactForm";
export const metadata: Metadata = {
  title: "Conversemos de tu proyecto",
  description:
    "Cuéntanos tu idea. Contacta a Vialoop para diseño web, software a medida y soluciones digitales para tu empresa.",
  alternates: { canonical: "/contacto" },
};
export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ servicio?: string }>;
}) {
  const { servicio } = await searchParams;
  const services: ContactService[] = [
    "web",
    "sistema",
    "google",
    "material",
    "hosting",
    "otro",
  ];
  const selected = services.find((item) => item === servicio);
  return (
    <>
      <main>
        <ContactForm initialService={selected} />
      </main>
      <Footer />
    </>
  );
}
