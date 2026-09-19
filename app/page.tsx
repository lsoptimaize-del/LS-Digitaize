import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ClientConstellation from "./components/ClientConstellation";
import DigitalSection from "./components/DigitalSection";
import ServicesSection from "./components/ServicesSectionNew";
import ProcessSection from "./components/ProcessSection";
import TestimonialsSection from "./components/TestimonialsSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero stays pinned on desktop while the sections below slide up over it */}
      <div className="relative z-0 md:sticky md:top-0">
        <HeroSection />
      </div>

      <div className="relative z-10">
        <ClientConstellation />
        <div style={{ background: "#FAFAF7" }}>
          <DigitalSection />
          <ServicesSection />
          <ProcessSection />
          <TestimonialsSection />
          <ContactSection />
          <Footer />
        </div>
      </div>
    </main>
  );
}
