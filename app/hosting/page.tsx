import type { Metadata } from "next";
import Footer from "@/components/Footer";
import HostingFaq from "@/components/HostingFaq";
import HostingPlans from "@/components/HostingPlans";
import SupportPlans from "@/components/SupportPlans";

export const metadata: Metadata = {
  title: "Hosting y soporte técnico | Vialoop",
  description:
    "Planes anuales de hosting, correo corporativo, soporte técnico y renovación de dominios para empresas.",
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