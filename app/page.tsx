import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import DigitalSection from "./components/DigitalSection";
import ServicesSection from "./components/ServicesSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <HeroSection />
      <DigitalSection />
      <ServicesSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
