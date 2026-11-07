import Hero from "@/components/Hero";
import ClientsLoop from "@/components/ClientsLoop";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import ClientTestimonial from "@/components/ClientTestimonial";
import SystemsSection from "@/components/SystemsSection";
import Footer from "@/components/Footer";
import HomeAtmosphere from "@/components/HomeAtmosphere";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.home}>
      <HomeAtmosphere />
      <Hero />
      <ClientsLoop />
      <Services />
      <SystemsSection />
      <Testimonials />
      <ClientTestimonial />
      <Footer ambient />
    </main>
  );
}
