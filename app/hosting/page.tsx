import type { Metadata } from "next";
import Footer from "@/components/Footer";
import HostingPlans from "@/components/HostingPlans";
import SupportPlans from "@/components/SupportPlans";
import HostingFaq from "@/components/HostingFaq";
export const metadata: Metadata = {
  title: "Hosting, correos y soporte",
  description:
    "Planes de hosting, correo corporativo y soporte técnico de Vialoop. Revisa capacidades, valores y condiciones del servicio.",
  alternates: { canonical: "/hosting" },
};
export default function HostingPage() {
  return (
    <>
      <main>
        <HostingPlans />
        <SupportPlans />
        <HostingFaq />
      </main>
      <Footer />
    </>
  );
}
