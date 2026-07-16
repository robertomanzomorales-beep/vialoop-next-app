import Hero from "@/components/Hero";
import ClientsLoop from "@/components/ClientsLoop";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Works from "@/components/Works";
import ClientTestimonial from "@/components/ClientTestimonial";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <ClientsLoop />
      <Services />
      <Testimonials />
      <Works />
      <ClientTestimonial />
      <Footer />
    </main>
  );
}