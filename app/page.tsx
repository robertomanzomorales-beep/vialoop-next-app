import Hero from "@/components/Hero";
import ClientsLoop from "@/components/ClientsLoop";
import Services from "@/components/Services";
import SystemsSection from "@/components/SystemsSection";
import FeaturedProjects from "@/components/FeaturedProjects";
import Testimonials from "@/components/Testimonials";
import ClientTestimonial from "@/components/ClientTestimonial";
import ContactForm from "@/components/contact/ContactForm";
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <ClientsLoop />
        <Services />
        <SystemsSection />
        <FeaturedProjects />
        <Testimonials />
        <ClientTestimonial />
        <ContactForm embedded />
      </main>
      <Footer />
    </>
  );
}
