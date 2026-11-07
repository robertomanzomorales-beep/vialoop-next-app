import Hero from "@/components/Hero";
import ClientsLoop from "@/components/ClientsLoop";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import ClientTestimonial from "@/components/ClientTestimonial";
import SystemsSection from "@/components/SystemsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <ClientsLoop />
      <Services />
      <SystemsSection />
      <Testimonials />
      <ClientTestimonial />
      <Footer />
    </main>
  );
}
