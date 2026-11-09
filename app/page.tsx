import type { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import Hero from "@/components/Hero";
import ClientsLoop from "@/components/ClientsLoop";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import ClientTestimonial from "@/components/ClientTestimonial";
import SystemsSection from "@/components/SystemsSection";
import HomeAtmosphere from "@/components/HomeAtmosphere";
import styles from "./page.module.css";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: "/",
    siteName: "Vialoop",
    title: "Diseño web y software a medida | Vialoop",
    description: "Sitios web que presentan tu negocio y software que simplifica tu operación. Desde Calama y Antofagasta, para todo Chile.",
  },
};

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1} className={`${styles.home} main-content`}>
      <HomeAtmosphere />
      <Hero />
      <ClientsLoop />
      <Services />
      <SystemsSection />
      <Testimonials />
      <ClientTestimonial />
      <ContactForm embedded />

    </main>
  );
}
