import Hero from "@/components/Hero";
import ClientsLoop from "@/components/ClientsLoop";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import ClientTestimonial from "@/components/ClientTestimonial";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <ClientsLoop />
      <Services />
      <Testimonials />
      <Pricing />
      <ClientTestimonial />
      <Footer />
    </main>
  );
}